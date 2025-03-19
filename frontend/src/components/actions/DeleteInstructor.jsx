
import axiosInstance from "@/utils/axiosInstance";

const handleDeleteInstructor = async (id, instructors, setInstructors) => {
  if (!id) {
    throw new Error("Instructor ID is undefined! Cannot delete.");
  }

  try {
    const response = await axiosInstance.delete(`/instructor/deleteInstructor/${id}`);

    if (response.data.success) {
      setInstructors(instructors.filter((inst) => inst._id !== id));
    } else {
      throw new Error(`Delete request failed: ${response.data.message}`);
    }
  } catch (error) {
    console.error("Error deleting instructor:", error.message);
  }
};

export default handleDeleteInstructor;
