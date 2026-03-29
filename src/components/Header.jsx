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
    <header className="fixed top-8 left-0 right-0 z-40 bg-[#f5f5f0] border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-1 text-[#1a1a1a] no-underline"
            aria-label="SharpenIt home"
          >
            <span className="text-xl font-black tracking-tight select-none">
              Sharpen
              <span className="text-[#4a7fa5]">/</span>
              It
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium text-[#1a1a1a] hover:text-[#4a7fa5] transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollTo('order')}
              className="bg-[#4a7fa5] hover:bg-[#3d6e91] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              Send My Knives →
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-[#1a1a1a] transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#1a1a1a] transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#1a1a1a] transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#f5f5f0] border-t border-gray-200 px-4 pb-4 pt-2 shadow-lg">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-sm font-medium text-[#1a1a1a] hover:text-[#4a7fa5] hover:bg-white py-2.5 px-3 rounded-md transition-colors cursor-pointer bg-transparent border-none w-full"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('order')}
              className="mt-2 bg-[#4a7fa5] hover:bg-[#3d6e91] text-white text-sm font-semibold px-5 py-3 rounded-lg transition-colors cursor-pointer w-full text-center"
            >
              Send My Knives →
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
