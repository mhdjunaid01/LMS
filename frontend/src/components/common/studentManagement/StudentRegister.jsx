import React, { useContext } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import CommenForm from '../CommenForm';
import { signUpFormControls } from '@/config/customForms';
import { AuthContext } from '@/context/AuthContext';
import { checkIfSignUpFormIsValid } from '@/utils/authUtils';

const StudentManagement = () => {
  const {signUpFormData,setSignUpFormData,handleRegisterStudent}=useContext(AuthContext)

    
  return (
    <Card className="p-6 space-y-4">
    <CardHeader>
      <CardTitle>Add student</CardTitle>
      <CardDescription>
        Enter student's userName email and password.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
      <CommenForm
        formControls={signUpFormControls}
        buttonText={"Sign Up"}
        formData={signUpFormData}
        setFormData={setSignUpFormData}
        isButtonDisabled={!checkIfSignUpFormIsValid(signUpFormData)}
        handleSubmit={handleRegisterStudent}
      />
    </CardContent>
  </Card>
  )
}

export default StudentManagement