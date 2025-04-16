import Attendance from "../models/Attendance.js";

const MIN_ATTENDANCE_PERCENTAGE = 75;

const getAttendanceReportForAllStudents = async (courseId, batchId) => {
  try {
    const attendanceRecords = await Attendance.find({
      course: courseId,
      batch: batchId,
    }).populate("records.student", "userName");

    console.log("Attendance records:", attendanceRecords);

    if (attendanceRecords.length === 0) return [];

    const studentMap = {};

    for (const record of attendanceRecords) {
      for (const { student, status } of record.records) {
        if (!student) {
          console.warn("Skipping null student record");
          continue;
        }

        const studentIdStr = student._id.toString();

        if (!studentMap[studentIdStr]) {
          studentMap[studentIdStr] = {
            studentId: student._id,
            studentName: student.userName,
            present: 0,
            absent: 0,
          };
        }

        if (status === "present") {
          studentMap[studentIdStr].present += 1;
        } else {
          studentMap[studentIdStr].absent += 1;
        }
      }
    }

    const totalClasses = attendanceRecords.length;

    const stats = Object.values(studentMap).map((student) => {
      const attendancePercentage = parseFloat(
        ((student.present / totalClasses) * 100).toFixed(2)
      );

      return {
        studentId: student.studentId,
        studentName: student.studentName,
        totalClasses,
        presentDays: student.present,
        absentDays: student.absent,
        attendancePercentage,
        isEligibleForPlacement: attendancePercentage >= MIN_ATTENDANCE_PERCENTAGE,
      };
    });

    return stats;
  } catch (error) {
    console.error("Error generating attendance report:", error);
    throw error;
  }
};

export { getAttendanceReportForAllStudents };