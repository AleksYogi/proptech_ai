// Страница запроса персональных данных
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DataRequestForm from "@/components/DataRequestForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const DataRequestPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Запрос персональных данных | Proptech AI</title>
        <meta name="description" content="Запросите свои персональные данные или удалите их в соответствии с ФЗ-152" />
        <link rel="canonical" href="https://proptech-ai.ru/data-request" />
        
        {/* Open Graph теги */}
        <meta property="og:title" content="Запрос персональных данных | Proptech AI" />
        <meta property="og:description" content="Запросите свои персональные данные или удалите их в соответствии с ФЗ-152" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://proptech-ai.ru/data-request" />
        <meta property="og:site_name" content="Proptech AI" />
        <meta property="og:locale" content="ru_RU" />
        
        {/* Twitter Card теги */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Запрос персональных данных | Proptech AI" />
        <meta name="twitter:description" content="Запросите свои персональные данные или удалите их в соответствии с ФЗ-152" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад
          </Button>
          
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Запрос персональных данных
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              В соответствии с Федеральным законом №152-ФЗ «О персональных данных» 
              вы имеете право запросить свои данные или удалить их
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <DataRequestForm />
            </div>
            
            <div className="space-y-6">
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-primary">Ваши права</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span>Получить информацию о ваших персональных данных</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span>Требовать исправления неверных данных</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span>Отозвать согласие на обработку данных</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span>Требовать удаление ваших данных</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span>Перенести данные в другой формат</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-primary">Сроки обработки</h2>
                <p className="mb-3">
                  Мы обрабатываем запросы в течение 3 рабочих дней с момента получения.
                </p>
                <p>
                  Для сложных запросов срок может быть продлен до 30 календарных дней 
                  с уведомлением пользователя.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-primary">Контакты</h2>
                <p className="mb-3">
                  По вопросам, связанным с персональными данными, вы можете связаться с нами:
                </p>
                <p className="font-medium">
                  Email: privacy@proptech-ai.ru
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Почему это важно?</h2>
            <p className="text-blue-700 mb-4">
              Федеральный закон №152-ФЗ «О персональных данных» гарантирует вам право 
              контролировать свои персональные данные. Мы уважаем ваше право на 
              конфиденциальность и обеспечиваем прозрачность в обработке ваших данных.
            </p>
            <p className="text-blue-700">
              Все данные, которые мы собираем, используются исключительно для 
              предоставления услуг и связи с вами. Мы не передаем их третьим лицам 
              без вашего согласия, за исключением случаев, предусмотренных законом.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DataRequestPage;