import { useState } from 'react';
import { storage } from '../utils/storage';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
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

  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="diagonal-texture min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Pre-launch badge */}
        <div className="inline-flex items-center gap-2 bg-[#4a7fa5] text-white text-sm font-semibold px-4 py-2 rounded-full mb-8 shadow-lg">
          🔪 Now Taking Pre-Launch Orders
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
          Australia's
          <span className="block text-[#4a7fa5]">Sharpest</span>
          Postal Service
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-4 leading-relaxed">
          Send us your dull knives. We sharpen them to a professional edge and post them straight back to your door — Australia-wide.
        </p>
        <p className="text-base sm:text-lg text-gray-400 mb-10">
          From <span className="text-white font-bold">$15 per knife</span> · Prepaid satchel included · 5–7 day turnaround
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <button
            onClick={scrollToOrder}
            className="bg-[#4a7fa5] hover:bg-[#3d6e91] text-white text-lg font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transform"
          >
            Reserve Your Satchel →
          </button>
          <button
            onClick={scrollToHowItWorks}
            className="bg-transparent border-2 border-gray-500 hover:border-white text-gray-300 hover:text-white text-lg font-semibold px-8 py-4 rounded-xl transition-all duration-200"
          >
            See How It Works
          </button>
        </div>

        {/* Email capture */}
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 sm:p-8 max-w-md mx-auto">
          {submitted ? (
            <div className="text-center py-2">
              <div className="text-3xl mb-3">🎉</div>
              <p className="text-white font-bold text-lg">You're in!</p>
              <p className="text-gray-300 text-sm mt-1">
                We'll email your <span className="text-[#4a7fa5] font-semibold">$5 discount code</span> when we launch.
              </p>
            </div>
          ) : (
            <>
              <p className="text-white font-bold text-base mb-1">Get $5 off your first order</p>
              <p className="text-gray-400 text-sm mb-4">Join our pre-launch list — no spam, ever.</p>
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="your@email.com.au"
                  className="flex-1 bg-white/10 border border-white/30 text-white placeholder-gray-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#4a7fa5] focus:ring-1 focus:ring-[#4a7fa5]"
                />
                <button
                  type="submit"
                  className="bg-[#4a7fa5] hover:bg-[#3d6e91] text-white font-semibold px-5 py-3 rounded-lg text-sm transition-colors whitespace-nowrap"
                >
                  Claim $5 Off
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
