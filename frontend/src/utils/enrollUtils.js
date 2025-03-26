export const checkEnrollFormIsValid = (enrollFormData) => {
    return (
      enrollFormData &&
      enrollFormData.studentId !== "" &&
      enrollFormData.courseId !== "" &&
      enrollFormData.batchId !== ""
    
    );
  };
  
  