import axiosInstance from "@/utils/axiosInstance";

const handleDeleteStudent = async (studentId, courseId, students, setStudents) => {
  if (!studentId || !courseId) {
    console.error("Missing studentId or courseId! Cannot delete enrollment.");
    return;
  }

  try {
    console.log("Sending unenroll request:", studentId, courseId);
    const response = await axiosInstance.delete(`/enroll/unenroll/${studentId}/${courseId}`);

    if (response.data.success) {
      console.log("Student unenrolled successfully:", response.data.message);
      // Remove the deleted student from the state
      setStudents(students.filter((student) => student.studentId !== studentId));
    } else {
      console.error("Delete request failed:", response.data.message);
    }
  } catch (error) {
    console.error("Error deleting student:", error.message);
  }
};

export default handleDeleteStudent;
