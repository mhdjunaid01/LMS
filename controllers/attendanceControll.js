
import Batch from "../models/Batch.js";
import Attendance from "../models/Attendance.js";

const getBatches = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!courseId) {
      return res
        .status(400)
        .json({ success: false, message: "Course ID is required" });
    }

    const batches = await Batch.find({ courseId });
    if (!batches.length) {
      return res
        .status(404)
        .json({ success: false, message: "No batches found for this course" });
    }
    res.status(200).json({ success: true, batches });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

const getStudents = async (req, res) => {
  try {
    const { batchId } = req.params;

if (!batchId) {
  return res.status(400).json({ success: false, message: "Batch ID is required" });
}

const batchStudents = await Batch.findById(batchId).populate("students", "name").exec();



if (!batchStudents) {
  return res.status(404).json({ success: false, message: "Batch not found" });
}

if (!batchStudents.students.length) {
  return res.status(404).json({ success: false, message: "No students found for this batch" });
}
    res.status(200).json({ success: true, students: batchStudents.students });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

const markAttendance = async (req, res) => {
  try {
    const { courseId, batchId, date, attendanceRecords } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(400).json({
        success: false,
        message: "User must be authenticated to mark attendance",
      });
    }

    if (!courseId || !batchId || !date || !attendanceRecords) {
      return res.status(400).json({
        success: false,
        message: "courseId, batchId, date, and attendanceRecords are required",
      });
    }

    if (!Array.isArray(attendanceRecords) || attendanceRecords.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Attendance records should be a non-empty array",
      });
    }

    //convert studentId to student
    const formattedRecords = attendanceRecords.map((record) => ({
      student: record.student || record.studentId,
      status: record.status,
    }));

    //validate after mapping
    formattedRecords.forEach((record) => {
      if (!record.student) {
        console.error("Error: Found record without student field", record);
        throw new Error("Each attendance record must have a student ID");
      }
    });

    // check for duplicate student id
    const studentIds = formattedRecords.map((record) => record.student.toString());
    const uniqueStudentIds = new Set(studentIds);
    if (studentIds.length !== uniqueStudentIds.size) {
      return res.status(400).json({
        success: false,
        message: "Duplicate students found in the attendance records",
      });
    }

    // Check if attendance already exists
    const existingAttendance = await Attendance.findOne({
      course: courseId,
      batch: batchId,
      date: new Date(date),
    });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message: "Attendance already marked for this date",
      });
    }

    const newAttendance = new Attendance({
      course: courseId,
      batch: batchId,
      date: new Date(date),
      records: formattedRecords,
      markedBy: req.user.id, 
    });

    await newAttendance.save();

    res.status(201).json({
      success: true,
      attendance: newAttendance,
      message: "Attendance marked successfully",
    });

  } catch (error) {
    console.error("Error in markAttendance:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: error.message,
    });
  }
};


const getAttendanceReport = async (req, res) => {
  try {
    const { courseId, batchId, date } = req.body;

    if (!courseId || !batchId || !date) {
      return res.status(400).json({
        success: false,
        message: "courseId, batchId and date are required",
      });
    }
    let filter = {};
    if (courseId) filter.course = courseId;
    if (batchId) filter.batch = batchId;
    if (date) filter.date = new Date(date);

    const attemdanceReports = await Attendance.find(filter)
    .populate("course", "title")
    .populate("batch", "batchName") 
    .populate("records.student", "userName") 
    .select("course batch date records"); 

    if (!attemdanceReports.length) {
      return res.status(404).json({
        success: false,
        message: "No attendance records found",
      });
    }
    res.status(200).json({
      success: true,
      attemdanceReports,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

export { getBatches,getStudents,markAttendance,getAttendanceReport };
