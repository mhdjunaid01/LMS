export const signInFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your  Email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your Password",
    type: "Password",
    componentType: "input",
  },
];

export const initialSignInFormData = {
  email: "",
  password: "",
};

export const initialSignUpFormData = {
  userName: "",
  email: "",
  password: "",
};
export const signUpFormControls = [
  {
    name: "userName",
    label: "User Name ",
    placeholder: "Enter  User Name",
    type: "text",
    componentType: "input",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Password",
    type: "Password",
    componentType: "input",
  },
];
export const InitialBatchFormData = {
  batchName: "",
  courseId: "", // Store course ID instead of title
  instructorId: "", // Store instructor ID instead of name
  startDate: "",
  endDate: "",
};
export const batchFormControls = (courses, instructors) => [
  
  {
    name: "batchName",
    label: "Batch Name",
    placeholder: "Enter Batch Name",
    type: "text",
    componentType: "input",
  },
  {
    name: "courseId", 
    label: "Course Title",
    placeholder: "Select Course",
    type: "select",
    componentType: "select",
    options: courses.map((course) => ({
      label: course.title, // Display Course Title
      value: course._id,   // Store Course ID
    })),
  },
  {
    name: "instructorId", // Change from "instructorName" to "instructorId"
    label: "Instructor Name",
    placeholder: "Select Instructor",
    type: "select",
    componentType: "select",
    options: instructors.map((instructor) => ({
      label: instructor.userName, // Display Instructor Name
      value: instructor._id,      // Store Instructor ID
    })),
  },
];