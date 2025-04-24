// routes/chatRoutes.js
import express from "express";
import {
  accessChat,
  fetchChats,
  createGroupChat,
  sendMessage,
  fetchMessages
} from "../controllers/chatController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/access", verifyToken, accessChat);
router.get("/fetchChats", verifyToken, fetchChats);
router.post("/group", verifyToken, createGroupChat);
router.post("/message", verifyToken, sendMessage);
router.get("/message/:chatId", verifyToken, fetchMessages);

export default router;

