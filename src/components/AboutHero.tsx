import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const WP_BASE = "https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2/pages";

interface Props {
  pageId?: number; // WP page ID to fetch from
  // fallback static props (used if no pageId or fetch fails)
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function AboutHero({
  pageId,
  title: fallbackTitle = "Making an Impact Across the Globe",
  subtitle: fallbackSubtitle = "We believe in the power of stories to inspire, inform, and transform. By bridging the gap between communicators and their audiences, FN Presswire strives to be at the forefront of shaping a more informed and connected world.",
  buttonText: fallbackBtnText = "Distribute News →",
  buttonLink: fallbackBtnLink = "/Distribute",
}: Props) {
  const [heading, setHeading] = useState(fallbackTitle);
  const [description, setDescription] = useState(fallbackSubtitle);
  const [btnText, setBtnText] = useState(fallbackBtnText);
  const [btnLink, setBtnLink] = useState(fallbackBtnLink);
  const [btnIcon, setBtnIcon] = useState("");

  useEffect(() => {
    if (!pageId) return;
    fetch(`${WP_BASE}/${pageId}?acf_format=standard&_=${Date.now()}`, { cache: "no-store" })
      .then(r => r.json())
      .then((json) => {
        const acf = json?.acf;
        if (!acf) return;
        // Support both field name conventions
        const h = acf.heading || acf.about_banner_heading;
        const d = acf.description || acf.about_banner_description;
        const bt = acf.distribute_news_btn_text || acf.about_banner_button_text;
        const bl = acf.distribute_news_link || acf.about_banner_button_link;
        if (h) setHeading(h);
        if (d) setDescription(d);
        if (bt) setBtnText(bt);
        if (bl) setBtnLink(bl);
        const img = acf.distribute_news_image || acf.button_image_about;
        if (img) setBtnIcon(typeof img === "string" ? img : (img?.url || ""));
      })
      .catch(err => console.error("AboutHero fetch error:", err));
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
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] lg:h-[100px]" fill="#fff">
          <path d="M0,0 C150,90 400,0 600,60 C800,120 1050,30 1200,80 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
