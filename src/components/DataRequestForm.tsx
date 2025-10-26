// Компонент формы для запроса персональных данных
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle, Download, Trash2 } from "lucide-react";

interface FormData {
  email: string;
  phone: string;
  requestType: 'data-export' | 'data-deletion';
  reason: string;
}

const DataRequestForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
    requestType: "data-export",
    reason: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRequestTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, requestType: value as 'data-export' | 'data-deletion' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that at least one of email or phone is provided
    if (!formData.email && !formData.phone) {
      setSubmitStatus({
        type: 'error',
        message: 'Пожалуйста, укажите email или телефон для идентификации'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/data-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: result.message });
        
        // If this is a data export request, trigger download
        if (formData.requestType === 'data-export' && result.data) {
          // Create a Blob with the data and trigger download
          const blob = new Blob([JSON.stringify(result.data, null, 2)], { type: 'application/json' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `personal-data-${new Date().toISOString().split('T')[0]}.json`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
        
        // Reset form on successful deletion
        if (formData.requestType === 'data-deletion') {
          setFormData({ email: "", phone: "", requestType: "data-export", reason: "" });
        }
      } else {
        throw new Error(result.message || 'Network response was not ok');
      }
    } catch (error) {
      console.error('Error submitting data request:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Не удалось обработать запрос, попробуйте позже'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card border-primary/20 shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary">Запрос персональных данных</CardTitle>
        <CardDescription>
          Вы можете запросить свои данные или удалить их в соответствии с ФЗ-152
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submitStatus && (
          <Alert className={`mb-4 ${submitStatus.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            {submitStatus.type === 'success' ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <CheckCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription>
              {submitStatus.message}
            </AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email (необязательно)</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Телефон (необязательно)</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+7 (999) 999-99-99"
            />
          </div>
          
          <div className="space-y-4">
            <Label>Тип запроса</Label>
            <RadioGroup 
              value={formData.requestType} 
              onValueChange={handleRequestTypeChange}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="data-export" id="export" />
                <Label htmlFor="export" className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Получить мои данные</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="data-deletion" id="deletion" />
                <Label htmlFor="deletion" className="flex items-center space-x-2">
                  <Trash2 className="h-4 w-4" />
                  <span>Удалить мои данные</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reason">Причина запроса (необязательно)</Label>
            <Textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Почему вы хотите получить или удалить свои данные?"
              rows={3}
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
            disabled={isSubmitting || (!formData.email && !formData.phone)}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Обработка...
              </>
            ) : formData.requestType === 'data-export' ? (
              <>
                <Download className="mr-2 h-4 w-4" />
                Получить данные
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Удалить данные
              </>
            )}
          </Button>
        </form>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">Ваши права по ФЗ-152:</h3>
          <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
            <li>Получить информацию о ваших персональных данных</li>
            <li>Требовать исправления неверных данных</li>
            <li>Отозвать согласие на обработку данных</li>
            <li>Требовать удаление ваших данных</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataRequestForm;