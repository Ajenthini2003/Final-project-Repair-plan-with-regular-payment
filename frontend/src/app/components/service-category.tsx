import { LucideIcon } from 'lucide-react';
import { Card } from '@/app/components/ui/card';

interface Service {
  name: string;
}

interface ServiceCategoryProps {
  icon: LucideIcon;
  title: string;
  services: Service[];
  iconColor: string;
}

export function ServiceCategory({ icon: Icon, title, services, iconColor }: ServiceCategoryProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-3 rounded-lg ${iconColor}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <ul className="space-y-2">
        {services.map((service, index) => (
          <li key={index} className="flex items-start gap-2 text-gray-700">
            <span className="text-blue-500 mt-1">•</span>
            <span>{service.name}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
