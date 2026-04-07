import { useState } from "react";

const faqs = [
  {
    q: "What makes ACCESS different from other PR platforms?",
    a: "ACCESS combines an extensive media network of 50,000+ outlets with AI-powered targeting, real-time analytics, and dedicated support — giving you unmatched reach and measurable results.",
  },
  {
    q: "How quickly can I start distributing press releases?",
    a: "You can start distributing within minutes of signing up. Our onboarding is streamlined so you can submit your first press release the same day.",
  },
  {
    q: "Do you offer white-label or enterprise solutions?",
    a: "Yes, we offer full white-label solutions for PR agencies and custom enterprise packages with dedicated account management, custom integrations, and SLA guarantees.",
  },
  {
    q: "What kind of analytics and reporting do you provide?",
    a: "Our dashboard provides real-time pickup rates, media mentions, social shares, traffic referrals, and detailed engagement metrics for every press release you distribute.",
  },
  {
    q: "Is there a limit on press releases or contacts?",
    a: "Limits depend on your plan. Our entry plans include generous allowances, and enterprise plans offer unlimited press releases and contacts.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="pt-20" style={{ background: "#f4f6fb" }} id="faq">
      <div className="fn-container">

        {/* Accordion */}
        <div className="max-w-2x2 mx-auto flex flex-col gap-3 mb-10">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden"
              style={{ border: "1px solid #e8ecf4", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
            >
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-gray-800 text-sm font-medium pr-4">{faq.q}</span>
                <svg
                  className="w-4 h-4 flex-shrink-0 transition-transform duration-200"
                  style={{
                    transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                    color: "#3366FF",
                  }}
                  fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100">
                  <div className="pt-4">{faq.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}

        <div
          // className="max-w-md sm:max-w-lg md:max-w-xl mx-auto rounded-2xl p-6 sm:p-8 text-center"  

          className="max-w-md sm:max-w-lg md:max-w-xl mx-auto rounded-2xl p-6 sm:p-8 text-center shadow-lg"
          style={{ background: "linear-gradient(135deg, #3366FF 0%, #1a3fbf 100%)" }}
        >
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            Still Have Questions?
          </h3>

          <p className="text-blue-200 text-sm sm:text-base mb-6 max-w-md mx-auto">
            Our team is here to help you find the perfect solution for your communications needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">

            {/* Primary Button */}
            <button
              className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 bg-white text-[#3366FF] border-2 border-white hover:bg-blue-50 hover:scale-105 active:scale-95 hover:shadow-md"
            >
              Contact Sales
            </button>

            {/* Secondary Button */}
            <button
              className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 border-2 border-white/60 text-white hover:bg-white hover:text-[#3366FF] hover:scale-105 active:scale-95 hover:shadow-md"
            >
              Live Chat Support
            </button>

          </div>
        </div>


      </div>
    </section>
  );
}
