import { useState } from 'react';
import { storage } from '../utils/storage';

export default function B2BSection() {
  const [form, setForm] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    knifeCount: '',
    frequency: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.businessName.trim()) e.businessName = 'Required';
    if (!form.contactName.trim()) e.contactName = 'Required';
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    storage.push('sharppost_b2b', { ...form, timestamp: new Date().toISOString() });
    setSubmitted(true);
  };

  return (
    <section id="b2b" className="bg-[#f5f5f0] py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <div>
            <p className="text-[#4a7fa5] font-bold text-xs uppercase tracking-widest mb-4">Commercial Accounts</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0f0f0f] leading-tight mb-6">
              Dull knives are<br />a safety issue.
            </h2>
            <p className="text-[#0f0f0f]/60 text-base leading-relaxed mb-6">
              A dull blade requires more force. More force means less control. In a commercial kitchen, that's not a preference issue — it's a liability. We run monthly bulk sharpening contracts for restaurants, butchers, caterers, and food businesses across Australia.
            </p>
            <p className="text-[#0f0f0f]/60 text-base leading-relaxed mb-10">
              One account. One invoice. All knives returned to a professional working edge on a schedule that suits your operation.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                'Volume pricing — 10+ knives per service',
                'Your schedule: weekly, fortnightly, or monthly',
                'Single invoice — easy reconciliation',
                'Condition report with every return',
                'Direct courier: Sydney, Newcastle, Lake Macquarie',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#0f0f0f]/70">
                  <span className="w-4 h-px bg-[#4a7fa5] mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="bg-[#0f0f0f] p-6">
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Direct courier available in</p>
              <p className="text-white text-sm font-semibold">Sydney · Newcastle · Lake Macquarie · Central Coast</p>
              <p className="text-white/30 text-xs mt-1">All other regions via prepaid Australia Post satchel.</p>
            </div>
          </div>

          {/* Right: form */}
          <div>
            {submitted ? (
              <div className="bg-[#0f0f0f] p-10 text-center">
                <p className="text-xs font-bold text-[#4a7fa5] uppercase tracking-widest mb-3">Quote Requested</p>
                <h3 className="text-2xl font-black text-white mb-3">We'll be in touch.</h3>
                <p className="text-white/40 text-sm">
                  Expect a reply at <span className="text-white/70">{form.email}</span> within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#0f0f0f] p-6 sm:p-8 space-y-4">
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">Request a Quote</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Business Name', key: 'businessName', placeholder: 'The Chop House', type: 'text' },
                    { label: 'Contact Name', key: 'contactName', placeholder: 'Head Chef / Manager', type: 'text' },
                    { label: 'Email', key: 'email', placeholder: 'orders@business.com.au', type: 'email' },
                    { label: 'Phone', key: 'phone', placeholder: '02 9000 0000', type: 'tel' },
                  ].map(({ label, key, placeholder, type }) => (
                    <div key={key}>
                      <label className="block text-xs font-bold text-white/30 uppercase tracking-widest mb-1.5">{label} *</label>
                      <input
                        type={type}
                        value={form[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        placeholder={placeholder}
                        className={`w-full bg-white/5 border text-white placeholder-white/15 px-4 py-3 text-sm focus:outline-none focus:border-[#4a7fa5] transition-colors ${errors[key] ? 'border-red-500/50' : 'border-white/10'}`}
                      />
                      {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs font-bold text-white/30 uppercase tracking-widest mb-1.5">Knives per service</label>
                    <input
                      type="number"
                      min={5}
                      value={form.knifeCount}
                      onChange={(e) => setForm({ ...form, knifeCount: e.target.value })}
                      placeholder="e.g. 20"
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-white/15 px-4 py-3 text-sm focus:outline-none focus:border-[#4a7fa5] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/30 uppercase tracking-widest mb-1.5">Frequency</label>
                    <select
                      value={form.frequency}
                      onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                      className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#4a7fa5] transition-colors"
                    >
                      <option value="">Select...</option>
                      <option value="weekly">Weekly</option>
                      <option value="fortnightly">Fortnightly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-white hover:bg-[#4a7fa5] text-[#0f0f0f] hover:text-white font-black py-4 text-xs uppercase tracking-widest transition-colors mt-2"
                >
                  Request a Quote →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
