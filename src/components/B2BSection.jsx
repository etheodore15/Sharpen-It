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
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    storage.push('sharppost_b2b', {
      ...form,
      timestamp: new Date().toISOString(),
    });
    setSubmitted(true);
  };

  return (
    <section id="b2b" className="bg-[#f5f5f0] py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: copy */}
          <div>
            <p className="text-[#4a7fa5] font-semibold text-sm uppercase tracking-widest mb-3">Commercial Services</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1a1a1a] mb-5 leading-tight">
              Running a Restaurant, Butcher or Catering Business?
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              We offer monthly bulk contracts for commercial kitchens. One pickup, one invoice, all knives returned sharp. Sydney, Newcastle, Lake Macquarie and surrounding regions are available for direct courier collection — everywhere else via our standard prepaid satchel service.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                '🔪 Volume pricing for 10+ knives per service',
                '📅 Regular scheduled pickups — weekly, fortnightly or monthly',
                '🧾 Single monthly invoice for easy reconciliation',
                '⚡ Priority turnaround for commercial accounts',
                '📋 Condition report with each return',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-[#1a1a1a] rounded-xl p-5 text-white">
              <p className="font-bold mb-1 text-sm">Direct courier available in:</p>
              <p className="text-gray-400 text-sm">Sydney · Newcastle · Lake Macquarie · Central Coast · Hunter Valley</p>
              <p className="text-gray-500 text-xs mt-2">All other regions serviced by Australia Post prepaid satchel.</p>
            </div>
          </div>

          {/* Right: form */}
          <div>
            {submitted ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-black text-[#1a1a1a] mb-2">Quote Request Received</h3>
                <p className="text-gray-500 text-sm">
                  Thanks, {form.contactName.split(' ')[0]}. We'll review your requirements and get back to you at{' '}
                  <span className="font-semibold text-[#1a1a1a]">{form.email}</span> within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-4">
                <h3 className="font-black text-[#1a1a1a] text-xl mb-2">Request a Quote</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Business Name *</label>
                    <input
                      type="text"
                      value={form.businessName}
                      onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                      placeholder="The Chop House"
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7fa5] ${errors.businessName ? 'border-red-400' : 'border-gray-200'}`}
                    />
                    {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Contact Name *</label>
                    <input
                      type="text"
                      value={form.contactName}
                      onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                      placeholder="Head Chef / Manager"
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7fa5] ${errors.contactName ? 'border-red-400' : 'border-gray-200'}`}
                    />
                    {errors.contactName && <p className="text-red-500 text-xs mt-1">{errors.contactName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="orders@business.com.au"
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7fa5] ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone *</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="02 9000 0000"
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7fa5] ${errors.phone ? 'border-red-400' : 'border-gray-200'}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Approx. knives per service</label>
                    <input
                      type="number"
                      min={5}
                      value={form.knifeCount}
                      onChange={(e) => setForm({ ...form, knifeCount: e.target.value })}
                      placeholder="e.g. 20"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7fa5]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Frequency needed</label>
                    <select
                      value={form.frequency}
                      onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4a7fa5]"
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
                  className="w-full bg-[#1a1a1a] hover:bg-[#333] text-white font-bold py-4 rounded-xl transition-colors text-sm mt-2"
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
