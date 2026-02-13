// src/app/pages/OnboardingPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { Wrench, Shield, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Slide data
const slides = [
  {
    icon: Wrench,
    titleKey: 'onboard.title1',
    descKey: 'onboard.desc1',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Shield,
    titleKey: 'onboard.title2',
    descKey: 'onboard.desc2',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Clock,
    titleKey: 'onboard.title3',
    descKey: 'onboard.desc3',
    color: 'from-green-500 to-teal-500',
  },
];

export default function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();

  // Navigation functions
  const goNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      navigate('/login'); // ✅ Navigate to login after last slide
    }
  };

  const goPrev = () => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };

  const skipOnboarding = () => navigate('/login');

  const { icon: SlideIcon, titleKey, descKey, color } = slides[currentSlide];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${color} flex flex-col relative`}>

      {/* Language Selector */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        {['en', 'si', 'ta'].map(lang => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-3 py-1 rounded-md text-sm ${
              language === lang ? 'bg-white text-gray-900' : 'text-white/80'
            }`}
          >
            {lang === 'en' ? 'English' : lang === 'si' ? 'සිංහල' : 'தமிழ்'}
          </button>
        ))}
      </div>

      {/* Skip Button */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={skipOnboarding}
          className="text-white/80 text-sm hover:text-white"
        >
          {t('common.skip')}
        </button>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="text-center max-w-lg"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mb-8"
            >
              <div className="bg-white/20 backdrop-blur-lg w-32 h-32 rounded-full flex items-center justify-center mx-auto">
                <SlideIcon className="w-16 h-16 text-white" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-white mb-4"
            >
              {t(titleKey)}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/90 leading-relaxed"
            >
              {t(descKey)}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="p-8 relative z-10">
        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <Button
            variant="ghost"
            size="lg"
            onClick={goPrev}
            disabled={currentSlide === 0}
            className={`${currentSlide === 0 ? 'invisible' : 'text-white'}`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back
          </Button>

          <Button
            size="lg"
            onClick={goNext}
            className="bg-white text-gray-900 hover:bg-white/90"
          >
            {currentSlide === slides.length - 1
              ? t('common.getStarted')
              : t('common.next')}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
