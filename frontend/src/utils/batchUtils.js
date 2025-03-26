export const checkBatchFormIsValid = (batchFormData) => {
    return (
      batchFormData &&
      batchFormData.batchName !== "" 
    );
  };
  
