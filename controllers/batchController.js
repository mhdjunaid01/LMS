import Batch from "../models/Batch.js";
import Course from "../models/Course.js";

const createBatch = async (req, res) => {
  try {
    const { batchName, courseId, instructorId, startDate, endDate } = req.body;
console.log(req.body);

    if (!batchName || !courseId || !instructorId || !startDate || !endDate) {
      return res.status(400).json({ message: "Please fill all fields", success: false });
    }


    const course = await Course.findById(courseId);

    
    if (!course) {
      return res.status(404).json({ message: "Course not found", success: false });
    }

    const newBatch = new Batch({
      batchName,
      courseId,
      instructorId,
      startDate,
      endDate,
    });
    await newBatch.save();
    res.status(201).json({
      message: " Batch created successfully",
      success: true,
      batch: newBatch,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

// Get batches for a specific course
const getBatchesByCourse  = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res
        .status(400)
        .json({ message: "Please provide course id", success: false });
    }
    const batches = await Batch.find({ courseId })
    .populate("instructorId", "name email")
    .populate("students", "name email");
    res.status(200).json({
      message: "Batches fetched successfully",
      success: true,
      batches,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });

  }
};

//batch update
const updateBatch  = async (req, res) => {
  try {
    const { batchId } = req.params;
    const updatedData = req.body;

    const updatedBatch = await Batch.findByIdAndUpdate(batchId, updatedData, {
      new: true,
    });
    if (!updatedBatch) {
      return res
        .status(404)
        .json({ message: "Batch not found", success: false });
    }
    res.status(200).json({
      message: "Batch updated successfully",
      success: true,
      updatedBatch,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

const  deleteBatch  = async (req, res) => {
  try {
    const { batchId } = req.params;
    const deleteBatch = await Batch.findByIdAndDelete(batchId);

    if (!deleteBatch) {
      return res
        .status(404)
        .json({ message: "Batch not found", success: false });
    }
    res
      .status(200)
      .json({ message: "Batch deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

//add a student to a batch

const addStudentToBatch = async (req, res) => {
  try {
    const { batchId } = req.params;
    const { studentId } = req.body;
    
    if (!studentId) {
      return res
        .status(400)
        .json({ message: "Student id is required", success: false });
    }

    const batch = await Batch.findById(batchId);
    if (!batch) {
      return res
        .status(404)
        .json({ message: "Batch not found", success: false });
    }

    if (batch.students.includes(studentId)) {
      return res.status(400).json({ 
        message: "Student is already in the batch", 
        success: false 
      });
    }
    
    batch.students.push(studentId);
    await batch.save();
    
    return res.status(200).json({ 
      message: "Student added to batch successfully",
      success: true 
    });
    
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

const getAllBatch = async (req, res) => {
  try {
    const getAllBatches = await Batch.find();
    console.log("Batches found:", getAllBatches);

    if (getAllBatches.length === 0) {
      return res.status(404).json({ message: "Batches not found", success: false });
    }
    
    res.status(200).json({ success: true, batches:getAllBatches });

  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
}

export { addStudentToBatch ,deleteBatch ,updateBatch ,getBatchesByCourse ,createBatch,getAllBatch };