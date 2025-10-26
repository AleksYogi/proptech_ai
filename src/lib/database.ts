import { createClient } from '@supabase/supabase-js';

// No module-level environment variable access

// Убедимся, что у нас есть необходимые переменные окружения
// Проверка будет выполнена при каждом вызове функции logConsent

// Create Supabase client function
const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
 const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase credentials are not configured. Consent logging will not work.');
    return null;
  }
  return createClient(supabaseUrl, supabaseKey);
};

// Интерфейс для данных согласия
export interface ConsentLog {
  id?: string;
  timestamp: Date;
  ip: string;
  userAgent: string;
  formType: string;
  email: string | null;
  phone: string;
  consents: {
    privacyPolicy: boolean;
    dataTransfer?: boolean;
  };
  policyVersion: string;
  createdAt?: Date;
}

// Функция для сохранения лога согласия
export const logConsent = async (consentData: Omit<ConsentLog, 'id' | 'createdAt'>) => {
  console.log('Attempting to create Supabase client for consent logging');
  const supabase = createSupabaseClient();
  if (!supabase) {
    console.error('Supabase is not configured. Cannot save consent log.');
    return { success: false, error: 'Supabase is not configured' };
  }

  console.log('Supabase client created successfully, attempting to save consent log:', consentData);
  try {
    const { data, error } = await supabase
      .from('consent_logs') // таблица в Supabase
      .insert([{
        ...consentData,
        timestamp: consentData.timestamp.toISOString(),
        createdAt: new Date().toISOString()
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