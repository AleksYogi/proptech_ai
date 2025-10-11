// Vercel API route для обработки заявок с формы
// Этот файл является резервной копией в TypeScript
// Основной файл - api/lead.js, который используется Vercel

declare var process: {
  env: {
    RESEND_API_KEY?: string;
    TELEGRAM_BOT_TOKEN?: string;
    TELEGRAM_CHAT_ID?: string;
  };
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, phone, company } = req.body;

  // Validate required fields
  const errors: string[] = [];
  if (!name || name.trim() === '') {
    errors.push('Имя обязательно');
  }
  if (!phone || phone.trim() === '') {
    errors.push('Телефон обязателен');
  }
  if (!company || company.trim() === '') {
    errors.push('Компания обязательна');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  // Sanitize inputs
 const sanitizedData = {
    name: name.trim(),
    phone: phone.trim(),
    company: company.trim()
 };

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
    return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
}

// Function to send email using Resend
async function sendEmail(data: { name: string; phone: string; company: string }) {
  try {
    console.log('Attempting to send email with data:', data);
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'wwlewka@gmail.com',
        to: 'wwlewka@gmail.com',
        subject: 'Новая заявка с сайта Proptech AI',
        html: `
          <h2>Новая заявка с сайта Proptech AI</h2>
          <p><strong>Имя:</strong> ${data.name}</p>
          <p><strong>Телефон:</strong> ${data.phone}</p>
          <p><strong>Компания:</strong> ${data.company}</p>
        `,
      }),
    });

    console.log('Email API response status:', response.status);
    if (response.ok) {
      const result = await response.json();
      console.log('Email sent successfully:', result);
      return { success: true, data: result };
    } else {
      const errorData = await response.json();
      console.error('Email API error:', errorData);
      return { success: false, error: errorData.error || errorData.message || 'Email service error' };
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown email error' };
 }
}

// Function to send Telegram message
async function sendTelegramMessage(data: { name: string; phone: string; company: string }) {
  try {
    console.log('Attempting to send Telegram message with data:', data);
    const message = `Новая заявка: Имя — ${data.name}, Телефон — ${data.phone}, Компания — ${data.company}`;
    
    const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      }),
    });

    console.log('Telegram API response status:', response.status);
    if (response.ok) {
      const result = await response.json();
      console.log('Telegram message sent successfully:', result);
      return { success: true, data: result };
    } else {
      const errorData = await response.json();
      console.error('Telegram API error:', errorData);
      return { success: false, error: errorData.description || 'Telegram API error' };
    }
  } catch (error) {
    console.error('Telegram sending error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown Telegram error' };
  }
}