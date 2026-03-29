import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { storage } from '../utils/storage';

const ADDON_PRICES = {
  'Starter Bundle': 55,
  'Honing Steel': 40,
  'Blade Oil': 20,
  'Edge Guards': 18,
};

const KNIFE_TYPES = [
  "Kitchen / Chef's",
  'Japanese',
  'Hunting & pocket',
  'Scissors',
  'Ceramic knives',
  'Secateurs',
  'Straight razor',
];

const ADDONS = ['Starter Bundle', 'Honing Steel', 'Blade Oil', 'Edge Guards'];
const DISPATCH = 13;
const CERAMIC_SURCHARGE = 10;

const inputClass = (err) =>
  `w-full bg-white border px-4 py-3 text-sm text-[#0f0f0f] placeholder-[#0f0f0f]/25 focus:outline-none focus:border-[#4a7fa5] transition-colors ${err ? 'border-red-400' : 'border-[#0f0f0f]/10'}`;

const labelClass = 'block text-xs font-bold text-[#0f0f0f]/40 uppercase tracking-widest mb-1.5';

export default function OrderForm() {
  const { preSelectedAddons, serviceNote, setPreSelectedAddons, setServiceNote } = useApp();

  const [form, setForm] = useState({
    name: '', email: '', phone: '', suburb: '', state: '',
    knives: 3, knifeTypes: [], ceramicCount: 1, addons: [], hearAbout: '', notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (preSelectedAddons.length > 0) {
      setForm((prev) => ({ ...prev, addons: Array.from(new Set([...prev.addons, ...preSelectedAddons])) }));
    }
  }, [preSelectedAddons]);

  useEffect(() => {
    if (serviceNote) {
      setForm((prev) => ({ ...prev, notes: serviceNote + (prev.notes ? '\n' + prev.notes : '') }));
    }
  }, [serviceNote]);

  const hasCeramic = form.knifeTypes.includes('Ceramic knives');

  const calcTotal = () => {
    const knifeBase = (form.knives || 0) * 15;
    const ceramicExtra = hasCeramic ? (form.ceramicCount || 0) * CERAMIC_SURCHARGE : 0;
    const addonTotal = form.addons.reduce((sum, a) => sum + (ADDON_PRICES[a] || 0), 0);
    return knifeBase + ceramicExtra + addonTotal + DISPATCH;
  };

  const calcBreakdown = () => {
    const lines = [];
    const knives = form.knives || 0;
    if (knives > 0) lines.push({ label: `${knives} knife${knives !== 1 ? 's' : ''} × $15`, value: knives * 15 });
    if (hasCeramic && form.ceramicCount > 0)
      lines.push({ label: `Ceramic surcharge × ${form.ceramicCount}`, value: form.ceramicCount * CERAMIC_SURCHARGE });
    form.addons.forEach((a) => lines.push({ label: a, value: ADDON_PRICES[a] }));
    lines.push({ label: 'Dispatch & return postage', value: DISPATCH });
    return lines;
  };

  const toggleCheck = (field, value) => {
    setForm((prev) => {
      const arr = prev[field];
      return { ...prev, [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.suburb.trim()) e.suburb = 'Required';
    if (!form.state) e.state = 'Required';
    if (!form.knives || form.knives < 3) e.knives = 'Minimum 3 knives';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    storage.push('sharppost_orders', { ...form, estimatedTotal: calcTotal(), timestamp: new Date().toISOString() });
    setPreSelectedAddons([]);
    setServiceNote('');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="order" className="bg-[#f5f5f0] py-24 px-4">
        <div className="max-w-xl mx-auto">
          <div className="bg-[#0f0f0f] p-10 text-center">
            <p className="text-xs font-bold text-[#4a7fa5] uppercase tracking-widest mb-4">Order Reserved</p>
            <h2 className="text-3xl font-black text-white mb-4">You're locked in.</h2>
            <p className="text-white/40 text-sm mb-6 leading-relaxed">
              We'll email <span className="text-white/70">{form.email}</span> within 24 hours with payment instructions and satchel dispatch details.
            </p>
            <div className="border border-white/10 p-4 mb-6">
              <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Estimated Total</p>
              <p className="text-3xl font-black text-white">${calcTotal()}</p>
            </div>
            <button onClick={() => setSubmitted(false)} className="text-xs text-white/20 hover:text-white/50 uppercase tracking-widest transition-colors">
              Submit another order
            </button>
          </div>
        </div>
      </section>
    );
  }

  const breakdown = calcBreakdown();
  const total = calcTotal();

  return (
    <section id="order" className="bg-[#f5f5f0] py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="text-[#4a7fa5] font-bold text-xs uppercase tracking-widest mb-4">Pre-Launch</p>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0f0f0f] leading-tight mb-4">Reserve your satchel.</h2>
          <div className="flex items-start gap-3 bg-[#0f0f0f] p-4 max-w-lg">
            <div className="w-1 h-full bg-[#4a7fa5] shrink-0 self-stretch min-h-[2rem]" />
            <p className="text-white/50 text-xs leading-relaxed">
              Pre-launch pricing locked in for all orders placed today. No payment required until we confirm your satchel dispatch.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">

            {/* Personal details */}
            <div className="bg-white border border-[#0f0f0f]/10 p-6">
              <p className="text-xs font-bold text-[#0f0f0f]/40 uppercase tracking-widest mb-6">Your Details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Jane Smith' },
                  { label: 'Email', key: 'email', type: 'email', placeholder: 'jane@email.com.au' },
                  { label: 'Phone', key: 'phone', type: 'tel', placeholder: '0400 000 000' },
                  { label: 'Suburb', key: 'suburb', type: 'text', placeholder: 'Fitzroy' },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className={labelClass}>{label} *</label>
                    <input
                      type={type}
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      placeholder={placeholder}
                      className={inputClass(errors[key])}
                    />
                    {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
                  </div>
                ))}
                <div>
                  <label className={labelClass}>State *</label>
                  <select
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className={inputClass(errors.state) + ' bg-white'}
                  >
                    <option value="">Select...</option>
                    {['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>
                <div>
                  <label className={labelClass}>Number of Knives *</label>
                  <input
                    type="number"
                    min={3}
                    value={form.knives}
                    onChange={(e) => setForm({ ...form, knives: parseInt(e.target.value) || 3 })}
                    className={inputClass(errors.knives)}
                  />
                  {errors.knives && <p className="text-red-500 text-xs mt-1">{errors.knives}</p>}
                  <p className="text-[#0f0f0f]/30 text-xs mt-1 uppercase tracking-wide">Minimum 3 per order</p>
                </div>
              </div>
            </div>

            {/* Knife types */}
            <div className="bg-white border border-[#0f0f0f]/10 p-6">
              <p className="text-xs font-bold text-[#0f0f0f]/40 uppercase tracking-widest mb-2">Knife Types</p>
              <p className="text-[#0f0f0f]/30 text-xs uppercase tracking-wide mb-5">Select all that apply</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {KNIFE_TYPES.map((type) => (
                  <label
                    key={type}
                    className={`flex items-center gap-2.5 p-3 border cursor-pointer transition-all text-xs font-semibold ${
                      form.knifeTypes.includes(type)
                        ? 'border-[#4a7fa5] bg-[#4a7fa5]/5 text-[#0f0f0f]'
                        : 'border-[#0f0f0f]/10 text-[#0f0f0f]/40 hover:border-[#4a7fa5]/40'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={form.knifeTypes.includes(type)}
                      onChange={() => toggleCheck('knifeTypes', type)}
                      className="accent-[#4a7fa5] w-3 h-3"
                    />
                    {type}
                  </label>
                ))}
              </div>
              {hasCeramic && (
                <div className="mt-4 p-4 bg-[#0f0f0f] border-l-2 border-[#4a7fa5]">
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">
                    How many are ceramic? <span className="text-white/30 font-normal">(+$10 each)</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={form.knives}
                    value={form.ceramicCount}
                    onChange={(e) => setForm({ ...form, ceramicCount: parseInt(e.target.value) || 1 })}
                    className="w-24 bg-white/5 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:border-[#4a7fa5]"
                  />
                </div>
              )}
            </div>

            {/* Add-ons */}
            <div className="bg-white border border-[#0f0f0f]/10 p-6">
              <p className="text-xs font-bold text-[#0f0f0f]/40 uppercase tracking-widest mb-5">Add-Ons (optional)</p>
              <div className="space-y-2">
                {ADDONS.map((addon) => (
                  <label
                    key={addon}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                      form.addons.includes(addon)
                        ? 'border-[#4a7fa5] bg-[#4a7fa5]/5'
                        : 'border-[#0f0f0f]/10 hover:border-[#4a7fa5]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={form.addons.includes(addon)}
                        onChange={() => toggleCheck('addons', addon)}
                        className="accent-[#4a7fa5] w-3 h-3"
                      />
                      <span className="font-semibold text-xs text-[#0f0f0f] uppercase tracking-wide">{addon}</span>
                    </div>
                    <span className="font-black text-sm text-[#0f0f0f]">${ADDON_PRICES[addon]}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div className="bg-white border border-[#0f0f0f]/10 p-6">
              <p className="text-xs font-bold text-[#0f0f0f]/40 uppercase tracking-widest mb-5">Final Details</p>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>How did you hear about us?</label>
                  <select
                    value={form.hearAbout}
                    onChange={(e) => setForm({ ...form, hearAbout: e.target.value })}
                    className={inputClass(false) + ' bg-white'}
                  >
                    <option value="">Select...</option>
                    {['Google', 'Instagram', 'Facebook', 'Friend or family', 'Other'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Notes (optional)</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Special instructions, knife conditions, questions..."
                    rows={3}
                    className="w-full bg-white border border-[#0f0f0f]/10 text-[#0f0f0f] placeholder-[#0f0f0f]/25 px-4 py-3 text-sm focus:outline-none focus:border-[#4a7fa5] transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0f0f0f] hover:bg-[#4a7fa5] text-white font-black text-xs py-5 uppercase tracking-widest transition-colors"
            >
              Reserve My Satchel →
            </button>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#0f0f0f]">
              <div className="px-6 py-4 border-b border-white/10">
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Order Summary</p>
              </div>
              <div className="p-6">
                {breakdown.length <= 1 ? (
                  <p className="text-white/20 text-xs mb-4 uppercase tracking-wide">Add details to see your total.</p>
                ) : (
                  <div className="space-y-3 mb-6">
                    {breakdown.map((line, i) => (
                      <div key={i} className={`flex items-start justify-between gap-2 text-xs ${i === breakdown.length - 1 ? 'pt-3 border-t border-white/10' : ''}`}>
                        <span className={i === breakdown.length - 1 ? 'text-white/30 uppercase tracking-wide' : 'text-white/50'}>{line.label}</span>
                        <span className={`font-bold whitespace-nowrap ${i === breakdown.length - 1 ? 'text-white/30' : 'text-white'}`}>${line.value}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="border border-white/10 p-4 text-center">
                  <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Estimated Total</p>
                  <p className="text-4xl font-black text-white">${total}</p>
                </div>
                <p className="text-xs text-white/20 mt-4 text-center uppercase tracking-wide leading-relaxed">
                  No payment today. We confirm pricing before processing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
