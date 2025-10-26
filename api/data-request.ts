// Vercel API route для запроса персональных данных пользователя
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Создаем Supabase клиент
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Убедимся, что у нас есть необходимые переменные окружения
if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials are not configured. Data request will not work.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface DataRequest {
  email?: string;
  phone?: string;
  requestType: 'data-export' | 'data-deletion';
  reason?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, phone, requestType, reason } = req.body as DataRequest;

  // Validate required fields (at least one of email or phone)
  const errors: string[] = [];
  if (!email && !phone) {
    errors.push('Email or phone is required to identify the user');
  }
  
  if (!requestType) {
    errors.push('Request type is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  try {
    console.log('Processing data request for:', { email, phone, requestType });

    if (requestType === 'data-export') {
      // Export user data
      let userData: any = {};
      
      // Get consent logs
      let consentQuery = supabase.from('consent_logs').select('*');
      if (email) {
        consentQuery = consentQuery.eq('email', email);
      } else if (phone) {
        consentQuery = consentQuery.eq('phone', phone);
      }
      
      const { data: consentLogs, error: consentError } = await consentQuery;
      if (consentError) {
        console.error('Error fetching consent logs:', consentError);
        return res.status(500).json({ message: 'Failed to fetch consent logs', error: consentError.message });
      }
      
      userData.consentLogs = consentLogs;
      
      // Get lead data (if stored separately)
      // Note: In this implementation, lead data is not stored separately from consent logs
      // but this could be extended if needed
      
      console.log('Data export completed for:', { email, phone });
      return res.status(200).json({
        message: 'Data export completed',
        data: userData,
        success: true
      });
      
    } else if (requestType === 'data-deletion') {
      // Delete user data
      let deleteCount = 0;
      
      if (email) {
        const { error } = await supabase
          .from('consent_logs')
          .delete()
          .eq('email', email);
          
        if (error) {
          console.error('Error deleting user data by email:', error);
          return res.status(500).json({ message: 'Failed to delete user data', error: error.message });
        }
        
        // For deletion operations, we don't get data back, so we'll count based on other criteria
        // This is a simplified approach - in a real implementation, you might want to count
        // records before deletion
        deleteCount = 1; // Placeholder value
      } else if (phone) {
        const { error } = await supabase
          .from('consent_logs')
          .delete()
          .eq('phone', phone);
          
        if (error) {
          console.error('Error deleting user data by phone:', error);
          return res.status(500).json({ message: 'Failed to delete user data', error: error.message });
        }
        
        // For deletion operations, we don't get data back, so we'll count based on other criteria
        deleteCount = 1; // Placeholder value
      }
      
      console.log('Data deletion completed for:', { email, phone, deletedRecords: deleteCount });
      return res.status(200).json({
        message: 'Data deletion completed',
        deletedRecords: deleteCount,
        success: true
      });
    } else {
      return res.status(400).json({ message: 'Invalid request type. Must be data-export or data-deletion' });
    }
    
  } catch (error) {
    console.error('Error processing data request:', error);
    return res.status(500).json({ 
      message: 'Internal server error', 
      error: (error as Error).message 
    });
  }
}