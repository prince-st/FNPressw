import { useState, useEffect } from "react";
import heroImageFallback from "@/assets/hero-image.png";
import shape1 from "@/assets/Shape_1.png";

const API = `https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2/pages/10?_=${Date.now()}`;
const MEDIA = "https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2/media";

async function mediaUrl(id: number): Promise<string | null> {
  try {
    const r = await fetch(`${MEDIA}/${id}`);
    const j = await r.json();
    return j?.source_url || null;
  } catch { return null; }
}

interface TrustItem { icon: string; text: string; }

interface HeroData {
  headingLine1: string;
  headingHighlight: string;
  subHeading: string;
  description: string;
  primaryBtnText: string;
  primaryBtnIcon: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  trustItems: TrustItem[];
  bannerImage: string;
}

const FALLBACK: HeroData = {
  headingLine1: "Communication made",
  headingHighlight: "easier.",
  subHeading: "Customer happiness made better.",
  description: "Transform how brands distribute news, pitch the media, and manage public relations with our industry-leading communication platforms.",
  primaryBtnText: "Start Free Trial",
  primaryBtnIcon: "",
  primaryBtnLink: "#",
  secondaryBtnText: "Watch Demo",
  secondaryBtnLink: "#",
  trustItems: [
    { icon: "", text: "Trusted by 10,000+ brands" },
    { icon: "", text: "99.9% uptime guarantee" },
    { icon: "", text: "Enterprise-grade security" },
  ],
  bannerImage: heroImageFallback,
};

export default function Hero() {
  const [d, setD] = useState<HeroData>(FALLBACK);

  useEffect(() => {
    fetch(API, { cache: "no-store" })
      .then(r => r.json())
      .then(async (json) => {
        const acf = json?.acf;
        if (!acf) return;

        // Resolve all media IDs in parallel
        const [primaryIcon, secondaryIcon, bannerImg, ...trustIcons] = await Promise.all([
          typeof acf.primary_button_icon === "number" ? mediaUrl(acf.primary_button_icon) : Promise.resolve(null),
          typeof acf.secondary_button_icon === "number" ? mediaUrl(acf.secondary_button_icon) : Promise.resolve(null),
          typeof acf.banner_image === "number" ? mediaUrl(acf.banner_image) : Promise.resolve(null),
          ...(Array.isArray(acf.trust_items)
            ? acf.trust_items.map((t: any) =>
                typeof t.trust_dot_point === "number" ? mediaUrl(t.trust_dot_point) : Promise.resolve(null)
              )
            : []),
        ]);

        const trustItems: TrustItem[] = Array.isArray(acf.trust_items)
          ? acf.trust_items.map((t: any, i: number) => ({
              icon: trustIcons[i] || "",
              text: t.text || "",
            }))
          : FALLBACK.trustItems;

        setD({
          headingLine1: acf.heading_line1 || FALLBACK.headingLine1,
          headingHighlight: acf.heading_highlight || FALLBACK.headingHighlight,
          subHeading: acf.sub_heading || FALLBACK.subHeading,
          description: acf.description || FALLBACK.description,
          primaryBtnText: acf.primary_btn_text || FALLBACK.primaryBtnText,
          primaryBtnIcon: primaryIcon || FALLBACK.primaryBtnIcon,
          primaryBtnLink: acf.primary_btn_link || FALLBACK.primaryBtnLink,
          secondaryBtnText: acf.secondary_btn_text || FALLBACK.secondaryBtnText,
          secondaryBtnLink: acf.secondary_btn_link || FALLBACK.secondaryBtnLink,
          trustItems,
          bannerImage: bannerImg || FALLBACK.bannerImage,
        });
      })
      .catch(err => console.error("Hero fetch error:", err));
  }, []);

  return (
    <section className="relative bg-[#F6F6F9] pt-20 pb-0 overflow-hidden">
      <div className="fn-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">

          {/* Left: Text */}
          <div className="flex-1 text-left max-w-xl pb-16 lg:pb-24 order-2 lg:order-1">
            <h1 className="font-extrabold text-[#1a1a1a] leading-[1.1] mb-3"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              {d.headingLine1} <br />
              <span className="text-[#0030F0]">{d.headingHighlight}</span>
            </h1>
            <h2 className="font-bold text-[#1a1a1a] mb-5"
              style={{ fontSize: "clamp(18px, 2.5vw, 28px)" }}>
              {d.subHeading}
            </h2>
            <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed max-w-lg">
              {d.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              {/* Primary Button */}
              <a href={d.primaryBtnLink}
                className="group flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-md transition-all duration-200"
                style={{ background: "#fff", color: "#0030F0", border: "1.5px solid #0030F0" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#0030F0";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#fff";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#0030F0";
                }}
              >
                {d.primaryBtnText}
                {d.primaryBtnIcon
                  ? <img src={d.primaryBtnIcon} alt="" className="w-4 h-4 object-contain transition-transform duration-200 group-hover:translate-x-1" />
                  : <svg className="transition-transform duration-200 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                }
              </a>

              {/* Secondary Button */}
              <a href={d.secondaryBtnLink}
                className="group flex items-center gap-2 font-semibold text-sm rounded-md px-4 py-3 transition-all duration-200 hover:bg-white hover:text-[#0030F0]"
                style={{ background: "transparent", color: "#1a1a1a" }}
              >
                <div className="w-9 h-9 flex items-center justify-center">
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="#0030F0">
                    <path d="M9 6L1 11V1L9 6Z" />
                  </svg>
                </div>
                {d.secondaryBtnText}
              </a>
            </div>

            {/* Trust Items */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-400 text-xs font-medium">
              {d.trustItems.map((item, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {item.icon
                    ? <img src={item.icon} alt="" className="w-3 h-3 object-contain" />
                    : <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
                  }
                  {item.text}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="flex-1 flex justify-center lg:justify-end order-1 lg:order-2">
            <img
              src={d.bannerImage}
              alt="Hero"
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto object-contain"
            />
          </div>
        </div>
      </div>

      <div className="w-full leading-none mt-4 bg-[#0030F0]">
        <img src={shape1} alt="" className="w-full block" />
      </div>
    </section>
  );
}
