import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="fn-container">
        <div className="rounded-2xl p-10 md:p-14 text-center"
          style={{ background: "linear-gradient(135deg, #0d1a5e 0%, #1a2a80 100%)" }}>
          <p className="text-blue-300 font-semibold uppercase text-xs tracking-widest mb-3">Newsletter</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Stay Updated with PR Insights
          </h2>
          <p className="text-blue-200 text-sm mb-8 max-w-md mx-auto">
            Get the latest PR tips, industry news, and platform updates delivered straight to your inbox.
          </p>

          {submitted ? (
            <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-white font-medium max-w-md mx-auto">
              Thank you for subscribing! You'll receive our next newsletter soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
              <button type="submit" className="fn-btn-white whitespace-nowrap">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
