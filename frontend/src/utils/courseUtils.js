export const checkCourseFormIsValid = (courseFormData) => {
    return (
      courseFormData &&
      courseFormData.cetagory !== "" &&
      courseFormData.title !== "" &&
      courseFormData.description !== ""&&
      courseFormData.instructorId !== ""
    
    );
  };
  
