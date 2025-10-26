// Тестовый файл для проверки подключения к Supabase
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Создаем Supabase клиент
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Supabase URL:', supabaseUrl ? 'Found' : 'Not found');
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Found' : 'Not found');
console.log('Supabase Service Key:', supabaseServiceKey ? 'Found' : 'Not found');

if (!supabaseUrl || (!supabaseAnonKey && !supabaseServiceKey)) {
  console.error('❌ Не все переменные окружения Supabase настроены');
  process.exit(1);
}

// Используем service key для серверных операций, если доступен, иначе anon key
const supabaseKey = supabaseServiceKey || supabaseAnonKey;
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('\n🔍 Проверяем подключение к Supabase...');
console.log('Используемый ключ:', supabaseServiceKey ? 'Service Role Key' : 'Anon Key');

async function testConnection() {
  try {
    // Проверяем подключение, делая простой запрос
    const { data, error } = await supabase
      .from('consent_logs')
      .select('id')
      .limit(1);

    if (error) {
      console.error('❌ Ошибка при подключении к таблице consent_logs:', error.message);
      console.log('Детали ошибки:', error);
      return;
    }

    console.log('✅ Подключение к Supabase успешно установлено!');
    console.log('✅ Таблица consent_logs доступна');
    console.log('✅ Проверка подключения завершена успешно');
    
    // Дополнительно проверим, можно ли вставить тестовую запись
    console.log('\n🔍 Проверяем возможность вставки данных...');
    const testData = {
      timestamp: new Date().toISOString(),
      ip: '127.0.0.1',
      user_agent: 'Test Agent',
      form_type: 'test_form',
      email: 'test@example.com',
      phone: '+1234567890',
      consents: { privacyPolicy: true, dataTransfer: false },
      policy_version: 'test-2025-10-26'
    };

    const { data: insertData, error: insertError } = await supabase
      .from('consent_logs')
      .insert([testData]);

    if (insertError) {
      console.error('❌ Ошибка при вставке тестовой записи:', insertError.message);
      console.log('Детали ошибки:', insertError);
    } else {
      console.log('✅ Тестовая запись успешно добавлена в таблицу consent_logs');
    }
  } catch (error) {
    console.error('❌ Критическая ошибка при подключении к Supabase:', error.message);
  }
}

testConnection();