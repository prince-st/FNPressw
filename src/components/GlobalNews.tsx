import newsReleaseImg from "@/assets/News_Release.png";
import filingServicesImg from "@/assets/Filing_Services.png";
import globalReachImg from "@/assets/Global_Reach.png";

const services = [
  {
    title: "News Release Dissemination",
    description: "Distribute your news to thousands of media outlets worldwide",
    img: newsReleaseImg,
  },
  {
    title: "Filing Services",
    description: "Professional regulatory filing and compliance support",
    img: filingServicesImg,
  },
  {
    title: "Global Reach",
    description: "Connect with audiences across multiple continents and markets",
    img: globalReachImg,
  },
];

export default function GlobalNews() {
  return (
    <section className="pt-16" style={{ background: "#f4f6fb" }}>
      <div className="fn-container">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
            Global News &{" "}
            <span style={{ color: "#0030F0" }}>Filing Services</span>
          </h2>
          <p className="max-w-2xl mx-auto leading-relaxed" style={{ fontSize: "16px", color: "#626D84" }}>
            Comprehensive news distribution and media services tailored to your needs
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 flex flex-col items-center text-center"
              style={{ border: "1px solid #e8ecf4" }}
            >
              <div className="mb-5">
                <img src={s.img} alt={s.title} className="w-20 h-20 object-contain" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 leading-snug" style={{ fontSize: "16px" }}>{s.title}</h3>
              <p className="leading-relaxed" style={{ fontSize: "14px", color: "#626D84" }}>{s.description}</p>
            </div>
          ))}
        </div>

        {/* Order Services button */}
        <div className="text-center">
          <button
            className="px-8 py-3 rounded-lg text-white font-semibold text-sm transition-all hover:opacity-90"
            style={{ background: "#0030F0" }}
          >
            Order Services
          </button>
        </div>

      </div>
    </section>
  );
}
