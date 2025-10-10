import { Calendar, Cog, Rocket, CheckCircle } from "lucide-react";
import { Helmet } from 'react-helmet-async';

const ProcessSection = () => {
  const steps = [
    {
      step: 1,
      title: "Заявка и анализ",
      duration: "День 1",
      description: "Консультация, анализ вашей ситуации, определение ключевых аспектов для ИИ агента",
      result: "Чёткий план работы и техническое задание для будущего агента",
      icon: Calendar,
      color: "text-secondary"
    },
    {
      step: 2,
      title: "Настройка и обучение",
      duration: "Дни 2-5",
      description: "Создание агента, загрузка базы знаний, интеграция с CRM, тестирование",
      result: "Готовый к работе ИИ-агент с вашими данными",
      icon: Cog,
      color: "text-primary"
    },
    {
      step: 3,
      title: "Запуск и обучение",
      duration: "Дни 6-7",
      description: "Подключение к каналам связи, обучение команды, первые тесты с клиентами",
      result: "Полноценно работающий агент и обученная команда",
      icon: Rocket,
      color: "text-accent"
    }
  ];

  const deliverables = [
    "Персональный ИИ-агент со знаниями о ваших проектах",
    "Интеграция с каналами связи",
    "Настроенная CRM-система с автоматическим внесением данных",
    "Техническая поддержка и обновления"
  ];

  return (
    <>
      <Helmet>
        <title>Процесс внедрения ИИ-агента за 7 дней | Proptech AI</title>
        <meta name="description" content="Процесс внедрения ИИ-агента для агентств недвижимости за 7 дней: анализ, настройка, запуск. Простой и понятный путь к автоматизации бизнеса." />
        <meta name="keywords" content="внедрение ИИ-агента, процесс автоматизации, настройка ИИ для недвижимости, 7 дней внедрение, интеграция CRM" />
        <link rel="canonical" href="https://proptech-ai.ru/" />
        <meta property="og:title" content="Процесс внедрения ИИ-агента за 7 дней | Proptech AI" />
        <meta property="og:description" content="Процесс внедрения ИИ-агента для агентств недвижимости за 7 дней: анализ, настройка, запуск. Простой и понятный путь к автоматизации бизнеса." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://proptech-ai.ru/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Процесс внедрения ИИ-агента за 7 дней | Proptech AI" />
        <meta name="twitter:description" content="Процесс внедрения ИИ-агента для агентств недвижимости за 7 дней: анализ, настройка, запуск. Простой и понятный путь к автоматизации бизнеса." />
      </Helmet>
      <section className="section-padding">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              Процесс внедрения за 7 дней
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Простой и понятный путь от заявки до полностью готового ИИ-агента
            </p>
          </div>

          {/* Process Steps */}
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-0.5 h-96 bg-border"></div>
            
            <div className="space-y-16 lg:space-y-24">
              {steps.map((step, index) => (
                <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Step Content */}
                  <div className="flex-1 space-y-6">
                    <div className="card-feature">
                      {/* Step Header */}
                      <div className="flex items-center space-x-4 mb-6">
                        <div className={`w-16 h-16 rounded-full bg-card shadow-md flex items-center justify-center ${step.color}`}>
                          <step.icon className="h-8 w-8" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground-muted">{step.duration}</div>
                          <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                        </div>
                      </div>

                      {/* Step Description */}
                      <p className="text-lg text-foreground-muted leading-relaxed mb-4">
                        {step.description}
                      </p>

                      {/* Step Result */}
                      {step.result && (
                        <div className="bg-secondary/10 rounded-lg p-4 border-l-4 border-l-secondary">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5 text-secondary" />
                            <span className="font-semibold text-primary">Результат:</span>
                          </div>
                          <p className="text-foreground-muted mt-2">{step.result}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step Number Circle */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-primary shadow-lg flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary-foreground">{step.step}</span>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -inset-2 rounded-full border-2 border-secondary/20"></div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden lg:block"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Deliverables */}
          <div className="mt-20">
            <div className="bg-card rounded-xl p-8 lg:p-12 shadow-lg card-eco">
              <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-8 text-center">
                Что получаете на выходе:
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {deliverables.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                    <span className="text-lg text-card-foreground">{item}</span>
                  </div>
                ))}
              </div>

              {/* Timeline Badge */}
              <div className="text-center mt-8">
                <div className="inline-flex items-center space-x-2 bg-secondary/20 px-6 py-3 rounded-full">
                  <Calendar className="h-5 w-5 text-secondary" />
                  <span className="font-semibold text-primary">Полный цикл: всего 7 дней</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProcessSection;