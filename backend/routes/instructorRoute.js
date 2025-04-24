import express from 'express';

import { verifyToken, checkRole } from '../middleware/authMiddleware.js';
import { getInstructor ,deleteInstructor,editIntructor} from '../controllers/instructorController.js';

const router = express.Router();

router.get('/getInstructor', verifyToken, checkRole(['admin',"instructor","student"]), getInstructor);
router.delete('/deleteInstructor/:id', verifyToken, checkRole(['admin']), deleteInstructor);
router.put('/editInstructor/:id',verifyToken,checkRole(["admin","instructor"]),editIntructor)
export default router;