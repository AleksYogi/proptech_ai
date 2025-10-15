import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import UserAgreement from "./pages/UserAgreement";
import NdaAgreement from "./pages/NdaAgreement";
import CookieBanner from "./components/CookieBanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HelmetProvider>
        <BrowserRouter>
          <CookieBanner />
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Маршруты блога */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            
            {/* Маршрут политики конфиденциальности */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            
            {/* Маршрут договора оферты */}
            <Route path="/terms" element={<TermsOfService />} />
            
            {/* Маршрут пользовательского соглашения */}
            <Route path="/agreement" element={<UserAgreement />} />
            
            {/* Маршрут договора о неразглашении */}
            <Route path="/nda" element={<NdaAgreement />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
