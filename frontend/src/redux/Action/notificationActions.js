import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";
import {
  setNotifications,
  addNotification,
  removeNotification,
  setIsLoading,
  setError,
  setUnreadCount,
} from "../Slice/notificationSlice.js";

const handleAxiosError = (error) => {
  if (error.response) {
    return error.response.data.message || error.message;
  }
  return error.message;
};



export const sendNotification = ({ message, liveClassId }) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/notifications/send", { message, liveClassId });
    console.log("Notification response:", response.data);
    dispatch(addNotification(response.data.notifications));
  
    toast.success("Notification sent successfully!");
  } catch (error) {
    toast.error(`Error sending notification: ${handleAxiosError(error)}`);
  }
};

export const fetchNotifications = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await axiosInstance.get("/notifications/getAllNotification");
    dispatch(setNotifications(response?.data?.notifications));
  } catch (error) {
    dispatch(setError(error));
    toast.error(`Error fetching notifications: ${handleAxiosError(error)}`);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const handleReadNotification = (notificationId) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    await axiosInstance.delete(`/notifications/mark-read/${notificationId}`);
    dispatch(removeNotification(notificationId));
    dispatch(fetchNotificationCount()); 
    toast.success("Notification marked as read!");
  } catch (error) {
    toast.error(`Error marking notification as read: ${handleAxiosError(error)}`);
    console.error("Error marking notification as read:", error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const fetchNotificationCount = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get("/notifications/count");
    const count = res.data?.count || 0;
    dispatch(setUnreadCount(count)); 
    return count;
  } catch (error) {
    console.error("Error fetching notification count:", error);
    return 0;
  }
};