import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client"; // Import socket.io-client
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const socket = io("http://localhost:5000"); // Connect to backend Socket.io server

  // ✅ Fetch notifications from the backend
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/notifications/getAllNotification");
      setNotifications(response?.data?.notifications || []);

      // 🔴 Fetch unread count
      const countResponse = await axiosInstance.get("/notifications/count");
      setUnreadCount(countResponse?.data?.count || 0);
    } catch (error) {
      setError(error);
      toast.error("❌ Error fetching notifications: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle real-time notifications via Socket.io
  useEffect(() => {
    socket.on("newNotification", (data) => {
      toast.info(`🔔 ${data.message}`); // Show notification toast
      fetchNotifications(); // Refresh notification list
    });

    return () => {
      socket.disconnect(); // Cleanup socket connection
    };
  }, []);

  // ✅ Send a notification
  const sendNotification = async ({ message, liveClassId }) => {
    try {
      await axiosInstance.post("/notifications/send", { message, liveClassId });
      toast.success("📢 Notification sent successfully!");
      fetchNotifications(); // Refresh after sending
    } catch (error) {
      toast.error("❌ Error sending notification: " + (error.response?.data?.message || error.message));
    }
  };

  // ✅ Mark notifications as read
  const handleReadNotification = async () => {
    try {
      await axiosInstance.post("/notifications/markAsRead");
      setUnreadCount(0); // Reset count
      fetchNotifications(); // Refresh notifications
    } catch (error) {
      toast.error("❌ Error marking notifications as read.");
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        sendNotification,
        notifications,
        unreadCount,
        loading,
        error,
        fetchNotifications,
        handleReadNotification, // Expose this function to mark notifications as read
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
