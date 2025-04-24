import React from "react";
import ManagementTable from "../../dynamicTable/managementTable";
import { useStudents } from "@/context/StudentContext";
import handleDeleteStudent from "@/components/actions/DeleteStudent";
import { handleEditStudent } from "@/components/actions/EditStudent";
import { motion } from "framer-motion";
const StudentManagement = () => {
  const { students, setStudents, loading, error } = useStudents();
  const columns = ["UserName", "Email","CourseName","BatchName","Role"];
  const columnMapping = {
    UserName: "userName",
    Email: "email",
    CourseName:"courseName",
    BatchName:"batchName",
    Role: "role",
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDelete = async (items) => {
    const studentToDelete = students.find((student) => student._id === items._id);
    if (!studentToDelete) {
      console.error("Student not found!");
      return;
    }
 
    await handleDeleteStudent(items, students, setStudents);
  };

const handleEdit = async (updatedItem) => {
  console.log("'iffddd",updatedItem);
  try {
    await handleEditStudent(updatedItem, setStudents);
  } catch (error) {
    console.error("Failed to edit student:", error);
  }
}

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <ManagementTable
      title="Student Management"
      columns={columns}
      data={students}
      columnMapping={columnMapping}
      onDelete={handleDelete}
      onSave={handleEdit}
    />
  </motion.div>
  );
};

export default StudentManagement;
