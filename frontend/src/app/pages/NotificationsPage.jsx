import { useApp } from "../contexts/AppContext";
import { Card, CardContent, CardHeader } from "../components/ui/card"; // ✅ CardContent instead of CardBody
import { Button } from "../components/ui/button";
import { Bell, Check } from 'lucide-react';
import { format } from "date-fns";

export default function Notifications() {
  const { notifications, markNotificationRead } = useApp();

  const handleMarkRead = (id) => {
    markNotificationRead(id);
  };

  const handleMarkAllRead = () => {
    notifications.forEach((n) => {
      if (!n.read) markNotificationRead(n.id);
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
            <Check className="w-4 h-4 mr-2" />
            Mark All as Read
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <Card
              key={n.id}
              className={`cursor-pointer ${!n.read ? 'bg-blue-50 border-blue-200' : ''}`}
              onClick={() => handleMarkRead(n.id)}
            >
              <CardContent className="p-4 flex items-start gap-4"> {/* ✅ changed from CardBody */}
                <div
                  className={`p-2 rounded-lg ${
                    n.type === 'service'
                      ? 'bg-blue-100'
                      : n.type === 'payment'
                      ? 'bg-green-100'
                      : 'bg-gray-100'
                  }`}
                >
                  <Bell
                    className={`w-5 h-5 ${
                      n.type === 'service'
                        ? 'text-blue-600'
                        : n.type === 'payment'
                        ? 'text-green-600'
                        : 'text-gray-600'
                    }`}
                  />
                </div>

                <div className="flex-1">
                  <p className={`${!n.read ? 'font-semibold' : ''}`}>{n.message}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {format(new Date(n.date), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>

                {!n.read && <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>}
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
