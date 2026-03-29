const plans = [
  {
    name: 'Starter',
    knives: 3,
    sharpening: 45,
    dispatch: 13,
    total: 58,
    highlight: false,
    tag: null,
    perKnife: '$15',
    features: [
      '3 knives sharpened',
      'Prepaid return satchel',
      'Professional edge finish',
      '5–7 day turnaround',
    ],
  },
  {
    name: 'Most Popular',
    knives: 5,
    sharpening: 75,
    dispatch: 13,
    total: 88,
    highlight: true,
    tag: 'Best Value',
    perKnife: '$15',
    features: [
      '5 knives sharpened',
      'Prepaid return satchel',
      'Professional edge finish',
      '5–7 day turnaround',
      'Priority processing',
    ],
  },
  {
    name: 'Full Set',
    knives: 8,
    sharpening: 120,
    dispatch: 13,
    total: 133,
    highlight: false,
    tag: null,
    perKnife: '$15',
    features: [
      '8 knives sharpened',
      'Prepaid return satchel',
      'Professional edge finish',
      '5–7 day turnaround',
      'Priority processing',
      'Free edge guard included',
    ],
  },
];

export default function Pricing() {
  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="bg-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#4a7fa5] font-semibold text-sm uppercase tracking-widest mb-3">Transparent Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1a1a1a] mb-4">Simple, Flat-Rate Pricing</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            No hidden fees. $15 per knife — same rate for chef's, Japanese, hunting, and more. Dispatch included.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden transition-all duration-200 ${
                plan.highlight
                  ? 'bg-[#1a1a1a] text-white shadow-2xl md:scale-105 border-2 border-[#4a7fa5]'
                  : 'bg-[#f5f5f0] text-[#1a1a1a] border border-gray-200 shadow-sm hover:shadow-md'
              }`}
            >
              {plan.tag && (
                <div className="absolute top-0 left-0 right-0 bg-[#4a7fa5] text-white text-xs font-bold text-center py-1.5 tracking-wide uppercase">
                  {plan.tag}
                </div>
              )}
              <div className={`p-7 ${plan.tag ? 'pt-10' : ''}`}>
                <p className={`text-sm font-semibold uppercase tracking-widest mb-1 ${plan.highlight ? 'text-[#4a7fa5]' : 'text-[#4a7fa5]'}`}>
                  {plan.name}
                </p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-black">${plan.total}</span>
                  <span className={`text-sm mb-1.5 ${plan.highlight ? 'text-gray-400' : 'text-gray-500'}`}>total</span>
                </div>
                <div className={`text-xs mb-6 ${plan.highlight ? 'text-gray-400' : 'text-gray-500'}`}>
                  {plan.knives} knives × $15 + $13 dispatch
                </div>

                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2.5 text-sm">
                      <span className="text-[#4a7fa5] font-bold text-base leading-none">✓</span>
                      <span className={plan.highlight ? 'text-gray-300' : 'text-gray-700'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={scrollToOrder}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                    plan.highlight
                      ? 'bg-[#4a7fa5] hover:bg-[#3d6e91] text-white'
                      : 'bg-[#1a1a1a] hover:bg-[#333] text-white'
                  }`}
                >
                  Get Started →
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          Need more than 8 knives? No problem — just select the quantity in the order form. Extra knives are $15 each.
          <br />Ceramic knives are charged at $25 each due to specialist diamond wheel requirements.
        </p>
      </div>
    </section>
  );
}
