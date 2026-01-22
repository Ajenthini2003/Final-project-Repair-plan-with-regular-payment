import { useApp } from '@/app/contexts/AppContext';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Bell, CheckCheck } from 'lucide-react';
import { format } from 'date-fns';

export function NotificationsPage() {
  const { notifications, markNotificationRead } = useApp();

  const handleMarkRead = (id: string) => {
    markNotificationRead(id);
  };

  const handleMarkAllRead = () => {
    notifications.forEach((n) => {
      if (!n.read) {
        markNotificationRead(n.id);
      }
    });
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-gray-600">{unreadCount} unread notifications</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={handleMarkAllRead}>
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark All as Read
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`cursor-pointer ${
                !notification.read ? 'bg-blue-50 border-blue-200' : ''
              }`}
              onClick={() => handleMarkRead(notification.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-2 rounded-lg ${
                      notification.type === 'service'
                        ? 'bg-blue-100'
                        : notification.type === 'payment'
                        ? 'bg-green-100'
                        : 'bg-gray-100'
                    }`}
                  >
                    <Bell
                      className={`w-5 h-5 ${
                        notification.type === 'service'
                          ? 'text-blue-600'
                          : notification.type === 'payment'
                          ? 'text-green-600'
                          : 'text-gray-600'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className={`${!notification.read ? 'font-semibold' : ''}`}>
                      {notification.message}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {format(new Date(notification.date), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}
