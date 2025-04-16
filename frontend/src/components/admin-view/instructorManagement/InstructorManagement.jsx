import React, { useEffect, useState } from "react";
import ManagementTable from "../../dynamicTable/managementTable";
import axiosInstance from "../../../utils/axiosInstance";
import handleDeleteInstructor from "../../actions/DeleteInstructor";
import { useInstructorContext } from "@/context/InstructorContext";
import handleEditInstructor from "@/components/actions/EditInstructor";
const InstructorManagement = () => {
  const {instructors, setInstructors} = useInstructorContext()
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const columns = ["UserName", "Email", "Role"];

  const columnMapping = {
    UserName: "userName",
    Email: "email",
    Role: "role",
  };

  

  useEffect(() => {
    const fetchInstructors = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/instructor/getInstructor");
        console.log("API Response:", response.data); 
        if (response.data.success && Array.isArray(response.data.instructors)) {
          const formattedInstructors = response.data.instructors.map((entry) => ({
            _id: entry._id,
            userName: entry.userName || "N/A", 
            email: entry.email || "N/A",
            role: entry.role || "N/A",
          }));
          setInstructors(formattedInstructors);
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
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleDelete = async (item) => {
    await handleDeleteInstructor(item, instructors, setInstructors);
  };

  const handleEdit = async (updatedItem) => {
     await handleEditInstructor(updatedItem, setInstructors);
  }

  return (
    <ManagementTable
      title="Instructor Management"
      columns={columns}
      data={instructors}
      columnMapping={columnMapping}
      onDelete={handleDelete}
      onSave={handleEdit}

    />
  );
};

export default InstructorManagement;