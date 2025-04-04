import LiveClass from "../models/LiveClass.js";
import Enrollment from "../models/Enrollment.js"; // Make sure this import is added

export const scheduleLiveClass = async (req, res) => {
  try {
    const { title, courseId, batchId, scheduledTime, meetingLink } = req.body;
    const instructorId = req.user?.id;
    if (!title || !courseId || !scheduledTime || !meetingLink || !batchId) {
      console.log("❌ Missing required fields:", {
        title,
        courseId,
        batchId,
        scheduledTime,
        meetingLink,
     
      });
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const enrollments = await Enrollment.find({
      courseId,
      batchId,
    }).select("studentId");
    if (!enrollments.length) {
      return res.status(404).json(
        {
          success: false,
          message: "No students enrolled in this course",
        });
    }
    const enrolledStudents = enrollments.map(
      (enrollment) => enrollment.studentId
    );

    const newClass = new LiveClass({
      title,
      instructorId: instructorId,
      courseId: courseId,
      batchId:batchId,
      scheduleTime:scheduledTime,
      meetingLink,
      enrolledStudents,
    });
    await newClass.save();
    res.status(201).json({
      success: true,
      message: "Live class scheduled successfully!",
      liveClassId: newClass._id,
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error scheduling class",
        error: error.message,
      });
  }
};

// Get upcoming live classes
export const getUpcomingClasses = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID is missing",
      });
    }
    const currentTime = new Date();
    
    const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000);
     await LiveClass.deleteMany({
      scheduleTime: { $lte: oneHourAgo },
    });
    const upcomingClasses = await LiveClass.find({ enrolledStudents: userId })
      .populate("instructorId", "userName") 
      .populate("courseId", "title"); 

    if (!upcomingClasses.length) {
      return res.status(404).json({
        success: false,
        message: "No upcoming classes found",
      });
    }

    res.status(200).json({ success: true, classes: upcomingClasses });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching live classes",
      error: error.message,
    });
  }
};
