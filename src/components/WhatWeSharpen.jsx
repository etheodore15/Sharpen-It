const items = [
  { icon: '🔪', label: "Chef's knives", desc: "French and German-style chef knives of all sizes" },
  { icon: '🍽️', label: "Domestic kitchen knives", desc: "Bread knives, paring knives, utility knives" },
  { icon: '🏕️', label: "Hunting & pocket knives", desc: "Fixed blades, folding knives, camp knives" },
  { icon: '✂️', label: "Scissors & shears", desc: "Kitchen scissors, fabric shears, hair scissors" },
  { icon: '🇯🇵', label: "Japanese knives", desc: "Santoku, nakiri, gyuto — single and double bevel" },
  { icon: '🧀', label: "Specialist & ceramic knives", desc: "Ceramic blades require diamond wheel sharpening" },
  { icon: '🌿', label: "Secateurs & garden tools", desc: "Pruning shears, loppers, garden scissors" },
  { icon: '🪒', label: "Straight razors", desc: "Traditional straight razors honed to a shave-ready edge" },
];

export default function WhatWeSharpen() {
  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="what-we-sharpen" className="bg-[#f5f5f0] py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#4a7fa5] font-semibold text-sm uppercase tracking-widest mb-3">Our Services</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1a1a1a] mb-4">What We Sharpen</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            We handle everything from everyday kitchen knives to specialist blades. If it has an edge, we can sharpen it.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center text-center"
            >
              <span className="text-4xl mb-3">{item.icon}</span>
              <h3 className="font-bold text-[#1a1a1a] text-sm mb-1.5 leading-snug">{item.label}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white rounded-xl border border-[#4a7fa5]/20 p-5 text-center">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-[#1a1a1a]">Not sure if we sharpen your blade?</span>{' '}
            Email us at{' '}
            <a href="mailto:hello@sharpenit.com.au" className="text-[#4a7fa5] font-semibold hover:underline">
              hello@sharpenit.com.au
            </a>{' '}
            and we'll let you know before you send anything.
          </p>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={scrollToOrder}
            className="bg-[#1a1a1a] hover:bg-[#333] text-white font-bold px-8 py-4 rounded-xl transition-colors text-base"
          >
            Reserve Your Satchel →
          </button>
        </div>
      </div>
    </section>
  );
}
