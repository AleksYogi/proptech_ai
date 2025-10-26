// Локальный сервер для обработки API запросов во время разработки
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });

// Импортируем Supabase клиент для логирования согласий
const { createClient } = require('@supabase/supabase-js');

// Function to create Supabase client with environment variables
const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase credentials are not configured. Consent logging will not work.');
    return null;
  }
  
  return createClient(supabaseUrl, supabaseKey);
};

// Функция для сохранения лога согласия
const logConsent = async (consentData) => {
  // Create a new Supabase client for this request to avoid connection reuse issues
  const requestSupabase = createSupabaseClient();
  
  if (!requestSupabase) {
    console.error('Supabase is not configured. Cannot save consent log.');
    return { success: false, error: 'Supabase is not configured' };
  }

 try {
    const { data, error } = await requestSupabase
      .from('consent_logs') // таблица в Supabase
      .insert([{
        ...consentData,
        timestamp: consentData.timestamp.toISOString(),
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Error saving consent log:', error);
      return { success: false, error: error.message };
    }

    console.log('Consent log saved successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error in logConsent:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API route для обработки заявок
app.post('/api/lead', async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, phone, company, convenientTime, consent } = req.body;

 // Validate required fields
  const errors = [];
  if (!name || name.trim() === '') {
    errors.push('Имя обязательно');
  }
  if (!phone || phone.trim() === '') {
    errors.push('Телефон обязателен');
  }
  if (!company || company.trim() === '') {
    errors.push('Компания обязательна');
  }
  
  // Validate consent - privacy policy consent is required
  if (!consent || !consent.privacyPolicy) {
    errors.push('Необходимо согласие с политикой обработки персональных данных');
  }

 if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

 // Sanitize inputs
  const sanitizedData = {
    name: name.trim(),
    phone: phone.trim(),
    company: company.trim(),
    convenientTime: convenientTime ? convenientTime.trim() : undefined,
    consent: consent
  };
  
  // Log consent data to database for 152-ФЗ compliance
  const consentLogData = {
    timestamp: new Date(),
    ip: req.headers['x-forwarded-for'] ||
        req.headers['x-real-ip'] ||
        req.socket?.remoteAddress ||
        'UNKNOWN',
    user_agent: req.headers['user-agent'] || 'UNKNOWN',
    form_type: 'lead_form',
    email: null, // No email field in this form
    phone: phone.trim(),
    consents: consent || { privacyPolicy: false },
    policy_version: '2025-10-15' // Current policy version
  };

  console.log('Attempting to save consent log to database:', consentLogData);

  // Save consent log to database
  try {
    const consentResult = await logConsent(consentLogData);
    if (consentResult.success) {
      console.log('Consent log saved successfully to database');
    } else {
      console.error('Failed to save consent log to database:', consentResult.error);
      // Don't fail the entire request if consent logging fails, just log the error
    }
  } catch (error) {
    console.error('Error saving consent log to database:', error);
  }

 try {
    // Send email notification
    let emailSent = false;
    let emailError = null;
    
    if (process.env.RESEND_API_KEY) {
      const emailResponse = await sendEmail(sanitizedData);
      if (emailResponse.success) {
        emailSent = true;
      } else {
        emailError = emailResponse.error;
        console.error('Email sending failed:', emailError);
      }
    } else {
      emailError = 'RESEND_API_KEY not configured';
      console.error('RESEND_API_KEY not configured');
    }

    // Send Telegram notification
    let telegramSent = false;
    let telegramError = null;
    
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const telegramResponse = await sendTelegramMessage(sanitizedData);
      if (telegramResponse.success) {
        telegramSent = true;
      } else {
        telegramError = telegramResponse.error;
        console.error('Telegram sending failed:', telegramError);
      }
    } else {
      telegramError = 'Telegram credentials not configured';
      console.error('Telegram credentials not configured');
    }

    // Prepare response based on success/failure of individual notifications
    const results = [];
    if (emailSent) {
      results.push('Email sent successfully');
    } else if (emailError) {
      results.push(`Email failed: ${emailError}`);
    }
    
    if (telegramSent) {
      results.push('Telegram message sent successfully');
    } else if (telegramError) {
      results.push(`Telegram failed: ${telegramError}`);
    }

    // If both failed, return error
    if (!emailSent && !telegramSent) {
      return res.status(500).json({ 
        message: 'Failed to send notifications', 
        errors: results 
      });
    }

    // At least one notification was sent successfully
    return res.status(200).json({ 
      message: 'Lead submitted successfully', 
      errors: results.filter(result => result.includes('failed')) 
    });

  } catch (error) {
    console.error('Error processing lead submission:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// API route для отзыва согласия
app.post('/api/consent-withdraw', async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, phone, withdrawalReason } = req.body;

 // Validate required fields (at least one of email or phone)
  const errors = [];
  if (!email && !phone) {
    errors.push('Email or phone is required to identify the user');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  try {
    console.log('Attempting to withdraw consent for:', { email, phone });

    // Update consent logs to mark them as withdrawn
    const updateData = {
      consents: { privacyPolicy: false, dataTransfer: false }, // Set all consents to false
      updated_at: new Date().toISOString()
    };

    if (withdrawalReason) {
      updateData.withdrawal_reason = withdrawalReason;
    }

    let updateResult;
    if (email) {
      updateResult = await supabase
        .from('consent_logs')
        .update(updateData)
        .eq('email', email);
    } else if (phone) {
      updateResult = await supabase
        .from('consent_logs')
        .update(updateData)
        .eq('phone', phone);
    }

    if (updateResult?.error) {
      console.error('Error withdrawing consent:', updateResult.error);
      return res.status(500).json({ 
        message: 'Failed to withdraw consent', 
        error: updateResult.error.message 
      });
    }

    console.log('Consent withdrawn successfully for:', { email, phone });
    return res.status(200).json({
      message: 'Consent withdrawn successfully',
      success: true
    });

  } catch (error) {
    console.error('Error withdrawing consent:', error);
    return res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message 
    });
 }

});

// Function to send email using Resend
async function sendEmail(data) {
  try {
    console.log('Attempting to send email with data:', data);
    const consentInfo = data.consent
      ? `<p><strong>Согласия:</strong></p>
         <ul>
           <li>Политика конфиденциальности: ${data.consent.privacyPolicy ? 'Да' : 'Нет'}</li>
           <li>Передача данных третьим лицам: ${data.consent.dataTransfer ? 'Да' : 'Нет'}</li>
         </ul>`
      : '<p><strong>Согласия:</strong> Не указаны</p>';
      
    const convenientTimeInfo = data.convenientTime ? `<p><strong>Удобное время для связи:</strong> ${data.convenientTime}</p>` : '';
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev', // Используем тестовый домен Resend
        to: 'wwlewka@gmail.com',
        subject: 'Новая заявка с сайта Proptech AI',
        html: `
          <h2>Новая заявка с сайта Proptech AI</h2>
          <p><strong>Имя:</strong> ${data.name}</p>
          <p><strong>Телефон:</strong> ${data.phone}</p>
          <p><strong>Компания:</strong> ${data.company}</p>
          ${convenientTimeInfo}
          ${consentInfo}
        `,
      }),
    });

    console.log('Email API response status:', response.status);
    if (response.ok) {
      const result = await response.json();
      console.log('Email sent successfully:', result);
      return { success: true, data: result };
    } else {
      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type');
      let errorData;
      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json();
      } else {
        // If not JSON, read as text
        const errorText = await response.text();
        console.error('Email API error (non-JSON):', errorText);
        return { success: false, error: errorText || 'Email service error' };
      }
      console.error('Email API error:', errorData);
      return { success: false, error: errorData.error || errorData.message || 'Email service error' };
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown email error' };
  }
}

// Function to send Telegram message
async function sendTelegramMessage(data) {
  try {
    console.log('Attempting to send Telegram message with data:', data);
    const consentInfo = data.consent
      ? `\n\nСогласия:\n- Политика конфиденциальности: ${data.consent.privacyPolicy ? 'Да' : 'Нет'}\n- Передача данных третьим лицам: ${data.consent.dataTransfer ? 'Да' : 'Нет'}`
      : '\n\nСогласия: Не указаны';
      
    const convenientTimeInfo = data.convenientTime ? `\nУдобное время для связи: ${data.convenientTime}` : '';
    const message = `Новая заявка: Имя — ${data.name}, Телефон — ${data.phone}, Компания — ${data.company}${convenientTimeInfo}${consentInfo}`;
    
    const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message
      }),
    });

    console.log('Telegram API response status:', response.status);
    if (response.ok) {
      const result = await response.json();
      console.log('Telegram message sent successfully:', result);
      return { success: true, data: result };
    } else {
      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type');
      let errorData;
      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json();
      } else {
        // If not JSON, read as text
        const errorText = await response.text();
        console.error('Telegram API error (non-JSON):', errorText);
        return { success: false, error: errorText || 'Telegram API error' };
      }
      console.error('Telegram API error:', errorData);
      return { success: false, error: errorData.description || 'Telegram API error' };
    }
  } catch (error) {
    console.error('Telegram sending error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown Telegram error' };
  }
}

app.listen(PORT, () => {
  console.log(`Local API server running on port ${PORT}`);
});