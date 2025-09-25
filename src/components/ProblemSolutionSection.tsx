import { AlertTriangle, CheckCircle, Clock, Globe, TrendingDown, Users } from "lucide-react";
import aiPhoneInterface from "@/assets/ai-phone-interface.jpg";

const ProblemSolutionSection = () => {
  const problems = [
    {
      icon: Clock,
      title: "Потеря лидов",
      description: "из-за долгого ответа, незнания языка клиента или отсутствия актуальной информации"
    },
    {
      icon: TrendingDown,
      title: "Пустые встречи",
      description: "Трата времени и сил на холодные звонки, пустые встречи и общение с клиентами, которые никогда не купят"
    },
    {
      icon: Users,
      title: "Операционная рутина",
      description: "ручная обработка заявок, заполнение CRM и бесплатные консультации"
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
      title: "Мгновенная реакция",
      description: "Отвечает как живой человек в течение 30 секунд на любое обращение и удерживает внимание потенциального покупателя профессиональным диалогом"
    },
    {
      icon: Users,
      title: "Умная квалификация",
      description: "Определяет реальный бюджет клиента, выясняет цели покупки и готовность к сделке через тактичные вопросы"
    },
    {
      icon: Globe,
      title: "Экспертная консультация",
      description: "Консультирует по проектам, тонкостям региона, юридическим аспектам покупки недвижимости и оценивает готовность клиента"
    },
    {
      icon: Clock,
      title: "Автоматизация данных",
      description: "Заносит все данные в систему, распределяет клиентов по приоритетности и всю информацию передает менеджеру"
    }
  ];

  return (
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

            {/* Additional Benefits */}
            <div className="mt-8 p-6 bg-secondary/10 rounded-xl border-l-4 border-l-secondary">
              <h4 className="font-semibold text-lg text-primary mb-3">Дополнительные возможности:</h4>
              <ul className="space-y-2 text-foreground-muted">
                <li>• Функционирует 24/7 без выходных, захватывая лидов в любое время</li>
                <li>• Предоставляет честную информацию о рынке, рисках и возможностях</li>
                <li>• Мониторит важные сайты и остается в курсе всех новых событий</li>
              </ul>
            </div>
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
      </div>
    </section>
  );
};

export default ProblemSolutionSection;