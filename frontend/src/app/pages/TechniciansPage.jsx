import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";


import {
  Star,
  MapPin,
  Phone,
  Shield,
  Search,
  SlidersHorizontal,
  MessageCircle,
} from "lucide-react";

const mockTechnicians = [
  {
    id: "1",
    name: "Nimal Silva",
    rating: 4.8,
    reviews: 127,
    distance: "2.5 km",
    services: ["AC Repair", "Refrigerator", "Electrical"],
    verified: true,
    available: true,
    phone: "+94771234567",
    priceRange: "Rs. 1,500 - 3,000",
  },
  {
    id: "2",
    name: "Kasun Perera",
    rating: 4.9,
    reviews: 245,
    distance: "1.2 km",
    services: ["Plumbing", "Water Systems", "Bathroom Fittings"],
    verified: true,
    available: true,
    phone: "+94712345678",
    priceRange: "Rs. 2,000 - 4,000",
  },
];

export default function TechniciansPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredTechnicians = mockTechnicians.filter(
    (tech) =>
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.services.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (phone) => {
    const clean = phone.replace("+", "");
    window.open(`https://wa.me/${clean}`, "_blank");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Find a Technician</h1>
        <p className="text-gray-600">Browse technicians near you</p>
      </div>

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
        <Button variant="outline">
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTechnicians.map((tech) => (
          <Card key={tech.id}>
            <CardContent className="p-5 space-y-3">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{tech.name}</h3>
                  <div className="flex items-center text-sm gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    {tech.rating} ({tech.reviews})
                  </div>
                </div>
                {tech.verified && (
                  <Shield className="w-4 h-4 text-blue-500" />
                )}
              </div>

              <div className="flex gap-2 flex-wrap">
                {tech.services.slice(0, 2).map((s, i) => (
                  <Badge key={i} variant="outline">
                    {s}
                  </Badge>
                ))}
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {tech.distance}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {tech.priceRange}
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" onClick={() => navigate(`/technician/${tech.id}`)}>
                  View
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleWhatsApp(tech.phone)}>
                  <MessageCircle className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleCall(tech.phone)}>
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
