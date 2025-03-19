import express from 'express';

import { verifyToken, checkRole } from '../middleware/authMiddleware.js';
import { getInstructor ,deleteInstructor} from '../controllers/instructorController.js';

const router = express.Router();

router.get('/getInstructor', verifyToken, checkRole(['admin']), getInstructor);
router.delete('/deleteInstructor/:id', verifyToken, checkRole(['admin']), deleteInstructor);

export default router;