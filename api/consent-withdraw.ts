// Vercel API route для отзыва согласия пользователя
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Create Supabase client for this request
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

interface ConsentWithdrawData {
  email?: string;
  phone?: string;
  withdrawalReason?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, phone, withdrawalReason } = req.body as ConsentWithdrawData;

 // Validate required fields (at least one of email or phone)
  const errors: string[] = [];
  if (!email && !phone) {
    errors.push('Email or phone is required to identify the user');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  try {
    // Create Supabase client for this request
    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase credentials are not configured. Consent withdrawal will not work.');
      return res.status(500).json({ message: 'Supabase is not configured' });
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    console.log('Attempting to withdraw consent for:', { email, phone });

    // Update consent logs to mark them as withdrawn
    const updateData: any = {
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
      error: (error as Error).message 
    });
  }
}