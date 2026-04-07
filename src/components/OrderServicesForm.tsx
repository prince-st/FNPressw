import { useState } from "react";

const inputClass = "mt-1 block w-full border rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white";
const labelClass = "block text-sm font-medium text-gray-800 mb-1";

const OrderServicesForm = () => {
  const [form, setForm] = useState({
    service: "New release dissemination",
    name: "", company: "", email: "",
    publiclyTraded: "Yes", ticker: "", more: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.company.trim()) e.company = "Required";
    if (!form.email.trim()) e.email = "Required";
    if (!form.ticker.trim()) e.ticker = "Required";
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="pt-20 bg-white">
        <div className="fn-container">
          <div className="max-w-2xl mx-auto text-center py-16 px-8 rounded-2xl" style={{ border: "1px solid #e8ecf4" }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(51,102,255,0.1)" }}>
              <svg className="w-8 h-8" style={{ color: "#3366FF" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Order Submitted!</h3>
            <p className="text-gray-500 text-sm mb-6">Thank you! We've received your order and will be in touch shortly.</p>
            <button onClick={() => { setSubmitted(false); setForm({ service: "New release dissemination", name: "", company: "", email: "", publiclyTraded: "Yes", ticker: "", more: "" }); }} className="fn-btn-primary">
              Submit Another Order
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-20 bg-[#F6F6F9]">
      <div className="fn-container">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">Order Services</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label htmlFor="service" className={labelClass}>Select Service <span style={{ color: "red" }}>*</span></label>
                <select id="service" name="service" value={form.service} onChange={handleChange} className={inputClass} style={{ borderColor: "#d1d5db" }}>
                  <option>New release dissemination</option>
                  <option>Filing Services</option>
                  <option>Media Monitoring</option>
                  <option>Investor Relations</option>
                </select>
              </div>
              <div>
                <label htmlFor="name" className={labelClass}>Your name <span style={{ color: "red" }}>*</span></label>
                <input type="text" name="name" id="name" value={form.name} onChange={handleChange} placeholder="Full name" className={inputClass} style={{ borderColor: errors.name ? "red" : "#d1d5db" }} />
                {errors.name && <p className="text-xs mt-1" style={{ color: "red" }}>{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="company" className={labelClass}>Company name <span style={{ color: "red" }}>*</span></label>
                <input type="text" name="company" id="company" value={form.company} onChange={handleChange} placeholder="ABC Inc" className={inputClass} style={{ borderColor: errors.company ? "red" : "#d1d5db" }} />
                {errors.company && <p className="text-xs mt-1" style={{ color: "red" }}>{errors.company}</p>}
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Email <span style={{ color: "red" }}>*</span></label>
                <input type="email" name="email" id="email" value={form.email} onChange={handleChange} placeholder="Company email" className={inputClass} style={{ borderColor: errors.email ? "red" : "#d1d5db" }} />
                {errors.email && <p className="text-xs mt-1" style={{ color: "red" }}>{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="publiclyTraded" className={labelClass}>Publicly Traded <span style={{ color: "red" }}>*</span></label>
                <select id="publiclyTraded" name="publiclyTraded" value={form.publiclyTraded} onChange={handleChange} className={inputClass} style={{ borderColor: "#d1d5db" }}>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div>
                <label htmlFor="ticker" className={labelClass}>Ticker Symbol(s) <span style={{ color: "red" }}>*</span></label>
                <input type="text" name="ticker" id="ticker" value={form.ticker} onChange={handleChange} placeholder="CSL-ASX; OTC-XXX" className={inputClass} style={{ borderColor: errors.ticker ? "red" : "#d1d5db" }} />
                {errors.ticker && <p className="text-xs mt-1" style={{ color: "red" }}>{errors.ticker}</p>}
              </div>
              <div>
                <label htmlFor="more" className={labelClass}>Tell Us More</label>
                <textarea id="more" name="more" rows={4} value={form.more} onChange={handleChange} placeholder="E.g. Pre-listing to list on OTCQB; require news feed setup." className={inputClass} style={{ borderColor: "#d1d5db" }} />
              </div>
              <div className="text-center pt-2">
                <button type="submit" className="fn-btn-primary px-10">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OrderServicesForm;
