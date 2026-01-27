// src/app/pages/ServicesPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search, Clock, DollarSign, ArrowRight } from "lucide-react";
import { serviceCategories } from "../data/services";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  // Filter categories based on search and selection
  const filteredCategories = serviceCategories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.services.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = !selectedCategory || category.id === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleBookService = (service) => {
    navigate("/book-service", { state: { service } });
  };

  return (
    <div className="space-y-6 p-4">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">All Home Services</h1>
        <p className="text-gray-600">
          Complete home care solutions - from electrical to plumbing, appliances to security
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search services (e.g., 'AC repair', 'plumbing')..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filter */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedCategory === null ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <p className="font-semibold text-sm text-center">All Categories</p>
        </button>

        {serviceCategories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedCategory === category.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mx-auto mb-2`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="font-semibold text-sm text-center">{category.name}</p>
            </button>
          );
        })}
      </div>

      {/* Services Grid */}
      <div className="space-y-8">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.services.map((service) => (
                      <div
                        key={service.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <h4 className="font-semibold mb-2">{service.name}</h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{service.estimatedTime}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <DollarSign className="w-3 h-3" />
                            <span>{service.priceRange}</span>
                          </div>
                        </div>
                        <Button size="sm" className="w-full" onClick={() => handleBookService(service)}>
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
          <div className="text-center py-12 text-gray-600">No services found. Try a different search.</div>
        )}
      </div>
    </div>
  );
}
