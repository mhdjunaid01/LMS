import React from "react";
import { motion } from "framer-motion";
import ManagementTable from "@/components/dynamicTable/managementTable";
import handleDeleteCourse from "@/components/actions/DeleteCourse";
import { useCourseContext } from "@/context/courseContext";
import handleEditCourse from "@/components/actions/EditCourse";

const CourseManagement = () => {
  const { courses, setCourses } = useCourseContext();

  const columns = ["Title", "Description", "Category"];
  const columnMapping = {
    Title: "title",
    Description: "description",
    Category: "category",
  };

  const handleDelete = async (item) => {
    await handleDeleteCourse(item, courses, setCourses);
  };

  const handleEdit = async (updatedItem) => {
    await handleEditCourse(updatedItem, setCourses);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <ManagementTable
        title="Course Management"
        columns={columns}
        columnMapping={columnMapping}
        data={courses}
        onDelete={handleDelete}
        onSave={handleEdit}
      />
    </motion.div>
  );
};

export default CourseManagement;
