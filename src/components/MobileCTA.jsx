export default function MobileCTA() {
  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-white/10 bg-[#0f0f0f] px-4 py-3">
      <button
        onClick={scrollToOrder}
        className="w-full bg-white hover:bg-[#4a7fa5] text-[#0f0f0f] hover:text-white font-black text-xs py-4 uppercase tracking-widest transition-colors"
      >
        Send My Knives — from $58 →
      </button>
    </div>
  );
}
