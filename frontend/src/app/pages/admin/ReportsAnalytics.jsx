import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Download, TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
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

const monthlyRevenue = [
  { month: 'Aug 25', revenue: 245000, users: 180, bookings: 420 },
  { month: 'Sep 25', revenue: 298000, users: 220, bookings: 512 },
  { month: 'Oct 25', revenue: 312000, users: 245, bookings: 598 },
  { month: 'Nov 25', revenue: 387000, users: 298, bookings: 687 },
  { month: 'Dec 25', revenue: 421000, users: 325, bookings: 752 },
  { month: 'Jan 26', revenue: 456000, users: 342, bookings: 821 },
  { month: 'Feb 26', revenue: 489000, users: 368, bookings: 894 },
];

const userGrowth = [
  { month: 'Aug', basic: 45, standard: 32, premium: 18 },
  { month: 'Sep', basic: 68, standard: 48, premium: 28 },
  { month: 'Oct', basic: 92, standard: 65, premium: 38 },
  { month: 'Nov', basic: 125, standard: 88, premium: 52 },
  { month: 'Dec', basic: 158, standard: 112, premium: 68 },
  { month: 'Jan', basic: 196, standard: 138, premium: 85 },
  { month: 'Feb', basic: 234, standard: 165, premium: 102 },
];

const categoryPerformance = [
  { category: 'Electrical', bookings: 312, revenue: 856000 },
  { category: 'Plumbing', bookings: 268, revenue: 678000 },
  { category: 'Appliances', bookings: 245, revenue: 612000 },
  { category: 'AC Service', bookings: 189, revenue: 512000 },
  { category: 'Carpentry', bookings: 156, revenue: 398000 },
  { category: 'Others', bookings: 124, revenue: 287000 },
];

const technicianPerformance = [
  { name: 'Ravi Kumar', jobs: 156, rating: 4.8, revenue: 428000 },
  { name: 'Sunil Bandara', jobs: 187, rating: 4.9, revenue: 512000 },
  { name: 'Anil Perera', jobs: 142, rating: 4.6, revenue: 398000 },
  { name: 'Chamara Dias', jobs: 124, rating: 4.7, revenue: 342000 },
  { name: 'Lakmal Fernando', jobs: 98, rating: 4.5, revenue: 287000 },
];

const planDistribution = [
  { name: 'Basic', value: 49, color: '#3B82F6' },
  { name: 'Standard', value: 30, color: '#10B981' },
  { name: 'Premium', value: 21, color: '#8B5CF6' },
];

export default function ReportsAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive business insights and trends</p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export All Reports
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">Rs. 489K</p>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +15.2% vs last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">368</p>
                <p className="text-sm text-gray-600">New Users</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +7.6% growth
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">894</p>
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +8.9% increase
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.7</p>
                <p className="text-sm text-gray-600">Avg. Rating</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +0.2 improvement
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue & Growth Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
                name="Revenue (Rs.)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="bookings"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.3}
                name="Bookings"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* User Growth & Plan Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth by Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="basic" stackId="a" fill="#3B82F6" name="Basic" />
                <Bar dataKey="standard" stackId="a" fill="#10B981" name="Standard" />
                <Bar dataKey="premium" stackId="a" fill="#8B5CF6" name="Premium" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Plan Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={planDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {planDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Service Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="category" type="category" width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#3B82F6" name="Bookings" />
              <Bar dataKey="revenue" fill="#10B981" name="Revenue (Rs.)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Technicians */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Technicians</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Technician
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Jobs Completed
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Rating
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Revenue Generated
                  </th>
                </tr>
              </thead>
              <tbody>
                {technicianPerformance.map((tech) => (
                  <tr key={tech.name} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{tech.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{tech.jobs}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      <span className="flex items-center gap-1">
                        ⭐ {tech.rating}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                      Rs. {tech.revenue.toLocaleString()}
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