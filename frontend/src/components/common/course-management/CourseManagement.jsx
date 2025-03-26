import React from "react";
import ManagementTable from "@/components/dynamicTable/managementTable";
import handleDeleteCourse from "@/components/actions/DeleteCourse";
import { useCourseContext } from "@/context/courseContext";
import handleEditCourse from "@/components/actions/EditCourse";

const CourseManagement = () => {
  const { courses,setCourses } = useCourseContext();

  const columns = ["Title", "Description", "Category"];
  const columnMapping = {
    Title: "title",
    Description: "description",
    Category: "category",
  };

  const handleDelete = async(item)=>{
   await  handleDeleteCourse(item,courses,setCourses)
  }
 const  handleEdit =async(updatedItem)=>{
  await handleEditCourse(updatedItem,setCourses)
 }
  return (
    <ManagementTable
      title="Course Management"
      columns={columns}
      columnMapping={columnMapping}
      data={courses}
      onDelete={handleDelete}
      onSave={handleEdit}
    />
  );
};

export default CourseManagement;
