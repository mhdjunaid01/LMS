// CommenForm.js
import React, { useState } from "react";
import FormControls from "./FormControls";
import { Button } from "../ui/button";

const CommenForm = ({
  handleSubmit,
  formControls = [],
  buttonText,
  formData,
  setFormData,
  isButtonDisabled = false,
  validationSchema // Add validationSchema prop
}) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    try {
      validationSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error.errors) {
        const newErrors = {};
        error.errors.forEach(err => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleFormSubmit = (e) => {
    if(e)e.preventDefault();
    if (validateForm()) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {formControls.map((control, index) => (
        <div key={index} className="mb-4">
          <FormControls
            formControls={[control]}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        </div>
      ))}
      <Button
        disabled={isButtonDisabled}
        type="submit"
        className={"mt-5 w-full"}
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommenForm;