import { useState, useEffect } from "react";

const API = `https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2/pages/575?acf_format=standard&_=${Date.now()}`;

const inputClass = "mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", company: "", telephone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [labels, setLabels] = useState({
    yourName: "Your name",
    namePlaceholder: "Full name",
    companyName: "Company name",
    companyPlaceholder: "ABC Inc",
    phoneLabel: "Telephone",
    phonePlaceholder: "Phone number",
    emailLabel: "Email",
    emailPlaceholder: "Email",
    messageLabel: "Message",
    messagePlaceholder: "E.g. Pre-listing to list on OTCQB; require news feed setup.",
    required: "*",
    submitText: "Submit",
    submitLink: "",
  });

  useEffect(() => {
    fetch(API, { cache: "no-store" })
      .then(r => r.json())
      .then((json) => {
        const acf = json?.acf;
        if (!acf) return;
        setLabels(prev => ({
          yourName: acf.your_name_contact || prev.yourName,
          namePlaceholder: acf.full_name_placeholder || prev.namePlaceholder,
          companyName: acf.company_name_contact || prev.companyName,
          companyPlaceholder: acf.abc_placeholder_contact || prev.companyPlaceholder,
          phoneLabel: acf.phone_label || prev.phoneLabel,
          phonePlaceholder: acf.phone_placeholder || prev.phonePlaceholder,
          emailLabel: acf.email_label || prev.emailLabel,
          emailPlaceholder: acf.email_placeholder || prev.emailPlaceholder,
          messageLabel: acf.message_label || prev.messageLabel,
          messagePlaceholder: acf.message_placeholder || prev.messagePlaceholder,
          required: acf.required || prev.required,
          submitText: acf.submit_text || prev.submitText,
          submitLink: acf.contact_submit_button_link || prev.submitLink,
        }));
      })
      .catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(er => ({ ...er, [e.target.name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.company.trim()) errs.company = "Required";
    if (!form.email.trim()) errs.email = "Required";
    if (!form.message.trim()) errs.message = "Required";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="pt-20 pb-20 bg-[#F6F6F9]">
        <div className="fn-container">
          <div className="max-w-2xl mx-auto text-center py-16 px-8 bg-white rounded-2xl shadow-sm" style={{ border: "1px solid #e8ecf4" }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(0,48,240,0.1)" }}>
              <svg className="w-8 h-8" style={{ color: "#0030F0" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
            <p className="text-gray-500 text-sm mb-6">Thank you for reaching out. We'll get back to you shortly.</p>
            <button onClick={() => { setSubmitted(false); setForm({ name: "", company: "", telephone: "", email: "", message: "" }); }}
              className="fn-btn-primary">Send Another Message</button>
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
                <label className="block text-sm font-medium text-gray-700">
                  {labels.yourName} <span style={{ color: "red" }}>{labels.required}</span>
                </label>
                <input type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder={labels.namePlaceholder} className={inputClass}
                  style={{ borderColor: errors.name ? "red" : "#d1d5db" }} />
                {errors.name && <p className="text-xs mt-1 text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {labels.companyName} <span style={{ color: "red" }}>{labels.required}</span>
                </label>
                <input type="text" name="company" value={form.company} onChange={handleChange}
                  placeholder={labels.companyPlaceholder} className={inputClass}
                  style={{ borderColor: errors.company ? "red" : "#d1d5db" }} />
                {errors.company && <p className="text-xs mt-1 text-red-500">{errors.company}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">{labels.phoneLabel}</label>
                <input type="tel" name="telephone" value={form.telephone} onChange={handleChange}
                  placeholder={labels.phonePlaceholder} className={inputClass} style={{ borderColor: "#d1d5db" }} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {labels.emailLabel} <span style={{ color: "red" }}>{labels.required}</span>
                </label>
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder={labels.emailPlaceholder} className={inputClass}
                  style={{ borderColor: errors.email ? "red" : "#d1d5db" }} />
                {errors.email && <p className="text-xs mt-1 text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {labels.messageLabel} <span style={{ color: "red" }}>{labels.required}</span>
                </label>
                <textarea name="message" rows={4} value={form.message} onChange={handleChange}
                  placeholder={labels.messagePlaceholder} className={inputClass}
                  style={{ borderColor: errors.message ? "red" : "#d1d5db" }} />
                {errors.message && <p className="text-xs mt-1 text-red-500">{errors.message}</p>}
              </div>

              <div className="text-center">
                <button type="submit" className="fn-btn-primary">{labels.submitText}</button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
