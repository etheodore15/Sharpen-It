export default function MobileCTA() {
  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 px-4 py-3 shadow-2xl">
      <button
        onClick={scrollToOrder}
        className="w-full bg-[#4a7fa5] hover:bg-[#3d6e91] text-white font-bold text-base py-4 rounded-xl transition-colors shadow-lg"
      >
        🔪 Send My Knives — from $58 →
      </button>
    </div>
  );
}
