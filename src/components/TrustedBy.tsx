import { useState, useEffect } from "react";
import newShape1 from "@/assets/new_shape_1.png";

const API = `https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2/pages/10?acf_format=standard&_=${Date.now()}`;

interface MediaLogo { abbr: string; name: string; }
interface Stat { value: string; label: string; sub: string; }
interface RecognitionItem { text: string; dotIcon: string; }
interface Recognition { title: string; items: RecognitionItem[]; }

const FALLBACK_LOGOS: MediaLogo[] = [
  { abbr: "TC", name: "TechCrunch" }, { abbr: "FB", name: "Forbes" },
  { abbr: "RT", name: "Reuters" }, { abbr: "BB", name: "Bloomberg" },
  { abbr: "AP", name: "Associated Press" }, { abbr: "WSJ", name: "Wall Street Journal" },
  { abbr: "CNN", name: "CNN" }, { abbr: "BBC", name: "BBC" },
  { abbr: "FT", name: "Financial Times" }, { abbr: "TG", name: "The Guardian" },
  { abbr: "BI", name: "Business Insider" }, { abbr: "WD", name: "Wired" },
];

const FALLBACK_STATS: Stat[] = [
  { value: "50,000+", label: "Media Outlets", sub: "Global reach across all industries" },
  { value: "185", label: "Countries", sub: "Worldwide distribution network" },
  { value: "24/7", label: "Distribution", sub: "Round-the-clock media coverage" },
];

const FALLBACK_RECOGNITIONS: Recognition[] = [
  {
    title: "Industry Recognition",
    items: [
      { text: "PR Week Awards - Platform of the Year", dotIcon: "" },
      { text: "G2 Leader in PR Software", dotIcon: "" },
      { text: "Capterra Best Value Winner", dotIcon: "" },
    ],
  },
  {
    title: "Security & Compliance",
    items: [
      { text: "SOC 2 Type II Certified", dotIcon: "" },
      { text: "GDPR Compliant", dotIcon: "" },
      { text: "Enterprise-Grade Security", dotIcon: "" },
    ],
  },
];

function OutletCard({ outlet }: { outlet: MediaLogo }) {
  const [hovered, setHovered] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  return (
    <div
      className="flex flex-col items-center justify-center gap-2.5 rounded-xl py-5 px-3 cursor-pointer"
      style={{
        background: hovered ? "#fff" : "rgba(51,102,255,0.45)",
        border: hovered ? "1px solid rgba(51,102,255,0.2)" : "1px solid rgba(255,255,255,0.12)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "background 0.25s ease, border 0.25s ease, transform 0.2s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setIconHovered(false); }}
    >
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center font-bold text-xs"
        style={{
          background: hovered ? (iconHovered ? "#00084F" : "#0030F0") : "rgba(255,255,255,0.22)",
          border: "1px solid rgba(255,255,255,0.35)",
          color: "#fff",
          transition: "background 0.25s ease",
        }}
        onMouseEnter={() => setIconHovered(true)}
        onMouseLeave={() => setIconHovered(false)}
      >
        {outlet.abbr}
      </div>
      <span className="text-[11px] font-medium text-center leading-tight"
        style={{ color: hovered ? "#0030F0" : "#fff", transition: "color 0.25s ease" }}>
        {outlet.name}
      </span>
    </div>
  );
}

export default function TrustedBy() {
  const [mediaTitle, setMediaTitle] = useState("Trusted by Leading Media Outlets");
  const [worldwideTitle, setWorldwideTitle] = useState("Worldwide");
  const [sectionSubtitle, setSectionSubtitle] = useState("Our platform connects your stories with top-tier journalists and publications across every industry.");
  const [mediaLogos, setMediaLogos] = useState<MediaLogo[]>(FALLBACK_LOGOS);
  const [stats, setStats] = useState<Stat[]>(FALLBACK_STATS);
  const [recognitions, setRecognitions] = useState<Recognition[]>(FALLBACK_RECOGNITIONS);

  useEffect(() => {
    fetch(API, { cache: "no-store" })
      .then(r => r.json())
      .then((json) => {
        const acf = json?.acf;
        if (!acf) return;

        if (acf.media_title || acf.worldwide_title) {
          if (acf.media_title) setMediaTitle(acf.media_title);
          if (acf.worldwide_title) setWorldwideTitle(acf.worldwide_title);
        } else if (acf.section_title) {
          setMediaTitle(acf.section_title);
          setWorldwideTitle("");
        }
        if (acf.section_subtitle) setSectionSubtitle(acf.section_subtitle);

        // Media logos repeater: logo_text (abbr), media_name
        if (Array.isArray(acf.media_logos) && acf.media_logos.length > 0) {
          setMediaLogos(acf.media_logos.map((m: any) => ({
            abbr: m.logo_text || "",
            name: m.media_name || "",
          })));
        }

        // Counter repeater: number_counter, title_counter, description_counter
        if (Array.isArray(acf.counter) && acf.counter.length > 0) {
          setStats(acf.counter.map((c: any) => ({
            value: c.number_counter || "",
            label: c.title_counter || "",
            sub: c.description_counter || "",
          })));
        }

        // Industry Recognition repeater: industry_point (image), text
        const newRecognitions: Recognition[] = [...FALLBACK_RECOGNITIONS];
        if (Array.isArray(acf.industry_recognition) && acf.industry_recognition.length > 0) {
          newRecognitions[0] = {
            title: acf.industry_recognition_text || "Industry Recognition",
            items: acf.industry_recognition.map((r: any) => ({
              text: r.text || "",
              dotIcon: typeof r.industry_point === "string" ? r.industry_point : (r.industry_point?.url || ""),
            })),
          };
        }

        // Security & Compliance repeater: security_point (image), text
        if (Array.isArray(acf.security) && acf.security.length > 0) {
          newRecognitions[1] = {
            title: acf.security_compliance_text || "Security & Compliance",
            items: acf.security.map((s: any) => ({
              text: s.text || "",
              dotIcon: typeof s.security_point === "string" ? s.security_point : (s.security_point?.url || ""),
            })),
          };
        }

        if (Array.isArray(acf.industry_recognition) || Array.isArray(acf.security)) {
          setRecognitions(newRecognitions);
        }
      })
      .catch(err => console.error("TrustedBy fetch error:", err));
  }, []);

  return (
    <div className="w-full">
      <div className="w-full leading-[0]" style={{ background: "#0D1A5E" }}>
        <img src={newShape1} alt="" className="w-full block" />
      </div>

      <section className="w-full" style={{ background: "#0d1a5e" }}>
        <div className="fn-container py-16 md:py-20">

          {/* Header */}
          <div className="text-center mb-12 pt-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {mediaTitle}<br />{worldwideTitle}
            </h2>
            <p className="text-blue-200 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
              {sectionSubtitle}
            </p>
          </div>

          {/* Media outlet grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-14">
            {mediaLogos.map((outlet, i) => (
              <OutletCard key={i} outlet={outlet} />
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 md:mb-10 max-w-3xl mx-auto text-center">
            {stats.map((stat, i) => (
              <div key={i} className="text-center py-6 px-4">
                <div className="text-4xl md:text-5xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white font-semibold text-sm mb-1">{stat.label}</div>
                <div className="text-blue-300 text-xs">{stat.sub}</div>
              </div>
            ))}
          </div>

          <div className="h-20" />
        </div>
      </section>

      {/* Recognition card over wave */}
      <div className="relative w-full" style={{ background: "#0d1a5e" }}>
        <svg viewBox="0 0 1200 280" preserveAspectRatio="none" className="w-full block" style={{ height: "280px" }} fill="#0030F0">
          <path d="M0,280 C300,0 900,0 1200,280 L1200,280 L0,280 Z" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center px-4" style={{ zIndex: 10 }}>
          <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-xl" style={{ background: "#fff" }}>
            <div className="flex flex-col md:flex-row items-stretch">
              {recognitions.map((rec, ri) => (
                <div key={ri} className="flex-1 flex flex-col justify-center p-8"
                  style={{ borderRight: ri === 0 ? "1px solid #e8ecf4" : "none" }}>
                  <h4 className="font-bold text-gray-900 text-base mb-5">{rec.title}</h4>
                  <ul className="flex flex-col gap-3">
                    {rec.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700 text-sm">
                        {item.dotIcon
                          ? <img src={item.dotIcon} alt="" className="w-2.5 h-2.5 object-contain flex-shrink-0" />
                          : <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                              style={{ background: ri === 0 ? "#16A249" : "#0030F0" }} />
                        }
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
