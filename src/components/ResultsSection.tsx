import { CheckCircle, TrendingUp, Clock, Shield } from "lucide-react";
import teamSuccess from "@/assets/team-success.jpg";
import { Helmet } from 'react-helmet-async';

const ResultsSection = () => {
  const salesResults = [
    "+65% продуктивности менеджеров — приоритетная работа только с квалифицированными клиентами",
    "+50% конверсии показов — приходят уже «прогретые» и мотивированные",
    "24/7 захват лидов — дополнительно +25% клиентов в нерабочее время"
  ];

  const efficiencyResults = [
    "Экономия 15+ часов в неделю — агент делает всю первичную работу с лидами",
    "Снижение стресса на 70% — нет рутины, паники и страхов",
    "-80% сорванных сделок — клиенты заранее готовы к нюансам"
  ];

  const qualityResults = [
    "Снижение возражений на 60% — клиенты предварительно информированы",
    "Уменьшение конфликтных ситуаций на 90% — прозрачность с самого начала",
    "Премиальный статус на рынке — выделение среди конкурентов технологичностью"
  ];

  const ResultCard = ({ title, results, icon: Icon, bgColor, borderColor }: any) => (
    <div className={`card-feature ${bgColor} border-l-4 ${borderColor}`}>
      <div className="flex items-center space-x-3 mb-6">
        <Icon className="h-8 w-8 text-primary" />
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>
      <ul className="space-y-3">
        {results.map((result: string, index: number) => (
          <li key={index} className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
            <span className="text-foreground-muted leading-relaxed">{result}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Результаты внедрения ИИ-агента | Proptech AI</title>
        <meta name="description" content="Реальные результаты внедрения ИИ-агента для агентств недвижимости: +65% продуктивности, +50% конверсии, снижение стресса на 70%, -80% сорванных сделок." />
        <meta name="keywords" content="результаты ИИ-агента, эффективность недвижимости, рост продаж, снижение стресса, повышение конверсии, автоматизация бизнеса" />
        <link rel="canonical" href="https://proptech-ai.ru/#results" />
        <meta property="og:title" content="Результаты внедрения ИИ-агента | Proptech AI" />
        <meta property="og:description" content="Реальные результаты внедрения ИИ-агента для агентств недвижимости: +65% продуктивности, +50% конверсии, снижение стресса на 70%, -80% сорванных сделок." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://proptech-ai.ru/#results" />
        <meta property="og:image" content="https://proptech-ai.ru/src/assets/team-success.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Результаты внедрения ИИ-агента | Proptech AI" />
        <meta name="twitter:description" content="Реальные результаты внедрения ИИ-агента для агентств недвижимости: +65% продуктивности, +50% конверсии, снижение стресса на 70%, -80% сорванных сделок." />
        <meta name="twitter:image" content="https://proptech-ai.ru/src/assets/team-success.jpg" />
      </Helmet>
      <section id="results" className="section-padding bg-background-soft">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              Результаты, которые отмечают те, кто уже внедрил ИИ-агента
            </h2>
            <p className="text-xl text-foreground-muted max-w-4xl mx-auto">
              Конкретные цифры и улучшения в работе агентств недвижимости
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Results Content */}
            <div className="space-y-8">
              <ResultCard 
                title="Прирост продаж"
                results={salesResults}
                icon={TrendingUp}
                bgColor="bg-green-50"
                borderColor="border-l-secondary"
              />
              
              <ResultCard 
                title="Экономия времени и ресурсов"
                results={efficiencyResults}
                icon={Clock}
                bgColor="bg-blue-50"
                borderColor="border-l-primary"
              />
              
              <ResultCard 
                title="Качество и репутация"
                results={qualityResults}
                icon={Shield}
                bgColor="bg-purple-50"
                borderColor="border-l-accent"
              />
            </div>

            {/* Success Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img
                  src={teamSuccess}
                  alt="Успешная команда агентства недвижимости"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -top-6 -left-6 bg-card rounded-xl p-6 shadow-lg card-eco">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">+65%</div>
                  <div className="text-sm text-card-foreground">продуктивность</div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-card rounded-xl p-6 shadow-lg card-eco">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">-80%</div>
                  <div className="text-sm text-card-foreground">сорванных сделок</div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center bg-card rounded-xl p-6 card-eco">
              <div className="text-4xl font-bold text-secondary mb-2">+50%</div>
              <div className="text-foreground-muted">конверсия показов</div>
            </div>
            <div className="text-center bg-card rounded-xl p-6 card-eco">
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-foreground-muted">часов экономии</div>
            </div>
            <div className="text-center bg-card rounded-xl p-6 card-eco">
              <div className="text-4xl font-bold text-accent mb-2">-60%</div>
              <div className="text-foreground-muted">возражений</div>
            </div>
            <div className="text-center bg-card rounded-xl p-6 card-eco">
              <div className="text-4xl font-bold text-secondary mb-2">24/7</div>
              <div className="text-foreground-muted">работа агента</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResultsSection;