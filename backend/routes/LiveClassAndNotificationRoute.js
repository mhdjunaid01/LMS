import express from "express";
import { verifyToken, checkRole } from "../middleware/authMiddleware.js";
import { scheduleLiveClass, getUpcomingClasses } from "../controllers/liveClassController.js";

const router = express.Router();

router.post("/schedule", verifyToken, checkRole(["instructor"]), scheduleLiveClass);
router.get("/upcoming", verifyToken,checkRole(["student","instructor"]), getUpcomingClasses);

export default router;