
import { AboutHero, ServiceHighlight,Exchanges, Footer, Header, PremiumNews } from "@/components";
// import ServiceHighlight from "@/components/About/ServicesGrid";

const Service = () => {
  return (
    <main>
      <Header />
      <AboutHero pageId={377} />
      <ServiceHighlight />
      <Exchanges />
     <PremiumNews /> 
      <Footer />
    </main>
  );
};

export default Service;
