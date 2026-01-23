import {
  Zap,
  Droplets,
  Wind,
  Wrench,
  Hammer,
  PaintBucket,
  Shield,
  Wifi,
  SparklesIcon,
  AlertCircle,
} from 'lucide-react';

export const serviceCategories = [
  {
    id: 'electrical',
    name: 'Electrical Repairs',
    nameSi: 'විදුලි අලුත්වැඩියා',
    nameTa: 'மின் பழுதுபார்ப்பு',
    description: 'Complete electrical solutions for your home',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    services: [
      {
        id: 'el-1',
        name: 'Ceiling Fan Repair & Replacement',
        nameSi: 'සිවිලිම් පංකා අලුත්වැඩියා',
        nameTa: 'உச்சவிசிறி பழுதுபார்ப்பு',
        description: 'Fan installation, repair, speed control, and balancing',
        estimatedTime: '1-2 hours',
        priceRange: 'Rs. 800 - 2,500',
      },
      {
        id: 'el-2',
        name: 'Wall & Exhaust Fan Servicing',
        nameSi: 'බිත්ති පංකා සේවාව',
        nameTa: 'சுவர் விசிறி சேவை',
        description: 'Cleaning, oiling, and repair of wall and exhaust fans',
        estimatedTime: '30-60 mins',
        priceRange: 'Rs. 500 - 1,500',
      },
      // ... (rest of the electrical services)
    ],
  },
  {
    id: 'plumbing',
    name: 'Plumbing Services',
    nameSi: 'ජල නල සේවා',
    nameTa: 'பிளம்பிங் சேவைகள்',
    description: 'Professional plumbing solutions',
    icon: Droplets,
    color: 'from-blue-500 to-cyan-500',
    services: [
      {
        id: 'pl-1',
        name: 'Leaking Tap & Pipe Repairs',
        nameSi: 'කාන්දු වන කරාබු',
        nameTa: 'நீர் கசிவு பழுதுபார்ப்பு',
        description: 'Fix leaking taps, pipes, and joints',
        estimatedTime: '30-90 mins',
        priceRange: 'Rs. 500 - 2,000',
      },
      // ... (rest of the plumbing services)
    ],
  },
  {
    id: 'appliances',
    name: 'Appliance Repairs',
    nameSi: 'උපකරණ අලුත්වැඩියා',
    nameTa: 'சாதன பழுதுபார்ப்பு',
    description: 'Expert repair for all home appliances',
    icon: Wrench,
    color: 'from-purple-500 to-pink-500',
    services: [
      {
        id: 'ap-1',
        name: 'Washing Machine Repair',
        nameSi: 'රෙදි සෝදන යන්ත්‍ර',
        nameTa: 'சலவை இயந்திரம்',
        description: 'All brands - front load, top load, semi-automatic',
        estimatedTime: '1-2 hours',
        priceRange: 'Rs. 1,500 - 5,000',
      },
      // ... (rest of the appliance services)
    ],
  },
  // ... (other categories like ac-cooling, carpentry, painting, security, tech-it, cleaning, emergency)
];

// --------------------
// Utility Functions
// --------------------
export function getServiceById(serviceId) {
  for (const category of serviceCategories) {
    const service = category.services.find((s) => s.id === serviceId);
    if (service) return service;
  }
  return undefined;
}

export function getCategoryById(categoryId) {
  return serviceCategories.find((c) => c.id === categoryId);
}
