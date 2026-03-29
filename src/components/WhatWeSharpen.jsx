const items = [
  { label: "Chef's Knives", desc: "French and German-style chef knives of all sizes" },
  { label: "Domestic Kitchen", desc: "Bread knives, paring knives, utility knives" },
  { label: "Hunting & Pocket", desc: "Fixed blades, folding knives, camp knives" },
  { label: "Scissors & Shears", desc: "Kitchen scissors, fabric shears, hair scissors" },
  { label: "Japanese Knives", desc: "Santoku, nakiri, gyuto — single and double bevel" },
  { label: "Ceramic Knives", desc: "Diamond wheel sharpening — surcharge applies" },
  { label: "Secateurs & Garden", desc: "Pruning shears, loppers, garden scissors" },
  { label: "Straight Razors", desc: "Honed to a shave-ready edge" },
];

export default function WhatWeSharpen() {
  return (
    <section id="what-we-sharpen" className="bg-[#f5f5f0]">
      {/* Hero image banner */}
      <div className="relative w-full h-56 sm:h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80"
          alt="Collection of professional kitchen knives"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0f0f0f]/50" />
        <div className="absolute inset-0 flex items-end pb-8 px-6 sm:px-12 max-w-5xl mx-auto left-0 right-0">
          <div>
            <p className="text-[#4a7fa5] font-bold text-xs uppercase tracking-widest mb-2">Services</p>
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              What we sharpen.
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#0f0f0f]/10">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-[#f5f5f0] p-6 hover:bg-white transition-colors group"
            >
              <div className="w-6 h-px bg-[#4a7fa5] mb-4 group-hover:w-10 transition-all duration-300" />
              <h3 className="font-black text-[#0f0f0f] text-sm uppercase tracking-wide mb-2 leading-snug">{item.label}</h3>
              <p className="text-[#0f0f0f]/40 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-[#0f0f0f]/10">
          <p className="text-[#0f0f0f]/40 text-xs uppercase tracking-widest">
            Not sure? Email us before you send anything.{' '}
            <a href="mailto:hello@sharpenit.com.au" className="text-[#4a7fa5] hover:underline">
              hello@sharpenit.com.au
            </a>
          </p>
          <button
            onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#0f0f0f] hover:bg-[#4a7fa5] text-white text-xs font-black px-8 py-4 uppercase tracking-widest transition-colors whitespace-nowrap"
          >
            Reserve Your Satchel →
          </button>
        </div>
      </div>
    </section>
  );
}
