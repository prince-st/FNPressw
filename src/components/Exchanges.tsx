import { useState, useEffect } from "react";
import nyseImg from "@/assets/NYSE.png";
import otcImg from "@/assets/OTC.png";
import lseImg from "@/assets/LSE.png";
import nasdaqImg from "@/assets/Nasdaq.png";
import tsxImg from "@/assets/TSX.png";
import aseImg from "@/assets/ASE.png";

const API = `https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2/pages/377?acf_format=standard&_=${Date.now()}`;

const FALLBACK_EXCHANGES = [
  { name: "NYSE", img: nyseImg }, { name: "OTC", img: otcImg },
  { name: "LSE", img: lseImg }, { name: "Nasdaq", img: nasdaqImg },
  { name: "TSX", img: tsxImg }, { name: "ASE", img: aseImg },
];

export default function Exchanges() {
  const [supportHeading, setSupportHeading] = useState("We Support all This is");
  const [globalHeading, setGlobalHeading] = useState("Global Exchanges");
  const [subHeading, setSubHeading] = useState("Contact us for company exchange news & support");
  const [networkImage, setNetworkImage] = useState("");
  const [andManyMore, setAndManyMore] = useState("and many more...");
  const [exchanges, setExchanges] = useState(FALLBACK_EXCHANGES);

  useEffect(() => {
    fetch(API, { cache: "no-store" })
      .then(r => r.json())
      .then((json) => {
        const acf = json?.acf;
        if (!acf) return;
        if (acf.support_heading) setSupportHeading(acf.support_heading);
        if (acf.global_exchanges_heading) setGlobalHeading(acf.global_exchanges_heading);
        if (acf.sub_network_heading) setSubHeading(acf.sub_network_heading);
        if (acf.and_many_more) setAndManyMore(acf.and_many_more);
        if (acf.network_image) setNetworkImage(typeof acf.network_image === "string" ? acf.network_image : (acf.network_image?.url || ""));
        if (Array.isArray(acf.company_image) && acf.company_image.length > 0) {
          setExchanges(acf.company_image.map((c: any, i: number) => {
            const img = typeof c.company_image_list === "string" ? c.company_image_list : (c.company_image_list?.url || "");
            return { name: `Exchange ${i + 1}`, img: img || FALLBACK_EXCHANGES[i]?.img || nyseImg };
          }));
        }
      })
      .catch(err => console.error("Exchanges fetch error:", err));
  }, []);

  return (
    <section className="py-20" style={{ background: "#f4f6fb" }}>
      <div className="fn-container">
        <div className="text-center mb-12">
          <h2 className="font-bold text-gray-900 mb-3" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
            {supportHeading}{" "}
            <span style={{ color: "#0030F0" }}>{globalHeading}</span>
          </h2>
          <p style={{ color: "#626D84", fontSize: "14px" }}>{subHeading}</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left — Globe / network image */}
          <div className="flex-shrink-0 flex items-center justify-center w-full md:w-72">
            {networkImage ? (
              <img src={networkImage} alt="Network" className="w-64 h-64 object-contain" />
            ) : (
              <div className="relative w-64 h-64 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #1a3fbf 0%, #0d1a5e 100%)", boxShadow: "0 8px 40px rgba(51,102,255,0.25)" }}>
                <svg className="w-40 h-40 text-blue-200 opacity-80" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-900 text-xs font-bold px-3 py-1 rounded whitespace-nowrap" style={{ background: "#f0c040" }}>
                  Global Exchanges
                </div>
              </div>
            )}
          </div>

          {/* Right — Exchange logos */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {exchanges.map((ex, i) => (
                <div key={i} className="rounded-xl flex items-center justify-center h-20 py-20 bg-white"
                  style={{ border: "1px solid #e8ecf4", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                  <img src={ex.img} alt={ex.name} className="h-15 w-auto object-contain max-w-[100px]" />
                </div>
              ))}
            </div>
            <p style={{ color: "#626D84", fontSize: "13px" }} className="mt-5 text-center md:text-left">{andManyMore}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
