import { useState } from 'react';
import { storage } from '../utils/storage';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }
    storage.push('sharppost_emails', {
      email,
      source: 'hero_discount',
      timestamp: new Date().toISOString(),
    });
    setSubmitted(true);
    setError('');
    setEmail('');
  };

  return (
    <section className="bg-[#0f0f0f] min-h-[92vh] flex items-center justify-center pt-24 pb-20 px-4 relative overflow-hidden">
      {/* Background image — chef knife on dark surface */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1920&q=80')" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0f0f0f]/75" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#000_100%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Pre-launch badge */}
        <div className="flex justify-center mb-10">
          <span className="inline-flex items-center gap-2 border border-[#4a7fa5]/40 text-[#4a7fa5] text-xs font-bold px-4 py-2 uppercase tracking-widest">
            Pre-Launch Orders Open
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight text-center mb-8">
          Australia's
          <br />
          <span className="text-[#4a7fa5]">Sharpest</span>
          <br />
          Postal Service
        </h1>

        <p className="text-base sm:text-lg text-white/50 text-center max-w-xl mx-auto mb-12 leading-relaxed">
          Send your dull knives. We sharpen every blade to a professional working edge and post them straight back — anywhere in Australia.
          <span className="block mt-2 text-white/30 text-sm">From $15 per knife · 5–7 day turnaround · Prepaid satchel included</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <button
            onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white hover:bg-[#4a7fa5] text-[#0f0f0f] hover:text-white text-xs font-black px-10 py-5 uppercase tracking-widest transition-colors"
          >
            Reserve Your Satchel →
          </button>
          <button
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-white/20 hover:border-white/50 text-white/50 hover:text-white text-xs font-bold px-10 py-5 uppercase tracking-widest transition-colors"
          >
            See How It Works
          </button>
        </div>

        {/* Email capture */}
        <div className="max-w-md mx-auto border border-white/10 bg-white/5 p-6">
          {submitted ? (
            <div className="text-center py-2">
              <p className="text-white font-bold text-sm uppercase tracking-widest mb-1">You're in.</p>
              <p className="text-white/40 text-xs">We'll send your $5 discount code when we launch.</p>
            </div>
          ) : (
            <>
              <p className="text-white text-xs font-bold uppercase tracking-widest mb-1">Get $5 off your first order</p>
              <p className="text-white/40 text-xs mb-4">Join our pre-launch list.</p>
              <form onSubmit={handleEmailSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="your@email.com.au"
                  className="flex-1 bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-xs focus:outline-none focus:border-[#4a7fa5] transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#4a7fa5] hover:bg-[#3d6e91] text-white font-bold px-5 py-3 text-xs uppercase tracking-widest transition-colors whitespace-nowrap"
                >
                  Claim →
                </button>
              </form>
              {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
