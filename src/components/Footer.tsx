import { MessageCircle, Mail, Phone } from "lucide-react";
import logoUnicorn from "@/assets/logo-unicorn.png";

const Footer = () => {
  const navigation = [
    { name: "О продукте", href: "#about" },
    { name: "Возможности", href: "#features" },
    { name: "Результаты", href: "#results" },
    { name: "Тарифы", href: "#pricing" },
    { name: "Контакты", href: "#contacts" },
  ];

  const contacts = [
    {
      icon: Phone,
      label: "Телефон",
      value: "+7 925 191-24-80",
      href: "tel:+79251912480"
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
      value: "@AleksYogi",
      href: "https://t.me/aleksyogi"
    }
  ];

  const legalLinks = [
    { name: "Политика конфиденциальности", href: "/privacy" },
    { name: "Договор оферты", href: "/terms" },
    { name: "Пользовательское соглашение", href: "/agreement" },
    { name: "ДОГОВОР О НЕРАЗГЛАШЕНИИ (NDA)", href: "/nda" },
    { name: "Запрос персональных данных", href: "/data-request" }
 ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <img src={logoUnicorn} alt="Proptech_ai" className="h-12 w-auto" />
              <span className="text-3xl font-bold">Proptech_ai</span>
            </div>
            
            <p className="text-primary-foreground/80 leading-relaxed max-w-md">
              Сервис автоматизации для брокеров и агентств недвижимости. 
              ИИ-агент который работает как лучший менеджер 24/7.
            </p>

            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Контактная информация:</h4>
              {contacts.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors group"
                >
                  <contact.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-sm">{contact.label}:</span>
                    <span className="ml-2 font-medium group-hover:underline">{contact.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Навигация</h4>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors hover:underline"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Быстрые действия</h4>
            <div className="space-y-4">
              <a
                href="https://t.me/proptech_ai_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold text-center hover:bg-secondary-light transition-colors"
              >
                Получить агента
              </a>
              
              <a
                href="https://t.me/Propertyhubai_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-primary-foreground text-primary px-6 py-3 rounded-lg font-semibold text-center hover:bg-primary-foreground/90 transition-colors"
              >
                Получить демо
              </a>
              
              <a
                href="https://t.me/aleksyogi"
                target="_blank"
                rel="noopener noreferrer"
                className="block border-2 border-primary-foreground/20 text-primary-foreground px-6 py-3 rounded-lg font-semibold text-center hover:bg-primary-foreground/10 transition-colors"
              >
                Консультация
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-primary-foreground/20">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              {legalLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm hover:underline"
                >
                  {link.name}
                </a>
              ))}
              {/* Cookie Settings Link */}
              <button
                onClick={() => {
                  if (typeof (window as any).openCookiePreferences === 'function') {
                    (window as any).openCookiePreferences();
                  } else {
                    console.warn('Cookie preferences function not available');
                  }
                }}
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm hover:underline"
              >
                Настройки cookies
              </button>
            </div>
            
            {/* Copyright */}
            <div className="text-primary-foreground/60 text-sm text-center lg:text-right">
              <p>© 2024 Proptech_ai. Все права защищены.</p>
              <p className="mt-1">Создано для автоматизации агентств недвижимости</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;