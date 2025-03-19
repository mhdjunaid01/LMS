import express from 'express';
import { login,logout, registerInstructor,registerStudent} from '../controllers/authControllers.js';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';



const router = express.Router();

router.post('/registerInstructor',verifyToken, checkRole(['admin']), registerInstructor);
router.post('/addStudent',verifyToken, checkRole(['admin','instructor']),registerStudent);
router.post('/login',login)
router.post('/logout',logout)
router.get("/me", verifyToken, (req, res) => {
    res.json({ success: true, user: req.user }); 
  });
export default router;