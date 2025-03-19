import Batch from "../models/Batch.js";
import Course from "../models/Course.js";
import User from "../models/User.js";

// const createBatch = async (req, res) => {
//   try {
//     const { batchName, title, instructorName } = req.body;
//     console.log(req.body);
    
//     const startDate = new Date();
//     const endDate = new Date();
//     endDate.setMonth(endDate.getMonth() + 3);

//     if (!batchName || !title || !instructorName) {
//       return res.status(400).json({ message: "Please fill all fields", success: false });
//     }

//     const course = await Course.findOne({ title });
//     if (!course) {
//       return res.status(404).json({ message: "Course not found", success: false });
//     }

//     const instructor = await User.findOne({ userName: instructorName });
//     if (!instructor) {
//       return res.status(404).json({ message: "Instructor not found", success: false });
//     }

//     const existingBatch = await Batch.findOne({ batchName, courseId: course._id });
//     if (existingBatch) {
//       return res.status(400).json({ message: "Batch with this name already exists for this course", success: false });
//     }

//     console.log("courseId", course._id, "instructorId", instructor._id);
    
//     const newBatch = new Batch({
//       batchName,
//       courseId: course._id,
//       instructorId: instructor._id,
//       startDate,
//       endDate,
//     });

//     await newBatch.save();

//     res.status(201).json({
//       message: "Batch created successfully",
//       success: true,
//       batch: newBatch,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", success: false, error: error.message });
//   }
// };

const createBatch = async (req, res) => {
  try {
    const { batchName, courseId, instructorId } = req.body;
    console.log(req.body);

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 3);

    if (!batchName || !courseId || !instructorId) {
      return res.status(400).json({ message: "Please fill all fields", success: false });
    }

    // Ensure Course and Instructor exist using their IDs
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found", success: false });
    }

    const instructor = await User.findById(instructorId);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found", success: false });
    }

    const existingBatch = await Batch.findOne({ batchName, courseId });
    if (existingBatch) {
      return res.status(400).json({ message: "Batch with this name already exists for this course", success: false });
    }

    const newBatch = new Batch({
      batchName,
      courseId,
      instructorId,
      startDate,
      endDate,
    });

    await newBatch.save();
    const updatedBatches = await Batch.find();
    res.status(201).json({
      message: "Batch created successfully",
      success: true,
      batch: updatedBatches,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false, error: error.message });
  }
};

const getBatchesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!courseId) {
      return res.status(400).json({ message: "Please provide course ID", success: false });
    }
    const batches = await Batch.find({ courseId })
      .populate("instructorId", "name email")
      .populate("students", "name email");
    res.status(200).json({ message: "Batches fetched successfully", success: true, batches });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false, error: error.message });
  }
};

const updateBatch = async (req, res) => {
  try {
    const { batchId } = req.params;
    const updatedData = req.body;
    const updatedBatch = await Batch.findByIdAndUpdate(batchId, updatedData, { new: true });
    if (!updatedBatch) {
      return res.status(404).json({ message: "Batch not found", success: false });
    }
    res.status(200).json({ message: "Batch updated successfully", success: true, updatedBatch });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false, error: error.message });
  }
};

const deleteBatch = async (req, res) => {
  try {
    const { batchId } = req.params;
    const deletedBatch = await Batch.findByIdAndDelete(batchId);
    if (!deletedBatch) {
      return res.status(404).json({ message: "Batch not found", success: false });
    }
    res.status(200).json({ message: "Batch deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false, error: error.message });
  }
};

const addStudentToBatch = async (req, res) => {
  try {
    const { batchId } = req.params;
    const { studentId } = req.body;
    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required", success: false });
    }
    const batch = await Batch.findById(batchId);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found", success: false });
    }
    if (batch.students.includes(studentId)) {
      return res.status(400).json({ message: "Student is already in the batch", success: false });
    }
    batch.students.push(studentId);
    await batch.save();
    res.status(200).json({ message: "Student added to batch successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false, error: error.message });
  }
};

const getAllBatches = async (req, res) => {
  try {
    const allBatches = await Batch.find().populate("courseId", "title");
    if (!allBatches.length) {
      return res.status(404).json({ message: "No batches found", success: false });
    }
    const formattedBatches = allBatches.map(batch => ({
      _id: batch._id,
      batchName: batch.batchName.toUpperCase(),
      title: batch.courseId?.title || "N/A",
      startDate: batch.startDate.toISOString().split("T")[0],
      endDate: batch.endDate.toISOString().split("T")[0],
      students: batch.students,
    }));
    res.status(200).json({ success: true, batches: formattedBatches });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

export { addStudentToBatch, deleteBatch, updateBatch, getBatchesByCourse, createBatch, getAllBatches };
