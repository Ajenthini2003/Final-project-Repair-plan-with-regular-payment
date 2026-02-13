import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Search, Calendar, User, Wrench, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

const mockBookings = [
  {
    id: 'BK-001',
    customerName: 'Pradeep Silva',
    service: 'AC Gas Refilling',
    technician: 'Ravi Kumar',
    location: 'Colombo 7',
    date: '2026-02-13',
    time: '10:00 AM',
    status: 'approved',
  },
  {
    id: 'BK-002',
    customerName: 'Nishadi Fernando',
    service: 'Washing Machine Repair',
    technician: null,
    location: 'Kandy',
    date: '2026-02-14',
    time: '2:00 PM',
    status: 'pending',
  },
  {
    id: 'BK-003',
    customerName: 'Kasun Rajapaksa',
    service: 'Ceiling Fan Installation',
    technician: 'Sunil Bandara',
    location: 'Galle',
    date: '2026-02-13',
    time: '11:00 AM',
    status: 'in-progress',
  },
  {
    id: 'BK-004',
    customerName: 'Thilini Wickramasinghe',
    service: 'Water Tank Cleaning',
    technician: 'Chamara Dias',
    location: 'Colombo 5',
    date: '2026-02-11',
    time: '9:00 AM',
    status: 'completed',
  },
  {
    id: 'BK-005',
    customerName: 'Dilshan Mendis',
    service: 'Smart Door Lock Setup',
    technician: 'Lakmal Fernando',
    location: 'Negombo',
    date: '2026-02-12',
    time: '3:00 PM',
    status: 'completed',
  },
];

export default function BookingsManagement() {
  const [bookings, setBookings] = useState(mockBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    pending: bookings.filter((b) => b.status === 'pending').length,
    approved: bookings.filter((b) => b.status === 'approved').length,
    inProgress: bookings.filter((b) => b.status === 'in-progress').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-cyan-100 text-cyan-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApproveBooking = (bookingId) => {
    setBookings(
      bookings.map((b) => (b.id === bookingId ? { ...b, status: 'approved' } : b))
    );
    toast.success('Booking approved successfully');
  };

  const handleCompleteBooking = (bookingId) => {
    setBookings(
      bookings.map((b) => (b.id === bookingId ? { ...b, status: 'completed' } : b))
    );
    toast.success('Booking marked as completed');
  };

  const handleAssignTechnician = (booking) => {
    setSelectedBooking(booking);
    setIsAssignDialogOpen(true);
  };

  const handleSaveAssignment = () => {
    if (selectedBooking) {
      toast.success('Technician assigned successfully');
      setIsAssignDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Booking Management</h1>
        <p className="text-gray-600 mt-1">Manage service bookings and assignments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              <p className="text-sm text-gray-600 mt-1">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-cyan-600">{stats.approved}</p>
              <p className="text-sm text-gray-600 mt-1">Approved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
              <p className="text-sm text-gray-600 mt-1">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
              <p className="text-sm text-gray-600 mt-1">Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
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
                    Schedule
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {booking.id}
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
                          <User className="w-3 h-3" />
                          {booking.customerName}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          {booking.location}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{booking.service}</td>
                    <td className="py-3 px-4">
                      {booking.technician ? (
                        <div className="flex items-center gap-1 text-sm text-gray-900">
                          <Wrench className="w-3 h-3" />
                          {booking.technician}
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAssignTechnician(booking)}
                        >
                          Assign
                        </Button>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-gray-900">
                          <Calendar className="w-3 h-3" />
                          {booking.date}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {booking.time}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {booking.status === 'pending' && (
                          <Button size="sm" onClick={() => handleApproveBooking(booking.id)}>
                            Approve
                          </Button>
                        )}
                        {booking.status === 'in-progress' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCompleteBooking(booking.id)}
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Assign Technician Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Technician</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Booking: {selectedBooking.id}</p>
                <p className="text-sm font-medium text-gray-900">{selectedBooking.service}</p>
              </div>
              <div>
                <Label>Select Technician</Label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>Ravi Kumar - Available</option>
                  <option>Sunil Bandara - Available</option>
                  <option>Chamara Dias - Busy</option>
                  <option>Lakmal Fernando - Off Duty</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveAssignment}>Assign Technician</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}