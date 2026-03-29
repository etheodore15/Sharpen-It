import { useState } from 'react';

const faqs = [
  {
    q: 'How do I pack my knives safely?',
    a: "We send you a prepaid satchel that includes blade guards and packing instructions. Wrap each knife in the provided foam sleeve, place them flat in the satchel, and seal it up. If you're packing before the satchel arrives, use a folded newspaper or cardboard sleeve around each blade and place them in a rigid box. Never put loose knives in a soft bag.",
  },
  {
    q: 'What if a knife is damaged in transit?',
    a: 'All orders include basic transit cover. We photograph every knife on arrival and departure so we have a clear record of condition. In the rare event of transit damage, we will work with you directly to resolve it. We recommend avoiding sending heirloom or irreplaceable pieces until you have tried us once with everyday knives.',
  },
  {
    q: 'Do you sharpen all knife brands?',
    a: 'Yes — we sharpen all brands including Global, Wüsthof, Victorinox, Shun, MAC, Kai, Zwilling, and any generic kitchen knife. The only exception is serrated bread knives, which require a different process and are quoted separately. If in doubt, include a note with your order.',
  },
  {
    q: 'How sharp will they actually be when returned?',
    a: 'We sharpen to a professional kitchen standard — the kind of edge used in commercial kitchens and by trained chefs. Every knife is finished on a leather strop and tested before being returned. You should be able to slice through a ripe tomato with no pressure using only the weight of the blade.',
  },
  {
    q: 'Can I track my satchel?',
    a: 'Yes. The prepaid return satchel we send you includes Australia Post tracking. Once we dispatch your sharpened knives back, you will receive a tracking number via email so you can follow the parcel to your door.',
  },
  {
    q: "What's the minimum order?",
    a: "Our minimum order is 3 knives per satchel. This keeps the pricing model simple and covers the cost of the prepaid return postage. At $15 per knife plus the $13 dispatch fee, the minimum total is $58. There's no maximum — we've sharpened full commercial knife rolls in a single order.",
  },
  {
    q: 'How do ceramic knives work with your service?',
    a: 'Ceramic knives can be sharpened but require a diamond wheel, which adds $10 per knife as a surcharge. They are more brittle than steel knives and require extra care during handling and sharpening. Please flag ceramic knives in your order notes so we can take the appropriate precautions. We do not accept chipped or cracked ceramic blades.',
  },
  {
    q: 'Do you offer a subscription or repeat service?',
    a: 'Not yet — a subscription service with regular pickup reminders is on our roadmap for Phase 2. For now, you can use the Sharpening Frequency Calculator on this page to figure out when to book your next service, and we can send you an email reminder. Most home cooks need a professional sharpen every 6–12 months depending on usage.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="bg-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#4a7fa5] font-semibold text-sm uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1a1a1a]">Common Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-[#1a1a1a] text-base pr-4">{faq.q}</span>
                <span className="text-[#4a7fa5] text-xl font-bold flex-shrink-0">
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
