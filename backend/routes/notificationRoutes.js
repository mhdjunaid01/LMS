import express from "express";
import {
  sendNotifications,
  getUnreadNotificationCount,
  getNotifications,
  markNotificationsAsRead,
} from "../controllers/notificationController.js";
import { checkRole, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send", sendNotifications);
router.get("/count", verifyToken,checkRole(["student"]), getUnreadNotificationCount);
router.get("/getAllNotification",verifyToken,checkRole(["student"]), getNotifications);
router.delete("/mark-read/:id", markNotificationsAsRead);

export default router;
