import React, { useContext } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card'
import CommenForm from '../../common/CommenForm'
import { signUpFormControls } from '@/config/customForms'
import { AuthContext } from '@/context/AuthContext'



const InstructorManagement = () => {
    const {signUpFormData,setSignUpFormData,handleRegisterInstrutor}=useContext(AuthContext)
    const checkIfSignUpFormIsValid = () => {
        return signUpFormData &&
        signUpFormData.userName!==""&&
          signUpFormData.email !== "" &&
          signUpFormData.password !== ""
          ? true
          : false;
      };
  return (
    <Card className="p-6 space-y-4">
    <CardHeader>
      <CardTitle>Add Instructor</CardTitle>
      <CardDescription>
        Enter Instructor's user name email and password.
      </CardDescription>
    </CardHeader>

    <CardContent className="space-y-2">
      <CommenForm
        formControls={signUpFormControls}
        buttonText={"Sign Up"}
        formData={signUpFormData}
        setFormData={setSignUpFormData}
        isButtonDisabled={!checkIfSignUpFormIsValid(signUpFormData)}
        handleSubmit={handleRegisterInstrutor}
      />
    </CardContent>
  </Card>
  )
}

export default InstructorManagement