import express from 'express';
import { addCourse, getCourses, editCourse, deleteCourse  } from '../controllers/courseControllers.js';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/getCourses',getCourses);
router.post('/addCourse',verifyToken,checkRole(['admin','instructor']),addCourse);
router.put('/editCourse/:id',verifyToken,checkRole(['admin','instructor']),editCourse);
router.delete('/deleteCourse/:id',verifyToken,checkRole(['admin','instructor']),deleteCourse);

export default router;
