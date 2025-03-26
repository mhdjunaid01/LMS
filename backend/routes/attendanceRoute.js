import express from 'express';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';
import { getCourses } from '../controllers/courseControllers.js';
import { getStudentsForAttendance, submitAttendance, getAttendanceReport } from '../controllers/attendanceControll.js';

const router = express.Router();

router.get('/getCourses', getCourses);
router.get('/getStudentsForAttendance', verifyToken, checkRole(['instructor']), getStudentsForAttendance);
router.post('/submitAttendance', verifyToken, checkRole(['instructor']), submitAttendance);
router.get('/getAttendanceReport', verifyToken, checkRole(['instructor']), getAttendanceReport);

export default router;
