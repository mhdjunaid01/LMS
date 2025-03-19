import React from "react";
import FormControls from "./FormControls";
import { Button } from "../ui/button";

const CommenForm = ({
  handleSubmit,
  formControls = [],
  buttonText,
  formData,
  setFormData,
  isButtonDisabled = false,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {formControls.map((control, index) => (
        <div key={index} className="mb-4">
          <FormControls
            formControls={[control]}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      ))}
      {
        <Button
          disabled={isButtonDisabled}
          type="submit"
          className={"mt-5 w-full"}
        >
          {buttonText || "Submit"}
        </Button>
      }
    </form>
  );
};

export default CommenForm;
