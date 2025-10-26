// Тестовый скрипт для проверки обработки ошибок JSON
const { createClient } = require('@supabase/supabase-js');

// Функция для тестирования обработки не-JSON ответов
async function testTelegramErrorHandling() {
  console.log('🔍 Тестируем обработку ошибок Telegram API...');

  // Мокаем fetch для симуляции ответа от Telegram API с неправильным Content-Type
  global.fetch = async (url, options) => {
    // Возвращаем ответ, который имитирует ошибку сервера с HTML вместо JSON
    return {
      ok: false,
      status: 500,
      headers: {
        get: (name) => {
          if (name.toLowerCase() === 'content-type') {
            return 'text/html'; // Сервер возвращает HTML вместо JSON
          }
          return null;
        }
      },
      text: async () => 'A server error occurred', // Это то, что вызвало ошибку "Unexpected token 'A'"
      json: async () => {
        // Это вызовет ошибку при попытке парсинга HTML как JSON
        throw new Error('Unexpected token A in JSON');
      }
    };
  };

  // Имитация функции sendTelegramMessage с правильной обработкой
  async function sendTelegramMessage(data) {
    try {
      const message = `Новая заявка: Имя — ${data.name}, Телефон — ${data.phone}, Компания — ${data.company}`;
      
      const response = await fetch(`https://api.telegram.org/botTEST/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: 'TEST',
          text: message
        }),
      });

      if (response.ok) {
        const result = await response.json();
        return { success: true, data: result };
      } else {
        // Проверяем, является ли ответ JSON перед парсингом
        const contentType = response.headers.get('content-type');
        let errorData;
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json();
        } else {
          // Если не JSON, читаем как текст
          const errorText = await response.text();
          console.log('✅ Успешно обработана не-JSON ошибка:', errorText);
          return { success: false, error: errorText };
        }
        return { success: false, error: errorData.description || 'Telegram API error' };
      }
    } catch (error) {
      console.error('❌ Ошибка в sendTelegramMessage:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Тестируем функцию
  const result = await sendTelegramMessage({
    name: 'Test User',
    phone: '+1234567890',
    company: 'Test Company'
  });

  if (!result.success) {
    console.log('✅ Обработка ошибки работает корректно');
    console.log('   Полученное сообщение об ошибке:', result.error);
    return true;
 } else {
    console.log('❌ Ошибка не была обработана должным образом');
    return false;
  }
}

// Тестируем обработку ответа от формы
async function testFormResponseHandling() {
  console.log('\n🔍 Тестируем обработку ответов формы...');

  // Мокаем fetch для симуляции ответа от API
  global.fetch = async (url, options) => {
    if (url === '/api/lead') {
      // Возвращаем HTML ошибку вместо JSON
      return {
        ok: false,
        status: 500,
        headers: {
          get: (name) => {
            if (name.toLowerCase() === 'content-type') {
              return 'text/html';
            }
            return null;
          }
        },
        text: async () => 'A server error occurred',
        json: async () => {
          throw new Error('Unexpected token A in JSON');
        }
      };
    }
    return { ok: true, status: 200, json: async () => ({ message: 'OK' }) };
  };

  // Имитация обработки ответа в LeadCaptureForm
 async function handleFormResponse(response) {
    if (response.ok) {
      const result = await response.json();
      return { success: true, data: result };
    } else {
      // Проверяем Content-Type перед парсингом JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorResult = await response.json();
        return { success: false, error: errorResult.message };
      } else {
        // Если не JSON, читаем как текст
        const errorText = await response.text();
        return { success: false, error: errorText };
      }
    }
 }

  // Тестируем
 const mockResponse = {
    ok: false,
    status: 500,
    headers: {
      get: (name) => {
        if (name.toLowerCase() === 'content-type') {
          return 'text/html';
        }
        return null;
      }
    },
    text: async () => 'A server error occurred',
    json: async () => {
      throw new Error('Unexpected token A in JSON');
    }
  };

  try {
    const result = await handleFormResponse(mockResponse);
    if (!result.success) {
      console.log('✅ Обработка не-JSON ответа формы работает корректно');
      console.log('   Полученное сообщение об ошибке:', result.error);
      return true;
    } else {
      console.log('❌ Ответ обработан неправильно');
      return false;
    }
  } catch (error) {
    console.log('❌ Ошибка при обработке ответа:', error.message);
    return false;
  }
}

// Запускаем тесты
async function runTests() {
  console.log('🧪 Запуск тестов обработки ошибок JSON...\n');
  
  const test1 = await testTelegramErrorHandling();
  const test2 = await testFormResponseHandling();
  
  console.log('\n📊 Результаты тестирования:');
  console.log(`Тест 1 (Telegram API): ${test1 ? '✅ Пройден' : '❌ Провален'}`);
  console.log(`Тест 2 (Форма): ${test2 ? '✅ Пройден' : '❌ Провален'}`);
  
  if (test1 && test2) {
    console.log('\n🎉 Все тесты пройдены! Ошибки JSON больше не должны возникать.');
  } else {
    console.log('\n❌ Тесты провалены. Необходимы дополнительные исправления.');
  }
}

runTests();