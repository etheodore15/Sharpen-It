import { useState } from 'react';

const faqs = [
  {
    q: 'How do I pack my knives safely?',
    a: "We send a prepaid satchel with blade guards and packing instructions. Wrap each knife in the provided foam sleeve, place them flat, and seal. If packing before the satchel arrives, use cardboard sleeves around each blade and place in a rigid box. Never put loose knives in a soft bag.",
  },
  {
    q: 'What if a knife is damaged in transit?',
    a: 'We photograph every knife on arrival and departure. In the rare event of transit damage, we resolve it directly with you. We recommend starting with everyday knives rather than heirlooms until you\'ve tried the service once.',
  },
  {
    q: 'Do you sharpen all knife brands?',
    a: 'Yes — Global, Wüsthof, Victorinox, Shun, MAC, Kai, Zwilling, and any generic kitchen knife. The exception is serrated bread knives, which require a different process and are quoted separately.',
  },
  {
    q: 'How sharp will they be when returned?',
    a: 'Professional kitchen standard — the edge used in commercial kitchens. Every knife is finished on a leather strop and tested before return. You should be able to slice through a ripe tomato with no pressure using only the weight of the blade.',
  },
  {
    q: 'Can I track my satchel?',
    a: 'Yes. The prepaid return satchel includes Australia Post tracking. Once we dispatch your sharpened knives, you\'ll receive a tracking number via email.',
  },
  {
    q: "What's the minimum order?",
    a: "Minimum is 3 knives. This covers the cost of the prepaid return postage. At $15 per knife plus $13 dispatch, the minimum total is $58. There's no maximum — we've sharpened full commercial knife rolls in a single order.",
  },
  {
    q: 'How do ceramic knives work with your service?',
    a: 'Ceramic knives can be sharpened but require a diamond wheel, adding $10 per knife as a surcharge. They\'re more brittle than steel and require extra care. Flag ceramic knives in your order notes. We do not accept chipped or cracked ceramic blades.',
  },
  {
    q: 'Do you offer a subscription or repeat service?',
    a: 'Not yet — repeat service reminders are on our Phase 2 roadmap. For now, use the Sharpening Frequency Calculator on this page. Most home cooks need a professional sharpen every 6–12 months depending on usage.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="bg-[#0f0f0f] py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <p className="text-[#4a7fa5] font-bold text-xs uppercase tracking-widest mb-4">FAQ</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Common questions.
          </h2>
        </div>

        <div className="divide-y divide-white/5">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className={`font-semibold text-base pr-8 transition-colors ${open === i ? 'text-white' : 'text-white/50 group-hover:text-white'}`}>
                  {faq.q}
                </span>
                <span className={`text-lg font-thin shrink-0 transition-all duration-200 ${open === i ? 'text-[#4a7fa5] rotate-45' : 'text-white/20 group-hover:text-white/50'}`}>
                  +
                </span>
              </button>
              {open === i && (
                <p className="text-white/40 text-sm leading-relaxed pb-6 max-w-2xl">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
