import React, { useState, useEffect } from "react";
import shape2 from "@/assets/Shape_2.png";
import overlay1 from "@/assets/overlay1.png";
import overlay2 from "@/assets/overlay2.png";
import overlay3 from "@/assets/overlay3.png";
import overlay4 from "@/assets/overlay4.png";

const API = `https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2/pages/10?acf_format=standard&_=${Date.now()}`;

interface Feature { text: string; }
interface Platform {
  icon: string; badge: string; title: string; description: string;
  features: Feature[];
  learnMoreText: string; learnMoreIcon: string; learnMoreUrl: string;
  freeTrialText: string; freeTrialUrl: string;
  isDark: boolean;
}
interface Stat { value: string; label: string; icon: string; }

const FALLBACK_STATS: Stat[] = [
  { value: "10K+", label: "Active Brands", icon: overlay3 },
  { value: "50K+", label: "Media Outlets", icon: overlay1 },
  { value: "99.9%", label: "Uptime", icon: overlay4 },
  { value: "2M+", label: "Distributions", icon: overlay2 },
];

function PlatformCard({ icon, badge, title, description, features, learnMoreText, learnMoreIcon, learnMoreUrl, freeTrialText, freeTrialUrl, isDark }: Platform) {
  const [hovered, setHovered] = React.useState(false);
  const isLight = isDark ? hovered : !hovered;

  return (
    <div
      className="rounded-2xl p-7 flex flex-col gap-4 border hover:-translate-y-1 cursor-pointer transition-all duration-200"
      style={{
        background: isDark ? (hovered ? "#fff" : "#0030F0") : (hovered ? "#0030F0" : "#fff"),
        borderColor: "rgba(255,255,255,0.5)",
        color: isDark ? (hovered ? "#1a1a2e" : "#fff") : (hovered ? "#fff" : "#1a1a2e"),
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg" style={{ background: "#0030F0" }}>
          {icon && <img src={icon} alt="" className="w-9 h-9 object-contain" />}
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: isLight ? "#0030F0" : "#93c5fd" }}>{badge}</span>
          <h3 className="text-xl font-bold mt-0.5 leading-tight" style={{ color: isLight ? "#1a1a2e" : "#fff" }}>{title}</h3>
        </div>
      </div>

      <p className="text-sm leading-relaxed" style={{ color: isLight ? "#626D84" : "rgba(255,255,255,0.75)" }}>{description}</p>

      <ul className="flex flex-col gap-2.5 mt-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2.5 text-sm">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: isLight ? "#0030F0" : "rgba(255,255,255,0.6)" }} />
            <span style={{ color: isLight ? "#374151" : "rgba(255,255,255,0.85)" }}>{f.text}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3 mt-4">
        <a href={learnMoreUrl}
          className="flex-1 py-2.5 px-5 rounded-xl font-semibold text-sm text-center flex items-center justify-center gap-2 transition-all"
          style={{ background: isLight ? "#0030F0" : "transparent", border: `1.5px solid ${isLight ? "#0030F0" : "rgba(255,255,255,0.5)"}`, color: "#fff" }}>
          {learnMoreText}
          {learnMoreIcon && <img src={learnMoreIcon} alt="" className="w-4 h-4 object-contain" />}
        </a>
        <a href={freeTrialUrl}
          className="flex-1 py-2.5 px-5 rounded-xl font-semibold text-sm text-center transition-all"
          style={{ background: "#fff", border: `1.5px solid ${isLight ? "#0030F0" : "#fff"}`, color: "#0030F0" }}>
          {freeTrialText}
        </a>
      </div>
    </div>
  );
}

export default function Platforms() {
  const [sectionTitle, setSectionTitle] = useState("Two Powerful Platforms, One Complete Solution");
  const [sectionSubtitle, setSectionSubtitle] = useState("Whether you're managing media relations or investor communications, our specialized platforms deliver the tools you need to succeed.");
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [stats, setStats] = useState<Stat[]>(FALLBACK_STATS);

  useEffect(() => {
    fetch(API, { cache: "no-store" })
      .then(r => r.json())
      .then((json) => {
        const acf = json?.acf;
        if (!acf) return;

        if (acf.section_title) setSectionTitle(acf.section_title);
        if (acf.section_subtitle) setSectionSubtitle(acf.section_subtitle);

        // Platforms — acf_format=standard returns image URLs directly
        if (Array.isArray(acf.platforms)) {
          setPlatforms(acf.platforms.map((p: any, i: number) => ({
            icon: typeof p.access_image === "string" ? p.access_image : (p.access_image?.url || ""),
            badge: p.label || "",
            title: p.title || "",
            description: (p.description || "").replace(/\r\n|\n/g, " ").trim(),
            features: Array.isArray(p.features)
              ? p.features.map((f: any) => ({ text: (f.feature || "").trim() }))
              : [],
            learnMoreText: p.learn_more_text || "Learn More",
            learnMoreIcon: typeof p.learn_more_icon === "string" ? p.learn_more_icon : (p.learn_more_icon?.url || ""),
            learnMoreUrl: p.learn_more || "#",
            freeTrialText: p.free_trial_text || "Free Trial",
            freeTrialUrl: p.free_trial || "#",
            isDark: i === 0,
          })));
        }

        // Stats repeater — sub-fields: bottom_stats_image, number, label
        if (Array.isArray(acf.stats) && acf.stats.length > 0) {
          setStats(acf.stats.map((s: any, i: number) => ({
            value: s.number || s.number_stat || "",
            label: s.label || "",
            icon: typeof s.bottom_stats_image === "string" ? s.bottom_stats_image : (s.bottom_stats_image?.url || FALLBACK_STATS[i]?.icon || ""),
          })));
        }
        // Also check for trusted_counter (new field name)
        if (Array.isArray(acf.trusted_counter) && acf.trusted_counter.length > 0) {
          setStats(acf.trusted_counter.map((s: any, i: number) => ({
            value: s.trusted_numbe || s.trusted_number || "",
            label: s.trusted_title || "",
            icon: typeof s.trusted_image === "string" ? s.trusted_image : (s.trusted_image?.url || FALLBACK_STATS[i]?.icon || ""),
          })));
        }
      })
      .catch(err => console.error("Platforms fetch error:", err));
  }, []);

  const displayPlatforms = platforms.length > 0 ? platforms : [
    {
      icon: "", badge: "ACCESS PR", title: "Media Relations & Press Distribution",
      description: "Streamline your press release distribution, media outreach, and journalist relationships with our comprehensive PR platform.",
      features: [
        { text: "Press release distribution to 50,000+ media outlets" },
        { text: "Media database with verified journalist contacts" },
        { text: "Real-time coverage monitoring and analytics" },
        { text: "Automated follow-up sequences" },
      ],
      learnMoreText: "Learn More", learnMoreIcon: "", learnMoreUrl: "#",
      freeTrialText: "Free Trial", freeTrialUrl: "#", isDark: true,
    },
    {
      icon: "", badge: "ACCESS IR", title: "Investor Relations & Communications",
      description: "Manage investor communications, financial reporting, and stakeholder engagement with precision and compliance.",
      features: [
        { text: "Investor database management and targeting" },
        { text: "Financial document distribution" },
        { text: "Compliance-ready communication templates" },
        { text: "Stakeholder engagement tracking" },
      ],
      learnMoreText: "Learn More", learnMoreIcon: "", learnMoreUrl: "#",
      freeTrialText: "Free Trial", freeTrialUrl: "#", isDark: false,
    },
  ];

  return (
    <section className="relative bg-[#0030F0] overflow-hidden w-full">
      <div className="fn-container relative z-10 py-16 md:py-24 mb-8 md:mb-16">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">{sectionTitle}</h2>
          <p className="text-blue-100 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">{sectionSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-20">
          {displayPlatforms.map((p, i) => <PlatformCard key={i} {...p} />)}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-30">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-4 backdrop-blur-sm shadow-xl hover:scale-105 transition-transform">
                <img src={stat.icon} alt="" className="w-8 h-8 md:w-10 md:h-10 object-contain brightness-0 invert" />
              </div>
              <div className="text-2xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-[10px] md:text-xs font-bold text-blue-200 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full leading-[0]">
        <img src={shape2} alt="" className="w-full block" />
      </div>
    </section>
  );
}
