import { useApp } from '../context/AppContext';

const products = [
  {
    id: 'Starter Bundle',
    name: 'Starter Bundle',
    price: 55,
    description: 'Blade oil, honing steel, and edge guards. Everything you need to maintain your edge between services.',
    badge: 'Best Seller',
  },
  {
    id: 'Honing Steel',
    name: 'Honing Steel',
    price: 40,
    description: 'Professional ceramic honing rod. Realigns the edge between sharpenings — use it every time you cook.',
    badge: null,
  },
  {
    id: 'Blade Oil',
    name: 'Blade Oil',
    price: 20,
    description: 'Food-safe camellia oil, 50ml. Prevents rust on carbon steel. A few drops after washing is all it takes.',
    badge: null,
  },
  {
    id: 'Edge Guards',
    name: 'Edge Guards',
    price: 18,
    description: 'Set of 4 universal blade guards. Protect your edge during storage and transport.',
    badge: null,
  },
];

export default function AddOns() {
  const { addAddon, preSelectedAddons } = useApp();

  return (
    <section id="shop" className="bg-[#1a1a1a] py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
          <div>
            <p className="text-[#4a7fa5] font-bold text-xs uppercase tracking-widest mb-4">Add-Ons</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              Include with<br />your return.
            </h2>
          </div>
          <span className="inline-block border border-white/10 text-white/30 text-xs font-bold px-4 py-2 uppercase tracking-widest self-start sm:self-auto">
            Full store coming soon
          </span>
        </div>

        <div className="flex gap-5 overflow-x-auto md:grid md:grid-cols-4 md:overflow-visible pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {products.map((product) => {
            const isAdded = preSelectedAddons.includes(product.id);
            return (
              <div
                key={product.id}
                className={`relative flex flex-col shrink-0 w-64 md:w-auto border transition-all duration-200 ${
                  isAdded ? 'border-[#4a7fa5] bg-[#4a7fa5]/5' : 'border-white/10 bg-[#0f0f0f] hover:border-white/20'
                }`}
              >
                {product.badge && (
                  <div className="absolute -top-px left-0 right-0 h-px bg-[#4a7fa5]" />
                )}
                <div className="p-6 flex flex-col flex-1">
                  {product.badge && (
                    <span className="text-[#4a7fa5] text-xs font-bold uppercase tracking-widest mb-3">{product.badge}</span>
                  )}
                  {!product.badge && <div className="mb-5" />}
                  <h3 className="font-black text-white text-base uppercase tracking-wide mb-2">{product.name}</h3>
                  <p className="text-white/30 text-xs leading-relaxed mb-6 flex-1">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <span className="text-2xl font-black text-white">${product.price}</span>
                    <button
                      onClick={() => addAddon(product.id)}
                      className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                        isAdded
                          ? 'bg-[#4a7fa5] text-white cursor-default'
                          : 'bg-white text-[#0f0f0f] hover:bg-[#4a7fa5] hover:text-white'
                      }`}
                    >
                      {isAdded ? '✓ Added' : '+ Add'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
