import { useState, useEffect } from "react";
import usImg from "@/assets/US.png";
import canadaImg from "@/assets/Canada.png";
import ukImg from "@/assets/UK.png";
import europeImg from "@/assets/Europe.png";

const API = `https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2/pages/328?acf_format=standard&_=${Date.now()}`;

const FALLBACK_ICONS = [usImg, canadaImg, ukImg, europeImg];

interface ServiceCard { icon: string; title: string; description: string; }

const FALLBACK_CARDS: ServiceCard[] = [
  { icon: usImg, title: "US", description: "Your content goes here. Edit or remove this text inline or in the module Content settings." },
  { icon: canadaImg, title: "Canada", description: "Distribute your company capital markets content and comply with Canadian market regulators. SEDOL" },
  { icon: ukImg, title: "UK", description: "Distribute your capital markets content & Comply with UKLA listing Authority. FCA" },
  { icon: europeImg, title: "Europe", description: "Distribute company capital markets content and comply with European Transparency Directive and market regulators." },
];

export default function ServicesGrid() {
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [btnText, setBtnText] = useState("");
  const [btnLink, setBtnLink] = useState("#");
  const [cards, setCards] = useState<ServiceCard[]>(FALLBACK_CARDS);

  useEffect(() => {
    fetch(API, { cache: "no-store" })
      .then(r => r.json())
      .then((json) => {
        const acf = json?.acf;
        if (!acf) return;
        if (acf.services_section_heading) setHeading(acf.services_section_heading);
        if (acf.services_section_subheading) setSubheading(acf.services_section_subheading);
        if (acf.services_button_text) setBtnText(acf.services_button_text);
        if (acf.services_button_link) setBtnLink(acf.services_button_link);
        if (Array.isArray(acf.services_cards) && acf.services_cards.length > 0) {
          setCards(acf.services_cards.map((c: any, i: number) => ({
            icon: typeof c.service_icon === "string" ? c.service_icon : (c.service_icon?.url || FALLBACK_ICONS[i] || usImg),
            title: c.service_title || "",
            description: c.service_description || "",
          })));
        }
      })
      .catch(err => console.error("ServicesGrid fetch error:", err));
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="fn-container">
        {(heading || subheading) && (
          <div className="text-center mb-12">
            {heading && <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{heading}</h2>}
            {subheading && <p className="text-gray-500 text-base max-w-2xl mx-auto">{subheading}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12">
          {cards.map((s, i) => (
            <div key={i} className="flex flex-col items-start">
              <img src={s.icon} alt={s.title} className="w-16 h-16 object-contain rounded-full mb-4" />
              <h3 className="font-bold text-gray-900 mb-2" style={{ fontSize: "20px" }}>{s.title}</h3>
              <p className="leading-relaxed" style={{ fontSize: "14px", color: "#626D84" }}>{s.description}</p>
            </div>
          ))}
        </div>

        {btnText && (
          <div className="text-center mt-10">
            <a href={btnLink} className="fn-btn-primary px-8 py-3 text-sm font-semibold">{btnText}</a>
          </div>
        )}
      </div>
    </section>
  );
}
