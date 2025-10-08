import { Badge, Brain, Database, Globe, Shield, TrendingUp, Zap } from "lucide-react";

const AdvantagesSection = () => {
  const advantages = [
    {
      icon: Badge,
      title: "100% точность",
      description: "Не устает, не забывает детали и всегда следует сценарию. Он гарантирует, что 100% данных будут корректно занесены в CRM, исключая ошибки."
    },
    {
      icon: Brain,
      title: "Бесконечная масштабируемость",
      description: "При резком росте потока заявок мгновенно масштабируется для обработки любого объема обращений."
    },
    {
      icon: Database,
      title: "База знаний",
      description: "Постоянно обновляемая информация о проектах, объектах, ценах и юридических нюансах."
    },
    {
      icon: Globe,
      title: "Автоматический сбор данных для CRM",
      description: "Вся ключевая информация из диалога автоматически собирается, структурируется и заносится в CRM."
    },
    {
      icon: TrendingUp,
      title: "Повышение доверия с первого контакта",
      description: "Профессиональный, компетентный и мгновенный ответ на запрос формирует у клиента положительное первое впечатление и повышает уровень доверия к компании."
    },
    {
      icon: Shield,
      title: "Позиционирование как технологичного эксперта",
      description: "Консультации по рыночным трендам, юридическим аспектам и сравнение проектов, демонстрирует высокий уровень экспертизы и технологичности вашей компании."
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
            Это новейшая технология, которая только вышла на рынок и еще мало кем используется, 
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
               Происходит фундаментальный сдвиг парадигмы от простого увеличения количества лидов к повышению качества взаимодействия. Цель больше не сводится к получению имени и номера телефона; она заключается в передаче менеджеру предварительно квалифицированного, высокомотивированного потенциального клиента с богатой историей общения.
            </p>
            
            <p className="text-lg text-card-foreground leading-relaxed">
                Агент действует как сложный фильтр, гарантируя, что менеджер тратит время только на тех клиентов, которые прошли проверку на соответствие бюджету, срокам и намерениям.
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