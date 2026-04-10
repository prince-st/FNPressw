import { useState, useEffect } from "react";

const API = `https://dev-fnpresswire.pantheonsite.io/wp-json/wp/v2/pages/454?acf_format=standard&_=${Date.now()}`;

const inputClass = "mt-1 block w-full border rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white";
const labelClass = "block text-sm font-medium text-gray-800 mb-1";

const OrderServicesForm = () => {
  const [form, setForm] = useState({
    service: "", name: "", company: "", email: "",
    publiclyTraded: "Yes", ticker: "", more: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Dynamic labels from ACF
  const [formTitle, setFormTitle] = useState("Order Services");
  const [selectServiceLabel, setSelectServiceLabel] = useState("Select Service");
  const [serviceOptions, setServiceOptions] = useState(["New release dissemination", "Filing Services", "Media Monitoring", "Investor Relations"]);
  const [yourNameLabel, setYourNameLabel] = useState("Your name");
  const [fullNamePlaceholder, setFullNamePlaceholder] = useState("Full name");
  const [companyNameLabel, setCompanyNameLabel] = useState("Company name");
  const [abcIncPlaceholder, setAbcIncPlaceholder] = useState("ABC Inc");
  const [emailLabel, setEmailLabel] = useState("Email");
  const [companyEmailPlaceholder, setCompanyEmailPlaceholder] = useState("Company email");
  const [publiclyTradedLabel, setPubliclyTradedLabel] = useState("Publicly Traded");
  const [publiclyTradedOptions, setPubliclyTradedOptions] = useState(["Yes", "No"]);
  const [tickerLabel, setTickerLabel] = useState("Ticker Symbol(s)");
  const [tickerPlaceholder, setTickerPlaceholder] = useState("CSL-ASX; OTC-XXX");
  const [tellUsMoreLabel, setTellUsMoreLabel] = useState("Tell Us More");
  const [tellUsMorePlaceholder, setTellUsMorePlaceholder] = useState("E.g. Pre-listing to list on OTCQB; require news feed setup.");
  const [submitText, setSubmitText] = useState("Submit");
  const [submitLink, setSubmitLink] = useState("");

  useEffect(() => {
    fetch(API, { cache: "no-store" })
      .then(r => r.json())
      .then((json) => {
        const acf = json?.acf;
        if (!acf) return;
        if (acf.title) setFormTitle(acf.title);
        if (acf.select_service) setSelectServiceLabel(acf.select_service);
        if (Array.isArray(acf.services) && acf.services.length > 0) {
          setServiceOptions(acf.services.map((s: any) => s.service_option || s.option || s));
          setForm(f => ({ ...f, service: acf.services[0]?.service_option || acf.services[0]?.option || "" }));
        }
        if (acf.your_name) setYourNameLabel(acf.your_name);
        if (acf.full_name) setFullNamePlaceholder(acf.full_name);
        if (acf.company_name) setCompanyNameLabel(acf.company_name);
        if (acf.abc_inc) setAbcIncPlaceholder(acf.abc_inc);
        if (acf.email_services) setEmailLabel(acf.email_services);
        if (acf.company_email) setCompanyEmailPlaceholder(acf.company_email);
        if (acf.publicly_traded) setPubliclyTradedLabel(acf.publicly_traded);
        if (acf.publicly_traded_yes_no) {
          const opts = typeof acf.publicly_traded_yes_no === "string"
            ? acf.publicly_traded_yes_no.split(",").map((s: string) => s.trim())
            : Object.values(acf.publicly_traded_yes_no);
          if (opts.length > 0) setPubliclyTradedOptions(opts as string[]);
        }
        if (acf.ticker_symbol) setTickerLabel(acf.ticker_symbol);
        if (acf.formet_ticker_symbol) setTickerPlaceholder(acf.formet_ticker_symbol);
        if (acf.tell_us_more) setTellUsMoreLabel(acf.tell_us_more);
        if (acf.tell_us_more_info) setTellUsMorePlaceholder(acf.tell_us_more_info);
        if (acf.submit_text) setSubmitText(acf.submit_text);
        if (acf.submit_link) setSubmitLink(acf.submit_link);
      })
      .catch(err => console.error("OrderServicesForm fetch error:", err));
  }, []);

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
              <svg className="w-8 h-8" style={{ color: "#0030F0" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Order Submitted!</h3>
            <p className="text-gray-500 text-sm mb-6">Thank you! We've received your order and will be in touch shortly.</p>
            <button onClick={() => setSubmitted(false)} className="fn-btn-primary">Submit Another Order</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-20 bg-[#F6F6F9]">
      <div className="fn-container">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">{formTitle}</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className={labelClass}>{selectServiceLabel} <span style={{ color: "red" }}>*</span></label>
                <select name="service" value={form.service} onChange={handleChange} className={inputClass} style={{ borderColor: "#d1d5db" }}>
                  {serviceOptions.map((opt, i) => <option key={i}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>{yourNameLabel} <span style={{ color: "red" }}>*</span></label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder={fullNamePlaceholder} className={inputClass} style={{ borderColor: errors.name ? "red" : "#d1d5db" }} />
                {errors.name && <p className="text-xs mt-1" style={{ color: "red" }}>{errors.name}</p>}
              </div>
              <div>
                <label className={labelClass}>{companyNameLabel} <span style={{ color: "red" }}>*</span></label>
                <input type="text" name="company" value={form.company} onChange={handleChange} placeholder={abcIncPlaceholder} className={inputClass} style={{ borderColor: errors.company ? "red" : "#d1d5db" }} />
                {errors.company && <p className="text-xs mt-1" style={{ color: "red" }}>{errors.company}</p>}
              </div>
              <div>
                <label className={labelClass}>{emailLabel} <span style={{ color: "red" }}>*</span></label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder={companyEmailPlaceholder} className={inputClass} style={{ borderColor: errors.email ? "red" : "#d1d5db" }} />
                {errors.email && <p className="text-xs mt-1" style={{ color: "red" }}>{errors.email}</p>}
              </div>
              <div>
                <label className={labelClass}>{publiclyTradedLabel} <span style={{ color: "red" }}>*</span></label>
                <select name="publiclyTraded" value={form.publiclyTraded} onChange={handleChange} className={inputClass} style={{ borderColor: "#d1d5db" }}>
                  {publiclyTradedOptions.map((opt, i) => <option key={i}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>{tickerLabel} <span style={{ color: "red" }}>*</span></label>
                <input type="text" name="ticker" value={form.ticker} onChange={handleChange} placeholder={tickerPlaceholder} className={inputClass} style={{ borderColor: errors.ticker ? "red" : "#d1d5db" }} />
                {errors.ticker && <p className="text-xs mt-1" style={{ color: "red" }}>{errors.ticker}</p>}
              </div>
              <div>
                <label className={labelClass}>{tellUsMoreLabel}</label>
                <textarea name="more" rows={4} value={form.more} onChange={handleChange} placeholder={tellUsMorePlaceholder} className={inputClass} style={{ borderColor: "#d1d5db" }} />
              </div>
              <div className="text-center pt-2">
                <button type="submit" className="fn-btn-primary px-10">{submitText}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OrderServicesForm;
