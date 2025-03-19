import React from "react";
import ManagementTable from "../../dynamicTable/managementTable";
import { useStudents } from "@/context/StudentContext";
import handleDeleteStudent from "@/components/actions/DeleteStudent";

const StudentManagement = () => {
  const { students, setStudents, loading, error } = useStudents();
  const columns = ["UserName", "Email", "Role"];
  const columnMapping = {
    UserName: "userName",
    Email: "email",
    Role: "role",
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDelete = async (id) => {
    const studentToDelete = students.find((student) => student._id === id);

    if (!studentToDelete) {
      console.error("Student not found!");
      return;
    }

    const { studentId, courseId } = studentToDelete;

    if (!studentId || !courseId) {
      console.error("Missing studentId or courseId! Cannot delete enrollment.");
      return;
    }

    await handleDeleteStudent(studentId, courseId, students, setStudents);
  };

  return (
    <ManagementTable
      title="Student Management"
      columns={columns}
      data={students}
      columnMapping={columnMapping}
      onDelete={handleDelete}
    />
  );
};

export default StudentManagement;
