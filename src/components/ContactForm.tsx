import { useState } from "react";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", company: "", telephone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.company.trim()) e.company = "Company name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  if (submitted) {
    return (
      <section className="pt-20 pb-20 bg-[#F6F6F9]">
        <div className="fn-container">
          <div className="max-w-2xl mx-auto text-center py-16 px-8 bg-white rounded-2xl shadow-sm" style={{ border: "1px solid #e8ecf4" }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(51,102,255,0.1)" }}>
              <svg className="w-8 h-8" style={{ color: "#3366FF" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
            <p className="text-gray-500 text-sm mb-6">Thank you for reaching out. We'll get back to you shortly.</p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: "", company: "", telephone: "", email: "", message: "" }); }}
              className="fn-btn-primary"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-20 pb-20 bg-[#F6F6F9]">
      <div className="fn-container">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your name <span style={{ color: "red" }}>*</span>
                </label>
                <input type="text" name="name" id="name" value={form.name} onChange={handleChange} placeholder="Full name"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  style={{ borderColor: errors.name ? "red" : "#d1d5db" }} />
                {errors.name && <p className="text-xs mt-1" style={{ color: "red" }}>{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company name <span style={{ color: "red" }}>*</span>
                </label>
                <input type="text" name="company" id="company" value={form.company} onChange={handleChange} placeholder="ABC Inc"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  style={{ borderColor: errors.company ? "red" : "#d1d5db" }} />
                {errors.company && <p className="text-xs mt-1" style={{ color: "red" }}>{errors.company}</p>}
              </div>
              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Telephone</label>
                <input type="tel" name="telephone" id="telephone" value={form.telephone} onChange={handleChange} placeholder="Phone number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email <span style={{ color: "red" }}>*</span>
                </label>
                <input type="email" name="email" id="email" value={form.email} onChange={handleChange} placeholder="Email"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  style={{ borderColor: errors.email ? "red" : "#d1d5db" }} />
                {errors.email && <p className="text-xs mt-1" style={{ color: "red" }}>{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message <span style={{ color: "red" }}>*</span>
                </label>
                <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange}
                  placeholder="E.g. Pre-listing to list on OTCQB; require news feed setup."
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  style={{ borderColor: errors.message ? "red" : "#d1d5db" }} />
                {errors.message && <p className="text-xs mt-1" style={{ color: "red" }}>{errors.message}</p>}
              </div>
              <div className="text-center">
                <button type="submit" className="fn-btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
