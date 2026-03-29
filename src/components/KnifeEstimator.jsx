import { useState } from 'react';
import { useApp } from '../context/AppContext';

const questions = [
  {
    id: 'q1',
    question: 'When were your knives last sharpened professionally?',
    options: [
      { value: 'never', label: 'Never' },
      { value: '2years', label: 'More than 2 years ago' },
      { value: '6to24', label: '6–24 months ago' },
      { value: 'recent', label: 'Less than 6 months ago' },
    ],
  },
  {
    id: 'q2',
    question: 'How are your knives performing right now?',
    options: [
      { value: 'struggle', label: 'Struggle to cut a tomato cleanly' },
      { value: 'cutting', label: 'Cutting, but not clean or effortless' },
      { value: 'pretty_good', label: 'Pretty good, but not razor sharp' },
      { value: 'sharp', label: 'Still fairly sharp' },
    ],
  },
  {
    id: 'q3',
    question: 'What\'s the main use for these knives?',
    options: [
      { value: 'home', label: 'Everyday home cooking' },
      { value: 'serious', label: 'Serious home cook' },
      { value: 'pro', label: 'Professional / commercial kitchen' },
      { value: 'outdoor', label: 'Hunting & outdoors' },
    ],
  },
];

function getResult(answers) {
  const { q1, q2 } = answers;
  if (q1 === 'never' || (q1 === '2years' && q2 === 'struggle')) {
    return {
      type: 'Full Restoration',
      description: 'Your knives need significant work. We\'ll reprofile the bevel, remove chips, and restore a proper working edge from scratch.',
    };
  }
  if (q1 === 'never' || q1 === '2years') {
    return {
      type: 'Standard Sharpen',
      description: 'Your knives are overdue. A full sharpening session across multiple grits will get them performing like new.',
    };
  }
  return {
    type: 'Tune-Up',
    description: 'Your knives are in decent shape. A precision tune-up will refine the existing edge and bring them back to peak performance.',
  };
}

export default function KnifeEstimator() {
  const { setService } = useApp();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const currentQ = questions[step];

  const handleNext = () => {
    if (!selected) return;
    const newAnswers = { ...answers, [currentQ.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setSelected(null);
    setShowResult(false);
  };

  const result = showResult ? getResult(answers) : null;

  return (
    <section className="bg-[#0f0f0f] py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <p className="text-[#4a7fa5] font-bold text-xs uppercase tracking-widest mb-4">Quick Assessment</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            How dull are<br />your knives?
          </h2>
        </div>

        <div className="border border-white/10 bg-[#1a1a1a]">
          {!showResult ? (
            <div className="p-6 sm:p-8">
              {/* Progress */}
              <div className="flex gap-1.5 mb-8">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-px flex-1 transition-all duration-300 ${i <= step ? 'bg-[#4a7fa5]' : 'bg-white/10'}`}
                  />
                ))}
              </div>

              <p className="text-[#4a7fa5] text-xs font-bold uppercase tracking-widest mb-3">
                {step + 1} / {questions.length}
              </p>
              <h3 className="text-xl font-black text-white mb-6">{currentQ.question}</h3>

              <div className="flex flex-col gap-2 mb-8">
                {currentQ.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSelected(opt.value)}
                    className={`w-full text-left px-5 py-4 border text-sm font-medium transition-all duration-150 cursor-pointer ${
                      selected === opt.value
                        ? 'border-[#4a7fa5] bg-[#4a7fa5]/10 text-white'
                        : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <span className={`inline-block w-3 h-3 border mr-3 align-middle transition-colors ${
                      selected === opt.value ? 'border-[#4a7fa5] bg-[#4a7fa5]' : 'border-white/20'
                    }`} />
                    {opt.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={!selected}
                className={`w-full py-4 text-xs font-black uppercase tracking-widest transition-colors ${
                  selected
                    ? 'bg-white text-[#0f0f0f] hover:bg-[#4a7fa5] hover:text-white cursor-pointer'
                    : 'bg-white/5 text-white/20 cursor-not-allowed'
                }`}
              >
                {step < questions.length - 1 ? 'Next →' : 'See Result →'}
              </button>
            </div>
          ) : (
            <div className="p-6 sm:p-8">
              <p className="text-[#4a7fa5] text-xs font-bold uppercase tracking-widest mb-2">We recommend</p>
              <h3 className="text-3xl font-black text-white mb-4">{result.type}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-8 pb-8 border-b border-white/10">{result.description}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setService(`Service recommendation: ${result.type}`)}
                  className="flex-1 bg-white hover:bg-[#4a7fa5] text-[#0f0f0f] hover:text-white font-black py-4 text-xs uppercase tracking-widest transition-colors"
                >
                  Book a {result.type} →
                </button>
                <button
                  onClick={handleReset}
                  className="sm:w-auto px-6 py-4 border border-white/10 hover:border-white/30 text-white/40 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
