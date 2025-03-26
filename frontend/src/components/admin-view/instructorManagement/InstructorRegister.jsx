import React, { useContext, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card'
import CommonForm from '../../common/CommonForm'
import { signUpFormControls } from '@/config/customForms'
import { AuthContext } from '@/context/AuthContext'
import { signUpSchema } from '@/services/schemasZod.js'



const InstructorManagement = () => {
    const {signUpFormData,setSignUpFormData,handleRegisterInstrutor, initialSignUpFormData}=useContext(AuthContext)
    const checkIfSignUpFormIsValid = () => {
        return signUpFormData &&
        signUpFormData.userName!==""&&
          signUpFormData.email !== "" &&
          signUpFormData.password !== ""
          ? true
          : false;
      };
     useEffect(() => {
       setSignUpFormData(initialSignUpFormData);
     }, [initialSignUpFormData]);
  return (
    <Card className="p-6 space-y-4">
    <CardHeader>
      <CardTitle>Add Instructor</CardTitle>
      <CardDescription>
        Enter Instructor's user name email and password.
      </CardDescription>
    </CardHeader>

    <CardContent className="space-y-2">
      <CommonForm
        formControls={signUpFormControls}
        buttonText={"Sign Up"}
        formData={signUpFormData}
        setFormData={setSignUpFormData}
        isButtonDisabled={!checkIfSignUpFormIsValid(signUpFormData)}
        handleSubmit={handleRegisterInstrutor}
        validationSchema={signUpSchema}
      />
    </CardContent>
  </Card>
  )
}



export default InstructorManagement