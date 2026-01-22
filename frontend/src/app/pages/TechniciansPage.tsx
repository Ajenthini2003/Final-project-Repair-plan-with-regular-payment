import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import {
  Star,
  MapPin,
  Phone,
  Shield,
  Search,
  SlidersHorizontal,
  MessageCircle,
} from 'lucide-react';

interface Technician {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  services: string[];
  verified: boolean;
  available: boolean;
  phone: string;
  priceRange: string;
}

const mockTechnicians: Technician[] = [
  {
    id: '1',
    name: 'Nimal Silva',
    rating: 4.8,
    reviews: 127,
    distance: '2.5 km',
    services: ['AC Repair', 'Refrigerator', 'Electrical'],
    verified: true,
    available: true,
    phone: '+94 77 123 4567',
    priceRange: 'Rs. 1,500 - 3,000',
  },
  {
    id: '2',
    name: 'Kasun Perera',
    rating: 4.9,
    reviews: 245,
    distance: '1.2 km',
    services: ['Plumbing', 'Water Systems', 'Bathroom Fittings'],
    verified: true,
    available: true,
    phone: '+94 71 234 5678',
    priceRange: 'Rs. 2,000 - 4,000',
  },
  {
    id: '3',
    name: 'Sunil Fernando',
    rating: 4.7,
    reviews: 89,
    distance: '3.8 km',
    services: ['Washing Machine', 'Dryer', 'Kitchen Equipment'],
    verified: true,
    available: false,
    phone: '+94 76 345 6789',
    priceRange: 'Rs. 1,800 - 3,500',
  },
  {
    id: '4',
    name: 'Ravi Wickramasinghe',
    rating: 5.0,
    reviews: 156,
    distance: '0.8 km',
    services: ['Mobile Repair', 'Laptop', 'Computer'],
    verified: true,
    available: true,
    phone: '+94 77 456 7890',
    priceRange: 'Rs. 1,000 - 5,000',
  },
  {
    id: '5',
    name: 'Amara De Silva',
    rating: 4.6,
    reviews: 73,
    distance: '4.5 km',
    services: ['Vehicle Repair', 'Car AC', 'Battery'],
    verified: false,
    available: true,
    phone: '+94 71 567 8901',
    priceRange: 'Rs. 2,500 - 6,000',
  },
];

export function TechniciansPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const filteredTechnicians = mockTechnicians.filter(
    (tech) =>
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\s/g, '').replace('+', '');
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Find a Technician</h1>
        <p className="text-gray-600">Browse verified technicians near you</p>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search by name or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Technicians List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTechnicians.map((tech) => (
          <Card key={tech.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{tech.name}</h3>
                    {tech.verified && (
                      <Shield className="w-4 h-4 text-blue-500" title="Verified" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{tech.rating}</span>
                    <span className="text-gray-500">({tech.reviews})</span>
                  </div>
                </div>
                <Badge variant={tech.available ? 'default' : 'secondary'}>
                  {tech.available ? 'Available' : 'Busy'}
                </Badge>
              </div>

              {/* Services */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {tech.services.slice(0, 2).map((service, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                  {tech.services.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{tech.services.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{tech.distance} away</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{tech.priceRange}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => navigate(`/technician/${tech.id}`)}
                >
                  View Profile
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleWhatsApp(tech.phone)}
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCall(tech.phone)}
                >
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTechnicians.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No technicians found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}
