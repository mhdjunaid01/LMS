import User from "../models/User.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Batch from "../models/Batch.js";

const enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId, batchId } = req.body;
    const enrolledBy = req.user.id;

    // Fetch all required documents in parallel
    const [student, course, batch] = await Promise.all([
      User.findById(studentId),
      Course.findById(courseId),
      Batch.findById(batchId)
    ]);

    if (!student) {
      return res.status(404).json({ message: "Student not found", success: false });
    }

    if (!course) {
      return res.status(404).json({ message: "Course not found", success: false });
    }

    if (!batch) {
      return res.status(404).json({ message: "Batch not found", success: false });
    }

    if (batch.courseId.toString() !== courseId) {
      return res.status(400).json({ 
        message: "Course ID doesn't match the course associated with this batch", 
        success: false 
      });
    }

    // Check if student is already enrolled in this batch and course
    const existingEnrollment = await Enrollment.findOne({ studentId, courseId, batchId });
    if (existingEnrollment) {
      return res.status(400).json({
        message: "Student is already enrolled in this course and batch",
        success: false,
      });
    }

    if (student.isEnrolled) {
      return res
        .status(400)
        .json({ message: "Student is already enrolled", success: false });
    }
    // Enroll student
    const enrollNewStudent = new Enrollment({
      studentId,
      courseId,
      batchId,
      enrolledBy
    });

    await enrollNewStudent.save();

    // Update User 
    await User.findByIdAndUpdate(studentId, { isEnrolled: true });

    // Update Batch document. add student if not already added
    if (!batch.students.some(id => id.toString() === studentId.toString())) {
      batch.students.push(studentId);
      await batch.save();
    }

    res.status(201).json({
      message: "Student enrolled successfully",
      success: true,
      enrollment: enrollNewStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};


const getUnEnrolledStudents = async (_,res) => {
  try {
    const unEnrolledStudents = await User.find({
      role: "student",
      isEnrolled: false,
    });
    res.status(200).json({ success: true, unEnrolledStudents });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const getEnrolledStudents = async (req, res) => {
  try {
    console.log("Received request to get enrolled students");
    const enrolledStudents = await Enrollment.find()
      .populate("studentId", "-password")
      .populate("courseId", "title")
      .populate("batchId", "batchName")
      .exec();

    if (enrolledStudents.length === 0) {
      return res
        .status(404)
        .json({ message: "No students to  enrolled", success: false,  });
    }
    res.status(200).json({ success: true, enrolledStudents });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const unEnroll = async (req, res) => {
  try {
    console.log("Received request to unenroll student");
    
        const { studentId,courseId,batchId,enrollmentId} = req.params;

    if (!studentId) {
      return res.status(400).json({
        message: "studentId and courseId are required.",
        success: false,
      });
    }

    console.log("Received request to unenroll:", studentId);

    // Check if student is enrolled in the course
    const unEnrollStudent = await Enrollment.findOne({ studentId});

    if (!unEnrollStudent) {
      return res.status(404).json({
        message: "Student is not enrolled in this course.",
        success: false,
      });
    }

    console.log("Enrollment record found:", unEnrollStudent);

    // // Fetch batch only if enrollment exists
    const batch = await Batch.findById(batchId);

    if (!batch) {
      return res.status(404).json({
        message: "Batch not found.",
        success: false,
      });
    }

    // Remove student from batch
    batch.students = batch.students.filter(id => id.toString() !== studentId.toString());
    await batch.save();
    
    // Remove enrollment record
    await Enrollment.findByIdAndDelete(enrollmentId);

    // Update user's enrollment status
    await User.findByIdAndUpdate(studentId, { isEnrolled: false });

    console.log(`Student ${studentId} successfully unenrolled from course ${courseId}`);

    res.status(200).json({
      message: "Student unenrolled successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in unenrolling student:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

export { enrollStudent, getUnEnrolledStudents, getEnrolledStudents, unEnroll };
