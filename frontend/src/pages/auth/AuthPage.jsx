import CommenForm from "@/components/common/CommonForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap } from "lucide-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { signInFormControls } from "@/config/customForms";
import { checkIfSignInFormIsValid } from "@/utils/authUtils.js";
import { signIpSchema } from "@/services/schemasZod";
const AuthPage = () => {
  const [activeTab,setActiveTab]=useState("signIn");
  const { signInFormData, setSignInFormData, handleLoginUser } =
    useContext(AuthContext);

    const handleTabChange = (value) => {
      setActiveTab(value);
    };
  
    checkIfSignInFormIsValid(signInFormData)
  return (
    <div className=" flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to={"/"} className="flex items-center justify-center">
          <GraduationCap className="h-8 w-8  mr-4" />
          <span className="font-extrabold text-xl">RP2 LMS</span>
        </Link>
      </header>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Tabs 
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full max-w-md" 
        defaultValue="signIn">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signIn">Sign In</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="signIn">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>SignIn to your account.</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                <CommenForm
                  formControls={signInFormControls}
                  buttonText={"Sign In"}
                  formData={signInFormData}
                  setFormData={setSignInFormData}
                  isButtonDisabled={!checkIfSignInFormIsValid}
                  handleSubmit={handleLoginUser}
                  validationSchema={signIpSchema}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>register for Enrollment.</CardTitle>
                <CardDescription>
                  Enter your Name email Phone Number
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2"></CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;

