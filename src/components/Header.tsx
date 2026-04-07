import { useState } from "react";
import { Link } from "wouter";
import logoImg from "@/assets/logo.png";
import headerBtnIcon from "@/assets/Header_btn.png";

const navLinks = [
  { label: "Platforms", href: "#platforms" },
  { label: "Solutions", href: "#solutions" },
  { label: "Partners", href: "#partners" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href}
                className="text-gray-600 hover:text-[#3366FF] font-medium text-sm transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a href="#" className="text-[#3366FF] font-semibold text-sm hover:underline">Sign In</a>
            <a href="#" className="fn-btn-primary px-6 py-2.5 text-sm flex items-center gap-2">
              <img src={headerBtnIcon} alt="" className="w-4 h-4 object-contain" />
              Get Started
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
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium text-sm px-2 py-1.5 hover:text-[#3366FF] transition-colors">
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-2 border-t border-gray-100 mt-1">
              <a href="#" className="text-[#3366FF] font-semibold text-sm">Sign In</a>
              <a href="#" className="fn-btn-primary px-5 py-2 text-sm flex items-center gap-2">
                <img src={headerBtnIcon} alt="" className="w-4 h-4 object-contain" />
                Get Started
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
