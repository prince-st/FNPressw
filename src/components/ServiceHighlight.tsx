const highlights = [
  {
    flag: "🇺🇸",
    title: "US",
    description:
      "Your content goes here. Edit or remove this text inline or in the module Content settings. You can also style every aspect of this content in the module Design settings and even apply custom CSS to this text in the module Advanced settings.",
  },
  {
    flag: "🇨🇦",
    title: "Canada",
    description:
      "Distribute your company capital markets content and comply with Canadian market regulators. SEDOL",
  },
  {
    flag: "🇬🇧",
    title: "UK",
    description:
      "Distribute your capital markets content & Comply with UKLA listing Authority. FCA",
  },
  {
    flag: "🇪🇺",
    title: "Europe",
    description:
      "Distribute company capital markets content and comply with European Transparency Directive and market regulators.",
  },
];

export default function ServiceHighlight() {
  return (
    <section className="py-16 bg-white">
      <div className="fn-container">

   

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12">
          {highlights.map((item, i) => (
            <div key={i} className="flex flex-col items-start">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 shadow-sm"
                style={{ border: "2px solid #e8ecf4" }}
              >
                {item.flag}
              </div>
              <h3 className="font-bold text-gray-900 mb-2" style={{ fontSize: "20px" }}>{item.title}</h3>
              <p className="leading-relaxed" style={{ fontSize: "14px", color: "#626D84" }}>{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
