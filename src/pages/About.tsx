import Header from "@/components/Header";
import AboutHero from "@/components/AboutHero";
import MissionSection from "@/components/About/MissionSection";
// import ServicesGrid from "@/components/About/ServicesGrid";
import GlobalNews from "@/components/GlobalNews";
// import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AboutHero />
        <MissionSection />
        {/* <ServicesGrid /> */}
        <GlobalNews />
        {/* <FAQ /> */}
      </main>
      <Footer />
    </div>
  );
}
