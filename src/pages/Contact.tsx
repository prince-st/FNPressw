
import { MarketingHero, ContactForm, Footer, Header } from "@/components";

const Contact = () => {
  return (
    <main>
      <Header />
      {/* <AboutHero */}
      <MarketingHero
        title="Contact Us"
        subtitle="Need Support? Fill out the contact form below for sales & support and we will be in touch shortly."
        showButton={false}
      />
      <ContactForm />
      <Footer />
    </main>
  );
};

export default Contact;
