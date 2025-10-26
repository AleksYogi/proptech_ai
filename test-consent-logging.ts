import { logConsent } from './src/lib/database';

// Тестовые данные для проверки сохранения логов согласий
const testConsentData = {
  timestamp: new Date(),
  ip: '192.168.1.1',
  userAgent: 'Mozilla/5.0 (test agent)',
  formType: 'lead_form',
  email: 'test@example.com',
  phone: '+79991234567',
  consents: {
    privacyPolicy: true,
    dataTransfer: false
  },
  policyVersion: '2025-10-15'
};

console.log('Тестирование сохранения лога согласия...');

// Проверяем, что переменные окружения установлены
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.log('Переменные окружения Supabase не установлены. Тест не может быть выполнен.');
  console.log('Пожалуйста, добавьте в файл .env.local:');
  console.log('NEXT_PUBLIC_SUPABASE_URL=ваш_supabase_url');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=ваш_supabase_anon_key');
  process.exit(1);
}

// Выполняем тестовое сохранение
logConsent(testConsentData)
  .then(result => {
    if (result.success) {
      console.log('✓ Тест пройден: лог согласия успешно сохранен в базу данных');
      console.log('Данные:', JSON.stringify(testConsentData, null, 2));
    } else {
      console.error('✗ Ошибка при сохранении лога согласия:', result.error);
    }
  })
  .catch(error => {
    console.error('✗ Исключение при сохранении лога согласия:', error);
  });