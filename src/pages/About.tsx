import Header from "@/components/Header";
import AboutHero from "@/components/AboutHero";
import MissionSection from "@/components/About/MissionSection";
import ServiceHighlight from "@/components/ServiceHighlight";
import GlobalNews from "@/components/GlobalNews";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AboutHero pageId={328} />
        <MissionSection />
        <ServiceHighlight />
        <GlobalNews />
      </main>
      <Footer />
    </div>
  );
}
