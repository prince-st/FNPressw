import { useState, useEffect } from "react";
import { ContactForm, Footer, Header } from "@/components";
import { motion } from "framer-motion";

const API = "https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2/pages/575?acf_format=standard";

const Contact = () => {
  const [heading, setHeading] = useState("Contact Us");
  const [subHeading, setSubHeading] = useState("Need Support? Fill out the contact form below for sales & support and we will be in touch shortly.");

  useEffect(() => {
    fetch(`${API}&_=${Date.now()}`, { cache: "no-store" })
      .then(r => r.json())
      .then((json) => {
        const acf = json?.acf;
        if (!acf) return;
        if (acf["contact us_heading"]) setHeading(acf["contact us_heading"]);
        if (acf["contact _sub_heading"]) setSubHeading(acf["contact _sub_heading"]);
      })
      .catch(() => {});
  }, []);

  return (
    <main>
      <Header />

      {/* Banner — no button */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden bg-[#2d1ce2]">
        <div className="absolute inset-0 z-0 opacity-80"
          style={{ background: "radial-gradient(circle at 20% 30%, #5b45ff 0%, transparent 50%), radial-gradient(circle at 80% 70%, #8e2de2 0%, transparent 50%)" }}
        />
        <div className="fn-container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-white font-bold mb-6 tracking-tight leading-tight" style={{ fontSize: "clamp(32px, 5vw, 60px)" }}>
              {heading}
            </h1>
            <p className="text-white/80 max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed">
              {subHeading}
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] lg:h-[100px]" fill="#F6F6F9">
            <path d="M0,0 C150,90 400,0 600,60 C800,120 1050,30 1200,80 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </main>
  );
};

export default Contact;
