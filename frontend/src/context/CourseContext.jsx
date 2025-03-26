import { InitialCourseFormData } from "@/config/customForms";
import axiosInstance from "@/utils/axiosInstance";
import { createContext, useContext, useEffect, useState } from "react";
import {toast} from "sonner"
const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [courseFormData, setCourseFormData] = useState(InitialCourseFormData);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get("/courses/getCourses");
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  
  const addNewCourse = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/courses/addCourse", courseFormData);
      if (response.data?.success) {
        setCourses((prevCourses) => [...prevCourses, response.data.course]);
        setCourseFormData(InitialCourseFormData);
        toast.success("successfully created courses")
      } else {
        setError(response.data?.message || "Failed to create course.");
        toast.error("Failed to create course") 
      }
    } catch (error) {
      console.error("Error adding course:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <CourseContext.Provider
      value={{
        courses,
        setCourses,
        courseFormData,
        setCourseFormData,
        addNewCourse,
        error,
        loading,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => useContext(CourseContext);