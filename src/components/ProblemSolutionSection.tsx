import { AlertTriangle, CheckCircle, Clock, Globe, TrendingDown, Users } from "lucide-react";
import aiPhoneInterface from "@/assets/ai-phone-interface.jpg";
import { Helmet } from 'react-helmet-async';

const ProblemSolutionSection = () => {
 const problems = [
    {
      icon: Clock,
      title: "Потеря лидов",
      description: "Из-за долгого ответа, незнания языка клиента, отсутствия актуальной информации или графика работы."
    },
    {
      icon: TrendingDown,
      title: "Пустые встречи",
      description: "Трата времени и сил на холодные звонки, ответы на одни и те же вопросы и общение с клиентами, которые никогда не купят"
    },
    {
      icon: Users,
      title: "Операционная рутина",
      description: "Ручная обработка заявок, заполнение CRM и бесплатные консультации"
    }
  ];

  const consequences = [
    "Низкая конверсия",
    "Переработка и стресс", 
    "Репутационные риски",
    "Выгорание"
  ];

  const solutions = [
    {
      icon: CheckCircle,
      title: "Мгновенная реакция 24/7 и рост конверсии",
      description: "Отвечает на 100% обращений за 30 секунд, в любое время суток. Это критически важно, так как кейсы показывают: сокращение времени ответа с часов до секунд увеличивает количество закрытых сделок на 35%."
    },
    {
      icon: Users,
      title: "Экономия времени агентов до 90%",
      description: "Забирает на себя рутинные задачи, автоматизируя до 90% ручного труда. Это высвобождает десятки часов в неделю, позволяя агентам фокусироваться на переговорах и закрытии сделок, а не на административной работе."
    },
    {
      icon: Globe,
      title: "Фильтрация лидов: +60% качественных клиентов.",
      description: "Агент выступает интеллектуальным фильтром: он квалифицирует лидов по бюджету, целям и срокам. В отдел продаж попадают только «прогретые» клиенты, что увеличивает количество лидов, готовых к продаже (SQL), на 60%."
    },
    {
      icon: Clock,
      title: "Снижение операционных расходов",
      description: "Способен одновременно обрабатывать тысячи диалогов, что позволяет масштабировать продажи без найма дополнительных сотрудников колл-центра или младших менеджеров."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Решение проблем агентств недвижимости с ИИ | Proptech AI</title>
        <meta name="description" content="Как ИИ-агент решает основные проблемы агентств недвижимости: потеря лидов, низкая конверсия, операционная рутина. Решения для автоматизации бизнеса." />
        <meta name="keywords" content="проблемы агентства недвижимости, потеря лидов, низкая конверсия, автоматизация недвижимости, ИИ для риэлторов, фильтрация лидов" />
        <link rel="canonical" href="https://proptech-ai.ru/#about" />
        <meta property="og:title" content="Решение проблем агентств недвижимости с ИИ | Proptech AI" />
        <meta property="og:description" content="Как ИИ-агент решает основные проблемы агентств недвижимости: потеря лидов, низкая конверсия, операционная рутина. Решения для автоматизации бизнеса." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://proptech-ai.ru/#about" />
        <meta property="og:image" content="https://proptech-ai.ru/src/assets/ai-phone-interface.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Решение проблем агентств недвижимости с ИИ | Proptech AI" />
        <meta name="twitter:description" content="Как ИИ-агент решает основные проблемы агентств недвижимости: потеря лидов, низкая конверсия, операционная рутина. Решения для автоматизации бизнеса." />
        <meta name="twitter:image" content="https://proptech-ai.ru/src/assets/ai-phone-interface.jpg" />
      </Helmet>
      <section id="about" className="section-padding bg-background-soft">
        <div className="container-custom">
          {/* Problems Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              Знакомые проблемы?
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {problems.map((problem, index) => (
              <div key={index} className="card-feature bg-red-50 border-l-4 border-l-destructive">
                <AlertTriangle className="h-8 w-8 text-destructive" />
                <h3 className="text-xl font-semibold text-foreground mb-3">{problem.title}</h3>
                <p className="text-foreground-muted leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>

          {/* Consequences */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {consequences.map((consequence, index) => (
              <div key={index} className="text-center py-4 px-6 bg-destructive/10 rounded-lg">
                <span className="text-destructive font-semibold">{consequence}</span>
              </div>
            ))}
          </div>

          {/* Solution Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              Мы предоставляем решение всех проблем в одном агенте
            </h2>
            <p className="text-xl text-foreground-muted max-w-4xl mx-auto">
              Персональный ИИ-помощник, который работает лучше живого менеджера — никогда не устает, 
              говорит на любом языке и превращает каждый лид в квалифицированного клиента.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Solutions List */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary mb-8">Что делает ИИ-агент:</h3>
              
              {solutions.map((solution, index) => (
                <div key={index} className="flex items-start space-x-4 card-feature">
                  <solution.icon className="h-8 w-8 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg text-foreground mb-2">{solution.title}</h4>
                    <p className="text-foreground-muted leading-relaxed">{solution.description}</p>
                  </div>
                </div>
              ))}

            </div>

            {/* AI Interface Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img
                  src={aiPhoneInterface}
                  alt="ИИ-агент интерфейс"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              
              {/* Floating Feature Badge */}
              <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-semibold shadow-lg">
                ИИ 24/7
              </div>
            </div>
          </div>

          {/* Full-width Additional Benefits Section */}
          <div className="mt-20 container-custom">
            <div className="p-8 bg-gradient-to-r from-secondary/20 to-primary/10 rounded-2xl">
              <h3 className="text-3xl font-bold text-center text-primary mb-6">Полный спектр возможностей ИИ-агента</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-lg text-primary mb-4">Основные функции:</h4>
                  <ul className="space-y-3 text-foreground-muted">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                      <span>ИИ-ассистент для телефонных переговоров</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Автоматическая квалификация лидов</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Интеграция с CRM системами</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Многоязычная поддержка</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-primary mb-4">Дополнительные возможности:</h4>
                  <ul className="space-y-3 text-foreground-muted">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Создание контент-завода для соцсетей</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Оптимизация под ИИ-поиск</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Анализ и отчетность по эффективности</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Персонализированные стратегии взаимодействия</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProblemSolutionSection;