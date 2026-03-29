import { useState } from 'react';
import { storage } from '../utils/storage';

const KNIFE_TYPES = [
  'Chef\'s knife',
  'Japanese knife',
  'Hunting / pocket knife',
  'Scissors',
  'Domestic kitchen knife',
  'Ceramic knife',
];

const FREQUENCIES = [
  { label: 'Daily', value: 'daily', months: 3 },
  { label: 'A few times a week', value: 'few', months: 4 },
  { label: 'Weekly', value: 'weekly', months: 6 },
  { label: 'Occasionally', value: 'occasional', months: 12 },
];

function calcMonths(knifeType, frequency) {
  const base = FREQUENCIES.find((f) => f.value === frequency)?.months ?? 6;
  const isDelicate = knifeType === 'Japanese knife' || knifeType === 'Ceramic knife';
  return isDelicate ? Math.max(base - 1, 2) : base;
}

function getNextDate(months) {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return d.toLocaleString('en-AU', { month: 'long', year: 'numeric' });
}

export default function FrequencyCalculator() {
  const [knifeType, setKnifeType] = useState('');
  const [frequency, setFrequency] = useState('');
  const [email, setEmail] = useState('');
  const [reminded, setReminded] = useState(false);
  const [reminderError, setReminderError] = useState('');

  const months = knifeType && frequency ? calcMonths(knifeType, frequency) : null;
  const nextDate = months ? getNextDate(months) : null;

  const handleReminder = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setReminderError('Please enter a valid email.');
      return;
    }
    storage.push('sharppost_reminders', {
      email,
      knifeType,
      frequency,
      recommendedMonths: months,
      nextServiceDate: nextDate,
      timestamp: new Date().toISOString(),
    });
    setReminded(true);
    setReminderError('');
  };

  return (
    <section className="bg-[#f5f5f0] py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[#4a7fa5] font-semibold text-sm uppercase tracking-widest mb-3">Maintenance Guide</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1a1a1a] mb-3">When Should You Sharpen Next?</h2>
          <p className="text-gray-500 text-base">
            Tell us about your knife and usage — we'll calculate your ideal sharpening schedule.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Knife type</label>
                <select
                  value={knifeType}
                  onChange={(e) => { setKnifeType(e.target.value); setReminded(false); }}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4a7fa5]"
                >
                  <option value="">Select knife type...</option>
                  {KNIFE_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">How often do you use it?</label>
                <select
                  value={frequency}
                  onChange={(e) => { setFrequency(e.target.value); setReminded(false); }}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4a7fa5]"
                >
                  <option value="">Select frequency...</option>
                  {FREQUENCIES.map((f) => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {months && (
              <div className="bg-[#4a7fa5]/5 border border-[#4a7fa5]/20 rounded-xl p-5 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5">📅</span>
                  <div>
                    <p className="font-bold text-[#1a1a1a] mb-1">
                      Sharpen every <span className="text-[#4a7fa5]">{months} month{months !== 1 ? 's' : ''}</span>
                    </p>
                    <p className="text-gray-600 text-sm">
                      Based on your usage, your <span className="font-semibold">{knifeType.toLowerCase()}</span> is due for a professional sharpen around{' '}
                      <span className="font-semibold text-[#1a1a1a]">{nextDate}</span>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {months && !reminded && (
              <form onSubmit={handleReminder}>
                <p className="text-sm font-semibold text-gray-700 mb-2">Set a reminder email</p>
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setReminderError(''); }}
                    placeholder="your@email.com.au"
                    className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7fa5]"
                  />
                  <button
                    type="submit"
                    className="bg-[#4a7fa5] hover:bg-[#3d6e91] text-white font-semibold px-5 py-3 rounded-lg text-sm transition-colors whitespace-nowrap"
                  >
                    Set Reminder
                  </button>
                </div>
                {reminderError && <p className="text-red-500 text-xs mt-2">{reminderError}</p>}
              </form>
            )}

            {reminded && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <p className="text-green-800 font-semibold text-sm">✓ Reminder set! We'll email you when it's time.</p>
              </div>
            )}

            {!months && (
              <p className="text-gray-400 text-sm text-center italic">
                Select a knife type and usage frequency above to see your recommendation.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
