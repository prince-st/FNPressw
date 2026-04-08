import { useState, useEffect } from "react";
import { Link } from "wouter";
import logoImg from "@/assets/logo.png";
import headerBtnIcon from "@/assets/Header_btn.png";

const WP_BASE = "https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2";

interface NavLink { label: string; href: string; }
interface HData {
  navLinks: NavLink[];
  signInLabel: string;
  signInUrl: string;
  ctaLabel: string;
  ctaUrl: string;
  logoUrl: string;
  ctaIcon: string;
}

const FALLBACK: HData = {
  navLinks: [
    { label: "Platforms", href: "#platforms" },
    { label: "Solutions", href: "#solutions" },
    { label: "Partners", href: "#partners" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Pricing", href: "#pricing" },
  ],
  signInLabel: "Sign In",
  signInUrl: "/Contact",
  ctaLabel: "Get Started",
  ctaUrl: "#",
  logoUrl: logoImg,
  ctaIcon: headerBtnIcon,
};

async function getJson(url: string) {
  const r = await fetch(url, { headers: { Accept: "application/json" } });
  const text = await r.text();
  // Guard: Pantheon sandbox sometimes returns HTML
  if (!text.trim().startsWith("{") && !text.trim().startsWith("[")) return null;
  return JSON.parse(text);
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hd, setHd] = useState<HData>(FALLBACK);

  useEffect(() => {
    (async () => {
      try {
        const json = await getJson(`${WP_BASE}/pages/14`);
        if (!json?.acf) return;
        const acf = json.acf;

        // Nav links
        const navLinks: NavLink[] = Array.isArray(acf.menu)
          ? acf.menu.map((n: any) => ({ label: n.heading ?? "", href: n.link || "#" }))
          : FALLBACK.navLinks;

        // Logo media
        let logoUrl = FALLBACK.logoUrl;
        if (typeof acf.logo === "number") {
          const m = await getJson(`${WP_BASE}/media/${acf.logo}`);
          if (m?.source_url) logoUrl = m.source_url;
        }

        // CTA icon media
        let ctaIcon = FALLBACK.ctaIcon;
        if (typeof acf.cta_button_icon === "number") {
          const m = await getJson(`${WP_BASE}/media/${acf.cta_button_icon}`);
          if (m?.source_url) ctaIcon = m.source_url;
        }

        setHd({
          navLinks,
          signInLabel: acf.signin_text || FALLBACK.signInLabel,
          signInUrl: acf.signin_link || FALLBACK.signInUrl,
          ctaLabel: acf.cta_text || FALLBACK.ctaLabel,
          ctaUrl: acf.cta_link || FALLBACK.ctaUrl,
          logoUrl,
          ctaIcon,
        });
      } catch (e) {
        console.error("Header WP fetch failed:", e);
      }
    })();
  }, []);

  return (
    <header className="w-full bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="fn-container">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <img src={hd.logoUrl} alt="FN Press Wire" className="h-8 md:h-10 w-auto object-contain cursor-pointer" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {hd.navLinks.map((link) => (
              <Link key={link.label} href={link.href}
                className="text-gray-600 hover:text-[#0030F0] font-medium text-sm transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <Link href={hd.signInUrl} className="text-[#0030F0] font-semibold text-sm hover:underline">
              {hd.signInLabel}
            </Link>
            <a href={hd.ctaUrl} className="fn-btn-primary px-6 py-2.5 text-sm flex items-center gap-2">
              <img src={hd.ctaIcon} alt="" className="w-4 h-4 object-contain" />
              {hd.ctaLabel}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 flex flex-col gap-3">
            {hd.navLinks.map((link) => (
              <Link key={link.label} href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium text-sm px-2 py-1.5 hover:text-[#0030F0] transition-colors">
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-2 border-t border-gray-100 mt-1">
              <Link href={hd.signInUrl} className="text-[#0030F0] font-semibold text-sm">
                {hd.signInLabel}
              </Link>
              <a href={hd.ctaUrl} className="fn-btn-primary px-5 py-2 text-sm flex items-center gap-2">
                <img src={hd.ctaIcon} alt="" className="w-4 h-4 object-contain" />
                {hd.ctaLabel}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
