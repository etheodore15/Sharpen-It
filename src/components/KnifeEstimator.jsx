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
      description: 'Your knives need significant work to restore a proper cutting edge. Our Full Restoration service removes chips, reprofiling the bevel, and brings the blade back to factory sharpness.',
      color: 'bg-red-50 border-red-200',
      badge: 'bg-red-100 text-red-700',
      icon: '🔥',
    };
  }
  if (q1 === 'never' || q1 === '2years') {
    return {
      type: 'Standard Sharpen',
      description: 'Your knives need a thorough sharpening session. Our Standard Sharpen restores a keen edge on each blade, working through multiple grit stages to get them performing like new.',
      color: 'bg-amber-50 border-amber-200',
      badge: 'bg-amber-100 text-amber-700',
      icon: '⚡',
    };
  }
  return {
    type: 'Tune-Up',
    description: 'Your knives are in decent shape and just need a precision tune-up. Our Tune-Up service refines the existing edge, polishes the bevel, and hones each blade to a razor-sharp finish.',
    color: 'bg-green-50 border-green-200',
    badge: 'bg-green-100 text-green-700',
    icon: '✨',
  };
}

export default function KnifeEstimator() {
  const { setService } = useApp();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const currentQ = questions[step];

  const handleSelect = (value) => {
    setSelected(value);
  };

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
    <section className="bg-[#f5f5f0] py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#4a7fa5] font-semibold text-sm uppercase tracking-widest mb-3">Quick Assessment</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1a1a1a] mb-4">How Dull Are Your Knives?</h2>
          <p className="text-gray-500 text-lg">
            Answer 3 quick questions and we'll recommend the right service for your blades.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {!showResult ? (
            <div className="p-6 sm:p-8">
              {/* Progress */}
              <div className="flex items-center gap-3 mb-8">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      i <= step ? 'bg-[#4a7fa5]' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs font-semibold text-[#4a7fa5] uppercase tracking-widest mb-3">
                Question {step + 1} of {questions.length}
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-6">
                {currentQ.question}
              </h3>
              <div className="flex flex-col gap-3 mb-8">
                {currentQ.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium text-sm transition-all duration-150 cursor-pointer ${
                      selected === opt.value
                        ? 'border-[#4a7fa5] bg-[#4a7fa5]/5 text-[#1a1a1a]'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-[#4a7fa5]/40 hover:bg-[#4a7fa5]/5'
                    }`}
                  >
                    <span className={`inline-block w-4 h-4 rounded-full border-2 mr-3 align-middle transition-colors ${
                      selected === opt.value ? 'border-[#4a7fa5] bg-[#4a7fa5]' : 'border-gray-300 bg-white'
                    }`} />
                    {opt.label}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNext}
                disabled={!selected}
                className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-200 ${
                  selected
                    ? 'bg-[#4a7fa5] hover:bg-[#3d6e91] text-white cursor-pointer shadow-md hover:shadow-lg'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {step < questions.length - 1 ? 'Next Question →' : 'See My Result →'}
              </button>
            </div>
          ) : (
            <div className="p-6 sm:p-8">
              <div className={`rounded-xl border-2 p-6 mb-6 ${result.color}`}>
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{result.icon}</span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">We recommend</p>
                    <h3 className="text-2xl font-black text-[#1a1a1a] mb-3">{result.type}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{result.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setService(`Service recommendation: ${result.type}`)}
                  className="flex-1 bg-[#4a7fa5] hover:bg-[#3d6e91] text-white font-bold py-4 rounded-xl transition-colors text-base"
                >
                  Book a {result.type} →
                </button>
                <button
                  onClick={handleReset}
                  className="sm:w-auto px-6 py-4 border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-semibold rounded-xl transition-colors text-sm"
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
