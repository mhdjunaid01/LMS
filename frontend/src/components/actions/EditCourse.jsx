import axiosInstance from "@/utils/axiosInstance";

const handleEditCourse = async (updatedItem, setCourses) => {
  try {
    const response = await axiosInstance.put(
      `/courses/editCourse/${updatedItem._id}`,
      updatedItem
    );

    if (response.status !== 200) {
      throw new Error(`Failed to edit course with id ${updatedItem._id}`);
    }

    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        return course._id === updatedItem._id
          ? {
              ...course,
              _id: updatedItem._id,
              title: updatedItem.title,
              description: updatedItem.description,
              category: updatedItem.category,
              instructorId: updatedItem.instructorId,
            }
          : course;
      })
    );
  } catch (error) {
    console.error(error);
    throw error
  }
};
export default handleEditCourse;
