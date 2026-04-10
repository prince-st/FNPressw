import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const WP_BASE = "https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2/pages";

interface Props {
  pageId?: number;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function MarketingHero({
  pageId,
  title: fallbackTitle = "Making an Impact Across the Globe",
  subtitle: fallbackSubtitle = "We believe in the power of stories to inspire, inform, and transform.",
  buttonText: fallbackBtnText = "Contact Us Now",
  buttonLink: fallbackBtnLink = "#",
}: Props) {
  const [heading, setHeading] = useState(fallbackTitle);
  const [description, setDescription] = useState(fallbackSubtitle);
  const [btnText, setBtnText] = useState("Contact Us Now");
  const [btnLink, setBtnLink] = useState("https://fnpresswire.vercel.app/contact");
  const [btnIcon, setBtnIcon] = useState("https://dev-fnpresswire.pantheonsite.io/wp-content/uploads/2026/04/SVG-2.png");

  useEffect(() => {
    if (!pageId) return;
    fetch(`${WP_BASE}/${pageId}?acf_format=standard&_=${Date.now()}`, { cache: "no-store" })
      .then(r => r.json())
      .then((json) => {
        const acf = json?.acf;
        if (!acf) return;
        if (acf.distribute_heading) setHeading(acf.distribute_heading);
        if (acf.distribute_description) setDescription(acf.distribute_description);
        // ACF field names have spaces: "distribute button_text" etc.
        const bt = acf["distribute button_text"] || acf.distribute_button_text;
        const bl = acf["distribute button_link"] || acf.distribute_button_link;
        const img = acf["distribute button_image"] || acf.distribute_button_image;
        if (bt) setBtnText(bt);
        if (bl) setBtnLink(bl);
        if (img) setBtnIcon(typeof img === "string" ? img : (img?.url || ""));
      })
      .catch(err => console.error("MarketingHero fetch error:", err));
  }, [pageId]);

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
          <a href={btnLink} className="fn-btn-white group inline-flex items-center gap-2">
            {btnText}
            {btnIcon && <img src={btnIcon} alt="" className="w-4 h-4 object-contain" />}
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] lg:h-[100px]" fill="#F6F6F9">
          <path d="M0,0 C150,90 400,0 600,60 C800,120 1050,30 1200,80 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
