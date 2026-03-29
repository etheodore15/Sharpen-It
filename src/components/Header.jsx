import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const navLinks = [
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'What We Sharpen', id: 'what-we-sharpen' },
    { label: 'Shop', id: 'shop' },
    { label: 'FAQ', id: 'faq' },
  ];

  return (
    <header className="fixed top-8 left-0 right-0 z-40 bg-[#0f0f0f] border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="no-underline" aria-label="SharpenIt home">
            <span className="text-xl font-black tracking-tight select-none text-white">
              Sharpen<span className="text-[#4a7fa5]">/</span>It
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-xs font-semibold text-white/50 hover:text-white uppercase tracking-widest transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex">
            <button
              onClick={() => scrollTo('order')}
              className="bg-white hover:bg-[#4a7fa5] text-[#0f0f0f] hover:text-white text-xs font-bold px-5 py-2.5 uppercase tracking-widest transition-colors cursor-pointer"
            >
              Send My Knives →
            </button>
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-white transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-5 h-px bg-white transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-white transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0f0f0f] border-t border-white/10 px-4 pb-5 pt-3">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-xs font-semibold text-white/50 hover:text-white uppercase tracking-widest py-3 px-2 transition-colors cursor-pointer bg-transparent border-none w-full border-b border-white/5"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('order')}
              className="mt-3 bg-white text-[#0f0f0f] text-xs font-bold px-5 py-3.5 uppercase tracking-widest w-full text-center transition-colors hover:bg-[#4a7fa5] hover:text-white"
            >
              Send My Knives →
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
