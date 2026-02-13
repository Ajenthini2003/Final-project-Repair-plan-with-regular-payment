// src/app/pages/LandingPage.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext"; // <-- use hook instead of setAppUser

import { Button } from "../components/ui/button";
import { Card, CardContent, CardTitle, CardDescription } from "../components/ui/card";

import { Wrench, Shield, Clock, Users, CheckCircle, Star } from "lucide-react";

export default function LandingPage() {
  const { setUser } = useApp(); // <-- get setUser from context
  const navigate = useNavigate(); // ✅ add navigation

  // --- Demo login handler ---
  const handleDemoLogin = () => {
    const demoUser = {
      _id: "user-demo", // ✅ fix: use _id to match AppContext
      name: "Demo User",
      email: "demo@fixmate.lk",
      role: "user",
    };
    setUser(demoUser);

    // Optional: persist demo login in localStorage
    localStorage.setItem("user", JSON.stringify(demoUser));

    alert("Logged in as demo user!");
    navigate("/dashboard"); // ✅ redirect to dashboard after login
  };

  const features = [
    { icon: Shield, title: "Trusted Service", description: "Verified technicians with guaranteed quality" },
    { icon: Clock, title: "24/7 Support", description: "Round-the-clock assistance for emergencies" },
    { icon: Wrench, title: "All Services", description: "Complete repair solutions under one roof" },
    { icon: Users, title: "Expert Team", description: "Skilled professionals for every need" },
  ];

  const testimonials = [
    { name: "Kasun Perera", location: "Colombo", rating: 5, text: "Excellent service! Fixed my AC within hours." },
    { name: "Nimal Silva", location: "Kandy", rating: 5, text: "Very professional and affordable." },
    { name: "Amara Fernando", location: "Galle", rating: 5, text: "Great experience. The technicians are very knowledgeable." },
  ];

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Wrench className="w-12 h-12" />
            <h1 className="text-5xl font-bold">FixMate 🇱🇰</h1>
          </div>
          <p className="text-xl mb-2">Repair & Payment Plan</p>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Subscribe to affordable repair plans for all your devices, vehicles, and equipment
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link to="/signup">
              <Button>Sign Up Now</Button>
            </Link>
            <Link to="/plans">
              <Button variant="outline">View Plans</Button>
            </Link>
            <Button variant="secondary" onClick={handleDemoLogin}>
              Demo Login
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FixMate?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <Feature key={i} icon={f.icon} title={f.title} description={f.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Testimonial key={i} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied customers across Sri Lanka
          </p>
          <Link to="/signup">
            <Button size="lg">Sign Up Now - It's Free!</Button>
          </Link>
        </div>
      </section>

    </div>
  );
}

// --- Feature Component ---
function Feature({ icon: Icon, title, description }) {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow">
      <CardContent>
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-blue-600" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

// --- Testimonial Component ---
function Testimonial({ testimonial }) {
  return (
    <Card>
      <CardContent>
        <div className="flex gap-1 mb-3">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
        <p className="font-semibold">{testimonial.name}</p>
        <p className="text-sm text-gray-500">{testimonial.location}</p>
      </CardContent>
    </Card>
  );
}
