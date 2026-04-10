import { useState, useEffect } from "react";
import bloombergImg from "@/assets/Bloomberg.png";
import reutersImg from "@/assets/Reutrs.png";
import dowJonesImg from "@/assets/Dow_Jones.png";
import marketWatchImg from "@/assets/Market_Watch.png";
import tmxImg from "@/assets/TMX_Money.png";

const API = `https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2/pages/377?acf_format=standard&_=${Date.now()}`;

const FALLBACK_LOGOS = [
  { name: "Bloomberg", img: bloombergImg }, { name: "Reuters", img: reutersImg },
  { name: "Dow Jones", img: dowJonesImg }, { name: "MarketWatch", img: marketWatchImg },
  { name: "TMX Money", img: tmxImg },
];

export default function PremiumNews() {
  const [heading, setHeading] = useState("Premium News Networks");
  const [subHeading, setSubHeading] = useState("Distribute & Publish to....");
  const [logos, setLogos] = useState(FALLBACK_LOGOS);

  useEffect(() => {
    fetch(API, { cache: "no-store" })
      .then(r => r.json())
      .then((json) => {
        const acf = json?.acf;
        if (!acf) return;
        if (acf.premium_news_networks_heading) setHeading(acf.premium_news_networks_heading);
        if (acf.sub_premium_news_networks) setSubHeading(acf.sub_premium_news_networks);
        if (Array.isArray(acf.premium_logo_image) && acf.premium_logo_image.length > 0) {
          setLogos(acf.premium_logo_image.map((l: any, i: number) => {
            const img = typeof l.logo_image_premium === "string" ? l.logo_image_premium : (l.logo_image_premium?.url || "");
            return { name: `Logo ${i + 1}`, img: img || FALLBACK_LOGOS[i]?.img || bloombergImg };
          }));
        }
      })
      .catch(err => console.error("PremiumNews fetch error:", err));
  }, []);

  return (
    <section className="py-16 bg-[#F6F6F9]">
      <div className="fn-container">
        <div className="text-center mb-8">
          <h2 className="font-bold text-gray-900 mb-2" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
            {heading}
          </h2>
          <p style={{ color: "#626D84", fontSize: "16px" }}>{subHeading}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {logos.map((logo, i) => (
            <div key={i} className="flex items-center justify-center">
              <img src={logo.img} alt={logo.name} className="object-contain"
                style={{ maxHeight: "50px", maxWidth: "150px", width: "auto" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
