const trustItems = [
  { label: 'Australia-wide delivery' },
  { label: '5–7 day turnaround' },
  { label: 'Professional grade' },
  { label: 'Prepaid satchel included' },
  { label: 'Satisfaction guaranteed' },
];

export default function TrustBar() {
  return (
    <section className="bg-[#1a1a1a] border-y border-white/5 py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-0 overflow-x-auto sm:justify-center divide-x divide-white/10">
          {trustItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2 whitespace-nowrap shrink-0 px-5 py-1 first:pl-0 last:pr-0 sm:first:pl-5">
              <span className="w-1 h-1 rounded-full bg-[#4a7fa5] shrink-0" />
              <span className="text-xs font-semibold text-white/60 uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
