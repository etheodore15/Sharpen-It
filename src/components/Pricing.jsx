const plans = [
  {
    name: 'Starter',
    knives: 3,
    total: 58,
    highlight: false,
    tag: null,
    features: ['3 knives sharpened', 'Prepaid return satchel', 'Professional edge finish', '5–7 day turnaround'],
  },
  {
    name: 'Most Popular',
    knives: 5,
    total: 88,
    highlight: true,
    tag: 'Best Value',
    features: ['5 knives sharpened', 'Prepaid return satchel', 'Professional edge finish', '5–7 day turnaround', 'Priority processing'],
  },
  {
    name: 'Full Set',
    knives: 8,
    total: 133,
    highlight: false,
    tag: null,
    features: ['8 knives sharpened', 'Prepaid return satchel', 'Professional edge finish', '5–7 day turnaround', 'Priority processing', 'Free edge guard included'],
  },
];

export default function Pricing() {
  const scrollToOrder = () => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="pricing" className="bg-[#0f0f0f]">
      {/* Photo divider */}
      <div className="relative w-full h-48 sm:h-64 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1920&q=80"
          alt="Professional kitchen knife set"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f0] via-black/60 to-[#0f0f0f]" />
      </div>
      <div className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="text-[#4a7fa5] font-bold text-xs uppercase tracking-widest mb-4">Pricing</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Flat rate.<br />No surprises.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative p-8 flex flex-col ${
                plan.highlight ? 'bg-[#4a7fa5]' : 'bg-[#1a1a1a]'
              }`}
            >
              {plan.tag && (
                <span className="inline-block bg-white text-[#4a7fa5] text-xs font-black px-3 py-1 uppercase tracking-widest mb-6 self-start">
                  {plan.tag}
                </span>
              )}
              {!plan.tag && <div className="mb-6 h-7" />}

              <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${plan.highlight ? 'text-white/70' : 'text-white/40'}`}>
                {plan.name}
              </p>
              <div className="flex items-end gap-2 mb-1">
                <span className={`text-5xl font-black leading-none ${plan.highlight ? 'text-white' : 'text-white'}`}>
                  ${plan.total}
                </span>
              </div>
              <p className={`text-xs mb-8 ${plan.highlight ? 'text-white/60' : 'text-white/30'}`}>
                {plan.knives} knives × $15 + $13 dispatch
              </p>

              <ul className="space-y-3 mb-10 flex-1">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-3 text-sm">
                    <span className={`mt-0.5 text-xs font-black leading-none ${plan.highlight ? 'text-white' : 'text-[#4a7fa5]'}`}>—</span>
                    <span className={plan.highlight ? 'text-white/80' : 'text-white/50'}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToOrder}
                className={`w-full py-4 text-xs font-black uppercase tracking-widest transition-colors ${
                  plan.highlight
                    ? 'bg-white text-[#4a7fa5] hover:bg-[#0f0f0f] hover:text-white'
                    : 'bg-white/5 text-white hover:bg-white hover:text-[#0f0f0f] border border-white/10'
                }`}
              >
                Get Started →
              </button>
            </div>
          ))}
        </div>

        <p className="text-white/20 text-xs mt-6 text-center tracking-wide uppercase">
          More than 8 knives? Just enter the quantity in the form. Each extra knife $15. Ceramic knives $25 each.
        </p>
      </div>
    </div>
    </section>
  );
}
