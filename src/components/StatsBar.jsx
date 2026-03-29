const stats = [
  { number: '47', label: 'Knives sharpened this month' },
  { number: '100%', label: 'Satisfaction — pre-launch orders' },
  { number: 'AU-Wide', label: 'Including regional & rural' },
];

export default function StatsBar() {
  return (
    <section className="bg-[#0a0a0a] py-16 px-4 border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center py-8 sm:py-0 px-8">
              <span className="text-5xl sm:text-6xl font-black text-white leading-none mb-3">{stat.number}</span>
              <span className="text-xs text-white/30 uppercase tracking-widest font-semibold">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
