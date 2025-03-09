import express from 'express';
import { login, registerInstructor,registerStudent} from '../controllers/authControllers.js';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';



const router = express.Router();

router.post('/registerInstructor',verifyToken, checkRole(['admin']), registerInstructor);
router.post('/addStudent',verifyToken, checkRole(['admin','instructor']),registerStudent);
router.post('/login',login)
export default router;