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
  'Kitchen / Chef\'s',
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

export default function OrderForm() {
  const { preSelectedAddons, serviceNote, setPreSelectedAddons, setServiceNote } = useApp();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    suburb: '',
    state: '',
    knives: 3,
    knifeTypes: [],
    ceramicCount: 1,
    addons: [],
    hearAbout: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Sync pre-selected addons from context
  useEffect(() => {
    if (preSelectedAddons.length > 0) {
      setForm((prev) => ({
        ...prev,
        addons: Array.from(new Set([...prev.addons, ...preSelectedAddons])),
      }));
    }
  }, [preSelectedAddons]);

  // Sync service note
  useEffect(() => {
    if (serviceNote) {
      setForm((prev) => ({
        ...prev,
        notes: serviceNote + (prev.notes ? '\n' + prev.notes : ''),
      }));
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
    if (hasCeramic && form.ceramicCount > 0) {
      lines.push({ label: `Ceramic surcharge × ${form.ceramicCount} × $10`, value: form.ceramicCount * CERAMIC_SURCHARGE });
    }
    form.addons.forEach((a) => lines.push({ label: a, value: ADDON_PRICES[a] }));
    lines.push({ label: 'Dispatch & return postage', value: DISPATCH });
    return lines;
  };

  const toggleCheck = (field, value) => {
    setForm((prev) => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.suburb.trim()) e.suburb = 'Suburb is required';
    if (!form.state) e.state = 'State is required';
    if (!form.knives || form.knives < 3) e.knives = 'Minimum order is 3 knives';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const order = {
      ...form,
      estimatedTotal: calcTotal(),
      timestamp: new Date().toISOString(),
    };
    storage.push('sharppost_orders', order);
    setPreSelectedAddons([]);
    setServiceNote('');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="order" className="bg-[#f5f5f0] py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
            <div className="text-5xl mb-5">🎉</div>
            <h2 className="text-3xl font-black text-[#1a1a1a] mb-3">Order Reserved!</h2>
            <p className="text-gray-600 text-lg mb-2">
              Thanks, <span className="font-semibold">{form.name.split(' ')[0]}</span>! We've received your reservation.
            </p>
            <p className="text-gray-500 text-base mb-6">
              A confirmation will be sent to <span className="font-semibold text-[#1a1a1a]">{form.email}</span>.
              We'll be in touch shortly with your prepaid satchel instructions.
            </p>
            <div className="bg-[#4a7fa5]/10 rounded-xl p-4 text-sm text-[#1a1a1a] font-semibold">
              Estimated total: ${calcTotal()}
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-sm text-gray-400 hover:text-gray-600 underline"
            >
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
    <section id="order" className="bg-[#f5f5f0] py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#4a7fa5] font-semibold text-sm uppercase tracking-widest mb-3">Get Started</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1a1a1a] mb-4">Reserve Your Satchel</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Complete the form below to lock in your pre-launch order. We'll send your prepaid satchel as soon as we open.
          </p>
        </div>

        {/* Pre-launch banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start gap-3">
          <span className="text-xl mt-0.5">🚀</span>
          <div>
            <p className="font-bold text-amber-900 text-sm">Pre-Launch Order</p>
            <p className="text-amber-700 text-sm">
              We're currently in pre-launch mode. Your order will be confirmed and processed once we officially open — you won't be charged until then.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            {/* Personal details */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-[#1a1a1a] mb-5 text-lg">Your Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Smith"
                    className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7fa5] transition ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@email.com"
                    className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7fa5] transition ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="0400 000 000"
                    className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7fa5] transition ${errors.phone ? 'border-red-400' : 'border-gray-200'}`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Suburb *</label>
                  <input
                    type="text"
                    value={form.suburb}
                    onChange={(e) => setForm({ ...form, suburb: e.target.value })}
                    placeholder="Fitzroy"
                    className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7fa5] transition ${errors.suburb ? 'border-red-400' : 'border-gray-200'}`}
                  />
                  {errors.suburb && <p className="text-red-500 text-xs mt-1">{errors.suburb}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">State *</label>
                  <select
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7fa5] transition bg-white ${errors.state ? 'border-red-400' : 'border-gray-200'}`}
                  >
                    <option value="">Select state...</option>
                    {['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Number of Knives *</label>
                  <input
                    type="number"
                    min={3}
                    value={form.knives}
                    onChange={(e) => setForm({ ...form, knives: parseInt(e.target.value) || 3 })}
                    className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7fa5] transition ${errors.knives ? 'border-red-400' : 'border-gray-200'}`}
                  />
                  {errors.knives && <p className="text-red-500 text-xs mt-1">{errors.knives}</p>}
                  <p className="text-gray-400 text-xs mt-1">Minimum 3 knives per order</p>
                </div>
              </div>
            </div>

            {/* Knife types */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-[#1a1a1a] mb-1 text-lg">Knife Types</h3>
              <p className="text-gray-500 text-sm mb-5">Select all that apply</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {KNIFE_TYPES.map((type) => (
                  <label
                    key={type}
                    className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-all text-sm ${
                      form.knifeTypes.includes(type)
                        ? 'border-[#4a7fa5] bg-[#4a7fa5]/5 font-semibold text-[#1a1a1a]'
                        : 'border-gray-200 text-gray-600 hover:border-[#4a7fa5]/40'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={form.knifeTypes.includes(type)}
                      onChange={() => toggleCheck('knifeTypes', type)}
                      className="accent-[#4a7fa5] w-4 h-4"
                    />
                    {type}
                  </label>
                ))}
              </div>

              {hasCeramic && (
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <label className="block text-sm font-semibold text-amber-900 mb-2">
                    How many of your knives are ceramic?
                    <span className="font-normal text-amber-700 ml-1">(+$10 each for diamond wheel sharpening)</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={form.knives}
                    value={form.ceramicCount}
                    onChange={(e) => setForm({ ...form, ceramicCount: parseInt(e.target.value) || 1 })}
                    className="w-24 border border-amber-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              )}
            </div>

            {/* Add-ons */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-[#1a1a1a] mb-1 text-lg">Add-Ons</h3>
              <p className="text-gray-500 text-sm mb-5">Include in your return satchel (optional)</p>
              <div className="space-y-3">
                {ADDONS.map((addon) => (
                  <label
                    key={addon}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      form.addons.includes(addon)
                        ? 'border-[#4a7fa5] bg-[#4a7fa5]/5'
                        : 'border-gray-200 hover:border-[#4a7fa5]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={form.addons.includes(addon)}
                        onChange={() => toggleCheck('addons', addon)}
                        className="accent-[#4a7fa5] w-4 h-4"
                      />
                      <span className="font-medium text-sm text-[#1a1a1a]">{addon}</span>
                    </div>
                    <span className="font-bold text-sm text-[#4a7fa5]">${ADDON_PRICES[addon]}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* How did you hear */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-[#1a1a1a] mb-5 text-lg">Anything Else?</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">How did you hear about us?</label>
                  <select
                    value={form.hearAbout}
                    onChange={(e) => setForm({ ...form, hearAbout: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7fa5] bg-white"
                  >
                    <option value="">Select...</option>
                    {['Google', 'Instagram', 'Facebook', 'Friend or family', 'Other'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Notes (optional)</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Any special instructions, knife conditions to flag, or questions..."
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7fa5] resize-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#4a7fa5] hover:bg-[#3d6e91] text-white font-black text-lg py-5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
            >
              Reserve My Satchel →
            </button>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-[#1a1a1a] px-6 py-4">
                <h3 className="font-bold text-white text-base">Order Summary</h3>
              </div>
              <div className="p-6">
                {breakdown.length === 1 ? (
                  <p className="text-gray-400 text-sm mb-4">Add knives and extras to see your total.</p>
                ) : (
                  <div className="space-y-3 mb-5">
                    {breakdown.map((line, i) => (
                      <div key={i} className={`flex items-start justify-between gap-2 text-sm ${i === breakdown.length - 1 ? 'pt-3 border-t border-gray-100' : ''}`}>
                        <span className={i === breakdown.length - 1 ? 'text-gray-500' : 'text-gray-700'}>{line.label}</span>
                        <span className={`font-semibold whitespace-nowrap ${i === breakdown.length - 1 ? 'text-gray-500' : 'text-[#1a1a1a]'}`}>
                          ${line.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-[#f5f5f0] rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-semibold">Estimated Total</p>
                  <p className="text-3xl font-black text-[#1a1a1a]">${total}</p>
                </div>

                <p className="text-xs text-gray-400 mt-4 text-center leading-relaxed">
                  No payment required today. We'll confirm pricing before processing your order.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
