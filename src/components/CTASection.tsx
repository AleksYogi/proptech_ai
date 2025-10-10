import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, MessageCircle, Phone, Mail, AlertCircle } from "lucide-react";
import { Helmet } from 'react-helmet-async';

const CTASection = () => {
  const benefits = [
    "Бесплатная 30-минутная консультация",
    "Персональный расчет стоимости под ваш бизнес", 
    "Демонстрация работы агента",
    "Техническое задание для внедрения"
  ];

  const contacts = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+7 925 191-24-80",
      href: "https://wa.me/79251912480"
    },
    {
      icon: Mail,
      label: "Email",
      value: "wwlewka@gmail.com",
      href: "mailto:wwlewka@gmail.com"
    },
    {
      icon: MessageCircle,
      label: "Telegram",
      value: "@Aleks_Yogi",
      href: "https://t.me/aleks_yogi?text=Здравствуйте!%20Хочу%20узнать%20больше%20о%20вашем%20ИИ-агенте%20для%20сферы%20недвижимости."
    }
 ];

  return (
    <>
      <Helmet>
        <title>Получите ИИ-агента для недвижимости | Proptech AI</title>
        <meta name="description" content="Получите персонального ИИ-агента для агентства недвижимости за 7 дней. Консультация, расчет стоимости, демонстрация. Увеличьте конверсию на +40%." />
        <meta name="keywords" content="ИИ-агент для недвижимости, заказать ИИ-ассистента, консультация по автоматизации, внедрение ИИ в риэлторстве, увеличение конверсии" />
        <link rel="canonical" href="https://proptech-ai.ru/#contacts" />
        <meta property="og:title" content="Получите ИИ-агента для недвижимости | Proptech AI" />
        <meta property="og:description" content="Получите персонального ИИ-агента для агентства недвижимости за 7 дней. Консультация, расчет стоимости, демонстрация. Увеличьте конверсию на +40%." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://proptech-ai.ru/#contacts" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Получите ИИ-агента для недвижимости | Proptech AI" />
        <meta name="twitter:description" content="Получите персонального ИИ-агента для агентства недвижимости за 7 дней. Консультация, расчет стоимости, демонстрация. Увеличьте конверсию на +40%." />
      </Helmet>
      <section id="contacts" className="section-padding gradient-primary">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto text-center">
            {/* Main Headline */}
            <h2 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Получите персонального ИИ-агента за 7 дней
            </h2>
            
            {/* Value Proposition */}
            <p className="text-xl lg:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              Перестаньте тратить время на операционку. Пока ваши конкуренты вручную обрабатывают лиды, 
              вы будете работать только с готовыми к покупке клиентами.
            </p>
            
            {/* Key Benefit */}
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 mb-12 border-primary-foreground/20">
              <p className="text-lg lg:text-xl text-primary-foreground font-semibold">
                Ваш агент захватывает лиды 24/7 и увеличивает конверсию на +40% уже в первый месяц
              </p>
            </div>

            {/* What You Get */}
            <div className="mb-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-8">
                Что получаете прямо сейчас:
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 border border-primary-foreground/20">
                    <ArrowRight className="h-5 w-5 text-primary-foreground flex-shrink-0" />
                    <span className="text-primary-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main CTA */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-primary-foreground mb-6">
                Начните прямо сейчас:
              </h3>
              
              <Button
                size="lg"
                onClick={() => window.open("https://t.me/aleksyogi?text=Здравствуйте!%20Хочу%20узнать%20больше%20о%20вашем%20ИИ-агенте%20для%20сферы%20недвижимости.", "_blank")}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-xl px-12 py-6 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group mb-4"
              >
                🚀 Запись на консультацию
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <p className="text-primary-foreground/80 text-lg">
              </p>
            </div>

            {/* Alternative Contacts */}
            <div className="mb-12">
              <h4 className="text-lg font-semibold text-primary-foreground mb-6">
                Альтернативные способы связи:
              </h4>
              
              <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {contacts.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 border-primary-foreground/20 hover:bg-primary-foreground/20 transition-all duration-300 group"
                  >
                    <contact.icon className="h-5 w-5 text-primary-foreground" />
                    <div className="text-left">
                      <div className="text-primary-foreground/80 text-sm">{contact.label}</div>
                      <div className="text-primary-foreground font-medium group-hover:underline">{contact.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Urgency */}
            <div className="bg-destructive/20 backdrop-blur-sm rounded-xl p-6 border border-destructive/30">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <AlertCircle className="h-6 w-6 text-destructive" />
                <h4 className="text-xl font-bold text-primary-foreground">
                  Предложение ограничено!
                </h4>
              </div>
              <p className="text-primary-foreground/90 text-lg">
                Беру только 5 клиентов в месяц! Не упустите возможность стать лидером рынка с ИИ-технологиями
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTASection;