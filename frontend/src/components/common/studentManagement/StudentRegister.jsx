import React, { useContext, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import CommonForm from "../CommonForm";
import { signUpFormControls } from "@/config/customForms";
import { AuthContext } from "@/context/AuthContext";
import { checkIfSignUpFormIsValid } from "@/utils/authUtils";
import { signUpSchema } from "@/services/schemasZod.js";
import { motion } from "framer-motion";
const StudentManagement = () => {
  const {
    signUpFormData,
    setSignUpFormData,
    handleRegisterStudent,
    initialSignUpFormData,
  } = useContext(AuthContext);

  useEffect(() => {
    setSignUpFormData(initialSignUpFormData);
  }, [initialSignUpFormData]);

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="p-6 space-y-4">
      <CardHeader>
        <CardTitle>Add student</CardTitle>
        <CardDescription>
          Enter student's userName email and password.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <CommonForm
          formControls={signUpFormControls}
          buttonText={"Sign Up"}
          formData={signUpFormData}
          setFormData={setSignUpFormData}
          isButtonDisabled={!checkIfSignUpFormIsValid(signUpFormData)}
          handleSubmit={handleRegisterStudent}
          validationSchema={signUpSchema}
        />
      </CardContent>
    </Card>
  </motion.div>
  );
};

export default StudentManagement;
