import { useState, useEffect } from "react";
import iconChart from "@/assets/icon-chart.png";
import iconNews from "@/assets/icon-news.png";
import iconSearch from "@/assets/icon-search.png";

const API = `https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2/pages/10?acf_format=standard&_=${Date.now()}`;

interface FeatureItem { text: string; dotIcon: string; }
interface PRCard {
  icon: string; title: string; description: string;
  features: FeatureItem[];
  exploreText: string; exploreIcon: string; exploreLink: string;
}
interface CTAData {
  title: string; description: string;
  btn1Text: string; btn1Link: string;
  btn2Text: string; btn2Link: string;
}

const FALLBACK_CARDS: PRCard[] = [
  {
    icon: iconNews, title: "Press Release Distribution",
    description: "Distribute your press releases to thousands of journalists, news outlets, and media contacts worldwide.",
    features: [
      { text: "Targeted media outreach", dotIcon: "" },
      { text: "Global coverage network", dotIcon: "" },
      { text: "RSS feed syndication", dotIcon: "" },
      { text: "Google News inclusion", dotIcon: "" },
    ],
    exploreText: "Learn More →", exploreIcon: "", exploreLink: "#",
  },
  {
    icon: iconSearch, title: "Media Monitoring & Tracking",
    description: "Track brand mentions and monitor your PR performance across all major media channels in real time.",
    features: [
      { text: "Real-time mention tracking", dotIcon: "" },
      { text: "Competitor analysis tools", dotIcon: "" },
      { text: "Sentiment analysis", dotIcon: "" },
      { text: "Custom alert reports", dotIcon: "" },
    ],
    exploreText: "Learn More →", exploreIcon: "", exploreLink: "#",
  },
  {
    icon: iconChart, title: "Reporting & Analytics",
    description: "Measure your PR performance with detailed analytics dashboards and actionable insights.",
    features: [
      { text: "Open & click-through rates", dotIcon: "" },
      { text: "ROI tracking metrics", dotIcon: "" },
      { text: "Custom dashboards", dotIcon: "" },
      { text: "Exportable reports", dotIcon: "" },
    ],
    exploreText: "Learn More →", exploreIcon: "", exploreLink: "#",
  },
];

const FALLBACK_CTA: CTAData = {
  title: "Ready to Transform Your PR Strategy?",
  description: "Join thousands of brands already using our platform to amplify their message and reach the right audiences.",
  btn1Text: "Start Free Trial", btn1Link: "#",
  btn2Text: "Schedule Demo", btn2Link: "#",
};

export default function Features() {
  const [sectionTitle, setSectionTitle] = useState("Complete PR Solutions");
  const [sectionTitleColor, setSectionTitleColor] = useState("For Modern Brands");
  const [sectionSubtitle, setSectionSubtitle] = useState("Everything you need to distribute press releases, monitor coverage, and track performance.");
  const [cards, setCards] = useState<PRCard[]>(FALLBACK_CARDS);
  const [cta, setCta] = useState<CTAData>(FALLBACK_CTA);

  useEffect(() => {
    fetch(API, { cache: "no-store" })
      .then(r => r.json())
      .then((json) => {
        const acf = json?.acf;
        if (!acf) return;

        // Section header — field names from ACF group "Home - PR Solutions Section"
        if (acf.complete_pr_solutions) setSectionTitle(acf.complete_pr_solutions);
        else if (acf.section_title) setSectionTitle(acf.section_title);
        if (acf.section_title_color) setSectionTitleColor(acf.section_title_color);
        if (acf.section_subtitle) setSectionSubtitle(acf.section_subtitle);

        // PR Cards repeater
        if (Array.isArray(acf.pr_cards) && acf.pr_cards.length > 0) {
          setCards(acf.pr_cards.map((c: any) => ({
            icon: typeof c.icon === "string" ? c.icon : (c.icon?.url || ""),
            title: c.title || "",
            description: c.description || "",
            features: Array.isArray(c.features)
              ? c.features.map((f: any) => ({
                  text: f.feature || "",
                  dotIcon: typeof f.features_dot_point === "string" ? f.features_dot_point : (f.features_dot_point?.url || ""),
                }))
              : [],
            exploreText: c.explore_solution_text || "Learn More →",
            exploreIcon: typeof c.explore_solution_image === "string" ? c.explore_solution_image : (c.explore_solution_image?.url || ""),
            exploreLink: c.explore_solution_link || "#",
          })));
        }

        // CTA fields
        if (acf.cta_title || acf.cta_description) {
          setCta({
            title: acf.cta_title || FALLBACK_CTA.title,
            description: acf.cta_description || FALLBACK_CTA.description,
            btn1Text: acf.cta_btn1_text || FALLBACK_CTA.btn1Text,
            btn1Link: acf.cta_btn1_link || FALLBACK_CTA.btn1Link,
            btn2Text: acf.cta_btn2_text || FALLBACK_CTA.btn2Text,
            btn2Link: acf.cta_btn2_link || FALLBACK_CTA.btn2Link,
          });
        }
      })
      .catch(err => console.error("Features fetch error:", err));
  }, []);

  return (
    <section className="relative bg-[#F6F6F9] pt-20 overflow-hidden">
      <div className="fn-container">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {sectionTitle} <br />
            <span className="text-[#0030F0]">{sectionTitleColor}</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">{sectionSubtitle}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, i) => (
            <div key={i}
              className="group bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 bg-gray-100">
                {card.icon && <img src={card.icon} className="w-7 h-7 object-contain" alt={card.title} />}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{card.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{card.description}</p>
              <ul className="flex flex-col gap-2">
                {card.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2 text-sm text-gray-600">
                    {f.dotIcon
                      ? <img src={f.dotIcon} alt="" className="w-2 h-2 object-contain flex-shrink-0" />
                      : <span className="w-2 h-2 bg-[#0030F0] rounded-full flex-shrink-0" />
                    }
                    {f.text}
                  </li>
                ))}
              </ul>
              <a href={card.exploreLink}
                className="inline-flex items-center gap-1 text-[#0030F0] font-semibold text-sm mt-6 group-hover:gap-2 transition-all">
                {card.exploreText}
                {card.exploreIcon && <img src={card.exploreIcon} alt="" className="w-4 h-4 object-contain" />}
              </a>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="relative bg-gray-50 pt-24 overflow-hidden">
          <div className="relative bg-gray-50 pt-0 pb-0 overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
              <div className="rounded-2xl px-8 py-10 shadow-xl"
                style={{ background: "linear-gradient(135deg, #3b5bff 0%, #2d3edb 100%)" }}>
                <h3 className="text-2xl sm:text-3xl font-semibold mb-3">{cta.title}</h3>
                <p className="text-blue-100 mb-6 text-sm sm:text-base max-w-xl mx-auto">{cta.description}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href={cta.btn1Link}
                    className="px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300"
                    style={{ background: "#fff", color: "#0030F0", border: "2px solid #fff" }}
                    onMouseEnter={e => { const b = e.currentTarget as HTMLAnchorElement; b.style.background = "#0030F0"; b.style.color = "#fff"; }}
                    onMouseLeave={e => { const b = e.currentTarget as HTMLAnchorElement; b.style.background = "#fff"; b.style.color = "#0030F0"; }}
                  >{cta.btn1Text}</a>
                  <a href={cta.btn2Link}
                    className="px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300"
                    style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.6)" }}
                    onMouseEnter={e => { const b = e.currentTarget as HTMLAnchorElement; b.style.background = "#fff"; b.style.color = "#0030F0"; b.style.border = "2px solid #fff"; }}
                    onMouseLeave={e => { const b = e.currentTarget as HTMLAnchorElement; b.style.background = "transparent"; b.style.color = "#fff"; b.style.border = "2px solid rgba(255,255,255,0.6)"; }}
                  >{cta.btn2Text}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
