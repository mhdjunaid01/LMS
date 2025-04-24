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
router.get("/getAllBatches", getAllBatches);
router.post("/createBatch", verifyToken, checkRole(["admin", "instructor"]), createBatch);
router.get("/batchCourse/:courseId", verifyToken, checkRole(["admin", "instructor"]), getBatchesByCourse);
router.put("/updateBatch/:batchId", verifyToken, checkRole(["admin", "instructor"]), updateBatch);
router.delete("/deleteBatch/:batchId", verifyToken, checkRole(["admin", "instructor"]), deleteBatch);
router.post("/add-student/:batchId", verifyToken, checkRole(["admin", "instructor"]), addStudentToBatch);
export default router;
