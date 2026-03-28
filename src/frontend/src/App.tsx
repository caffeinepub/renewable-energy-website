import BenefitsSection from "./components/BenefitsSection";
import CaseStudiesSection from "./components/CaseStudiesSection";
import ComparisonSection from "./components/ComparisonSection";
import DailyLifeSection from "./components/DailyLifeSection";
import EnergyTypesSection from "./components/EnergyTypesSection";
import Footer from "./components/Footer";
import FutureSection from "./components/FutureSection";
import HeroSection from "./components/HeroSection";
import IndiaMapSection from "./components/IndiaMapSection";
import NavBar from "./components/NavBar";
import QuizSection from "./components/QuizSection";
import SolarPanelWorkSection from "./components/SolarPanelWorkSection";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0f14]">
      <NavBar />
      <main>
        <HeroSection />
        <EnergyTypesSection />
        <BenefitsSection />
        <ComparisonSection />
        <IndiaMapSection />
        <DailyLifeSection />
        <FutureSection />
        <SolarPanelWorkSection />
        <CaseStudiesSection />
        <QuizSection />
      </main>
      <Footer />
    </div>
  );
}
