import { useState } from "react";

const brands = [
  { name: "US Polo Assn",    abbr: "USPA",     color: "#1a3fbf" },
  { name: "Ashley HomeStore", abbr: "Ashley",  color: "#e87722" },
  { name: "Essilor",          abbr: "Essilor", color: "#6b7280" },
  { name: "Kohler",           abbr: "KOHLER.", color: "#111827" },
  { name: "BT",               abbr: "BT",      color: "#6d28d9" },
  { name: "Ferguson",         abbr: "Ferguson",color: "#374151" },
  { name: "Nike",             abbr: "NIKE",    color: "#111827" },
  { name: "Sony",             abbr: "SONY",    color: "#003087" },
];

const VISIBLE = 6;

export default function NewsNetworks() {
  const [start, setStart] = useState(0);

  const prev = () => setStart((s) => (s - 1 + brands.length) % brands.length);
  const next = () => setStart((s) => (s + 1) % brands.length);

  // Build visible slice (wrapping)
  const visible = Array.from({ length: VISIBLE }, (_, i) => brands[(start + i) % brands.length]);

  return (
    <section className="py-20" style={{ background: "#3333cc" }}>
      <div className="fn-container text-center">
        <p className="text-white text-base md:text-lg font-medium max-w-3xl mx-auto mb-10 leading-relaxed">
          Join The Thousands Of Brands That Work With ACCESS Newswire Today To Reach Investors,
          Distribute Their News, Pitch The Media, And Monitor Their Brand All In One Platform.
        </p>

        {/* Carousel */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <button onClick={prev} className="text-white text-3xl font-light w-8 hover:opacity-70 transition-opacity select-none">‹</button>
          <div className="flex gap-3">
            {visible.map((brand, i) => (
              <div
                key={i}
                className="w-24 sm:w-28 h-20 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
              >
                <span className="text-xs font-bold text-center px-2 leading-tight" style={{ color: brand.color }}>
                  {brand.abbr}
                </span>
              </div>
            ))}
          </div>
          <button onClick={next} className="text-white text-3xl font-light w-8 hover:opacity-70 transition-opacity select-none">›</button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {brands.map((_, i) => (
            <button
              key={i}
              onClick={() => setStart(i)}
              className="w-2 h-2 rounded-full transition-all"
              style={{ background: i === start ? "#fff" : "rgba(255,255,255,0.35)" }}
            />
          ))}
        </div>

        {/* CTA */}
        <button
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:bg-blue-50"
          style={{ background: "#fff", color: "#3333cc" }}
        >
          Start Free Trial <span>→</span>
        </button>
      </div>
    </section>
  );
}
