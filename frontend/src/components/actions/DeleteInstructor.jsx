
import axiosInstance from "@/utils/axiosInstance";

const handleDeleteInstructor = async (item, instructors, setInstructors) => {
  if (!item._id) {
    throw new Error("Instructor ID is undefined! Cannot delete.");
  }

  try {
    const response = await axiosInstance.delete(`/instructor/deleteInstructor/${item._id}`);

    if (response.data.success) {
      setInstructors(instructors.filter((inst) => inst._id !== item._id));
    } else {
      throw new Error(`Delete request failed: ${response.data.message}`);
    }
  } catch (error) {
    console.error("Error deleting instructor:", error.message);
  }
};

export default handleDeleteInstructor;
