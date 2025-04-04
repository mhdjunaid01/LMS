import mongoose, { model, Schema } from "mongoose";

const liveClassSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true, 
    },
    scheduleTime: {
      type: Date,
      required: true, 
    },
    meetingLink: {
      type: String,
      required: true, 
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", 
      required: true,
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        default: [],
      },
    ],
    notificationSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const LiveClass = model("LiveClass", liveClassSchema);

export default LiveClass;
