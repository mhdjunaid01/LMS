import express from "express";
import {
  sendNotifications,
  getUnreadNotificationCount,
  getNotifications,
  markNotificationsAsRead,
} from "../controllers/notificationController.js";
import { checkRole, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send", verifyToken, sendNotifications);
router.get("/count", verifyToken, getUnreadNotificationCount);
router.get("/getAllNotification",verifyToken, getNotifications);
router.delete("/mark-read/:id",verifyToken, markNotificationsAsRead);

export default router;
