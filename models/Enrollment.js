import mongoose from "mongoose";

const enrollment = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },
    enrolledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    status: {
      type: String,
      enum: ["Active", "Completed", "Dropped"],
      default: "Active",
    },
  
    enrolledAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Enrollment = mongoose.model("Enrollment", enrollment);
export default Enrollment;
