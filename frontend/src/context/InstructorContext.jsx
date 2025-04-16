import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";

// Create Context
const InstructorContext = createContext();

export const useInstructorContext = () => useContext(InstructorContext);

export const InstructorProvider = ({ children }) => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axiosInstance.get("/instructor/getInstructor");
        if (response.data.success) {
          setInstructors(response.data.instructors);
        } else {
          setError("Failed to fetch instructors");
        }
      } catch (error) {
        setError("Error fetching instructors: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  // Memoize the scheduleLiveClass function to prevent re-creation on every render
  const scheduleLiveClass = useCallback(async (classData) => {
    try {
      setLoading(true);
      console.log("classData", classData);
      const response = await axiosInstance.post("/live-classes/schedule", classData);
      toast.success("🎓 Live class scheduled successfully!");
      return response.data;
    } catch (error) {
      toast.error(
        "❌ Error scheduling class: " +
          (error.response?.data?.message || error.message)
      );
      return null;
    } finally {
      setLoading(false);
    }
    
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    instructors,
    setInstructors,
    loading,
    error,
    scheduleLiveClass,
  }), [instructors, loading, error, scheduleLiveClass]);

  return (
    <InstructorContext.Provider value={contextValue}>
      {children}
    </InstructorContext.Provider>
  );
};
