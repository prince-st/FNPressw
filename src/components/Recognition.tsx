const metrics = [
  { value: "98%", label: "Customer Satisfaction" },
  { value: "45%", label: "Faster Media Pickup" },
  { value: "80%", label: "More Media Coverage" },
  { value: "24/7", label: "Support Available" },
];

const recognitions = [
  {
    icon: (
      <svg className="w-7 h-7 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: "Industry Recognition",
    items: ["Top 10 PR platforms 2024", "#1 Press Release Service", "Best Media Distribution Tool"],
  },
  {
    icon: (
      <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Security & Compliance",
    items: ["SOC 2 Type II certified", "GDPR compliant", "256-bit SSL encryption"],
  },
];

export default function Recognition() {
  return (
    <section className="py-20 bg-white">
      <div className="fn-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {recognitions.map((rec) => (
            <div key={rec.title}
              className="rounded-2xl p-8 border border-gray-100 bg-gray-50 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4">
                {rec.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">{rec.title}</h3>
              <ul className="flex flex-col gap-3">
                {rec.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                    <svg className="w-4 h-4 text-[#3366FF] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {metrics.map((m) => (
            <div key={m.label}
              className="text-center rounded-2xl p-6 bg-blue-50 border border-blue-100">
              <div className="text-3xl font-bold text-[#3366FF] mb-1">{m.value}</div>
              <div className="text-xs text-gray-500 font-medium">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
