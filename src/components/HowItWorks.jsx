const steps = [
  {
    number: '01',
    icon: '🖥️',
    title: 'Order Online',
    description:
      'Fill out our simple order form and choose how many knives you want sharpened. We\'ll confirm your order and send you a prepaid Australia Post satchel within 2 business days.',
  },
  {
    number: '02',
    icon: '📦',
    title: 'Pack & Post',
    description:
      'Wrap your knives safely in the included blade guards or a folded tea towel, seal the prepaid satchel, and drop it at any Australia Post outlet. No cost to you.',
  },
  {
    number: '03',
    icon: '✅',
    title: 'Back in 5–7 Days',
    description:
      'Our professional sharpeners get to work on your blades. Once every knife meets our edge standard, we pack them up and post them straight back to your door — razor sharp.',
  },
];

export default function HowItWorks() {
  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="how-it-works" className="bg-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#4a7fa5] font-semibold text-sm uppercase tracking-widest mb-3">Simple Process</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1a1a1a] mb-4">How It Works</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Professional knife sharpening delivered to your door in three easy steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-10 left-[calc(16.666%+2rem)] right-[calc(16.666%+2rem)] h-0.5 bg-gradient-to-r from-[#4a7fa5] via-[#4a7fa5] to-[#4a7fa5] opacity-20 z-0" />

          <div className="flex flex-col md:flex-row gap-10 md:gap-6 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="flex-1 flex flex-col items-center text-center md:px-4">
                {/* Number + icon circle */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-[#4a7fa5]/10 border-2 border-[#4a7fa5]/20 flex items-center justify-center">
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#4a7fa5] flex items-center justify-center">
                    <span className="text-white text-xs font-black">{i + 1}</span>
                  </div>
                </div>

                <div className="text-[#4a7fa5] font-black text-xs tracking-widest uppercase mb-2">
                  Step {step.number}
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>

                {/* Arrow between steps — mobile only */}
                {i < steps.length - 1 && (
                  <div className="md:hidden mt-6 text-[#4a7fa5] text-2xl">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <button
            onClick={scrollToOrder}
            className="bg-[#4a7fa5] hover:bg-[#3d6e91] text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-base"
          >
            Get Started — Reserve Your Satchel →
          </button>
        </div>
      </div>
    </section>
  );
}
