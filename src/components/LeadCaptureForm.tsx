import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle } from "lucide-react";

interface FormData {
  name: string;
  phone: string;
  company: string;
}

interface ConsentData {
  privacyPolicy: boolean;
  dataTransfer: boolean;
}

const LeadCaptureForm = () => {
  const [formData, setFormData] = useState<FormData>({ name: "", phone: "", company: "" });
  const [consentData, setConsentData] = useState<ConsentData>({
    privacyPolicy: false,
    dataTransfer: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setConsentData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate consent checkboxes
    if (!consentData.privacyPolicy) {
      setSubmitStatus({
        type: 'error',
        message: 'Необходимо согласие с политикой обработки персональных данных'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Log consent data
      const consentLogData = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        formType: 'lead_capture_form',
        email: null, // No email field in this form
        phone: formData.phone,
        consents: consentData,
        policyVersion: '2025-10-15' // Current policy version
      };

      // Send consent log to server
      fetch('/api/consent-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consentLogData),
      }).catch(err => {
        console.error('Error logging consent:', err);
      });

      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, consent: consentData }),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitStatus({ type: 'success', message: 'Заявка успешно отправлена! Скоро с вами свяжутся.' });
        setFormData({ name: "", phone: "", company: "" }); // Reset form
        setConsentData({ privacyPolicy: false, dataTransfer: false }); // Reset consent checkboxes
        
        // Log any partial failures
        if (result.errors && result.errors.length > 0) {
          console.warn('Partial success:', result.errors);
        }
      } else {
        const errorResult = await response.json();
        throw new Error(errorResult.message || 'Network response was not ok');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Не удалось отправить заявку, попробуйте позже или свяжитесь с нами напрямую'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card border-primary/20 shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary">Получить консультацию</CardTitle>
        <CardDescription>
          Заполните форму и наш специалист свяжется с вами
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
            <Label htmlFor="name">Имя</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ваше имя"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Телефон для связи"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company">Компания</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Название вашей компании"
              required
            />
          </div>
          
          <div className="space-y-4 pt-4">
            <div className="flex items-start space-x-3">
              <input
                id="privacyPolicy"
                name="privacyPolicy"
                type="checkbox"
                checked={consentData.privacyPolicy}
                onChange={handleConsentChange}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                required
              />
              <label htmlFor="privacyPolicy" className="text-sm text-gray-700">
                Я принимаю{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Политику обработки персональных данных
                </a>{" "}
                и даю согласие на обработку моих данных
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <input
                id="dataTransfer"
                name="dataTransfer"
                type="checkbox"
                checked={consentData.dataTransfer}
                onChange={handleConsentChange}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="dataTransfer" className="text-sm text-gray-700">
                Согласен(на) на передачу моих данных (ПДн) третьим лицам для целей исполнения договора/услуги
              </label>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Отправка...
              </>
            ) : (
              "Получить консультацию"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeadCaptureForm;