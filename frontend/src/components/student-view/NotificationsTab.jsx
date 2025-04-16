import React, { useEffect } from "react";
import { Bell } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationCount } from "../../redux/Action/notificationActions.js";

const NotificationsTab = () => {
  const dispatch = useDispatch();
  const unreadCount = useSelector((state) => state.notification.unreadCount); 

  useEffect(() => {
    dispatch(fetchNotificationCount()); 
  }, [dispatch]);

  return (
    <div className="relative">
      <Bell  />
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {unreadCount}
        </span>
      )}
    </div>
  );
};

export default NotificationsTab;
