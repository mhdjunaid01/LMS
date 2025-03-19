import React, { useEffect, useState } from "react";
import ManagementTable from "../../dynamicTable/managementTable";
import axiosInstance from "../../../utils/axiosInstance";
import handleDeleteInstructor from "../../actions/DeleteInstructor";
const InstructorManagement = () => {
  const [instructors, setInstructors] = useState([]);
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
        console.log("API Response:", response.data); // Debugging
  
        if (response.data.success && Array.isArray(response.data.instructors)) {
          const formattedInstructors = response.data.instructors.map((entry) => ({
            _id: entry._id,
            userName: entry.userName || "N/A", // Remove instructorId reference
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
  const handleDelete = async (id) => {
    await handleDeleteInstructor(id, instructors, setInstructors);
  };
  return (
    <ManagementTable
      title="Instructor Management"
      columns={columns}
      data={instructors}
      columnMapping={columnMapping}
      onDelete={handleDelete}
      // onEdit={handleEditInstructor}

    />
  );
};

export default InstructorManagement;