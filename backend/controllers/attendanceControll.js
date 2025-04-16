import Batch from "../models/Batch.js";
import Attendance from "../models/Attendance.js";
import { getAttendanceReportForAllStudents } from "../service/attendanceService.js";
import mongoose from "mongoose";


const MIN_ATTENDANCE_PERCENTAGE = 75;


// Fetch students for attendance marking
const getStudentsForAttendance = async (req, res) => {
  try {
    const { courseId, batchId, date } = req.query;
console.log(req.params);

    if (!courseId || !batchId || !date) {
      return res.status(400).json({ success: false, message: "courseId, batchId, and date are required" });
    }

    const batch = await Batch.findOne({ _id: batchId, courseId })
      .populate("students", "userName")
      .select("students");

    if (!batch) {
      return res.status(404).json({ success: false, message: "Batch not found" });
    }

    const students = batch.students.map(student => ({ id: student._id, userName: student.userName }));

    res.status(200).json({ success: true, students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
// Submit attendance records
const submitAttendance = async (req, res) => {
  try {
    const { courseId, batchId, date, records } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(400).json({ success: false, message: "User must be authenticated to mark attendance" });
    }

    if (!courseId || !batchId || !date || !records || !Array.isArray(records) || records.length === 0) {
      return res.status(400).json({ success: false, message: "courseId, batchId, date, and records are required" });
    }

    const existingAttendance = await Attendance.findOne({ course: courseId, batch: batchId, date: new Date(date) });

    if (existingAttendance) {
      return res.status(400).json({ success: false, message: "Attendance already marked for this date" });
    }

    const formattedRecords = records.map(record => ({
      student: record.studentId,
      status: record.status,
    }));

    const newAttendance = new Attendance({
      course: courseId,
      batch: batchId,
      date: new Date(date),
      records: formattedRecords,
      markedBy: req.user.id,
    });

    await newAttendance.save();

    res.status(201).json({ success: true, attendance: newAttendance, message: "Attendance marked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// Fetch attendance report
const getAttendanceReport = async (req, res) => {
  try {
    const { courseId, batchId, date } = req.query;

    if (!courseId || !batchId || !date) {
      return res.status(400).json({ success: false, message: "courseId, batchId, and date are required" });
    }

    const filter = { course: courseId, batch: batchId, date: new Date(date) };

    const attendanceReports = await Attendance.find(filter)
      .populate("course", "title")
      .populate("batch", "batchName")
      .populate("records.student", "userName")
      .select("course batch date records");

    if (!attendanceReports.length) {
      return res.status(404).json({ success: false, message: "No attendance records found" });
    }

    res.status(200).json({ success: true, attendanceReports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

 const getBatchAttendanceReport = async (req, res) => {
  try {
    const { courseId, batchId } = req.params;
console.log(  "courseId:", courseId, "batchId:", batchId);

    if (!courseId || !batchId) {
      return res.status(400).json({ message: "courseId and batchId are required" });
    }

    const report = await getAttendanceReportForAllStudents(courseId, batchId);

    if (!report.length) {
      return res.status(404).json({ message: "No attendance data found" });
    }

    res.status(200).json(report);
  } catch (error) {
    console.error("Error generating attendance report:", error);
    res.status(500).json({ message: "Failed to fetch attendance report" });
  }
};

const getStudentWeeklyAttendance = async (req, res) => {
  console.log("Attendance report function loaded");

  try {
    const { studentId } = req.params;
    console.log("studentId:", studentId);

    if (!studentId) {
      return res.status(400).json({ message: "studentId is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid studentId" });
    }

    const result = await Attendance.aggregate([
      {
        $match: {
          "records.student": new mongoose.Types.ObjectId(studentId),
        },
      },
      { $addFields: { week: { $isoWeek: "$date" } } },
      { $unwind: "$records" },
      {
        $match: {
          "records.student": new mongoose.Types.ObjectId(studentId),
        },
      },
      {
        $group: {
          _id: "$week",
          present: {
            $sum: { $cond: [{ $eq: ["$records.status", "present"] }, 1, 0] },
          },
          absent: {
            $sum: { $cond: [{ $eq: ["$records.status", "absent"] }, 1, 0] },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formatted = result.map((entry, idx) => ({
      week: `Week ${idx + 1}`,
      present: entry.present,
      absent: entry.absent,
    }));

    res.status(200).json({ success: true, data: formatted });
  } catch (err) {
    console.error("Error in getStudentWeeklyAttendance:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export { getStudentsForAttendance, submitAttendance, getAttendanceReport , getBatchAttendanceReport ,getStudentWeeklyAttendance };
