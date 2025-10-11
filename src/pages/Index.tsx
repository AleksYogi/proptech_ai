import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LeadCaptureSection from "@/components/LeadCaptureSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import ResultsSection from "@/components/ResultsSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <LeadCaptureSection />
        <ProblemSolutionSection />
        <AdvantagesSection />
        <ResultsSection />
        <ProcessSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
