import { useState } from "react";
import { Link } from "wouter";
import logoImg from "@/assets/logo.png";
import link1 from "@/assets/s_1.png";
import link2 from "@/assets/s_2.png";
import link3 from "@/assets/s_3.png";
import emailIcon from "@/assets/E_icon.png";
import phoneIcon from "@/assets/P_icon.png";
import locationIcon from "@/assets/L_icon.png";
import newShape1 from "@/assets/new_shape_1.png";

const footerLinks = {
  Platforms: ["ACCESS PR", "ACCESS IR", "Media Database", "Analytics Dashboard"],
  Solutions: ["Press Release Distribution", "Media Monitoring", "Investor Relations", "Crisis Communications"],
  Resources: ["Help Center", "API Documentation", "Best Practices", "Webinars"],
  Company: ["About Us", "Careers", "Press Kit", "Contact"],
};

const bottomLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer>
      {/* Wave transition from light to dark */}
      <div className="w-full leading-[0]" style={{ background: "#0D1A5E" }}>
        <img src={newShape1} alt="" className="w-full block" />
      </div>

      {/* Dark navy body */}
      <div style={{ background: "#0d1a5e" }}>

        {/* Newsletter strip */}
        <div className="fn-container pt-20 pb-28 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 pt-20">
            Stay Updated with PR Insights
          </h3>
          <p className="text-sm mb-7 max-w-lg mx-auto leading-relaxed" style={{ color: "#fff" }}>
            Get the latest communications trends, best practices, and platform updates delivered to your inbox.
          </p>
          {submitted ? (
            <div className="inline-block bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white text-sm font-medium">
              Thank you for subscribing!
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) { setSubmitted(true); setEmail(""); } }}
              className="max-w-lg mx-auto flex items-center gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-3.5 text-sm outline-none text-gray-500 rounded-2xl"
                style={{ background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}
              />
              <button
                type="submit"
                className="px-6 py-3.5 text-sm font-semibold text-white rounded-2xl transition-all hover:opacity-90 whitespace-nowrap flex-shrink-0"
                style={{ background: "#3366FF" }}
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="text-xs mt-6 mb-20" style={{ color: "#fff" }}>No spam, unsubscribe at any time.</p>
        </div>

        {/* Divider */}
        {/* <div className="fn-container">
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
        </div> */}

    
        {/* Links grid */}
        <div className="fn-container py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex flex-col items-start mb-4">
                <img
                  src={logoImg}
                  alt="FN Press Wire"
                  className="h-12 w-auto object-contain mb-2"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <span className="text-white font-bold text-xl">FN Press Wire</span>
              </Link>
              <p className="text-xs leading-relaxed mb-6" style={{ color: "#626D84" }}>
                Transforming how brands distribute news, pitch the media, and manage public relations with industry-leading communication platforms.
              </p>
              {/* Contact info */}
              <div className="flex flex-col gap-2 mb-5">
                <a href="mailto:hello@accesscommunications.com" className="flex items-center gap-3 text-xs hover:text-white transition-colors" style={{ color: "#626D84" }}>
                  <img src={emailIcon} alt="email" className="w-5 h-5 object-contain flex-shrink-0" />
                  hello@accesscommunications.com
                </a>
                <a href="tel:+15551234567" className="flex items-center gap-3 text-xs hover:text-white transition-colors" style={{ color: "#626D84" }}>
                  <img src={phoneIcon} alt="phone" className="w-5 h-5 object-contain flex-shrink-0" />
                  +1 (555) 123-4567
                </a>
                <span className="flex items-center gap-3 text-xs" style={{ color: "#626D84" }}>
                  <img src={locationIcon} alt="location" className="w-5 h-5 object-contain flex-shrink-0" />
                  San Francisco, CA
                </span>
              </div>
              {/* Social icons */}
              <div className="flex gap-3">
                {[link1, link2, link3].map((icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:opacity-80"
                    style={{ background: "#fff" }}
                  >
                    <img src={icon} alt="" className="w-5 h-5 object-contain" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-xs hover:text-white transition-colors" style={{ color: "#626D84" }}>
                        {link}
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

          <div className="w-full leading-[0] mt-10 mb-1" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />

          <div className="pt-5 pb-20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-4 ">
              {bottomLinks.map((link) => (
                <a key={link} href="#" className="text-xs hover:text-white transition-colors" style={{ color: "#626D84" }}>
                  {link}
                </a>
              ))}
            </div>
            <p className="text-xs " style={{ color: "#626D84" }}>
              © 2024 ACCESS Communications. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
