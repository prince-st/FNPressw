import { useState, useEffect } from "react";
import svgQuote from "@/assets/SVG.png";

const API = `https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2/pages/10?acf_format=standard&_=${Date.now()}`;

interface StarRating { ratingImage: string; }
interface Testimonial {
  stars: StarRating[];
  quoteImage: string;
  quote: string;
  keyResultText: string;
  keyResultSub: string;
  author: string;
  authorName: string;
  authorPosition: string;
  companyName: string;
}
interface Counter {
  number: string;
  title: string;
  description: string;
}

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    stars: [], quoteImage: "",
    quote: "ACCESS PR has transformed our media outreach. We've seen a 300% increase in press coverage and our stories are reaching the right journalists faster than ever.",
    keyResultText: "300% increase in coverage", keyResultSub: "",
    author: "SC", authorName: "Sarah Chen", authorPosition: "VP of Communications", companyName: "TechVision Inc.",
  },
  {
    stars: [], quoteImage: "",
    quote: "The analytics and reporting capabilities are game-changing. We can now measure our PR ROI accurately and prove the value of our communications efforts to leadership.",
    keyResultText: "250% improvement in ROI tracking", keyResultSub: "",
    author: "MR", authorName: "Michael Rodriguez", authorPosition: "Head of PR", companyName: "Global Dynamics",
  },
  {
    stars: [], quoteImage: "",
    quote: "ACCESS IR has streamlined our investor communications completely. The compliance features and automated distribution save us hours every week.",
    keyResultText: "15 hours saved weekly", keyResultSub: "",
    author: "JP", authorName: "Jennifer Park", authorPosition: "Investor Relations Director", companyName: "Innovation Corp",
  },
];

const FALLBACK_COUNTERS: Counter[] = [
  { number: "98%", title: "Customer Satisfaction", description: "Average rating across all platforms" },
  { number: "45%", title: "Increase in Media Coverage", description: "Average improvement for our clients" },
  { number: "60%", title: "Time Savings", description: "Reduction in manual PR tasks" },
  { number: "24/7", title: "Customer Support", description: "Always available when you need us" },
];

export default function Testimonials() {
  const [mainTitle, setMainTitle] = useState("What Our Clients Say");
  const [highlightTitle, setHighlightTitle] = useState("About Their Success");
  const [subtitle, setSubtitle] = useState("Join thousands of brands who have transformed their communications strategy with our platforms.");
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS);
  const [counters, setCounters] = useState<Counter[]>(FALLBACK_COUNTERS);

  useEffect(() => {
    fetch(API, { cache: "no-store" })
      .then(r => r.json())
      .then((json) => {
        const acf = json?.acf;
        if (!acf) return;

        if (acf.main_title) setMainTitle(acf.main_title);
        if (acf.highlight_title) setHighlightTitle(acf.highlight_title);
        if (acf.subtitle) setSubtitle(acf.subtitle);

        // Testimonials repeater
        if (Array.isArray(acf.testimonials) && acf.testimonials.length > 0) {
          setTestimonials(acf.testimonials.map((t: any) => ({
            stars: Array.isArray(t.stars_rating)
              ? t.stars_rating.map((s: any) => ({
                  ratingImage: typeof s.rating_image === "string" ? s.rating_image : (s.rating_image?.url || ""),
                }))
              : [],
            quoteImage: typeof t.quote_image === "string" ? t.quote_image : (t.quote_image?.url || ""),
            quote: t.quote_description || "",
            keyResultText: t.key_result_text || "",
            keyResultSub: t.key_result_sub || "",
            author: t.author || "",
            authorName: t.author_name || "",
            authorPosition: t.author_position || "",
            companyName: t.company_name || "",
          })));
        }

        // Testimonials counter repeater
        if (Array.isArray(acf.testimonials_counter) && acf.testimonials_counter.length > 0) {
          setCounters(acf.testimonials_counter.map((c: any) => ({
            number: c.testimonials_number || "",
            title: c.testimonials_title || "",
            description: c.testimonials_description || "",
          })));
        }
      })
      .catch(err => console.error("Testimonials fetch error:", err));
  }, []);

  return (
    <section className="relative py-20 overflow-hidden" style={{ background: "#0030F0" }}>
      <div className="fn-container relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {mainTitle}
          </h2>
          <div className="inline-block bg-[#fff] rounded-full px-8 py-2 mb-5">
            <span className="font-bold text-2xl md:text-3xl text-[#0030F0]">{highlightTitle}</span>
          </div>
          <p className="text-blue-200 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {testimonials.map((t, idx) => (
            <div key={idx}
              className="bg-white rounded-2xl p-6 shadow-md flex flex-col gap-4 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              {/* Stars + quote mark */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {t.stars.length > 0
                    ? t.stars.map((s, i) => (
                        s.ratingImage
                          ? <img key={i} src={s.ratingImage} alt="star" className="w-4 h-4 object-contain" />
                          : <svg key={i} className="w-4 h-4" style={{ color: "#0030F0" }} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                      ))
                    : Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className="w-4 h-4" style={{ color: "#0030F0" }} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))
                  }
                </div>
                <img src={t.quoteImage || svgQuote} alt="quote" className="w-6 h-6 object-contain opacity-50" />
              </div>

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1">"{t.quote}"</p>

              {/* Key Result */}
              <div className="rounded-lg px-4 py-3 border-l-4"
                style={{ background: "rgba(51,102,255,0.08)", borderColor: "#0030F0" }}>
                <div className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider mb-0.5">Key Result</div>
                <div className="text-sm font-semibold text-gray-800">{t.keyResultText}</div>
                {t.keyResultSub && <div className="text-xs text-gray-500 mt-0.5">{t.keyResultSub}</div>}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-1">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-[#0030F0] text-xs font-bold flex-shrink-0"
                  style={{ background: "#E9E9FD" }}>
                  {t.author}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.authorName}</div>
                  <div className="text-gray-400 text-xs">{t.authorPosition}</div>
                  <div className="text-xs font-semibold" style={{ color: "#0030F0" }}>{t.companyName}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-12 pb-5">
          {counters.map((c, i) => (
            <div key={i}
              className="text-center rounded-2xl p-4 sm:p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 text-[#0030F0]">{c.number}</div>
              <div className="text-gray-900 font-semibold text-sm sm:text-base mb-1">{c.title}</div>
              <div className="text-gray-500 text-xs sm:text-sm leading-snug">{c.description}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
