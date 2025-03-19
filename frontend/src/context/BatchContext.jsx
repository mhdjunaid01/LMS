import { InitialBatchFormData } from "@/config/customForms";
import axiosInstance from "@/utils/axiosInstance";
import { createContext, useContext, useEffect, useState } from "react";
const BatchContext = createContext();

export const BatchProvider = ({ children }) => {
  const [batchFormData, setBatchFormData] = useState(InitialBatchFormData);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [batch, setBatch] = useState([]);
  const [error, setError] = useState("");

  
  const fetchBatches = async () => {
    try {
      const response = await axiosInstance.get("/batch/getAllBatches");
      setBatch(response.data.batches || []);
      console.log("Fetched Batches:", response.data.batches);
    } catch (error) {
      console.error("Error fetching batches:", error);
      setError("Error fetching batches: " + error.message);
    }
  };

  // Fetch Courses
  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get("/courses/getCourses");
      setCourses(response.data.courses);
      console.log("courses::", response.data.courses);
      console.log(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Fetch Instructors
  const fetchInstructors = async () => {
    try {
      const response = await axiosInstance.get("/instructor/getInstructor");
      setInstructors(response.data.instructors || []);
    } catch (error) {
      setInstructors([]);
      console.error("Error fetching instructors:", error);
    }
  };
 
  useEffect(() => {
    fetchCourses();
    fetchInstructors();
    fetchBatches(); 
  }, []);

  const handleAddBatch = async (event) => {
    event.preventDefault();
    console.log(batchFormData);
    try {
      const response = await axiosInstance.post("/batch/createBatch", batchFormData);
      console.log("Batch Created:", response.data);


      if (response.data?.success && response.data?.batch) {
        setBatch((prevBatches) => [...prevBatches, response.data.batch]);
          setBatchFormData(InitialBatchFormData);
          fetchBatches();
        } else {
          setError(response.data?.message || "Failed to create batch.");
      }
    } catch (error) {
      console.error("Error adding batch:", error);
      setError(
        error.response?.data?.message || "An unexpected error occurred while adding the batch."
      );
    }
  };


  return (
    <BatchContext.Provider
      value={{
        batchFormData,
        setBatchFormData,
        courses,
        instructors,
        handleAddBatch,
        batch,
        error,
        fetchBatches,
      }}
    >
      {children}
    </BatchContext.Provider>
  );
};

export const useBatchContext = () => useContext(BatchContext);
