import Notification from "../models/Notification.js";
import LiveClass from "../models/LiveClass.js";

export const sendNotifications = async (req, res) => {
  try {
    const { liveClassId } = req.body;
    if (!liveClassId) {
      return res
        .status(400)
        .json({ success: false, message: "Live Class ID is required" });
    }
    const liveClass = await LiveClass.findById(liveClassId).populate(
      "enrolledStudents"
    );
    if (!liveClass) return;
    const notifications = liveClass.enrolledStudents.map((student) => ({
      users: student._id,
      message: `New Live Class Scheduled: ${liveClass.title} on ${new Date(
        liveClass.scheduleTime
      ).toLocaleString()}.`,
      liveClass: liveClass._id,
    }));
    await Notification.insertMany(notifications);
    res.status(200).json({
      success: true,
      message: "Notifications sent successfully",
      notifications,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error sending notifications",
        error: error.message,
      });
  }
};

export const getUnreadNotificationCount = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(400)
        .json({ success: false, message: "User not authenticated" });
    }
    const count = await Notification.countDocuments({
      users: req.user.id,
      isRead: false,
    });
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching notifications",
      error: error.message,
    });
  }
};

export const getNotifications = async (req, res) => {
  try {
    if (!req.user.id) {
      console.error("User not authenticated or missing user ID.", req.user.id);
      return res.status(400).json({ message: "User not authenticated" });
    }
    const userId = req.user.id;
    const notifications = await Notification.find({ users: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const markNotificationsAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);
    res.json({
      message: "All unread notifications marked as read for the user.",
    });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res.status(500).json({ message: "Server error" });
  }
};
