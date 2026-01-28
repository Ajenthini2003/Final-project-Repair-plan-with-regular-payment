// src/app/pages/ServicesPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search, Clock, DollarSign, ArrowRight } from "lucide-react";

// 🔹 Icons (same as before)
import {
  Zap,
  Droplets,
  Wind,
  Wrench,
  Hammer,
  PaintBucket,
  Shield,
  Wifi,
  Sparkles,
  AlertCircle,
} from "lucide-react";

// 🔹 Backend API
import { getServices } from "../../api/services";

/* ================= CATEGORY CONFIG (UI ONLY) ================= */

const categoryConfig = {
  electrical: {
    name: "Electrical Repairs",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
  },
  plumbing: {
    name: "Plumbing Services",
    icon: Droplets,
    color: "from-blue-500 to-cyan-500",
  },
  appliance: {
    name: "Appliance Repairs",
    icon: Wrench,
    color: "from-purple-500 to-pink-500",
  },
  ac: {
    name: "AC & Cooling Services",
    icon: Wind,
    color: "from-cyan-500 to-blue-500",
  },
  carpentry: {
    name: "Carpentry & Structures",
    icon: Hammer,
    color: "from-amber-500 to-orange-500",
  },
  painting: {
    name: "Painting & Wall Care",
    icon: PaintBucket,
    color: "from-pink-500 to-rose-500",
  },
  security: {
    name: "Home Safety & Security",
    icon: Shield,
    color: "from-green-500 to-emerald-500",
  },
  electronics: {
    name: "Home Tech & IT",
    icon: Wifi,
    color: "from-indigo-500 to-purple-500",
  },
  cleaning: {
    name: "Cleaning & Maintenance",
    icon: Sparkles,
    color: "from-teal-500 to-cyan-500",
  },
  emergency: {
    name: "Emergency Services",
    icon: AlertCircle,
    color: "from-red-500 to-orange-500",
  },
};

/* ================= COMPONENT ================= */

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  // 🔹 Fetch services from backend
  useEffect(() => {
    getServices().then(setServices);
  }, []);

  // 🔹 Group services by category
  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {});

  // 🔹 Filter logic (same behavior as before)
  const filteredCategories = Object.keys(groupedServices).filter((cat) => {
    const matchesCategory = !selectedCategory || cat === selectedCategory;

    const matchesSearch =
      categoryConfig[cat]?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      groupedServices[cat].some((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  const handleBookService = (service) => {
    navigate("/book-service", { state: { service } });
  };

  return (
    <div className="space-y-6 p-4">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold mb-2">All Home Services</h1>
        <p className="text-gray-600">
          Complete home care solutions — electrical, plumbing, appliances & more
        </p>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* ================= CATEGORY FILTER ================= */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedCategory === null
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <p className="font-semibold text-sm text-center">All Categories</p>
        </button>

        {Object.entries(categoryConfig).map(([id, cfg]) => {
          const Icon = cfg.icon;
          return (
            <button
              key={id}
              onClick={() => setSelectedCategory(id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedCategory === id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${cfg.color} flex items-center justify-center mx-auto mb-2`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="font-semibold text-sm text-center">{cfg.name}</p>
            </button>
          );
        })}
      </div>

      {/* ================= SERVICES ================= */}
      <div className="space-y-8">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat) => {
            const cfg = categoryConfig[cat];
            const Icon = cfg.icon;

            return (
              <Card key={cat}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cfg.color} flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>{cfg.name}</CardTitle>
                      <CardDescription>
                        Available professional services
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupedServices[cat].map((service) => (
                      <div
                        key={service._id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <h4 className="font-semibold mb-2">
                          {service.name}
                        </h4>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {service.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{service.duration}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <DollarSign className="w-3 h-3" />
                            <span>Rs. {service.price}</span>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => handleBookService(service)}
                        >
                          Book Now <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-12 text-gray-600">
            No services found.
          </div>
        )}
      </div>
    </div>
  );
}
