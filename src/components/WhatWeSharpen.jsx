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
    <section id="what-we-sharpen" className="bg-[#f5f5f0] py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <p className="text-[#4a7fa5] font-bold text-xs uppercase tracking-widest mb-4">Services</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0f0f0f] leading-tight">
              What we sharpen.
            </h2>
          </div>
          {/* Knife image accent */}
          <div className="hidden lg:block w-64 h-32 overflow-hidden shrink-0">
            <img
              src="https://images.unsplash.com/photo-1614695975280-839e5e2b1e9c?auto=format&fit=crop&w=640&q=80"
              alt="Assorted kitchen knives"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

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
