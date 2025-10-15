import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CookiePreferences {
  technical: boolean;
  analytics: boolean;
}

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    technical: true,
    analytics: false,
  });

  // Check if user has already accepted cookies
  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consentData = {
      technical: true,
      analytics: true,
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem("cookieConsent", JSON.stringify(consentData));
    setIsVisible(false);
    setShowPreferences(false);
    
    // Log consent
    console.log("Cookie consent given:", consentData);
  };

  const handleSavePreferences = () => {
    const consentData = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem("cookieConsent", JSON.stringify(consentData));
    setIsVisible(false);
    setShowPreferences(false);
    
    // Log consent
    console.log("Cookie consent given:", consentData);
  };

  const handlePreferencesChange = (category: keyof CookiePreferences) => {
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const openPreferences = () => {
    // Load existing preferences if they exist
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (cookieConsent) {
      try {
        const parsed = JSON.parse(cookieConsent);
        setPreferences({
          technical: parsed.technical ?? true,
          analytics: parsed.analytics ?? false,
        });
      } catch (e) {
        console.error("Error parsing cookie consent:", e);
      }
    }
    setShowPreferences(true);
    setIsVisible(true);
  };

  // Expose function to global scope for footer link
  useEffect(() => {
    (window as any).openCookiePreferences = openPreferences;
    
    return () => {
      delete (window as any).openCookiePreferences;
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg z-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">Мы используем cookies</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Мы используем cookies для функционирования сайта, анализа и маркетинга.
              Выберите категории, с которыми согласны.{" "}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Подробнее см. в Политике использования cookies
              </a>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={handleAcceptAll}
              className="whitespace-nowrap"
            >
              Принять все
            </Button>
            <Button
              onClick={() => setShowPreferences(!showPreferences)}
              variant="outline"
              className="whitespace-nowrap"
            >
              {showPreferences ? "Скрыть настройки" : "Настроить"}
            </Button>
          </div>
          
          <button
            onClick={() => {
              setIsVisible(false);
              setShowPreferences(false);
            }}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted transition-colors"
            aria-label="Закрыть"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        {/* Preferences panel */}
        {showPreferences && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Технические (обязательные)</h4>
                <p className="text-xs text-muted-foreground">Всегда включены для работы сайта</p>
              </div>
              <div className="w-10 h-5 bg-primary rounded-full relative">
                <div className="absolute top-0.5 w-4 h-4 bg-background rounded-full right-0.5"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div>
                <h4 className="font-medium text-foreground">Аналитические/Маркетинговые</h4>
                <p className="text-xs text-muted-foreground">Для анализа и улучшения сайта</p>
              </div>
              <button
                onClick={() => handlePreferencesChange('analytics')}
                className={`w-10 h-5 rounded-full relative transition-colors ${
                  preferences.analytics ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-background rounded-full transition-transform ${
                  preferences.analytics ? 'translate-x-5' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleSavePreferences}
                className="whitespace-nowrap"
              >
                Сохранить настройки
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;