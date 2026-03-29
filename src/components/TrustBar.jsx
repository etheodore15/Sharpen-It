const trustItems = [
  { icon: '🇦🇺', label: 'Australia-wide delivery' },
  { icon: '⚡', label: '5–7 day turnaround' },
  { icon: '🔪', label: 'Professional grade sharpening' },
  { icon: '📦', label: 'Prepaid satchel included' },
  { icon: '⭐', label: 'Satisfaction guaranteed' },
];

export default function TrustBar() {
  return (
    <section className="bg-[#f5f5f0] border-y border-gray-200 py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-1 sm:justify-center">
          {trustItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 whitespace-nowrap shrink-0 px-1"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-semibold text-[#1a1a1a]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
