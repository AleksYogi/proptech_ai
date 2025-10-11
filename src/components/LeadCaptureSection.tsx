import LeadCaptureForm from "./LeadCaptureForm";
import { Mail, Phone, Users } from "lucide-react";
import { Helmet } from 'react-helmet-async';

const LeadCaptureSection = () => {
  return (
    <>
      <Helmet>
        <title>Получить консультацию | Proptech AI</title>
        <meta name="description" content="Оставьте заявку на консультацию по ИИ-агенту для агентств недвижимости. Наши специалисты свяжутся с вами в ближайшее время." />
        <meta name="keywords" content="заявка на консультацию, ИИ-агент для недвижимости, автоматизация риэлторства, консультация по ИИ" />
        <link rel="canonical" href="https://proptech-ai.ru/#lead-form" />
        <meta property="og:title" content="Получить консультацию | Proptech AI" />
        <meta property="og:description" content="Оставьте заявку на консультацию по ИИ-агенту для агентств недвижимости. Наши специалисты свяжутся с вами в ближайшее время." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://proptech-ai.ru/#lead-form" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Получить консультацию | Proptech AI" />
        <meta name="twitter:description" content="Оставьте заявку на консультацию по ИИ-агенту для агентств недвижимости." />
      </Helmet>
      <section id="lead-form" className="section-padding bg-gradient-to-b from-background to-background-soft">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              Готовы автоматизировать ваш бизнес?
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Оставьте заявку, и наш специалист свяжется с вами в течение 24 часов, чтобы обсудить, 
              как ИИ-агент может увеличить конверсию вашей команды на 40% и сэкономить до 30% времени менеджеров.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Left Info Column */}
            <div className="space-y-8">
              <div className="bg-card p-6 rounded-xl card-eco">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2">Быстрый контакт</h3>
                    <p className="text-foreground-muted">
                      Наш специалист свяжется с вами в течение 24 часов для обсуждения деталей внедрения ИИ-агента.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl card-eco">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2">Персональный подход</h3>
                    <p className="text-foreground-muted">
                      Мы адаптируем ИИ-агента под специфику вашего бизнеса и целевую аудиторию.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl card-eco">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2">Детальный анализ</h3>
                    <p className="text-foreground-muted">
                      Получите персональный расчет экономии и роста конверсии для вашего агентства.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Form Column */}
            <div className="lg:col-span-2 flex items-center justify-center">
              <div className="w-full max-w-lg">
                <LeadCaptureForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LeadCaptureSection;