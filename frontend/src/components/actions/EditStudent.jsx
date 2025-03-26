import axiosInstance from "@/utils/axiosInstance";

const handleEditStudent = async (updatedItem, setStudents) => {
  try {
    const updatedData = {
      userName: updatedItem.userName,
      email: updatedItem.email,
      role: updatedItem.role,
    };

    const response = await axiosInstance.put(
      `/student/editStudent/${updatedItem.studentId}`,
      updatedData
    );

    if (response.status !== 200) {
      throw new Error(`Failed to edit student with id ${updatedItem.studentId}`);
    }

    
    setStudents(prevStudents => 
        prevStudents.map(student => 
          student.studentId === updatedItem.studentId
            ? { 
                ...student, 
                userName: updatedData.userName,
                email: updatedData.email,
                role: updatedData.role 
              }
            : student
        )
      );
    
  } catch (error) {
    console.error("Failed to update student:", error);
    throw error;
  }
};

export { handleEditStudent };