import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import {
  Users,
  Package,
  DollarSign,
  AlertCircle,
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const stats = [
  {
    name: 'Total Users',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Active Subscriptions',
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
    icon: Package,
    color: 'from-green-500 to-green-600',
  },
  {
    name: 'Total Revenue',
    value: 'Rs. 3.2M',
    change: '+15.3%',
    trend: 'up',
    icon: DollarSign,
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Pending Payments',
    value: '156',
    change: '-5.1%',
    trend: 'down',
    icon: AlertCircle,
    color: 'from-orange-500 to-orange-600',
  },
  {
    name: 'Total Bookings',
    value: '4,521',
    change: '+22.4%',
    trend: 'up',
    icon: Calendar,
    color: 'from-cyan-500 to-cyan-600',
  },
];

const revenueData = [
  { month: 'Jan', revenue: 245000, subscriptions: 180 },
  { month: 'Feb', revenue: 298000, subscriptions: 220 },
  { month: 'Mar', revenue: 312000, subscriptions: 245 },
  { month: 'Apr', revenue: 387000, subscriptions: 298 },
  { month: 'May', revenue: 421000, subscriptions: 325 },
  { month: 'Jun', revenue: 456000, subscriptions: 342 },
];

const serviceDistribution = [
  { name: 'Electrical', value: 35, color: '#EAB308' },
  { name: 'Plumbing', value: 25, color: '#3B82F6' },
  { name: 'Appliances', value: 20, color: '#A855F7' },
  { name: 'AC Service', value: 12, color: '#06B6D4' },
  { name: 'Others', value: 8, color: '#6B7280' },
];

const planDistribution = [
  { plan: 'Basic', users: 680, percentage: 49 },
  { plan: 'Standard', users: 420, percentage: 30 },
  { plan: 'Premium', users: 290, percentage: 21 },
];

const recentBookings = [
  {
    id: 'BK-001',
    customer: 'Pradeep Silva',
    service: 'AC Gas Refilling',
    technician: 'Ravi Kumar',
    date: '2026-02-12',
    status: 'In Progress',
  },
  {
    id: 'BK-002',
    customer: 'Nishadi Fernando',
    service: 'Washing Machine Repair',
    technician: 'Anil Perera',
    date: '2026-02-12',
    status: 'Pending',
  },
  {
    id: 'BK-003',
    customer: 'Kasun Rajapaksa',
    service: 'Ceiling Fan Installation',
    technician: 'Sunil Bandara',
    date: '2026-02-11',
    status: 'Completed',
  },
  {
    id: 'BK-004',
    customer: 'Thilini Wickramasinghe',
    service: 'Water Tank Cleaning',
    technician: 'Chamara Dias',
    date: '2026-02-11',
    status: 'Completed',
  },
  {
    id: 'BK-005',
    customer: 'Dilshan Mendis',
    service: 'Smart Door Lock Setup',
    technician: 'Lakmal Fernando',
    date: '2026-02-10',
    status: 'Completed',
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Monitor your repair service business performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <Card key={stat.name}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    <TrendIcon className="w-4 h-4" />
                    {stat.change}
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-1">{stat.name}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Subscriptions Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Revenue (Rs.)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="subscriptions"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Subscriptions"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Service Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Plan Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={planDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="plan" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#3B82F6" name="Active Users" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Bookings</CardTitle>
          <a
            href="/admin/bookings"
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            View All
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Booking ID
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Service
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Technician
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {booking.id}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{booking.customer}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{booking.service}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{booking.technician}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{booking.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          booking.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}