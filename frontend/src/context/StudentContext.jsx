import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";

// Create context
const StudentContext = createContext();

// Provider component
export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch students
  const fetchEnrolledStudents = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/enroll/getEnrolledStudents");

      if (
        response.data.success &&
        Array.isArray(response.data.enrolledStudents)
      ) {
        const formattedStudents = response.data.enrolledStudents.map((entry) => ({
          _id: entry._id, // Enrollment ID
          studentId: entry.studentId?._id,  // Store studentId for deletion
          courseId: entry.courseId,         // Store courseId for deletion
          userName: entry.studentId?.userName || "N/A",
          email: entry.studentId?.email || "N/A",
          role: entry.studentId?.role || "N/A",
        }));

        setStudents(formattedStudents);
      } else {
        setError("Failed to fetch students");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

  return (
    <StudentContext.Provider value={{ students, loading, error, setStudents, fetchEnrolledStudents }}>
      {children}
    </StudentContext.Provider>
  );
};

// Hook to use context
export const useStudents = () => useContext(StudentContext);

