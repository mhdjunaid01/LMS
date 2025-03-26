import axiosInstance from "@/utils/axiosInstance.js";

const handleEditInstructor = async (updatedItem, setInstructor) => {
  try {
    const updatedData = {
      userName: updatedItem.userName,
      email: updatedItem.email,
      role: updatedItem.role,
    };
    const response = await axiosInstance.put(`/instructor/editInstructor/${updatedItem._id}`,
      updatedItem
    );
    if (response.status !== 200) {
      throw new Error(`Failed to edit instructor with id ${updatedItem._id}`);
    }
    setInstructor((prevInstructor) =>
      prevInstructor.map((instructor) =>
        instructor._id === updatedItem._id
          ? {
              ...instructor,
              _id:updatedItem._id,
              userName: updatedData.userName,
              email: updatedData.email,
              role: updatedData.role,
            }
          : instructor
      )
    );
  } catch (error) {
    console.error("Failed to update Instructor:", error);
    throw error;
  }
};

export default handleEditInstructor;
