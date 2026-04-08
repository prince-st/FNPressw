import { useState, useEffect } from "react";
import { Link } from "wouter";
import logoImg from "@/assets/logo.png";
import headerBtnIcon from "@/assets/Header_btn.png";

const WP_API = "https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2/pages/14";

// Fallback static data if API fails
const fallbackNavLinks = [
  { label: "Platforms", href: "#platforms" },
  { label: "Solutions", href: "#solutions" },
  { label: "Partners", href: "#partners" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
];

interface NavLink { label: string; href: string; }
interface HeaderData {
  navLinks: NavLink[];
  signInLabel: string;
  signInUrl: string;
  ctaLabel: string;
  ctaUrl: string;
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState<HeaderData>({
    navLinks: fallbackNavLinks,
    signInLabel: "Sign In",
    signInUrl: "/Contact",
    ctaLabel: "Get Started",
    ctaUrl: "#",
  });

  useEffect(() => {
    fetch(WP_API)
      .then((r) => r.json())
      .then((json) => {
        const acf = json?.acf;
        if (!acf) return;
        setData({
          navLinks: Array.isArray(acf.nav_links)
            ? acf.nav_links.map((n: any) => ({ label: n.label, href: n.href }))
            : fallbackNavLinks,
          signInLabel: acf.sign_in_label || "Sign In",
          signInUrl: acf.sign_in_url || "/Contact",
          ctaLabel: acf.cta_label || "Get Started",
          ctaUrl: acf.cta_url || "#",
        });
      })
      .catch(() => {/* keep fallback */});
  }, []);

  return (
    <header className="w-full bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="fn-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <img src={logoImg} alt="FN Press Wire" className="h-8 md:h-10 w-auto object-contain cursor-pointer" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {data.navLinks.map((link) => (
              <Link key={link.label} href={link.href}
                className="text-gray-600 hover:text-[#0030F0] font-medium text-sm transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <Link href={data.signInUrl} className="text-[#0030F0] font-semibold text-sm hover:underline">
              {data.signInLabel}
            </Link>
            <a href={data.ctaUrl} className="fn-btn-primary px-6 py-2.5 text-sm flex items-center gap-2">
              <img src={headerBtnIcon} alt="" className="w-4 h-4 object-contain" />
              {data.ctaLabel}
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
            {data.navLinks.map((link) => (
              <Link key={link.label} href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium text-sm px-2 py-1.5 hover:text-[#0030F0] transition-colors">
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-2 border-t border-gray-100 mt-1">
              <Link href={data.signInUrl} className="text-[#0030F0] font-semibold text-sm">
                {data.signInLabel}
              </Link>
              <a href={data.ctaUrl} className="fn-btn-primary px-5 py-2 text-sm flex items-center gap-2">
                <img src={headerBtnIcon} alt="" className="w-4 h-4 object-contain" />
                {data.ctaLabel}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
