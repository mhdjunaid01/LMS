import Course from "../models/Course.js";

const addCourse = async (req, res) => {
  try {
    const { title, description, category, instructorId } = req.body;

    const newCourse = new Course({
      title,
      description,
      category,
      instructorId: req.user.id,
    });
    const savedCourse = await newCourse.save();

    res.status(201).json({
      message: "Course added successfully",
      success: true,
      course: savedCourse,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const editCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const courseExists = await Course.exists({ _id: id });
    if (!courseExists) {
      return res
        .status(404)
        .json({ message: "Course not found", success: false });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({
        message: "Course updated successfully",
        success: true,
        course: updatedCourse,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res
        .status(404)
        .json({ message: "Course not found", success: false });
    }

    res
      .status(200)
      .json({ message: "Course deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

export { addCourse, getCourses, editCourse, deleteCourse };
