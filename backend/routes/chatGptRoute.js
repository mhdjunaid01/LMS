import express from 'express';
const router = express.Router();
import chatWithGPT from '../controllers/chatGptController.js';
import { checkRole, verifyToken } from '../middleware/authMiddleware.js';

router.post('/chat',verifyToken,checkRole(["student","instructor","admin"]), chatWithGPT);
export default router