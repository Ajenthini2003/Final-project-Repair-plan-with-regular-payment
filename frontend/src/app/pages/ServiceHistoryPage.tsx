import { useApp } from '@/app/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Download, Star, Calendar, User, FileText } from 'lucide-react';
import { format } from 'date-fns';

export function ServiceHistoryPage() {
  const { bookings, plans } = useApp();

  const completedBookings = bookings.filter((b) => b.status === 'completed');

  const handleDownloadInvoice = (bookingId: string) => {
    // Mock invoice download
    alert(`Downloading invoice for booking ${bookingId}`);
  };

  const handleRateTechnician = (bookingId: string) => {
    // Mock rating
    alert(`Rate service for booking ${bookingId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Service History</h1>
          <p className="text-gray-600">View your past repairs and services</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Total Services</p>
            <p className="text-3xl font-bold">{bookings.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-3xl font-bold">{completedBookings.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-3xl font-bold">
              {bookings.filter((b) => b.status === 'pending').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Service Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>All Services</CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const plan = plans.find((p) => p.id === booking.planId);
                return (
                  <div
                    key={booking.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{plan?.name || 'Service'}</h3>
                          <Badge
                            variant={
                              booking.status === 'completed'
                                ? 'default'
                                : booking.status === 'confirmed'
                                ? 'secondary'
                                : booking.status === 'cancelled'
                                ? 'destructive'
                                : 'outline'
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{booking.issue}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{booking.date} at {booking.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>Technician #{booking.technicianId}</span>
                          </div>
                        </div>
                        {booking.notes && (
                          <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                            <p className="text-gray-700">
                              <strong>Notes:</strong> {booking.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-3">
                      {booking.status === 'completed' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownloadInvoice(booking.id)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Invoice
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRateTechnician(booking.id)}
                          >
                            <Star className="w-4 h-4 mr-2" />
                            Rate Service
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="ghost">
                        <FileText className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No service history yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
