import express from "express";
import {
  addStudentToBatch,
  createBatch,
  deleteBatch,
  getAllBatches,
  getBatchesByCourse,
  updateBatch,
} from "../controllers/batchController.js";
import { checkRole, verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

// Get all batches
router.get("/getAllBatches", getAllBatches);

// Create batch
router.post("/createBatch", verifyToken, checkRole(["admin", "instructor"]), createBatch);

// Get batches for a specific course
router.get("/batchCourse/:courseId", verifyToken, checkRole(["admin", "instructor"]), getBatchesByCourse);

// Update a batch
router.put("/updateBatch/:batchId", verifyToken, checkRole(["admin", "instructor"]), updateBatch);

// Delete a batch
router.delete("/deleteBatch/:batchId", verifyToken, checkRole(["admin", "instructor"]), deleteBatch);

// Add a student to a batch
router.post("/add-student/:batchId", verifyToken, checkRole(["admin", "instructor"]), addStudentToBatch);

export default router;
