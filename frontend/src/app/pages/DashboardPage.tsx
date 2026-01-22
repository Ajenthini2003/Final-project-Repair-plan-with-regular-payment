import { useApp } from '@/app/contexts/AppContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Link } from 'react-router-dom';
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
  TrendingUp,
} from 'lucide-react';
import { format } from 'date-fns';

export function DashboardPage() {
  const { user, bookings, payments, notifications, plans, subscribedPlans } = useApp();
  const { t } = useLanguage();

  const activePlans = plans.filter((plan) => subscribedPlans.includes(plan.id));
  const upcomingBookings = bookings.filter((b) => b.status !== 'completed' && b.status !== 'cancelled');
  const recentPayments = payments.slice(-3);
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('dashboard.goodMorning');
    if (hour < 17) return t('dashboard.goodAfternoon');
    return t('dashboard.goodEvening');
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section with Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold mb-2">
              {getGreeting()}, {user?.name}! 👋
            </h1>
            <p className="text-blue-100">Here's what's happening with your account today</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/book-service">
              <Button variant="secondary" size="sm">
                <Zap className="w-4 h-4 mr-2" />
                Quick Book
              </Button>
            </Link>
            <Link to="/technicians">
              <Button variant="outline" size="sm" className="bg-transparent text-white border-white hover:bg-white/10">
                <Users className="w-4 h-4 mr-2" />
                Find Technician
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Plans</p>
                <p className="text-2xl font-bold">{activePlans.length}</p>
              </div>
              <Package className="w-10 h-10 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Services</p>
                <p className="text-2xl font-bold">{upcomingBookings.length}</p>
              </div>
              <Calendar className="w-10 h-10 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Payments</p>
                <p className="text-2xl font-bold">{payments.length}</p>
              </div>
              <CreditCard className="w-10 h-10 text-purple-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Notifications</p>
                <p className="text-2xl font-bold">{unreadNotifications}</p>
              </div>
              <Bell className="w-10 h-10 text-orange-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Plans */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active Repair Plans</CardTitle>
            <Link to="/plans">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {activePlans.length > 0 ? (
              <div className="space-y-4">
                {activePlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-semibold">{plan.name}</h4>
                      <p className="text-sm text-gray-600">
                        Rs. {plan.price.toLocaleString()} / {plan.duration}
                      </p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">No active plans</p>
                <Link to="/plans">
                  <Button>Browse Plans</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Services */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Services</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingBookings.length > 0 ? (
              <div className="space-y-3">
                {upcomingBookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="border-l-4 border-blue-500 pl-3 py-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <p className="text-sm font-medium">{booking.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <p className="text-sm text-gray-600">{booking.time}</p>
                    </div>
                    <Badge
                      variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                      className="mt-2 text-xs"
                    >
                      {booking.status}
                    </Badge>
                  </div>
                ))}
                <Link to="/bookings">
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View All Bookings <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-4">No upcoming services</p>
                <Link to="/book-service">
                  <Button size="sm">Book Now</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Payments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Payments</CardTitle>
          <Link to="/payments">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {recentPayments.length > 0 ? (
            <div className="space-y-3">
              {recentPayments.map((payment) => {
                const plan = plans.find((p) => p.id === payment.planId);
                return (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          payment.status === 'paid'
                            ? 'bg-green-100'
                            : payment.status === 'pending'
                            ? 'bg-yellow-100'
                            : 'bg-red-100'
                        }`}
                      >
                        {payment.status === 'paid' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : payment.status === 'pending' ? (
                          <Clock className="w-5 h-5 text-yellow-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{plan?.name || 'Payment'}</p>
                        <p className="text-sm text-gray-600">
                          {format(new Date(payment.date), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">Rs. {payment.amount.toLocaleString()}</p>
                      <Badge
                        variant={
                          payment.status === 'paid'
                            ? 'default'
                            : payment.status === 'pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                        className="text-xs"
                      >
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-600">No payment history</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}