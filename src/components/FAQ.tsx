import { useState, useEffect } from "react";

const API = `https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2/pages/10?acf_format=standard&_=${Date.now()}`;

interface FAQItem { q: string; a: string; }

const FB_FAQS: FAQItem[] = [
  { q: "What makes ACCESS different from other PR platforms?", a: "ACCESS combines an extensive media network of 50,000+ outlets with AI-powered targeting, real-time analytics, and dedicated support — giving you unmatched reach and measurable results." },
  { q: "How quickly can I start distributing press releases?", a: "You can start distributing within minutes of signing up. Our onboarding is streamlined so you can submit your first press release the same day." },
  { q: "Do you offer white-label or enterprise solutions?", a: "Yes, we offer full white-label solutions for PR agencies and custom enterprise packages with dedicated account management, custom integrations, and SLA guarantees." },
  { q: "What kind of analytics and reporting do you provide?", a: "Our dashboard provides real-time pickup rates, media mentions, social shares, traffic referrals, and detailed engagement metrics for every press release you distribute." },
  { q: "Is there a limit on press releases or contacts?", a: "Limits depend on your plan. Our entry plans include generous allowances, and enterprise plans offer unlimited press releases and contacts." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const [faqImage, setFaqImage] = useState("");
  const [titleFirst, setTitleFirst] = useState("Frequently Asked");
  const [titleSecond, setTitleSecond] = useState("Questions");
  const [mainDesc, setMainDesc] = useState("Get answers to common questions about our platforms, features, and pricing.");
  const [faqs, setFaqs] = useState<FAQItem[]>(FB_FAQS);
  const [stillTitle, setStillTitle] = useState("Still Have Questions?");
  const [stillDesc, setStillDesc] = useState("Our team is here to help you find the perfect solution for your communications needs.");
  const [btn1Text, setBtn1Text] = useState("Contact Sales");
  const [btn1Link, setBtn1Link] = useState("#");
  const [btn2Text, setBtn2Text] = useState("Live Chat Support");
  const [btn2Link, setBtn2Link] = useState("#");

  useEffect(() => {
    fetch(API, { cache: "no-store" })
      .then(r => r.json())
      .then((json) => {
        const acf = json?.acf;
        if (!acf) return;

        if (acf.faq_image) setFaqImage(typeof acf.faq_image === "string" ? acf.faq_image : (acf.faq_image?.url || ""));
        if (acf.faq_title_first) setTitleFirst(acf.faq_title_first);
        if (acf.faq_title_second) setTitleSecond(acf.faq_title_second);
        if (acf.faq_main_description) setMainDesc(acf.faq_main_description);
        if (acf.still_title) setStillTitle(acf.still_title);
        if (acf.still_description) setStillDesc(acf.still_description);
        if (acf.still_button_1_text) setBtn1Text(acf.still_button_1_text);
        if (acf.still_button_1_link) setBtn1Link(acf.still_button_1_link);
        if (acf.still_button_2_text) setBtn2Text(acf.still_button_2_text);
        if (acf.still_button_2_link) setBtn2Link(acf.still_button_2_link);

        if (Array.isArray(acf.faq_items) && acf.faq_items.length > 0) {
          setFaqs(acf.faq_items.map((f: any) => ({
            q: f.question || "",
            a: f.answer || "",
          })));
        }
      })
      .catch(err => console.error("FAQ fetch error:", err));
  }, []);

  return (
    <section className="pt-20 pb-10" style={{ background: "#f4f6fb" }} id="faq">
      <div className="fn-container">

        {/* Header */}
        <div className="text-center mb-10">
          {faqImage && (
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4 " style={{ background: "#0030F01A" }}>
              <img src={faqImage} alt="FAQ" className="w-16 h-16 object-contain" />
            </div>
          )}
          {!faqImage && (
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-[#0030F0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-3">
            {titleFirst}<br />
            <span className="text-[#0030F0]">{titleSecond}</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto">{mainDesc}</p>
        </div>

        {/* Accordion */}
        <div className="  justify-center mx-auto flex flex-col gap-3 mb-10">
          {faqs.map((faq, i) => (
            <div key={i} className=" max-w-3xl justify-center bg-white rounded-xl overflow-hidden"
              style={{ border: "1px solid #e8ecf4", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-gray-800 text-sm font-medium pr-4">{faq.q}</span>
                <svg
                  className="w-4 h-4 flex-shrink-0 transition-transform duration-200"
                  style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)", color: "#0030F0" }}
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
        <div className="max-w-md sm:max-w-lg md:max-w-xl mx-auto rounded-2xl p-6 sm:p-8 text-center shadow-lg"
          style={{ background: "linear-gradient(135deg, #0030F0 0%, #1a3fbf 100%)" }}>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{stillTitle}</h3>
          <p className="text-blue-200 text-sm sm:text-base mb-6 max-w-md mx-auto">{stillDesc}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={btn1Link}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 bg-white text-[#0030F0] border-2 border-white hover:bg-blue-50 hover:scale-105">
              {btn1Text}
            </a>
            <a href={btn2Link}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 border-2 border-white/60 text-white hover:bg-white hover:text-[#0030F0] hover:scale-105">
              {btn2Text}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
