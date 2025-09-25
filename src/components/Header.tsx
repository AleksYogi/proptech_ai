import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import logoUnicorn from "@/assets/logo-unicorn.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("RU");

  const navigation = [
    { name: "О продукте", href: "#about" },
    { name: "Возможности", href: "#features" },
    { name: "Результаты", href: "#results" },
    { name: "Тарифы", href: "#pricing" },
    { name: "Контакты", href: "#contacts" },
  ];

  const toggleLanguage = () => {
    setCurrentLang(currentLang === "RU" ? "EN" : "RU");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logoUnicorn} alt="Proptech_ai" className="h-10 w-auto" />
            <span className="text-2xl font-bold text-primary">Proptech_ai</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground-muted hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right side - Language toggle and CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 text-foreground-muted hover:text-primary transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="font-medium">{currentLang}/EN</span>
            </button>

            {/* Contact Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("https://t.me/aleksyogi", "_blank")}
              className="btn-outline"
            >
              Контакты
            </Button>

            {/* Main CTA */}
            <Button
              onClick={() => window.open("https://t.me/Propertyhubai_bot", "_blank")}
              className="btn-primary"
            >
              Получить демо
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground-muted hover:text-primary"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border">
            <nav className="space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-foreground-muted hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
            <div className="mt-6 pt-6 border-t border-border space-y-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 text-foreground-muted hover:text-primary transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span className="font-medium">{currentLang}/EN</span>
              </button>
              <div className="flex flex-col space-y-2">
                <Button
                  variant="outline"
                  onClick={() => window.open("https://t.me/aleksyogi", "_blank")}
                  className="btn-outline w-full justify-center"
                >
                  Контакты
                </Button>
                <Button
                  onClick={() => window.open("https://t.me/Propertyhubai_bot", "_blank")}
                  className="btn-primary w-full justify-center"
                >
                  Получить демо
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;