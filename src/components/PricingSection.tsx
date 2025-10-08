import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Settings, HeadphonesIcon, Calculator } from "lucide-react";

const PricingSection = () => {
  const baseFeatures = [
    "Создание персонального ИИ-агента под ваши проекты и специфику",
    "Квалификационная логика — отбор серьезных покупателей",
    "Интеграция с 1-2 мессенджерами (Telegram, WhatsApp, сайт)",
    "CRM-интеграция — автоматическая передача данных клиентов",
    "Собственный облачный сервер — ваше персональное решение",
    "Админ-панель для управления — самостоятельные правки и настройки",
    "2 часа персонального обучения — как управлять агентом",
    "7 дней бесплатной поддержки — помощь в освоении системы"
  ];

  const maintenanceFeatures = [
    "Техническая поддержка — исправление ошибок, корректировка данных",
    "Мониторинг работы — контроль стабильности системы",
    "Консультации по оптимизации — повышение эффективности"
  ];

  const customFactors = [
    "Размер базы данных — количество объектов и проектов",
    "Количество интеграций — CRM, сайты, мессенджеры",
    "Мониторинг сайтов — отслеживание застройщиков и новых проектов",
    "Сложность логики — специфические алгоритмы квалификации",
    "Каналы связи — WhatsApp, Telegram, сайт, социальные сети",
    "Дополнительные модули — поиск в интернете, аналитика, отчеты, автоматическое создание контента, лидогенерация, проверка застройщиков и др."
  ];

  const benefits = [
    "Полностью автономное решение — работает без нашего участия",
    "Полный контроль — вы владелец системы и данных",
    "Возможность самостоятельных правок — меняете тексты, добавляете проекты",
    "Масштабирование без ограничений — обрабатывает неограниченное количество лидов"
  ];

  return (
    <section className="section-padding" id="pricing">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
            Инвестиции в автоматизацию
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            Прозрачные тарифы без скрытых платежей
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Base Package */}
          <div className="card-feature border-2 border-secondary/20 relative">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-secondary/20 px-4 py-2 rounded-full mb-4">
                <Settings className="h-5 w-5 text-secondary" />
                <span className="font-semibold text-secondary">Готовое решение</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">«Под ключ»</h3>
              <div className="text-4xl font-bold text-primary">75 000 ₽</div>
              <div className="text-foreground-muted">единоразово</div>
            </div>

            <div className="space-y-4 mb-8">
              <h4 className="font-semibold text-foreground">Что входит в базовую настройку:</h4>
              {baseFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground-muted">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => window.open("https://t.me/aleksyogi?text=Здравствуйте,%20хочу%20заказать%20ИИ-агента%20%22под%20ключ%22,%20что%20для%20этого%20нужно?!", "_blank")}
              className="btn-secondary w-full"
            >
              Заказать решение
            </Button>
          </div>

          {/* Maintenance */}
          <div className="card-feature">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-primary/20 px-4 py-2 rounded-full mb-4">
                <HeadphonesIcon className="h-5 w-5 text-primary" />
                <span className="font-semibold text-primary">Опционально</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Ежемесячное обслуживание</h3>
              <div className="text-4xl font-bold text-primary">15 000 ₽</div>
              <div className="text-foreground-muted">в месяц</div>
            </div>

            <div className="space-y-4 mb-8">
              <h4 className="font-semibold text-foreground">Что включено:</h4>
              {maintenanceFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground-muted">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => window.open("https://t.me/aleksyogi?text=Добрый%20день.%20Меня%20интересует%20AI-диагностика%20нашей%20воронки%20продаж.%20Хотел%20бы%20понять,%20как%20мы%20можем%20повысить%20её%20эффективность%20с%20помощью%20ваших%20решений.", "_blank")}
              className="btn-outline w-full"
              style={{ display: 'none' }}
            >
              Получить план роста
            </Button>
          </div>

          {/* Custom Solution */}
          <div className="card-feature border-2 border-accent/20 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-accent text-accent-foreground px-6 py-2 rounded-full font-semibold text-sm">
                Популярный выбор
              </div>
            </div>
            
            <div className="text-center mb-8 mt-4">
              <div className="inline-flex items-center space-x-2 bg-accent/20 px-4 py-2 rounded-full mb-4">
                <Calculator className="h-5 w-5 text-accent" />
                <span className="font-semibold text-accent">Индивидуально</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Персональное решение</h3>
              <div className="text-2xl font-bold text-primary">Расчет по запросу</div>
              <div className="text-foreground-muted">после консультации</div>
            </div>

            <div className="space-y-4 mb-8">
              <h4 className="font-semibold text-foreground">Стоимость зависит от:</h4>
              {customFactors.map((factor, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground-muted">{factor}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => window.open("https://t.me/aleksyogi?text=Добрый%20день.%20Меня%20интересует%20AI-диагностика%20нашей%20воронки%20продаж.%20Хотел%20бы%20понять,%20как%20мы%20можем%20повысить%20её%20эффективность%20с%20помощью%20ваших%20решений.", "_blank")}
              className="btn-primary w-full group"
            >
              Получить план роста
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-card rounded-xl p-8 lg:p-12 shadow-lg card-eco">
          <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-8 text-center">
            Что получаете на выходе:
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                <span className="text-lg text-card-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <Button
              size="lg"
              onClick={() => window.open("https://t.me/aleksyogi?text=Добрый%20день.%20Меня%20интересует%20AI-диагностика%20нашей%20воронки%20продаж.%20Хотел%20бы%20понять,%20как%20мы%20можем%20повысить%20её%20эффективность%20с%20помощью%20ваших%20решений.", "_blank")}
              className="btn-primary text-xl px-12 py-6 group"
            >
              Получить план роста
              <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;