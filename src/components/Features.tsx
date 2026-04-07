import iconChart from "@/assets/icon-chart.png";
import iconNews from "@/assets/icon-news.png";
import iconSearch from "@/assets/icon-search.png";

const features = [
  {
    icon: iconNews,
    iconBg: "#e8f0ff",
    title: "Press Release Distribution",
    description: "Distribute your press releases to thousands of journalists, news outlets, and media contacts worldwide.",
    bullets: [
      "Targeted media outreach",
      "Global coverage network",
      "RSS feed syndication",
      "Google News inclusion",
    ],
  },
  {
    icon: iconSearch,
    iconBg: "#e8fff4",
    title: "Media Monitoring & Tracking",
    description: "Track brand mentions and monitor your PR performance across all major media channels in real time.",
    bullets: [
      "Real-time mention tracking",
      "Competitor analysis tools",
      "Sentiment analysis",
      "Custom alert reports",
    ],
  },
  {
    icon: iconChart,
    iconBg: "#fff4e8",
    title: "Reporting & Analytics",
    description: "Measure your PR performance with detailed analytics dashboards and actionable insights.",
    bullets: [
      "Open & click-through rates",
      "ROI tracking metrics",
      "Custom dashboards",
      "Exportable reports",
    ],
  },
];

export default function Features() {
  return (
    <section className="relative bg-[#F6F6F9] pt-20 overflow-hidden">
      <div className="fn-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Complete PR Solutions <br />
            <span className="text-[#0030F0]">For Modern Brands</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Everything you need to distribute press releases, monitor coverage, and track performance.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div
                // className="w-14 h-14 rounded-2x2 flex items-center justify-center mb-5"
                className="  w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 bg-gray-100 "
                style={{ background: feature.iconBg }}
              >
                <img src={feature.icon} className="w-7 h-7 object-contain" alt={feature.title} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{feature.description}</p>
              <ul className="flex flex-col gap-2">
                {feature.bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-2 h-2 bg-[#0030F0] rounded-full flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <a href="#" className="inline-flex items-center gap-1 text-[#0030F0] font-semibold text-sm mt-6 group-hover:gap-2 transition-all">
                Learn More →
              </a>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        {/* <div className="mt-8 rounded-xl p-6 sm:p-8 text-center text-white"
          style={{ background: "linear-gradient(135deg, #0030F0 0%, #1a3fbf 100%)" }}>
          <h3 className="text-xl sm:text-3xl font-bold mb-3">Ready to Transform Your PR Strategy?</h3>
          <p className="text-blue-100 mb-7 max-w-xl mx-auto text-sm sm:text-base">
            Join thousands of companies already using our platform to amplify their media presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-white text-[#0030F0] px-7 py-3 rounded-lg font-semibold text-sm hover:bg-blue-50 transition">
              Start Free Trial
            </button>
            <button className="border border-white px-7 py-3 rounded-lg font-semibold text-sm hover:bg-white hover:text-[#0030F0] transition">
              Book a Demo
            </button>
          </div>
        </div> */}

        <div className="relative bg-gray-50 pt-24 overflow-hidden">

          {/* Curved dark background */}
          {/* <div className="absolute bottom-0 left-0 w-full h-72 bg-[#050A4A] rounded-t-[100%]"></div> */}

          <div className="relative bg-gray-50 pt-0 pb-0 overflow-hidden">

            {/* CURVE */}
            {/* <div className="absolute bottom-0 left-0 w-full h-80 bg-[#050A4A] rounded-t-[100%]"></div> */}

            {/* CTA CARD */}
            <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
              <div className="rounded-2xl px-8 py-10 shadow-xl"
                style={{ background: "linear-gradient(135deg, #3b5bff 0%, #2d3edb 100%)" }}
              >
                <h3 className="text-2xl sm:text-3xl font-semibold mb-3">
                  Ready to Transform Your PR Strategy?
                </h3>

                <p className="text-blue-100 mb-6 text-sm sm:text-base max-w-xl mx-auto">
                  Join thousands of brands already using our platform to amplify their message and reach the right audiences.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    className="px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300"
                    style={{ background: "#fff", color: "#0030F0", border: "2px solid #fff" }}
                    onMouseEnter={e => { const b = e.currentTarget; b.style.background = "#0030F0"; b.style.color = "#fff"; b.style.border = "2px solid #fff"; }}
                    onMouseLeave={e => { const b = e.currentTarget; b.style.background = "#fff"; b.style.color = "#0030F0"; b.style.border = "2px solid #fff"; }}
                  >
                    Start Free Trial
                  </button>

                  <button
                    className="px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300"
                    style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.6)" }}
                    onMouseEnter={e => { const b = e.currentTarget; b.style.background = "#fff"; b.style.color = "#0030F0"; b.style.border = "2px solid #fff"; }}
                    onMouseLeave={e => { const b = e.currentTarget; b.style.background = "transparent"; b.style.color = "#fff"; b.style.border = "2px solid rgba(255,255,255,0.6)"; }}
                  >
                    Schedule Demo
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>




        

      </div>
    </section>
  );
}
