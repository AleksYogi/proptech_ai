import { Badge, Brain, Database, Globe, Shield, TrendingUp, Zap } from "lucide-react";

const AdvantagesSection = () => {
  const advantages = [
    {
      icon: Badge,
      title: "Конкурентное преимущество",
      description: "Новейшая технология, которая еще мало кем используется на рынке"
    },
    {
      icon: Brain,
      title: "Умные интеграции",
      description: "API курсов валют, мониторинг новостей, подключение к CRM и календарям"
    },
    {
      icon: Database,
      title: "База знаний",
      description: "Постоянно обновляемая информация о проектах, ценах и юридических нюансах"
    },
    {
      icon: Globe,
      title: "Адаптивность",
      description: "Анализирует запросы клиентов и адаптирует стиль общения под каждого"
    },
    {
      icon: TrendingUp,
      title: "Масштабирование",
      description: "Увеличение качества обслуживания без пропорционального роста расходов"
    },
    {
      icon: Shield,
      title: "Подготовка к будущему",
      description: "Оптимизация под поиск нейросетей и эру ИИ-покупателей"
    }
  ];

  return (
    <section id="features" className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
            Преимущества ИИ-агента
          </h2>
          <p className="text-xl text-foreground-muted max-w-4xl mx-auto leading-relaxed">
            Наш ИИ-агент — это новейшая технология, которая только вышла на рынок и еще мало кем используется, 
            что дает вам огромное конкурентное преимущество.
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {advantages.map((advantage, index) => (
            <div key={index} className="card-feature hover-lift group">
              <div className="flex items-center justify-center w-16 h-16 bg-secondary/20 rounded-xl mb-6 group-hover:bg-secondary/30 transition-colors">
                <advantage.icon className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{advantage.title}</h3>
              <p className="text-foreground-muted leading-relaxed">{advantage.description}</p>
            </div>
          ))}
        </div>

        {/* Main Content Block */}
        <div className="bg-card rounded-xl p-8 lg:p-12 shadow-lg card-eco">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center space-x-4 mb-6">
              <Zap className="h-10 w-10 text-secondary" />
              <h3 className="text-2xl lg:text-3xl font-bold text-primary">
                Умный помощник нового поколения
              </h3>
            </div>
            
            <p className="text-lg text-card-foreground leading-relaxed">
              Это умный помощник, использующий множество внешних инструментов: интеграцию с базами данных застройщиков, 
              API курсов валют, мониторинг новостей рынка, подключение к CRM-системам и календарям.
            </p>
            
            <p className="text-lg text-card-foreground leading-relaxed">
              Агент адаптирует стиль общения под каждого клиента, анализируя его запросы и предпочтения, 
              а также имеет доступ к постоянно обновляемой базе знаний о проектах, ценах и юридических нюансах.
            </p>

            {/* Key Features */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-background-soft rounded-lg p-6">
                <h4 className="font-semibold text-primary mb-3">Качество обслуживания</h4>
                <p className="text-foreground-muted">
                  Кардинально увеличивает качество обслуживания клиентов и позволяет масштабировать бизнес 
                  без пропорционального роста расходов на персонал
                </p>
              </div>
              
              <div className="bg-background-soft rounded-lg p-6">
                <h4 className="font-semibold text-primary mb-3">Подготовка к будущему</h4>
                <p className="text-foreground-muted">
                  Оптимизируем работу под новые технологии: готовим бизнес к эре ИИ-покупателей, 
                  которые уже используют ChatGPT для поиска недвижимости
                </p>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-8 p-6 bg-secondary/10 rounded-lg border-l-4 border-l-secondary">
              <p className="text-lg font-semibold text-primary">
                Это не просто автоматизация — это полная трансформация бизнес-модели под будущее рынка недвижимости
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;