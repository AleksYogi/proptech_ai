import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logoUnicorn from "@/assets/logo-unicorn.png";

const BlogHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Логика для скрытия/показа хедера при скролле
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Скроллим вниз
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Скроллим вверх
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={`w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <img src={logoUnicorn} alt="Proptech_ai" className="h-10 w-auto" />
            <a href="/" className="text-2xl font-bold text-primary hover:underline">Proptech AI</a>
          </div>
          
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              asChild
              variant="outline"
              className="text-primary border-primary hover:bg-primary hover:text-white transition-colors duration-200"
            >
              <Link to="/">Перейти на главную страницу</Link>
            </Button>
            <Button
              onClick={() => window.open("https://t.me/aleksyogi?text=Здравствуйте,%20мне%20интересно%20подробней%20узнать,%20как%20ИИ-агент%20может%20помочь%20в%20том,%20что%20бы%20работать%20меньше,%20а%20зарабатывать%20больше!", "_blank")}
              className="btn-primary"
            >
              Получить аудит бесплатно
            </Button>
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="lg:hidden p-2 text-foreground-muted hover:text-primary"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Button
                asChild
                variant="outline"
                className="text-primary border-primary hover:bg-primary hover:text-white transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/">Перейти на главную страницу</Link>
              </Button>
              <Button
                onClick={() => {
                  window.open("https://t.me/aleksyogi?text=Здравствуйте,%20мне%20интересно%20подробней%20узнать,%20как%20ИИ-агент%20может%20помочь%20в%20том,%20что%20бы%20работать%20меньше,%20а%20зарабатывать%20больше!", "_blank");
                  setIsMenuOpen(false);
                }}
                className="btn-primary w-full justify-center"
              >
                Получить аудит бесплатно
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
 );
};

export default BlogHeader;