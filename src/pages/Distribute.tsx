
import { MarketingHero, Footer, Header, OrderServicesForm } from "@/components";

const Distribute = () => {
  return (
    <main>
      <Header />
      <MarketingHero
        title="Distribute News"
        subtitle="Distribute your company news and materials in compliance with exchange rules."
        showButton={true}
        buttonText="Contact Us Now"
      />
      <OrderServicesForm />
      <Footer />
    </main>
  );
};

export default Distribute;
