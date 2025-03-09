import mongoose from "mongoose";

const attendanceShema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  records: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
      },
      status: {
        type: String,
        enum: ["present", "absent"],
        required: true,
      },
    },
  ],
  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});
const Attendance = mongoose.model("Attendance", attendanceShema);
export default Attendance;
