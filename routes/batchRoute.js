import express from "express";
import {
  addStudentToBatch,
  createBatch,
  deleteBatch,
  getAllBatch,
  getBatchesByCourse,
  updateBatch,
} from "../controllers/batchController.js";
import {checkRole,verifyToken} from '../middleware/authMiddleware.js'
const router = express.Router();
//get all batches
router.get('/getAllBatches',getAllBatch)
//create batche
router.post('/createBatch',verifyToken,checkRole(['admin','instructor']),createBatch);
//Get batches for a specific course
router.get('/batchCourse/:courseId',verifyToken,checkRole(['admin','instructor']),getBatchesByCourse)
//update a batch
router.put('/updateBatch/:batchId',verifyToken,checkRole(['admin','instructor']),updateBatch)
//delete
router.delete('/deleteBatch/:batchId',verifyToken,checkRole(['admin','instructor']),deleteBatch)
// Add a student to a batch
router.post("/add-student/:batchId",verifyToken,checkRole(['admin','instructor']),addStudentToBatch) 
export default router