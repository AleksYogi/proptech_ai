/**
 * Тестовый скрипт для проверки функциональности формы
 * 
 * Перед запуском убедитесь, что установлены переменные окружения:
 * - RESEND_API_KEY
 * - TELEGRAM_BOT_TOKEN
 * - TELEGRAM_CHAT_ID
 */

const testData = {
  name: "Тестовый Пользователь",
  phone: "+79991234567",
  company: "Тестовая Компания"
};

async function testFormSubmission() {
  console.log("Запуск теста формы обратной связи...");
  
  // Имитация отправки данных на API
  try {
    const response = await fetch('http://localhost:8080/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log("✓ Форма успешно отправлена");
      console.log("Сообщение:", result.message);
      if (result.errors && result.errors.length > 0) {
        console.log("Ошибки при отправке:", result.errors);
      }
    } else {
      console.log("✗ Ошибка при отправке формы");
      console.log("Статус:", response.status);
      console.log("Сообщение:", result.message);
    }
  } catch (error) {
    console.error("✗ Ошибка при выполнении запроса:", error.message);
  }
}

// Проверка наличия необходимых переменных окружения
function checkEnvironment() {
  const missingVars = [];
  
  if (!process.env.RESEND_API_KEY) {
    missingVars.push("RESEND_API_KEY");
  }
  
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    missingVars.push("TELEGRAM_BOT_TOKEN");
  }
  
  if (!process.env.TELEGRAM_CHAT_ID) {
    missingVars.push("TELEGRAM_CHAT_ID");
  }
  
  if (missingVars.length > 0) {
    console.log("⚠️  Отсутствующие переменные окружения:");
    missingVars.forEach(varName => console.log(`  - ${varName}`));
    console.log("\nПожалуйста, установите переменные окружения в .env.local файле");
    return false;
  }
  
  console.log("✓ Все необходимые переменные окружения установлены");
  return true;
}

// Запуск теста
async function runTest() {
  console.log("=== Тестирование формы обратной связи ===\n");
  
  if (checkEnvironment()) {
    await testFormSubmission();
  }
  
  console.log("\n=== Тест завершен ===");
}

// Запуск теста
runTest().catch(console.error);