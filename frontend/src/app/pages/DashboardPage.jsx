import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useApp } from "../contexts/AppContext";
import { useLanguage } from "../contexts/LanguageContext";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

import {
  Calendar,
  CreditCard,
  Package,
  Bell,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Users,
} from "lucide-react";

import { format } from "date-fns";


export default function Dashboard() {
  const { user, bookings, payments, notifications, plans, subscribedPlans } = useApp();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const activePlans = plans.filter(plan => subscribedPlans.includes(plan.id));
  const upcoming = bookings.filter(b => !['completed', 'cancelled'].includes(b.status));
  const recentPayments = payments.slice(-3);
  const unreadCount = notifications.filter(n => !n.read).length;

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('dashboard.goodMorning');
    if (hour < 17) return t('dashboard.goodAfternoon');
    return t('dashboard.goodEvening');
  };

  return (
    <div className="space-y-6">

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold mb-2">{greeting()}, {user?.name}! 👋</h1>
            <p className="text-blue-100">Here's what's happening in your account today</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/book-service">
              <Button variant="secondary" size="sm">
                <Zap className="w-4 h-4 mr-2" /> Quick Book
              </Button>
            </Link>
            <Link to="/technicians">
              <Button variant="outline" size="sm" className="bg-transparent text-white border-white hover:bg-white/10">
                <Users className="w-4 h-4 mr-2" /> Find Technician
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Plans" value={activePlans.length} icon={<Package className="w-10 h-10 text-blue-600 opacity-20" />} />
        <StatCard label="Upcoming Services" value={upcoming.length} icon={<Calendar className="w-10 h-10 text-green-600 opacity-20" />} />
        <StatCard label="Total Payments" value={payments.length} icon={<CreditCard className="w-10 h-10 text-purple-600 opacity-20" />} />
        <StatCard label="Notifications" value={unreadCount} icon={<Bell className="w-10 h-10 text-orange-600 opacity-20" />} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Active Plans */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Active Plans</CardTitle>
            <Link to="/plans">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            {activePlans.length ? (
              <div className="space-y-4">
                {activePlans.map(plan => (
                  <div key={plan.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">{plan.name}</p>
                      <p className="text-sm text-gray-600">Rs. {plan.price.toLocaleString()} / {plan.duration}</p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState icon={<Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />} message="No active plans" link="/plans" buttonText="Browse Plans" />
            )}
          </CardContent>
        </Card>

        {/* Upcoming Services */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Services</CardTitle>
          </CardHeader>
          <CardContent>
            {upcoming.length ? (
              <div className="space-y-3">
                {upcoming.slice(0, 3).map(b => (
                  <div key={b.id} className="border-l-4 border-blue-500 pl-3 py-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <p className="text-sm font-medium">{b.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <p className="text-sm text-gray-600">{b.time}</p>
                    </div>
                    <Badge variant={b.status === 'confirmed' ? 'default' : 'secondary'} className="mt-2 text-xs">{b.status}</Badge>
                  </div>
                ))}
                <Link to="/bookings">
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View All Bookings <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ) : (
              <EmptyState icon={<Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />} message="No upcoming services" link="/book-service" buttonText="Book Now" />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Payments */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Recent Payments</CardTitle>
          <Link to="/payments">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {recentPayments.length ? (
            recentPayments.map(payment => {
              const plan = plans.find(p => p.id === payment.planId);
              const statusColor = payment.status === 'paid' ? 'green' : payment.status === 'pending' ? 'yellow' : 'red';
              return (
                <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${statusColor}-100`}>
                      {payment.status === 'paid' ? <CheckCircle className="w-5 h-5 text-green-600" />
                        : payment.status === 'pending' ? <Clock className="w-5 h-5 text-yellow-600" />
                        : <AlertCircle className="w-5 h-5 text-red-600" />}
                    </div>
                    <div>
                      <p className="font-medium">{plan?.name || 'Payment'}</p>
                      <p className="text-sm text-gray-600">{format(new Date(payment.date), 'MMM dd, yyyy')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">Rs. {payment.amount.toLocaleString()}</p>
                    <Badge variant={payment.status === 'paid' ? 'default' : payment.status === 'pending' ? 'secondary' : 'destructive'} className="text-xs">{payment.status}</Badge>
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyState icon={<CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-3" />} message="No payment history" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* --- Helper Components for Clean Code --- */
function StatCard({ label, value, icon }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({ icon, message, link, buttonText }) {
  return (
    <div className="text-center py-8">
      {icon}
      <p className="text-gray-600 mb-4">{message}</p>
      {link && buttonText && <Link to={link}><Button>{buttonText}</Button></Link>}
    </div>
  );
}
