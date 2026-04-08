import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const API = `https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2/pages/328?acf_format=standard&_=${Date.now()}`;

export default function AboutHero() {
  const [heading, setHeading] = useState("Making an Impact Across the Globe");
  const [description, setDescription] = useState("We believe in the power of stories to inspire, inform, and transform. By bridging the gap between communicators and their audiences, FN Presswire strives to be at the forefront of shaping a more informed and connected world.");
  const [btnText, setBtnText] = useState("Distribute News →");
  const [btnLink, setBtnLink] = useState("/Distribute");

  useEffect(() => {
    fetch(API, { cache: "no-store" })
      .then(r => r.json())
      .then((json) => {
        const acf = json?.acf;
        if (!acf) return;
        if (acf.about_banner_heading) setHeading(acf.about_banner_heading);
        if (acf.about_banner_description) setDescription(acf.about_banner_description);
        if (acf.about_banner_button_text) setBtnText(acf.about_banner_button_text);
        if (acf.about_banner_button_link) setBtnLink(acf.about_banner_button_link);
      })
      .catch(err => console.error("AboutHero fetch error:", err));
  }, []);

  return (
    <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden bg-[#2d1ce2]">
      <div className="absolute inset-0 z-0 opacity-80"
        style={{ background: "radial-gradient(circle at 20% 30%, #5b45ff 0%, transparent 50%), radial-gradient(circle at 80% 70%, #8e2de2 0%, transparent 50%)" }}
      />
      <div className="fn-container relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-white font-bold mb-6 tracking-tight leading-tight" style={{ fontSize: "clamp(32px, 5vw, 60px)" }}>
            {heading}
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto mb-10 text-lg lg:text-xl leading-relaxed">
            {description}
          </p>
          <a href={btnLink} className="fn-btn-white group inline-flex items-center">
            {btnText}
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] lg:h-[100px]" fill="#fff">
          <path d="M0,0 C150,90 400,0 600,60 C800,120 1050,30 1200,80 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
