import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
  batchName: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" ,default: []  }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const Batch = mongoose.model("Batch", batchSchema);
export default Batch;
