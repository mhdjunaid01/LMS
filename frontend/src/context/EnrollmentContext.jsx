import { initialEnrollFormData } from "@/config/customForms";
import axiosInstance from "@/utils/axiosInstance";
import { createContext, useContext, useEffect, useState } from "react";
import {toast} from 'sonner'
const EnrollmentContext = createContext();
export const EnrollmentProvider = ({ children }) => {
  const [unEnrolledStudents, setUnEnrolledStudents] = useState();
  const [enrolledStudents,setEnrolledStudents]=useState([])
  const [enrollFormData, setEnrollFormData] = useState(initialEnrollFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const getUnEnrollStudents = async () => {
  try {
    setLoading(true);
    const response = await axiosInstance.get("/enroll/getUnEnrolledStudents");
    console.log(response.data.unEnrolledStudents);

    if (response.status !== 200) {
      throw new Error("failed to fetch unEnroll students");
    }
    setUnEnrolledStudents(response.data.unEnrolledStudents);
  } catch (error) {
    console.error("failed to fetch unEnrolled students", error);
    setError(error);
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  getUnEnrollStudents();

  
}, []);
  

// const handleEnrollStudents=async(event)=>{
//     event.preventDefault()
//     try {
//     setLoading(true)   
//     const response = await axiosInstance.post(`/enroll/enrollStudent`,enrollFormData)
//     if (response.status!== 201) {
//         throw new Error("failed to Enroll student")
//     }
//     setEnrolledStudents(response.data.enrollment)
//     setEnrollFormData(initialEnrollFormData)
//      toast.success("successfully Enrolled Student.")
//     console.log(enrolledStudents);
    
//     } catch (error) {
//         console.error("failed submitting Enroll student", error);
//         setError(error);
//     } finally {
//         setLoading(false);
//     }

// }

const handleEnrollStudents = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("Submitting:", enrollFormData); // Add this line
      
      const response = await axiosInstance.post(`/enroll/enrollStudent`, enrollFormData);
      
      console.log("Response:", response); // Add this line
      
      if (response.status !== 201) {
        throw new Error("Failed to Enroll student");
      }
      
      setEnrolledStudents(response.data.enrollment);
      setEnrollFormData(initialEnrollFormData);
      toast.success("Successfully Enrolled Student.");
      getUnEnrollStudents(); // Refresh the unenrolled list
    } catch (error) {
      console.error("Failed submitting Enroll student", error);
      setError(error);
      toast.error("Failed to enroll student: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <EnrollmentContext.Provider
      value={{
        unEnrolledStudents,
        enrollFormData,
        setEnrollFormData,
        getUnEnrollStudents,
        loading,
        error,
        handleEnrollStudents,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
};
export const useEnrollmentContext = () => useContext(EnrollmentContext);
