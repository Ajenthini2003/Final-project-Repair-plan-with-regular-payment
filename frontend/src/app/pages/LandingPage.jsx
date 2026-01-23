import { Link } from "react-router-dom";

import Button from "../components/Button";
import Card from "../components/Card";
import CardBody from "../components/CardBody";

import {
  Wrench,
  Shield,
  Clock,
  Users,
  CheckCircle,
  Star,
} from "../components/Icons";

// --- Main Landing Page ---
export default function Home() {
  const features = [
    { icon: Shield, title: 'Trusted Service', description: 'Verified technicians with guaranteed quality' },
    { icon: Clock, title: '24/7 Support', description: 'Round-the-clock assistance for emergencies' },
    { icon: Wrench, title: 'All Services', description: 'Complete repair solutions under one roof' },
    { icon: Users, title: 'Expert Team', description: 'Skilled professionals for every need' },
  ];

  const testimonials = [
    { name: 'Kasun Perera', location: 'Colombo', rating: 5, text: 'Excellent service! Fixed my AC within hours. Highly recommend!' },
    { name: 'Nimal Silva', location: 'Kandy', rating: 5, text: 'Very professional and affordable. The yearly plan is worth it.' },
    { name: 'Amara Fernando', location: 'Galle', rating: 5, text: 'Great experience. The technicians are very knowledgeable.' },
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
              <Button primary>Sign Up Now</Button>
            </Link>
            <Link to="/plans">
              <Button outline>View Plans</Button>
            </Link>
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

      {/* Benefits */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Comprehensive Repair Solutions</h2>
            {[
              'Flexible monthly, quarterly, and yearly plans',
              'Covers devices, vehicles, and home equipment',
              'Automated recurring payments',
              'Priority booking for subscribers',
              'Track service history and payments',
              'Instant notifications for services & payments',
            ].map((b, i) => (
              <div key={i} className="flex items-start gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{b}</p>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Start Today!</h3>
            <p className="text-gray-600 mb-6">
              Get started with our affordable plans and never worry about unexpected repair costs again.
            </p>
            <Link to="/signup">
              <Button primary block>Create Account</Button>
            </Link>
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
            <Button primary size="lg">Sign Up Now - It's Free!</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// --- Feature Component ---
function Feature({ icon: Icon, title, description }) {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow">
      <CardBody>
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardBody>
    </Card>
  );
}

// --- Testimonial Component ---
function Testimonial({ testimonial }) {
  return (
    <Card>
      <CardBody>
        <div className="flex gap-1 mb-3">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
        <p className="font-semibold">{testimonial.name}</p>
        <p className="text-sm text-gray-500">{testimonial.location}</p>
      </CardBody>
    </Card>
  );
}

// --- Footer Component ---
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="w-6 h-6" />
            <span className="text-xl font-bold">FixMate</span>
          </div>
          <p className="text-gray-400">
            Your trusted partner for all repair and maintenance needs across Sri Lanka.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/plans" className="hover:text-white">Plans</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/signup" className="hover:text-white">Sign Up</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Email: support@fixmate.lk</li>
            <li>Phone: +94 11 234 5678</li>
            <li>Address: Colombo, Sri Lanka</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2026 FixMate. All rights reserved.</p>
      </div>
    </footer>
  );
}
