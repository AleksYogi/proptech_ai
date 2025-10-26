// Vercel API route для логирования согласий пользователей
import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ConsentLogData {
  timestamp: string;
  ip?: string; // Optional since we'll get it from headers
  userAgent: string;
  formType: string;
  email?: string;
  phone?: string;
  consents: {
    privacyPolicy: boolean;
    dataTransfer?: boolean;
  };
  policyVersion: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { timestamp, ip, userAgent, formType, email, phone, consents, policyVersion } = req.body as ConsentLogData;

  // Get real IP address from headers
  const realIp = req.headers['x-forwarded-for'] as string ||
                 req.headers['x-real-ip'] as string ||
                 req.socket?.remoteAddress ||
                 ip ||
                 'UNKNOWN';

  // Validate required fields
  const errors: string[] = [];
  if (!timestamp) {
    errors.push('Timestamp is required');
  }
  if (!formType) {
    errors.push('Form type is required');
  }
  if (!consents) {
    errors.push('Consents data is required');
  }
  if (!policyVersion) {
    errors.push('Policy version is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  try {
    // Prepare consent log data for database
    const consentLogData = {
      timestamp: new Date(timestamp),
      ip: realIp,
      userAgent,
      formType,
      email: email || null,
      phone: phone || '',
      consents,
      policyVersion
    };

    console.log('Attempting to save consent log to database:', consentLogData);

    // Save consent log to database
    try {
      // Dynamically import logConsent to prevent module-level errors
      const { logConsent } = await import('../src/lib/database.js');
      const consentResult = await logConsent(consentLogData);
      if (consentResult.success) {
        console.log('Consent log saved successfully to database');
        return res.status(200).json({
          message: 'Consent logged successfully',
          success: true
        });
      } else {
        console.error('Failed to save consent log to database:', consentResult.error);
        // Still return success to the client but log the database error
        return res.status(200).json({
          message: 'Consent processed but not saved to database',
          success: true,
          warning: 'Consent was not saved to database due to a storage error'
        });
      }
    } catch (error) {
      console.error('Error saving consent log to database:', error);
      // Still return success to the client but log the database error
      return res.status(200).json({
        message: 'Consent processed but not saved to database',
        success: true,
        warning: 'Consent was not saved to database due to an import error'
      });
    }
  } catch (error) {
    console.error('Error logging consent:', error);
    return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
}