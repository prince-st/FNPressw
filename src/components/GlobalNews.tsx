import { useState, useEffect } from "react";
import newsReleaseImg from "@/assets/News_Release.png";
import filingServicesImg from "@/assets/Filing_Services.png";
import globalReachImg from "@/assets/Global_Reach.png";

const API = `https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2/pages/328?acf_format=standard&_=${Date.now()}`;

const FALLBACK_ICONS = [newsReleaseImg, filingServicesImg, globalReachImg];

interface ServiceCard { icon: string; title: string; description: string; }

const FALLBACK: ServiceCard[] = [
  { icon: newsReleaseImg, title: "News Release Dissemination", description: "Distribute your news to thousands of media outlets worldwide" },
  { icon: filingServicesImg, title: "Filing Services", description: "Professional regulatory filing and compliance support" },
  { icon: globalReachImg, title: "Global Reach", description: "Connect with audiences across multiple continents and markets" },
];

export default function GlobalNews() {
  const [heading, setHeading] = useState("Global News &");
  const [headingBlue, setHeadingBlue] = useState("Filing Services");
  const [subheading, setSubheading] = useState("Comprehensive news distribution and media services tailored to your needs");
  const [btnText, setBtnText] = useState("Order Services");
  const [btnLink, setBtnLink] = useState("#");
  const [cards, setCards] = useState<ServiceCard[]>(FALLBACK);

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
            icon: typeof c.service_icon === "string" ? c.service_icon : (c.service_icon?.url || FALLBACK_ICONS[i] || newsReleaseImg),
            title: c.service_title || "",
            description: c.service_description || "",
          })));
        }
      })
      .catch(err => console.error("GlobalNews fetch error:", err));
  }, []);

  return (
    <section className="pt-16" style={{ background: "#f4f6fb" }}>
      <div className="fn-container">

        <div className="text-center mb-12">
          <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
            {heading}{" "}
            <span style={{ color: "#0030F0" }}>{headingBlue}</span>
          </h2>
          <p className="max-w-2xl mx-auto leading-relaxed" style={{ fontSize: "16px", color: "#626D84" }}>
            {subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {cards.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 flex flex-col items-center text-center"
              style={{ border: "1px solid #e8ecf4" }}>
              <div className="mb-5">
                <img src={s.icon} alt={s.title} className="w-20 h-20 object-contain" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 leading-snug" style={{ fontSize: "16px" }}>{s.title}</h3>
              <p className="leading-relaxed" style={{ fontSize: "14px", color: "#626D84" }}>{s.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center pb-16">
          <a href={btnLink}
            className="px-8 py-3 rounded-lg text-white font-semibold text-sm transition-all hover:opacity-90 inline-block"
            style={{ background: "#0030F0" }}>
            {btnText}
          </a>
        </div>

      </div>
    </section>
  );
}
