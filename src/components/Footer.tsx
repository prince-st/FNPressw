import { useState, useEffect } from "react";
import { Link } from "wouter";
import logoImg from "@/assets/logo.png";
import s1 from "@/assets/s_1.png";
import s2 from "@/assets/s_2.png";
import s3 from "@/assets/s_3.png";
import emailIcon from "@/assets/E_icon.png";
import phoneIcon from "@/assets/P_icon.png";
import locationIcon from "@/assets/L_icon.png";
import newShape1 from "@/assets/new_shape_1.png";

const API = `https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2/pages/300?acf_format=standard&_=${Date.now()}`;

interface LinkItem { text: string; url: string; }

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Newsletter
  const [newsletterTitle, setNewsletterTitle] = useState("Stay Updated with PR Insights");
  const [newsletterDesc, setNewsletterDesc] = useState("Get the latest communications trends, best practices, and platform updates delivered to your inbox.");
  const [newsletterPlaceholder, setNewsletterPlaceholder] = useState("Enter your email address");
  const [newsletterBtnText, setNewsletterBtnText] = useState("Subscribe");
  const [newsletterNote, setNewsletterNote] = useState("No spam, unsubscribe at any time.");

  // Brand
  const [footerLogo, setFooterLogo] = useState(logoImg);
  const [footerDesc, setFooterDesc] = useState("Transforming how brands distribute news, pitch the media, and manage public relations with industry-leading communication platforms.");
  const [emailImg, setEmailImg] = useState(emailIcon);
  const [footerEmail, setFooterEmail] = useState("hello@accesscommunications.com");
  const [phoneImg, setPhoneImg] = useState(phoneIcon);
  const [footerPhone, setFooterPhone] = useState("+1 (555) 123-4567");
  const [addressImg, setAddressImg] = useState(locationIcon);
  const [footerAddress, setFooterAddress] = useState("San Francisco, CA");

  // Link columns
  const [platformsText, setPlatformsText] = useState("Platforms");
  const [platformLinks, setPlatformLinks] = useState<LinkItem[]>([
    { text: "ACCESS PR", url: "#" }, { text: "ACCESS IR", url: "#" },
    { text: "Media Database", url: "#" }, { text: "Analytics Dashboard", url: "#" },
  ]);
  const [solutionsText, setSolutionsText] = useState("Solutions");
  const [solutionLinks, setSolutionLinks] = useState<LinkItem[]>([
    { text: "Press Release Distribution", url: "#" }, { text: "Media Monitoring", url: "#" },
    { text: "Investor Relations", url: "#" }, { text: "Crisis Communications", url: "#" },
  ]);
  const [resourcesText, setResourcesText] = useState("Resources");
  const [resourceLinks, setResourceLinks] = useState<LinkItem[]>([
    { text: "Help Center", url: "#" }, { text: "API Documentation", url: "#" },
    { text: "Best Practices", url: "#" }, { text: "Webinars", url: "#" },
  ]);
  const [companyText, setCompanyText] = useState("Company");
  const [companyLinks, setCompanyLinks] = useState<LinkItem[]>([
    { text: "About Us", url: "#" }, { text: "Careers", url: "#" },
    { text: "Press Kit", url: "#" }, { text: "Contact", url: "#" },
  ]);

  // Social & bottom
  const [socialLinks, setSocialLinks] = useState([
    { icon: s1, url: "#" }, { icon: s2, url: "#" }, { icon: s3, url: "#" },
  ]);
  const [bottomLinks, setBottomLinks] = useState<LinkItem[]>([
    { text: "Privacy Policy", url: "#" }, { text: "Terms of Service", url: "#" },
    { text: "Cookie Policy", url: "#" }, { text: "GDPR", url: "#" },
  ]);
  const [copyright, setCopyright] = useState("© 2024 ACCESS Communications. All rights reserved.");

  useEffect(() => {
    fetch(API, { cache: "no-store" })
      .then(r => r.json())
      .then((json) => {
        const acf = json?.acf;
        if (!acf) return;

        if (acf.newsletter_title) setNewsletterTitle(acf.newsletter_title);
        if (acf.newsletter_description) setNewsletterDesc(acf.newsletter_description);
        if (acf.newsletter_placeholder) setNewsletterPlaceholder(acf.newsletter_placeholder);
        if (acf.newsletter_button_text) setNewsletterBtnText(acf.newsletter_button_text);
        if (acf.newsletter_note) setNewsletterNote(acf.newsletter_note);

        if (acf.footer_logo) setFooterLogo(typeof acf.footer_logo === "string" ? acf.footer_logo : (acf.footer_logo?.url || logoImg));
        if (acf.footer_description) setFooterDesc(acf.footer_description);
        if (acf.email_image) setEmailImg(typeof acf.email_image === "string" ? acf.email_image : (acf.email_image?.url || emailIcon));
        if (acf.footer_email) setFooterEmail(acf.footer_email);
        if (acf.phone_image) setPhoneImg(typeof acf.phone_image === "string" ? acf.phone_image : (acf.phone_image?.url || phoneIcon));
        if (acf.footer_phone) setFooterPhone(acf.footer_phone);
        if (acf.address_image) setAddressImg(typeof acf.address_image === "string" ? acf.address_image : (acf.address_image?.url || locationIcon));
        if (acf.footer_address) setFooterAddress(acf.footer_address);

        const parseLinks = (arr: any[]): LinkItem[] => arr.map((l: any) => ({ text: l.text || "", url: l.url || "#" }));

        if (acf.platforms_text) setPlatformsText(acf.platforms_text);
        if (Array.isArray(acf.platform_links) && acf.platform_links.length > 0) setPlatformLinks(parseLinks(acf.platform_links));
        if (acf.solutions_text) setSolutionsText(acf.solutions_text);
        if (Array.isArray(acf.solution_links) && acf.solution_links.length > 0) setSolutionLinks(parseLinks(acf.solution_links));
        if (acf.resources_text) setResourcesText(acf.resources_text);
        if (Array.isArray(acf.resources_links) && acf.resources_links.length > 0) setResourceLinks(parseLinks(acf.resources_links));
        if (acf.company_text) setCompanyText(acf.company_text);
        if (Array.isArray(acf.company_links) && acf.company_links.length > 0) setCompanyLinks(parseLinks(acf.company_links));

        if (Array.isArray(acf.social_links) && acf.social_links.length > 0) {
          setSocialLinks(acf.social_links.map((s: any, i: number) => ({
            icon: typeof s.icon === "string" ? s.icon : (s.icon?.url || [s1, s2, s3][i] || s1),
            url: s.url || "#",
          })));
        }
        if (Array.isArray(acf.bottom_links) && acf.bottom_links.length > 0) setBottomLinks(parseLinks(acf.bottom_links));
        if (acf.footer_copyright) setCopyright(acf.footer_copyright);
      })
      .catch(err => console.error("Footer fetch error:", err));
  }, []);

  const linkColumns = [
    { title: platformsText, links: platformLinks },
    { title: solutionsText, links: solutionLinks },
    { title: resourcesText, links: resourceLinks },
    { title: companyText, links: companyLinks },
  ];

  return (
    <footer>
      <div className="w-full leading-[0]" style={{ background: "#0D1A5E" }}>
        <img src={newShape1} alt="" className="w-full block" />
      </div>

      <div style={{ background: "#0d1a5e" }}>

        {/* Newsletter */}
        <div className="fn-container pt-20 pb-28 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 pt-20">{newsletterTitle}</h3>
          <p className="text-sm mb-7 max-w-lg mx-auto leading-relaxed" style={{ color: "#fff" }}>{newsletterDesc}</p>
          {submitted ? (
            <div className="inline-block bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white text-sm font-medium">
              Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email) { setSubmitted(true); setEmail(""); } }}
              className="max-w-lg mx-auto flex items-center gap-3">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder={newsletterPlaceholder} required
                className="flex-1 px-5 py-3.5 text-sm outline-none text-gray-500 rounded-2xl"
                style={{ background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }} />
              <button type="submit"
                className="px-6 py-3.5 text-sm font-semibold text-white rounded-2xl transition-all hover:opacity-90 whitespace-nowrap flex-shrink-0"
                style={{ background: "#0030F0" }}>
                {newsletterBtnText}
              </button>
            </form>
          )}
          <p className="text-xs mt-6 mb-20" style={{ color: "#fff" }}>{newsletterNote}</p>
        </div>

        {/* Links grid */}
        <div className="fn-container py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex flex-col items-start mb-4">
                <img src={footerLogo} alt="FN Press Wire" className="h-12 w-auto object-contain mb-2"
                  style={{ filter: "brightness(0) invert(1)" }} />
              </Link>
              <p className="text-xs leading-relaxed mb-6" style={{ color: "#626D84" }}>{footerDesc}</p>
              <div className="flex flex-col gap-2 mb-5">
                <a href={`mailto:${footerEmail}`} className="flex items-center gap-3 text-xs hover:text-white transition-colors" style={{ color: "#626D84" }}>
                  <img src={emailImg} alt="email" className="w-5 h-5 object-contain flex-shrink-0" />
                  {footerEmail}
                </a>
                <a href={`tel:${footerPhone}`} className="flex items-center gap-3 text-xs hover:text-white transition-colors" style={{ color: "#626D84" }}>
                  <img src={phoneImg} alt="phone" className="w-5 h-5 object-contain flex-shrink-0" />
                  {footerPhone}
                </a>
                <span className="flex items-center gap-3 text-xs" style={{ color: "#626D84" }}>
                  <img src={addressImg} alt="location" className="w-5 h-5 object-contain flex-shrink-0" />
                  {footerAddress}
                </span>
              </div>
              <div className="flex gap-3">
                {socialLinks.map((s, i) => (
                  <a key={i} href={s.url}
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:opacity-80"
                    style={{ background: "#fff" }}>
                    <img src={s.icon} alt="" className="w-5 h-5 object-contain" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {linkColumns.map((col) => (
              <div key={col.title}>
                <h4 className="text-white font-semibold text-sm mb-4">{col.title}</h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <a href={link.url} className="text-xs hover:text-white transition-colors" style={{ color: "#626D84" }}>
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="fn-container">
          <div className="w-full mt-10 mb-1" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
          <div className="pt-5 pb-20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-4">
              {bottomLinks.map((link, i) => (
                <a key={i} href={link.url} className="text-xs hover:text-white transition-colors" style={{ color: "#626D84" }}>
                  {link.text}
                </a>
              ))}
            </div>
            <p className="text-xs" style={{ color: "#626D84" }}>{copyright}</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
