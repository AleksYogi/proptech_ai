import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Clock, Globe } from "lucide-react";
import heroWorkspace from "@/assets/hero-workspace.jpg";
import { Helmet } from 'react-helmet-async';

const HeroSection = () => {
  return (
    <>
      <Helmet>
        <title>Proptech AI - ИИ-агент для агентств недвижимости | Автоматизация продаж</title>
        <meta name="description" content="И-агент для агентств недвижимости, который работает 24/7, квалифицирует лиды и увеличивает конверсию на +40%. Повышение производительности агентов за счет автоматизации рутинных задач." />
        <meta name="keywords" content="И агент недвижимость, автоматизация продаж, CRM недвижимость, лидогенерация, chatbot брокер, агент недвижимости, ИИ для риэлторов" />
        <link rel="canonical" href="https://proptech-ai.ru/" />
        <meta property="og:title" content="Proptech AI - ИИ-агент для агентств недвижимости" />
        <meta property="og:description" content="И-агент который работает как лучший менеджер: консультации 24/7, квалификация лидов, автоматизация CRM" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://proptech-ai.ru/" />
        <meta property="og:image" content="https://proptech-ai.ru/src/assets/hero-workspace.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Proptech AI - ИИ-агент для агентств недвижимости" />
        <meta name="twitter:description" content="И-агент который работает как лучний менеджер: консультации 24/7, квалификация лидов, автоматизация CRM" />
        <meta name="twitter:image" content="https://proptech-ai.ru/src/assets/hero-workspace.jpg" />
      </Helmet>
      <section className="section-padding pt-32 gradient-hero">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-primary leading-tight">
                  Proptech AI
                </h1>
                <p className="text-xl lg:text-2xl text-secondary font-medium">
                  Сервис автоматизации для брокеров и агентств недвижимости
                </p>
                <p className="text-lg text-foreground-muted leading-relaxed">
                  Повышение производительности агентов за счет автоматизации рутинных задач и увеличение конверсии благодаря высокой скорости обработки заявок!
                </p>
              </div>

              {/* Product Description */}
              <div className="bg-card rounded-xl p-6 card-eco">
                <p className="text-lg text-card-foreground leading-relaxed">
                  Эффективность и экономия затрат: Автоматизация до 90% рутинных задач и высвобождение 30% времени менеджера. 
                  Рост квалифицированных лидов, готовых к сделке ~70%.
                  Повышение конверсии на +40% уже в первый месяц.
                  
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 bg-card rounded-lg p-4 card-eco">
                  <Bot className="h-6 w-6 text-secondary flex-shrink-0" />
                  <span className="text-sm font-medium text-card-foreground">ИИ-консультант</span>
                </div>
                <div className="flex items-center space-x-3 bg-card rounded-lg p-4 card-eco">
                  <Clock className="h-6 w-6 text-secondary flex-shrink-0" />
                  <span className="text-sm font-medium text-card-foreground">24/7 работа</span>
                </div>
                <div className="flex items-center space-x-3 bg-card rounded-lg p-4 card-eco">
                  <Globe className="h-6 w-6 text-secondary flex-shrink-0" />
                  <span className="text-sm font-medium text-card-foreground">Любой язык</span>
                </div>
              </div>

              {/* CTA Button */}
              <div>
                <Button
                  size="lg"
                  onClick={() => window.open("https://t.me/Aleks_yogi?text=Здравствуйте,%20мне%20интересно%20подробней%20узнать,%20как%20ИИ-агент%20может%20помочь%20в%20том,%20что%20бы%20работать%20меньше,%20а%20зарабатывать%20больше!", "_blank")}
                  className="btn-primary text-xl px-12 py-6 group"
                >
                  Получить агента
                  <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative lg:animate-scale-in">
              <div className="relative overflow-hidden rounded-xl shadow-hero">
                <img
                  src={heroWorkspace}
                  alt="Современный офис с ИИ-технологиями"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-6 shadow-lg card-eco">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">+40%</div>
                  <div className="text-sm text-card-foreground">конверсия</div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-card rounded-xl p-6 shadow-lg card-eco">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">24/7</div>
                  <div className="text-sm text-card-foreground">поддержка</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;