export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1a1a1a] text-gray-400">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-white font-black text-2xl mb-3 tracking-tight">
              Sharpen<span className="text-[#4a7fa5]">/</span>It
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Australia's Sharpest Postal Service. Professional knife sharpening, posted straight to your door.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 bg-[#4a7fa5]/10 border border-[#4a7fa5]/20 rounded-full px-3 py-1.5">
              <span className="text-xs text-[#4a7fa5] font-semibold">🇦🇺 Australia-wide</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm">
              {['Knife Sharpening', 'Scissor Sharpening', 'B2B Accounts', 'Gift Cards'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo(item === 'B2B Accounts' ? 'b2b' : item === 'Gift Cards' ? 'gifts' : 'order')}
                    className="hover:text-white transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Products</h4>
            <ul className="space-y-2.5 text-sm">
              {['Starter Bundle', 'Honing Steel', 'Blade Oil', 'Edge Guards'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo('shop')}
                    className="hover:text-white transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="mailto:hello@sharpenit.com.au" className="hover:text-white transition-colors">
                  hello@sharpenit.com.au
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Instagram @sharpenitau
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Facebook /sharpenitau
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <span>© 2026 SharpenIt · Australia-wide postal knife sharpening · ABN 19 245 621 227</span>
          <a href="#/admin" className="hover:text-gray-400 transition-colors">Admin</a>
        </div>
      </div>
    </footer>
  );
}
