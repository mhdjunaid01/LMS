import express from 'express';

import { enrollStudent, getEnrolledStudents, getUnEnrolledStudents, unEnroll } from '../controllers/entrollmentControll.js';

import { verifyToken, checkRole } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/enrollStudent',verifyToken,checkRole(['admin','instructor']),enrollStudent);
router.get('/getUnEnrolledStudents',verifyToken,checkRole(['admin','instructor']),getUnEnrolledStudents);
router.get('/getEnrolledStudents',verifyToken,checkRole(['admin','instructor']),getEnrolledStudents);
router.delete('/unenroll/:studentId/:courseId',verifyToken,checkRole(['admin','instructor']),unEnroll);




export default router;
