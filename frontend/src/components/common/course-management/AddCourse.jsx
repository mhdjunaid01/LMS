import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { courseFormControl } from "@/config/customForms";
import { useInstructorContext } from "@/context/InstructorContext";
import { checkCourseFormIsValid } from "@/utils/courseUtils";
import React, { useEffect, useState } from "react";
import CommenForm from "../CommonForm";
import { useCourseContext } from "@/context/courseContext";
import { courseSchema } from "@/services/schemasZod.js";

const AddCourse = () => {
  const { instructors } = useInstructorContext();
  const { courseFormData, setCourseFormData, addNewCourse } = useCourseContext();
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(checkCourseFormIsValid(courseFormData));
  }, [courseFormData]);

  return (


    <Card className="p-6 space-y-4">
      <CardHeader>
        <CardTitle>Add New Course</CardTitle>
        <CardDescription>
          Enter Course details.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <CommenForm
          formControls={courseFormControl(instructors || [])}
          buttonText={"Add Course"}
          formData={courseFormData}
          setFormData={setCourseFormData}
          isButtonDisabled={!isFormValid}
          handleSubmit={addNewCourse}
          validationSchema={courseSchema}
          
        />
      </CardContent>
    </Card>
   
  );
};

export default AddCourse;