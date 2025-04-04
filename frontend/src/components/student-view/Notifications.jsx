import React from 'react';
import { Card, CardContent } from '../ui/card'; 
import { useNotificationContext } from '@/context/NotificationContext';
import { Button } from '../ui/button';

const Notifications = () => {
  const {    
    notifications,
    loading,
    error,
    handleReadNotification,
  } = useNotificationContext();

  return (
    <Card className="p-6 space-y-4">
      <CardContent className="space-y-2">
        {loading && <p className="text-gray-500">Loading notifications...</p>}
        {error && <p className="text-red-500">Error fetching notifications: {error.message}</p>}

        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification._id} className="p-4 border-b">
              <p className="text-sm text-gray-700">{notification.message}</p>
          
              <span className="text-xs text-gray-500">
                {new Date(notification.createdAt).toLocaleString()}
              </span>
              <Button
                variant="link"
                className="text-xs text-blue-600 hover:underline"
                onClick={() => handleReadNotification(notification._id)}
              >
                Read
              </Button>
             
            </div>
          ))
        ) : (
          !loading && !error && (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-lg font-semibold">No Notifications</h2>
              <p className="text-gray-500">You have no new notifications.</p>
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default Notifications;
