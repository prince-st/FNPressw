
import { AboutHero, Exchanges, Footer, Header, PremiumNews } from "@/components";
import ServicesGrid from "@/components/About/ServicesGrid";

const Service = () => {
  return (
    <main>
      <Header />
      <AboutHero
        title="Disclosure service"
        subtitle="Distribute your company materials to directly to the capital markets and comply with global market regulators."
        showButton={true}
        buttonText="Request Pricing"
      />
      <ServicesGrid />
      <Exchanges />
     <PremiumNews /> 
      <Footer />
    </main>
  );
};

export default Service;
