import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'si' | 'ta';

interface Translations {
  [key: string]: {
    en: string;
    si: string;
    ta: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.dashboard': {
    en: 'Dashboard',
    si: 'උපකරණ පුවරුව',
    ta: 'முகப்பு',
  },
  'nav.plans': {
    en: 'Plans',
    si: 'සැලසුම්',
    ta: 'திட்டங்கள்',
  },
  'nav.book': {
    en: 'Book Service',
    si: 'සේවාව වෙන්කරවා ගන්න',
    ta: 'சேவை பதிவு',
  },
  'nav.payments': {
    en: 'Payments',
    si: 'ගෙවීම්',
    ta: 'கட்டணம்',
  },
  'nav.notifications': {
    en: 'Notifications',
    si: 'දැනුම්දීම්',
    ta: 'அறிவிப்புகள்',
  },
  'nav.profile': {
    en: 'Profile',
    si: 'පැතිකඩ',
    ta: 'சுயவிவரம்',
  },
  
  // Common
  'common.logout': {
    en: 'Logout',
    si: 'ඉවත් වන්න',
    ta: 'வெளியேறு',
  },
  'common.login': {
    en: 'Login',
    si: 'පිවිසෙන්න',
    ta: 'உள்நுழைய',
  },
  'common.signup': {
    en: 'Sign Up',
    si: 'ලියාපදිංචි වන්න',
    ta: 'பதிவு செய்யவும்',
  },
  'common.save': {
    en: 'Save',
    si: 'සුරකින්න',
    ta: 'சேமி',
  },
  'common.cancel': {
    en: 'Cancel',
    si: 'අවලංගු කරන්න',
    ta: 'ரத்து செய்',
  },
  'common.submit': {
    en: 'Submit',
    si: 'ඉදිරිපත් කරන්න',
    ta: 'சமர்ப்பிக்க',
  },
  'common.next': {
    en: 'Next',
    si: 'ඊළඟ',
    ta: 'அடுத்தது',
  },
  'common.skip': {
    en: 'Skip',
    si: 'මගහරින්න',
    ta: 'தவிர்',
  },
  'common.getStarted': {
    en: 'Get Started',
    si: 'ආරම්භ කරන්න',
    ta: 'தொடங்கவும்',
  },
  
  // Onboarding
  'onboard.title1': {
    en: 'Professional Repair Services',
    si: 'වෘත්තීය අලුත්වැඩියා සේවා',
    ta: 'தொழில்முறை பழுதுபார்ப்பு சேவைகள்',
  },
  'onboard.desc1': {
    en: 'Connect with verified technicians for all your repair needs',
    si: 'ඔබගේ සියලුම අලුත්වැඩියා අවශ්‍යතා සඳහා සත්‍යාපිත තාක්ෂණිකයන් සමඟ සම්බන්ධ වන්න',
    ta: 'உங்கள் அனைத்து பழுதுபார்ப்பு தேவைகளுக்கும் சரிபார்க்கப்பட்ட தொழில்நுட்ப வல்லுநர்களுடன் இணைக்கவும்',
  },
  'onboard.title2': {
    en: 'Affordable Plans',
    si: 'දැරිය හැකි සැලසුම්',
    ta: 'மலிவு திட்டங்கள்',
  },
  'onboard.desc2': {
    en: 'Choose from flexible monthly, quarterly, or yearly subscription plans',
    si: 'නම්‍යශීලී මාසික, කාර්තුමය හෝ වාර්ෂික දායකත්ව සැලසුම් වලින් තෝරා ගන්න',
    ta: 'நெகிழ்வான மாதாந்திர, காலாண்டு அல்லது ஆண்டு சந்தா திட்டங்களில் இருந்து தேர்வு செய்யவும்',
  },
  'onboard.title3': {
    en: '24/7 Support',
    si: '24/7 සහාය',
    ta: '24/7 ஆதரவு',
  },
  'onboard.desc3': {
    en: 'Emergency services available anytime, anywhere in Sri Lanka',
    si: 'හදිසි සේවාවන් ඕනෑම වේලාවක, ශ්‍රී ලංකාවේ ඕනෑම ස්ථානයක ලබා ගත හැකිය',
    ta: 'அவசர சேவைகள் எந்த நேரத்திலும், இலங்கையில் எங்கும் கிடைக்கும்',
  },
  
  // Dashboard
  'dashboard.welcome': {
    en: 'Welcome back',
    si: 'නැවත සාදරයෙන් පිළිගනිමු',
    ta: 'மீண்டும் வரவேற்கிறோம்',
  },
  'dashboard.goodMorning': {
    en: 'Good Morning',
    si: 'සුභ උදෑසනක්',
    ta: 'காலை வணக்கம்',
  },
  'dashboard.goodAfternoon': {
    en: 'Good Afternoon',
    si: 'සුභ හවසක්',
    ta: 'மதிய வணக்கம்',
  },
  'dashboard.goodEvening': {
    en: 'Good Evening',
    si: 'සුභ සන්ධ්‍යාවක්',
    ta: 'மாலை வணக்கம்',
  },
  'dashboard.activePlans': {
    en: 'Active Plans',
    si: 'සක්‍රිය සැලසුම්',
    ta: 'செயலில் உள்ள திட்டங்கள்',
  },
  'dashboard.upcomingServices': {
    en: 'Upcoming Services',
    si: 'ළඟදීම පැමිණෙන සේවා',
    ta: 'வரவிருக்கும் சேவைகள்',
  },
  'dashboard.recentPayments': {
    en: 'Recent Payments',
    si: 'මෑත ගෙවීම්',
    ta: 'சமீபத்திய கட்டணங்கள்',
  },
  
  // Plans
  'plans.basic': {
    en: 'Basic Plan',
    si: 'මූලික සැලැස්ම',
    ta: 'அடிப்படை திட்டம்',
  },
  'plans.standard': {
    en: 'Standard Plan',
    si: 'සම්මත සැලැස්ම',
    ta: 'நிலையான திட்டம்',
  },
  'plans.premium': {
    en: 'Premium Plan',
    si: 'වාරික සැලැස්ම',
    ta: 'பிரீமியம் திட்டம்',
  },
  'plans.subscribe': {
    en: 'Subscribe Now',
    si: 'දැන් දායක වන්න',
    ta: 'இப்போது சந்தா செலுத்துங்கள்',
  },
  'plans.unsubscribe': {
    en: 'Unsubscribe',
    si: 'දායකත්වය ඉවත් කරන්න',
    ta: 'சந்தாவை நிறுத்து',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language] || translation.en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
