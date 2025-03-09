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


const getUnEnrolledStudents = async (req, res) => {
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
    const enrolledStudents = await Enrollment.find().populate("studentId","-password").exec();
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
    const { studentId, courseId } = req.params;

    if (!studentId || !courseId) {
      return res.status(400).json({
        message: "studentId and courseId are required.",
        success: false,
      });
    }

    // Check if student is enrolled in the course
    const unEnrollStudent = await Enrollment.findOne({ studentId, courseId });

    if (!unEnrollStudent) {
      return res.status(404).json({
        message: "Student is not enrolled in this course.",
        success: false,
      });
    }

    // Remove enrollment record
    await Enrollment.findByIdAndDelete(unEnrollStudent._id);
    await User.findByIdAndUpdate(studentId,{isEnrolled:false})
    res.status(200).json({
      message: "Student unenrolled successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

// const unEnroll = async (req, res) => {
//   try {
//     console.log(req.params);
    
//     const { studentId} = req.params;
// console.log(studentId);

//     if (!studentId) {
//       return res.status(400).json({
//         message: "studentId are required.",
//         success: false,
//       });
//     }

//     const unEnrollStudent = await Enrollment.findOne({ studentId});

//     if (!unEnrollStudent) {
//       return res.status(404).json({
//         message: "Student is not enrolled in this course.",
//         success: false,
//       });
//     }

//     await Enrollment.findByIdAndDelete(unEnrollStudent._id);

//     await User.findByIdAndUpdate(studentId, { isEnrolled: false });

//     // Send success response
//     res.status(200).json({
//       message: "Student unenrolled successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.error(error);
//     // Send error response with message
//     res.status(500).json({
//       error: "Internal Server Error",
//       message: error.message,
//     });
//   }
// };
export { enrollStudent, getUnEnrolledStudents, getEnrolledStudents, unEnroll };
