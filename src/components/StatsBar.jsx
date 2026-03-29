export default function StatsBar() {
  const stats = [
    { icon: '🔪', number: '47', label: 'knives sharpened this month' },
    { icon: '⭐', number: '100%', label: 'satisfaction on pre-launch orders' },
    { icon: '📦', number: 'AU-Wide', label: 'including regional & rural' },
  ];

  return (
    <section className="bg-[#1a1a1a] py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="text-4xl mb-1">{stat.icon}</span>
              <span className="text-4xl sm:text-5xl font-black text-white leading-none">{stat.number}</span>
              <span className="text-gray-400 text-sm sm:text-base font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
