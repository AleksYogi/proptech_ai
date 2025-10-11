// Vercel API route для обработки заявок с формы
// Отправляет уведомления только в Telegram

import type { VercelRequest, VercelResponse } from '@vercel/node';

interface LeadData {
  name: string;
  phone: string;
  company: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, phone, company } = req.body as LeadData;

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
    // Send Telegram notification only
    let telegramSent = false;
    let telegramError = null;
    
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      console.log('Sending Telegram message with token:', process.env.TELEGRAM_BOT_TOKEN.substring(0, 10) + '...');
      console.log('Sending Telegram message to chat ID:', process.env.TELEGRAM_CHAT_ID);
      const telegramResponse = await sendTelegramMessage(sanitizedData);
      if (telegramResponse.success) {
        telegramSent = true;
        console.log('Telegram message sent successfully');
      } else {
        telegramError = telegramResponse.error;
        console.error('Telegram sending failed:', telegramError);
      }
    } else {
      telegramError = 'Telegram credentials not configured';
      console.error('Telegram credentials not configured. TELEGRAM_BOT_TOKEN:', !!process.env.TELEGRAM_BOT_TOKEN, 'TELEGRAM_CHAT_ID:', !!process.env.TELEGRAM_CHAT_ID);
    }

    // If Telegram failed, return error
    if (!telegramSent) {
      return res.status(500).json({ 
        message: 'Failed to send notification to Telegram', 
        errors: [telegramError || 'Unknown error'] 
      });
    }

    // Telegram notification was sent successfully
    return res.status(200).json({ 
      message: 'Lead submitted successfully' 
    });

  } catch (error) {
    console.error('Error processing lead submission:', error);
    return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
}

// Function to send Telegram message
async function sendTelegramMessage(data: LeadData) {
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
        text: message
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