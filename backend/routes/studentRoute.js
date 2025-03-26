import express from 'express'
import { editStudents } from "../controllers/studentControll.js";
import { checkRole, verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router()
router.put('/editStudent/:id', verifyToken, checkRole(["instructor", "admin"]), editStudents);
export default router;