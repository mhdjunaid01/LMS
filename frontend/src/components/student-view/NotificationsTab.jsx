import { useNotificationContext } from "@/context/NotificationContext";
import { Bell } from "lucide-react";

const NotificationsTab = () => {
  const { unreadCount, handleReadNotification } = useNotificationContext();

  return (
    <div className="relative" onClick={handleReadNotification}> 
      <Bell className="cursor-pointer" />
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {unreadCount}
        </span>
      )}
    </div>
  );
};

export default NotificationsTab;
