export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 text-white/30">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="text-white font-black text-xl mb-3 tracking-tight">
              Sharpen<span className="text-[#4a7fa5]">/</span>It
            </div>
            <p className="text-xs leading-relaxed text-white/30">
              Australia's Sharpest Postal Service. Professional knife sharpening, posted straight to your door.
            </p>
          </div>

          <div>
            <h4 className="text-white/60 font-bold text-xs uppercase tracking-widest mb-5">Services</h4>
            <ul className="space-y-3 text-xs">
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

          <div>
            <h4 className="text-white/60 font-bold text-xs uppercase tracking-widest mb-5">Products</h4>
            <ul className="space-y-3 text-xs">
              {['Starter Bundle', 'Honing Steel', 'Blade Oil', 'Edge Guards'].map((item) => (
                <li key={item}>
                  <button onClick={() => scrollTo('shop')} className="hover:text-white transition-colors text-left">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/60 font-bold text-xs uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-3 text-xs">
              <li><a href="mailto:hello@sharpenit.com.au" className="hover:text-white transition-colors">hello@sharpenit.com.au</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram @sharpenitau</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Facebook /sharpenitau</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/20 uppercase tracking-widest">
          <span>© 2026 SharpenIt · ABN 19 245 621 227</span>
          <a href="/admin" className="hover:text-white/40 transition-colors">Admin</a>
        </div>
      </div>
    </footer>
  );
}
