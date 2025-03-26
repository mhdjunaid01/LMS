import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";

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

  return (
    <InstructorContext.Provider
      value={{
        instructors,
        setInstructors,
        loading,
        error,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
};
