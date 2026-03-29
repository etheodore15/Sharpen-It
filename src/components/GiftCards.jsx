import { useState } from 'react';
import { storage } from '../utils/storage';

const AMOUNTS = ['$45', '$75', '$120', 'Custom'];

export default function GiftCards() {
  const [form, setForm] = useState({
    buyerName: '',
    buyerEmail: '',
    recipientName: '',
    giftAmount: '',
    customAmount: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.buyerName.trim()) e.buyerName = 'Required';
    if (!form.buyerEmail.trim() || !form.buyerEmail.includes('@')) e.buyerEmail = 'Valid email required';
    if (!form.recipientName.trim()) e.recipientName = 'Required';
    if (!form.giftAmount) e.giftAmount = 'Please select an amount';
    if (form.giftAmount === 'Custom' && !form.customAmount.trim()) e.customAmount = 'Please enter a custom amount';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    storage.push('sharppost_giftcards', {
      ...form,
      finalAmount: form.giftAmount === 'Custom' ? form.customAmount : form.giftAmount,
      timestamp: new Date().toISOString(),
    });
    setSubmitted(true);
  };

  return (
    <section id="gifts" className="bg-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: copy */}
          <div>
            {/* Gift image */}
            <div className="w-full h-48 overflow-hidden mb-8">
              <img
                src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80"
                alt="Gift wrapping"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <p className="text-[#4a7fa5] font-semibold text-sm uppercase tracking-widest mb-3">Gift Cards</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1a1a1a] mb-5 leading-tight">
              Give the Gift of Sharp Knives
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              Perfect for Father's Day, Christmas, housewarmings, and anyone who loves cooking. A SharpenIt gift card is a genuinely useful present — not just something that ends up on a shelf.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: '📧', text: "We'll email a PDF gift card within 2 hours" },
                { icon: '💳', text: 'Payment instructions included — no upfront card required' },
                { icon: '🎁', text: 'Redeemable for any sharpening service, Australia-wide' },
                { icon: '📅', text: '12-month validity from date of issue' },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <p className="text-gray-700 text-sm">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#f5f5f0] rounded-xl p-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Popular for</p>
              <div className="flex flex-wrap gap-2">
                {["Father's Day", 'Christmas', 'Housewarming', 'Birthday', "Mother's Day", 'Wedding gift'].map((t) => (
                  <span key={t} className="bg-white border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            {submitted ? (
              <div className="bg-[#f5f5f0] rounded-2xl border border-gray-100 p-8 text-center">
                <div className="text-4xl mb-4">🎁</div>
                <h3 className="text-xl font-black text-[#1a1a1a] mb-2">Gift Card Requested!</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Thanks, {form.buyerName.split(' ')[0]}! We'll email your PDF gift card and payment instructions to{' '}
                  <span className="font-semibold text-[#1a1a1a]">{form.buyerEmail}</span> within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#f5f5f0] rounded-2xl p-6 sm:p-8 space-y-4">
                <h3 className="font-black text-[#1a1a1a] text-xl mb-2">Request a Gift Card</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      value={form.buyerName}
                      onChange={(e) => setForm({ ...form, buyerName: e.target.value })}
                      placeholder="Jane Smith"
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4a7fa5] ${errors.buyerName ? 'border-red-400' : 'border-gray-200'}`}
                    />
                    {errors.buyerName && <p className="text-red-500 text-xs mt-1">{errors.buyerName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Your Email *</label>
                    <input
                      type="email"
                      value={form.buyerEmail}
                      onChange={(e) => setForm({ ...form, buyerEmail: e.target.value })}
                      placeholder="jane@email.com"
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4a7fa5] ${errors.buyerEmail ? 'border-red-400' : 'border-gray-200'}`}
                    />
                    {errors.buyerEmail && <p className="text-red-500 text-xs mt-1">{errors.buyerEmail}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Recipient's Name *</label>
                  <input
                    type="text"
                    value={form.recipientName}
                    onChange={(e) => setForm({ ...form, recipientName: e.target.value })}
                    placeholder="Who is this for?"
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4a7fa5] ${errors.recipientName ? 'border-red-400' : 'border-gray-200'}`}
                  />
                  {errors.recipientName && <p className="text-red-500 text-xs mt-1">{errors.recipientName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Gift Amount *</label>
                  <div className="grid grid-cols-4 gap-2">
                    {AMOUNTS.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setForm({ ...form, giftAmount: amt })}
                        className={`py-2.5 rounded-lg text-sm font-bold border transition-all ${
                          form.giftAmount === amt
                            ? 'bg-[#4a7fa5] text-white border-[#4a7fa5]'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-[#4a7fa5]'
                        }`}
                      >
                        {amt}
                      </button>
                    ))}
                  </div>
                  {errors.giftAmount && <p className="text-red-500 text-xs mt-1">{errors.giftAmount}</p>}
                </div>

                {form.giftAmount === 'Custom' && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Custom Amount *</label>
                    <input
                      type="text"
                      value={form.customAmount}
                      onChange={(e) => setForm({ ...form, customAmount: e.target.value })}
                      placeholder="e.g. $200"
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4a7fa5] ${errors.customAmount ? 'border-red-400' : 'border-gray-200'}`}
                    />
                    {errors.customAmount && <p className="text-red-500 text-xs mt-1">{errors.customAmount}</p>}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Personal Message (optional)</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write a personal message to include on the gift card..."
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4a7fa5] resize-none"
                  />
                </div>

                <p className="text-xs text-gray-400">
                  We'll email you a PDF gift card and payment link within 2 hours.
                </p>

                <button
                  type="submit"
                  className="w-full bg-[#4a7fa5] hover:bg-[#3d6e91] text-white font-bold py-4 rounded-xl transition-colors text-sm"
                >
                  Request Gift Card →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
