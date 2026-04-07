import svgQuote from "@/assets/SVG.png";

const testimonials = [
  {
    stars: 5,
    quote:
      "ACCESS PR has transformed our media outreach. We've seen a 300% increase in press coverage and our stories are reaching the right journalists faster than ever.",
    keyResult: "300% increase in coverage",
    author: "Sarah Chen",
    role: "VP of Communications",
    company: "TechVision Inc.",
    initials: "SC",
    color: "#E9E9FD",
  },
  {
    stars: 5,
    quote:
      "The analytics and reporting capabilities are game-changing. We can now measure our PR ROI accurately and prove the value of our communications efforts to leadership.",
    keyResult: "250% improvement in ROI tracking",
    author: "Michael Rodriguez",
    role: "Head of PR",
    company: "Global Dynamics",
    initials: "MR",
    color: "#E9E9FD",
  },
  {
    stars: 5,
    quote:
      "ACCESS IR has streamlined our investor communications completely. The compliance features and automated distribution save us hours every week.",
    keyResult: "15 hours saved weekly",
    author: "Jennifer Park",
    role: "Investor Relations Director",
    company: "Innovation Corp",
    initials: "JP",
    color: "#E9E9FD",
  },
];

const metrics = [
  { value: "98%", label: "Customer Satisfaction", sub: "Average rating across all platforms" },
  { value: "45%", label: "Increase in Media Coverage", sub: "Average improvement for our clients" },
  { value: "60%", label: "Time Savings", sub: "Reduction in manual PR tasks" },
  { value: "24/7", label: "Customer Support", sub: "Always available when you need us" },
];

export default function Testimonials() {
  return (
    <>
    <section className="relative py-20 overflow-hidden" style={{ background: "#0030F0" }}>
      <div className="fn-container relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            What Our Clients Say
          </h2>
          <div className="inline-block bg-[#fff] rounded-full px-8 py-2 mb-5">
            <span className=" font-bold text-2xl md:text-3xl  text-[#0030F0]">About Their Success</span>
          </div>
          <p className="text-blue-200 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Join thousands of brands who have transformed their communications strategy with our platforms.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="bg-white rounded-2xl p-6 shadow-md flex flex-col gap-4 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              {/* Stars + quote mark */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <svg key={i} className="w-4 h-4" style={{ color: "#0030F0" }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <img src={svgQuote} alt="quote" className="w-6 h-6 object-contain opacity-50" />
              </div>

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                "{t.quote}"
              </p>

              {/* Key Result badge */}
              <div
                className="rounded-lg px-4 py-3 border-l-4"
                style={{
                  background: "rgba(51,102,255,0.08)",
                  borderColor: "#3366FF"
                }}
              >
                <div className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider mb-0.5">Key Result</div>
                <div className="text-sm font-semibold text-gray-800">{t.keyResult}</div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-1">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#3366FF] text-xs font-bold flex-shrink-0"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.author}</div>
                  <div className="text-gray-400 text-xs">{t.role}</div>
                  <div className="text-xs font-semibold" style={{ color: "#3366FF" }}>{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Metrics row */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-12 pb-5">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="text-center rounded-2xl p-4 sm:p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 text-[#3366FF]">
                {m.value}
              </div>

              <div className="text-gray-900 font-semibold text-sm sm:text-base mb-1">
                {m.label}
              </div>

              <div className="text-gray-500 text-xs sm:text-sm leading-snug">
                {m.sub}
              </div>
            </div>
          ))}
        </div>





      </div>
    </section>
    </>
  );
}
