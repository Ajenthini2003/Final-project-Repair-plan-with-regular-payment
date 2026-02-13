import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Bell, Send, Users, Calendar, DollarSign, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const mockNotifications = [
  {
    id: 'N001',
    type: 'payment',
    title: 'Payment Reminder',
    message: 'Your monthly subscription payment is due in 3 days',
    recipients: 245,
    sentDate: '2026-02-12 10:00 AM',
    status: 'sent',
  },
  {
    id: 'N002',
    type: 'booking',
    title: 'Booking Confirmation',
    message: 'Your service booking has been confirmed for tomorrow',
    recipients: 18,
    sentDate: '2026-02-11 2:30 PM',
    status: 'sent',
  },
  {
    id: 'N003',
    type: 'marketing',
    title: 'New Premium Features',
    message: 'Upgrade to Premium and get 2 free AC servicing visits',
    recipients: 680,
    sentDate: '2026-02-15 9:00 AM',
    status: 'scheduled',
  },
  {
    id: 'N004',
    type: 'system',
    title: 'Maintenance Notice',
    message: 'System maintenance scheduled for Sunday 3AM-5AM',
    recipients: 1390,
    sentDate: 'Draft',
    status: 'draft',
  },
];

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newNotification, setNewNotification] = useState({
    type: 'marketing',
    title: '',
    message: '',
    targetAudience: 'all',
  });

  const handleSendNotification = () => {
    toast.success('Notification sent successfully');
    setIsCreateDialogOpen(false);
    setNewNotification({
      type: 'marketing',
      title: '',
      message: '',
      targetAudience: 'all',
    });
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'payment':
        return 'bg-green-100 text-green-800';
      case 'booking':
        return 'bg-blue-100 text-blue-800';
      case 'marketing':
        return 'bg-purple-100 text-purple-800';
      case 'system':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    sent: notifications.filter((n) => n.status === 'sent').length,
    scheduled: notifications.filter((n) => n.status === 'scheduled').length,
    draft: notifications.filter((n) => n.status === 'draft').length,
    totalRecipients: notifications
      .filter((n) => n.status === 'sent')
      .reduce((sum, n) => sum + n.recipients, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications Management</h1>
          <p className="text-gray-600 mt-1">Send notifications and announcements to users</p>
        </div>
        <Button className="gap-2" onClick={() => setIsCreateDialogOpen(true)}>
          <Send className="w-4 h-4" />
          Create Notification
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.sent}</p>
                <p className="text-sm text-gray-600">Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.scheduled}</p>
                <p className="text-sm text-gray-600">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.draft}</p>
                <p className="text-sm text-gray-600">Drafts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRecipients}</p>
                <p className="text-sm text-gray-600">Total Reached</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
              <DollarSign className="w-8 h-8 text-blue-600 mb-2" />
              <p className="font-semibold text-gray-900">Payment Reminder</p>
              <p className="text-sm text-gray-600">Remind users about due payments</p>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left">
              <Calendar className="w-8 h-8 text-green-600 mb-2" />
              <p className="font-semibold text-gray-900">Booking Update</p>
              <p className="text-sm text-gray-600">Notify booking status changes</p>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-left">
              <Bell className="w-8 h-8 text-purple-600 mb-2" />
              <p className="font-semibold text-gray-900">Promotional Offer</p>
              <p className="text-sm text-gray-600">Send marketing campaigns</p>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors text-left">
              <AlertCircle className="w-8 h-8 text-orange-600 mb-2" />
              <p className="font-semibold text-gray-900">System Alert</p>
              <p className="text-sm text-gray-600">Maintenance or updates</p>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Notification History */}
      <Card>
        <CardHeader>
          <CardTitle>Notification History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Title & Message
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Recipients
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Sent Date/Time
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification) => (
                  <tr
                    key={notification.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <Badge className={getTypeColor(notification.type)}>
                        {notification.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                        <p className="text-xs text-gray-600 line-clamp-1">
                          {notification.message}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {notification.recipients} users
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">{notification.sentDate}</td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(notification.status)}>
                        {notification.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Create Notification Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Notification</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Notification Type</Label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={newNotification.type}
                onChange={(e) =>
                  setNewNotification({ ...newNotification, type: e.target.value })
                }
              >
                <option value="marketing">Marketing</option>
                <option value="payment">Payment</option>
                <option value="booking">Booking</option>
                <option value="system">System</option>
              </select>
            </div>
            <div>
              <Label>Target Audience</Label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={newNotification.targetAudience}
                onChange={(e) =>
                  setNewNotification({ ...newNotification, targetAudience: e.target.value })
                }
              >
                <option value="all">All Users</option>
                <option value="basic">Basic Plan Users</option>
                <option value="standard">Standard Plan Users</option>
                <option value="premium">Premium Plan Users</option>
                <option value="pending">Users with Pending Payments</option>
              </select>
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={newNotification.title}
                onChange={(e) =>
                  setNewNotification({ ...newNotification, title: e.target.value })
                }
                placeholder="Enter notification title..."
              />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea
                value={newNotification.message}
                onChange={(e) =>
                  setNewNotification({ ...newNotification, message: e.target.value })
                }
                placeholder="Enter notification message..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Save as Draft
            </Button>
            <Button onClick={handleSendNotification}>
              <Send className="w-4 h-4 mr-2" />
              Send Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}