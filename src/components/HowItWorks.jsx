const steps = [
  {
    number: '01',
    title: 'Order Online',
    description:
      'Fill out the form, confirm your knife count, and we\'ll dispatch a prepaid Australia Post satchel to your door within 2 business days.',
  },
  {
    number: '02',
    title: 'Pack & Post',
    description:
      'Wrap each blade in the included guards, seal the prepaid satchel, and drop it at any Australia Post outlet. No cost to you.',
  },
  {
    number: '03',
    title: 'Back in 5–7 Days',
    description:
      'Every knife is sharpened to a professional working edge, inspected, and returned with a condition note — razor sharp, straight to your door.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#f5f5f0] overflow-hidden">
      {/* Full-width photo banner */}
      <div className="relative w-full h-72 sm:h-96">
        <img
          src="https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=1920&q=80"
          alt="Knife being sharpened on a whetstone"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-[#f5f5f0]" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center px-4">
          <p className="text-white/80 text-xs font-bold uppercase tracking-widest">
            Professional sharpening — every order
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-24">
        <div className="mb-16 pt-8">
          <p className="text-[#4a7fa5] font-bold text-xs uppercase tracking-widest mb-4">The Process</p>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0f0f0f] leading-tight max-w-sm">
            Three steps.<br />That's it.
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line desktop */}
          <div className="hidden md:block absolute top-8 left-[calc(16.666%+1rem)] right-[calc(16.666%+1rem)] h-px bg-[#0f0f0f]/10" />

          <div className="flex flex-col md:flex-row gap-12 md:gap-6">
            {steps.map((step, i) => (
              <div key={i} className="flex-1 md:px-4">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl font-black text-[#0f0f0f] leading-none">{step.number}</span>
                  {i < steps.length - 1 && (
                    <div className="md:hidden flex-1 h-px bg-[#0f0f0f]/10" />
                  )}
                </div>
                <h3 className="text-lg font-black text-[#0f0f0f] uppercase tracking-wide mb-3">{step.title}</h3>
                <p className="text-[#0f0f0f]/50 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-[#0f0f0f]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[#0f0f0f]/40 text-sm max-w-sm">
            No hidden fees. No damage risk. Every knife photographed on arrival and departure.
          </p>
          <button
            onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#0f0f0f] hover:bg-[#4a7fa5] text-white text-xs font-black px-8 py-4 uppercase tracking-widest transition-colors whitespace-nowrap"
          >
            Get Started →
          </button>
        </div>
      </div>
    </section>
  );
}
