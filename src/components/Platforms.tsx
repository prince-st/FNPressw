import React from "react";
import overlay1 from "@/assets/overlay1.png";
import overlay2 from "@/assets/overlay2.png";
import overlay3 from "@/assets/overlay3.png";
import overlay4 from "@/assets/overlay4.png";
import shape2 from "@/assets/Shape_2.png";
import accessPRImg from "@/assets/ACCESS_PR.png";
import accessIRImg from "@/assets/ACCESS_IR.png";

const stats = [
  { value: "10K+", label: "Active Brands", icon: overlay3 },
  { value: "50K+", label: "Media Outlets", icon: overlay1 },
  { value: "99.9%", label: "Uptime", icon: overlay4 },
  { value: "2M+", label: "Distributions", icon: overlay2 },
];

interface PlatformCardProps {
  icon: string;
  badge: string;
  title: string;
  description: string;
  features: string[];
  isDark?: boolean;
}

function PlatformCard({ icon, badge, title, description, features, isDark }: PlatformCardProps) {
  const [hovered, setHovered] = React.useState(false);
  // card1 (isDark=true): default blue, hover white; card2 (isDark=false): default white, hover blue
  const isLight = isDark ? hovered : !hovered; // true when bg is white

  return (
    <div
      className="platform-card rounded-2xl p-7 flex flex-col gap-4 border hover:-translate-y-1 cursor-pointer"
      style={{
        background: isDark
          ? (hovered ? "#fff" : "#0030F0")
          : (hovered ? "#0030F0" : "#fff"),
        borderColor: "transparent",
        color: isDark
          ? (hovered ? "#1a1a2e" : "#fff")
          : (hovered ? "#fff" : "#1a1a2e"),
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
          style={{ background: "#0030F0" }}>          <img src={icon} alt="" className="w-9 h-9 object-contain" />
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
            <span style={{ color: isLight ? "#374151" : "rgba(255,255,255,0.85)" }}>{f}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3 mt-4">
        <button className="flex-1 py-2.5 px-5 rounded-xl font-semibold text-sm transition-all"
          style={{
            background: isLight ? "#0030F0" : "transparent",
            border: `1.5px solid ${isLight ? "#0030F0" : "rgba(255,255,255,0.5)"}`,
            color: "#fff",
          }}>
          Learn More →
        </button>
        <button className="flex-1 py-2.5 px-5 rounded-xl font-semibold text-sm transition-all"
          style={{
            background: "#fff",
            border: `1.5px solid ${isLight ? "#0030F0" : "#fff"}`,
            color: "#0030F0",
          }}>
          Free Trial
        </button>
      </div>
    </div>
  );
}

export default function Platforms() {
  return (
    <section className="relative bg-[#0030F0] overflow-hidden w-full">
      {/* <div className="fn-container relative z-10 py-16 md:py-24"> */}
      <div className="fn-container relative z-10 py-16 md:py-24 mb-8 md:mb-16">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Two Powerful Platforms,<br className="hidden sm:block" /> One Complete Solution
          </h2>
          <p className="text-blue-100 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Whether you're managing media relations or investor communications, our
            specialized platforms deliver the tools you need to succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-20">
          <PlatformCard
            icon={accessPRImg}
            badge="ACCESS PR"
            title="Media Relations & Press Distribution"
            description="Streamline your press release distribution, media outreach, and journalist relationships with our comprehensive PR platform."
            features={[
              "Press release distribution to 50,000+ media outlets",
              "Media database with verified journalist contacts",
              "Real-time coverage monitoring and analytics",
              "Automated follow-up sequences",
            ]}
            isDark={true}
          />
          <PlatformCard
            icon={accessIRImg}
            badge="ACCESS IR"
            title="Investor Relations & Communications"
            description="Manage investor communications, financial reporting, and stakeholder engagement with precision and compliance."
            features={[
              "Investor database management and targeting",
              "Financial document distribution",
              "Compliance-ready communication templates",
              "Stakeholder engagement tracking",
            ]}
            isDark={false}
          />
        </div>

        {/* Stats */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"> */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-30">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-4 backdrop-blur-sm shadow-xl hover:scale-105 transition-transform">
                <img src={stat.icon} alt="" className="w-8 h-8 md:w-10 md:h-10 object-contain brightness-0 invert" />
              </div>
              <div className="text-2xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-[10px] md:text-xs font-bold text-blue-200 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave transition out of blue into white */}
      <div className="w-full leading-[0]">
        <img src={shape2} alt="" className="w-full block" />
      </div>

    </section>
  );
}
