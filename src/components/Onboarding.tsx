import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, TrendingDown, Zap, Network, ChevronRight, ChevronLeft } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Brain,
      title: 'Multi-Agent AI System',
      description: 'Four specialized AI agents work together to optimize wastewater pumping: Forecast predicts inflow and prices, Planner optimizes schedules, Executor runs operations, and Supervisor coordinates everything.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: TrendingDown,
      title: 'Minimize Energy Costs',
      description: 'Save up to 85% on energy costs by shifting pumping to low-price periods. Our AI adapts to 15-minute price changes and handles stormwater surges while maintaining flow constraints.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Zap,
      title: 'Real-Time Optimization',
      description: 'Monitor tunnel levels (L1), inflows (F1), outflows (F2), and pump status in real-time. Get instant alerts for constraint violations and automated responses to changing conditions.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Network,
      title: 'OPC UA Integration',
      description: 'Seamlessly connects to your existing infrastructure via OPC UA. Replay historical data, run simulations with Digital Twin, and deploy strategies with confidence.',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
          >
            {(() => {
              const Icon = slides[currentSlide].icon;
              return (
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${slides[currentSlide].color} flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              );
            })()}

            <h2 className="text-gray-900 text-2xl md:text-3xl mb-4">
              {slides[currentSlide].title}
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {slides[currentSlide].description}
            </p>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mb-8">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrev}
                disabled={currentSlide === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentSlide === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>

              <button
                onClick={onComplete}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Skip
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <span>{currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}