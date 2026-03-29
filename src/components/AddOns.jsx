import { useApp } from '../context/AppContext';

const products = [
  {
    id: 'Starter Bundle',
    name: 'Starter Bundle',
    price: 55,
    icon: '🎁',
    description: 'Blade oil, a honing steel, and two edge guards — everything you need to keep your knives in top condition between sharpenings.',
    badge: 'Best Seller',
  },
  {
    id: 'Honing Steel',
    name: 'Honing Steel',
    price: 40,
    icon: '🔩',
    description: 'Professional-grade ceramic honing rod. Realigns the blade edge between sharpenings, keeping your knives performing at their best every day.',
    badge: null,
  },
  {
    id: 'Blade Oil',
    name: 'Blade Oil',
    price: 20,
    icon: '💧',
    description: 'Food-safe mineral blade oil. Protects carbon steel and prevents rust on your knives. A few drops after washing — that\'s it.',
    badge: null,
  },
  {
    id: 'Edge Guards',
    name: 'Edge Guards',
    price: 18,
    icon: '🛡️',
    description: 'Set of 4 universal blade guards. Protect sharp edges during storage and transport. Fits most standard chef, santoku, and utility knives.',
    badge: null,
  },
];

export default function AddOns() {
  const { addAddon, preSelectedAddons } = useApp();

  return (
    <section id="shop" className="bg-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#4a7fa5]/10 text-[#4a7fa5] text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-wide">
            🛒 Full store coming soon
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1a1a1a] mb-4">Add to Your Return Satchel</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Have knife care essentials included when we return your freshly sharpened blades.
          </p>
        </div>

        {/* Scrollable on mobile, grid on desktop */}
        <div className="flex gap-5 overflow-x-auto md:grid md:grid-cols-4 md:overflow-visible pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {products.map((product) => {
            const isAdded = preSelectedAddons.includes(product.id);
            return (
              <div
                key={product.id}
                className={`relative flex flex-col bg-[#f5f5f0] rounded-2xl border-2 transition-all duration-200 shrink-0 w-64 md:w-auto ${
                  isAdded ? 'border-[#4a7fa5] shadow-md' : 'border-transparent hover:border-[#4a7fa5]/30 hover:shadow-sm'
                }`}
              >
                {product.badge && (
                  <div className="absolute -top-2.5 left-4">
                    <span className="bg-[#4a7fa5] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-4xl mb-3">{product.icon}</div>
                  <h3 className="font-bold text-[#1a1a1a] text-base mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-1">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-black text-[#1a1a1a]">${product.price}</span>
                    <button
                      onClick={() => addAddon(product.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                        isAdded
                          ? 'bg-[#4a7fa5] text-white cursor-default'
                          : 'bg-[#1a1a1a] hover:bg-[#4a7fa5] text-white'
                      }`}
                    >
                      {isAdded ? '✓ Added' : '+ Add to Order'}
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
