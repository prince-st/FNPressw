
import { AboutHero, Exchanges, Footer, Header, PremiumNews } from "@/components";
import ServicesGrid from "@/components/About/ServicesGrid";

const Service = () => {
  return (
    <main>
      <Header />
      <AboutHero pageId={377} />
      <ServicesGrid />
      <Exchanges />
     <PremiumNews /> 
      <Footer />
    </main>
  );
};

export default Service;
