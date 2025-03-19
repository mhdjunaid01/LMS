export const checkBatchFormIsValid = (batchFormData) => {
    return (
      batchFormData &&
      batchFormData.batchName !== "" &&
      batchFormData.title !== "" &&
      batchFormData.instructorName !== "" 
    
    );
  };
  
