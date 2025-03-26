import axiosInstance from "@/utils/axiosInstance";
const handleDeleteCourse = async (item,courses,setCourses) => {
  if (!item._id) {
    throw new Error("Course ID is undefined! Cannot delete.");
  }
  try {
    const response = await axiosInstance.delete(`/courses/deleteCourse/${item._id}`)
   
    if (response.data.success) {
      setCourses(courses.filter((c) => c._id !== item._id));
  } else {
    throw new Error(`Delete request failed: ${response.data.message}`);
  }
    return response.data;
  } catch (error) {
    console.error("Error deleting Course:", error.message);
    
  }
}
export default handleDeleteCourse;


