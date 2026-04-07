import { useState } from "react";
import newShape1 from "@/assets/new_shape_1.png";

const mediaOutlets = [
  { abbr: "TC", name: "TechCrunch" },
  { abbr: "FB", name: "Forbes" },
  { abbr: "RT", name: "Reuters" },
  { abbr: "BB", name: "Bloomberg" },
  { abbr: "AP", name: "Associated Press" },
  { abbr: "WSJ", name: "Wall Street Journal" },
  { abbr: "CNN", name: "CNN" },
  { abbr: "BBC", name: "BBC" },
  { abbr: "FT", name: "Financial Times" },
  { abbr: "TG", name: "The Guardian" },
  { abbr: "BI", name: "Business Insider" },
  { abbr: "WD", name: "Wired" },
];

const stats = [
  { value: "50,000+", label: "Media Outlets", sub: "Global reach across all industries" },
  { value: "185", label: "Countries", sub: "Worldwide distribution network" },
  { value: "24/7", label: "Distribution", sub: "Round-the-clock media coverage" },
];

const recognitions = [
  {
    title: "Industry Recognition",
    items: [
      "PR Week Awards - Platform of the Year",
      "G2 Leader in PR Software",
      "Capterra Best Value Winner",
    ],
  },
  {
    title: "Security & Compliance",
    items: [
      "SOC 2 Type II Certified",
      "GDPR Compliant",
      "Enterprise-Grade Security",
    ],
  },
];

function OutletCard({ outlet }: { outlet: { abbr: string; name: string } }) {
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
          background: hovered
            ? (iconHovered ? "#00084F" : "#0030F0")
            : "rgba(255,255,255,0.22)",
          border: "1px solid rgba(255,255,255,0.35)",
          color: "#fff",
          transition: "background 0.25s ease",
        }}
        onMouseEnter={() => setIconHovered(true)}
        onMouseLeave={() => setIconHovered(false)}
      >
        {outlet.abbr}
      </div>
      <span
        className="text-[11px] font-medium text-center leading-tight"
        style={{
          color: hovered ? "#0030F0" : "#fff",
          transition: "color 0.25s ease",
        }}
      >
        {outlet.name}
      </span>
    </div>
  );
}

export default function TrustedBy() {
  return (
    <div className="w-full">
      {/* Top wave */}
      {/* <div className="w-full leading-[0]">
        <img src={newShape2} alt="" className="w-full block" /> 
      </div> */}


      {/* Wave transition from light to dark */}
      <div className="w-full leading-[0]" style={{ background: "#0D1A5E" }}>
        <img src={newShape1} alt="" className="w-full block" />
      </div>

      {/* Full-width dark navy section */}
      <section className="w-full" style={{ background: "#0d1a5e" }}>
        <div className="fn-container py-16 md:py-20">
          {/* Header */}
          <div className="text-center mb-12 pt-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Trusted by Leading Media Outlets<br />Worldwide
            </h2>
            <p className="text-blue-200 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
              Our platform connects your stories with top-tier journalists and publications across every industry.
            </p>
          </div>

          {/* Media outlet grid — 6 cols desktop, 3 mobile */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-14">
            {mediaOutlets.map((outlet, i) => (
              <OutletCard key={i} outlet={outlet} />
            ))}
          </div>

          {/* Stats row */} 
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 md:mb-10 max-w-3xl mx-auto text-center">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center py-6 px-4 ">
                <div className="text-4xl md:text-5xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white font-semibold text-sm mb-1">{stat.label}</div>
                <div className="text-blue-300 text-xs">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Industry Recognition card — full width, centered */}
          <div className="h-20" /> {/* spacer so card has room below stats */}

        </div>
      </section>

      {/* Wave + recognition card centered over it */}
      <div className="relative w-full" style={{ background: "#0d1a5e" }}>
        <svg viewBox="0 0 1200 160" preserveAspectRatio="none" className="w-full block" style={{ height: "160px" }} fill="#0030F0">
          <path d="M0,160 C300,0 900,0 1200,160 L1200,160 L0,160 Z" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center px-4" style={{ zIndex: 10 }}>
          <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-xl" style={{ background: "#fff" }}>
            <div className="flex flex-col md:flex-row items-stretch">
              {recognitions.map((rec, ri) => (
                <div
                  key={rec.title}
                  className="flex-1 flex flex-col justify-center p-8"
                  style={{ borderRight: ri === 0 ? "1px solid #e8ecf4" : "none" }}
                >
                  <h4 className="font-bold text-gray-900 text-base mb-5">{rec.title}</h4>
                  <ul className="flex flex-col gap-3">
                    {rec.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700 text-sm">
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ background: rec.title === "Industry Recognition" ? "#16A249" : "#0030F0" }}
                        />
                        {item}
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
