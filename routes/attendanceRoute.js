import express from 'express';
import { verifyToken,checkRole } from '../middleware/authMiddleware.js';
import { getBatches,getStudents,markAttendance,getAttendanceReport } from '../controllers/attendanceControll.js';
import {getCourses} from '../controllers/courseControllers.js';
const router = express.Router();
router.get('/getCourses',getCourses);
router.get('/getBatches/:courseId',verifyToken,checkRole(['instructor']),getBatches);
router.get('/getStudents/:batchId',verifyToken,checkRole(['instructor']),getStudents);
router.post('/markAttendance',verifyToken,checkRole(['instructor']),markAttendance);
router.get('/getAttendanceReport',verifyToken,checkRole(['instructor']),getAttendanceReport)

export default router










