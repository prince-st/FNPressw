import { useState, useEffect } from "react";
import usImg from "@/assets/US.png";
import canadaImg from "@/assets/Canada.png";
import ukImg from "@/assets/UK.png";
import europeImg from "@/assets/Europe.png";

const API = `https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2/pages/377?acf_format=standard&_=${Date.now()}`;

interface Country { flag: string; name: string; description: string; }

const FALLBACK: Country[] = [
  { flag: usImg, name: "US", description: "Your content goes here. Edit or remove this text inline or in the module Content settings. You can also style every aspect of this content in the module Design settings and even apply custom CSS to this text in the module Advanced settings." },
  { flag: canadaImg, name: "Canada", description: "Distribute your company capital markets content and comply with Canadian market regulators. SEDOL" },
  { flag: ukImg, name: "UK", description: "Distribute your capital markets content & Comply with UKLA listing Authority. FCA" },
  { flag: europeImg, name: "Europe", description: "Distribute company capital markets content and comply with European Transparency Directive and market regulators." },
];

export default function ServiceHighlight() {
  const [heading1, setHeading1] = useState("Global");
  const [heading2, setHeading2] = useState("Disclosure Services");
  const [subheading, setSubheading] = useState("Distribute your company materials directly to capital markets and comply with global market regulators.");
  const [countries, setCountries] = useState<Country[]>(FALLBACK);

  useEffect(() => {
    fetch(API, { cache: "no-store" })
      .then(r => r.json())
      .then((json) => {
        const acf = json?.acf;
        if (!acf) return;

        // countries repeater: flag (image), name (text), description (textarea)
        if (Array.isArray(acf.countries) && acf.countries.length > 0) {
          setCountries(acf.countries.map((c: any, i: number) => ({
            flag: typeof c.flag === "string" ? c.flag : (c.flag?.url || FALLBACK[i]?.flag || usImg),
            name: c.name || "",
            description: c.description || "",
          })));
        }
      })
      .catch(err => console.error("ServiceHighlight fetch error:", err));
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="fn-container">

        <div className="text-center mb-12">
          <h2 className="font-bold text-gray-900 mb-3" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
            {heading1} <span style={{ color: "#0030F0" }}>{heading2}</span>
          </h2>
          <p className="max-w-lg mx-auto leading-relaxed" style={{ fontSize: "16px", color: "#626D84" }}>
            {subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12">
          {countries.map((item, i) => (
            <div key={i} className="flex flex-col items-start">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm overflow-hidden"
                style={{ border: "2px solid #e8ecf4" }}>
                <img src={item.flag} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2" style={{ fontSize: "20px" }}>{item.name}</h3>
              <p className="leading-relaxed" style={{ fontSize: "14px", color: "#626D84" }}>{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
