import { InitialBatchFormData } from "@/config/customForms";
import axiosInstance from "@/utils/axiosInstance";
import { createContext, useContext, useEffect, useState } from "react";
import { useCourseContext } from "./CourseContext";
import { useInstructorContext } from "./InstructorContext";
import {toast} from 'sonner'
const BatchContext = createContext();

export const BatchProvider = ({ children }) => {
  const {courses } =useCourseContext()
  const {instructors}=useInstructorContext()
  const [batchFormData, setBatchFormData] = useState(InitialBatchFormData);
  const [batch, setBatch] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); 
  const fetchBatches = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/batch/getAllBatches");
      setBatch(response.data.batches || []);
    } catch (error) {
      console.error("Error fetching batches:", error);
      setError("Error fetching batches: " + error.message);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchBatches();
  }, [setBatch]);

    const handleAddBatch = async (event) => {
      event.preventDefault();
      try {
        const batchData = {
          ...batchFormData,
          batchName: batchFormData.batchName.toUpperCase(),
        };

        const response = await axiosInstance.post("/batch/createBatch", batchData);

        if (response.data?.success && response.data?.batch) {
          setBatch((prevBatches) => [...prevBatches, response.data.batch]);
        setBatchFormData(InitialBatchFormData);
        fetchBatches();
        toast.success("successfully create batch.");
      } else {
        setError(response.data?.message || "Failed to create batch.");
        toast.error("Failed to create batch.")
      }
    } catch (error) {
      console.error("Error adding batch:", error);
      setError("An unexpected error occurred while adding the batch.");
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
        setBatch,
        error,
        fetchBatches,
        loading, 
      }}
    >
      {children}
    </BatchContext.Provider>
  );
};

export const useBatchContext = () => useContext(BatchContext);
