export const signInFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your  Email",
    type: "text",
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
  phoneNumber:"",
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
    type: "text",
    componentType: "input",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Enter Phone Number",
    type: "number",
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
  courseId: "",
  instructorId: "",
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
      label: course.title,
      value: course._id,
    })),
  },
  {
    name: "instructorId",
    label: "Instructor Name",
    placeholder: "Select Instructor",
    type: "select",
    componentType: "select",
    options: instructors.map((instructor) => ({
      label: instructor.userName,
      value: instructor._id,
    })),
  },
];
export const InitialCourseFormData = {
  title: "",
  category: "",
  description: "",
  instructorId: "",
};

export const courseFormControl = (instructors) => [
  {
    name: "title",
    label: "Title",
    placeholder: "Select Course",
    type: "text",
    componentType: "input",
  },
  {
    name: "category",
    label: "Category",
    placeholder: "Category",
    type: "text",
    componentType: "input",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter Description",
    type: "textarea",
    componentType: "textarea",
  },

  {
    name: "instructorId",
    label: "Instructor",
    placeholder: "Select Instructor",
    type: "select",
    componentType: "select",
    options: instructors.map((instructor) => ({
      label: instructor.userName,
      value: instructor._id,
    })),
  },
];

export const InitialAttendanceFormData = {
  courseId: "",
  batchId: "",
  date: new Date().toISOString().split("T")[0],
};

export const attendanceForm = (courses, batch) => [
  {
    name: "courseId",
    label: "Title",
    placeholder: "Select Course",
    type: "select",
    componentType: "select",
    options: courses.map((item) => ({
      label: item.title,
      value: item._id,
    })),
  },
  {
    name: "batchId",
    label: "Batch Name",
    placeholder: "Select Batch",
    type: "select",
    componentType: "select",
    options: batch.map((item) => ({
      label: item.batchName,
      value: item._id,
    })),
  },
  {
    name: "date",
    label: "Date",
    placeholder: "Select Date",
    type: "date",
    componentType: "input",
  },
];
export const InitialAttendanceReportFormControls = {
  courseId: "",
  batchId: "",
};

export const attendanceReportFormControls = (courses, batch) => [
  {
    name: "courseId",
    label: "course Name",
    placeholder: "SelectCourse",
    type: "select",
    componentType: "select",
    options: courses.map((item) => ({
      label: item.title,
      value: item._id,
    })),
  },
  {
    name: "batchId",
    label: "Batch Name",
    placeholder: "Select Batch",
    type: "select",
    componentType: "select",
    options: batch.map((item) => ({
      label: item.batchName,
      value: item._id,
    })),
  },
];

export const initialEnrollFormData = {
  studentId: "",
  courseId: "",
  batchId: "",
};

export const enrollFormControls = (unEnrolledStudents, courses, batch) => [
  {
    name: "studentId",
    label: "User Name ",
    placeholder: "Select  Student",
    type: "select",
    componentType: "select",
    options: unEnrolledStudents.map((item) => ({
      label: item.userName,
      value: item._id,
    })),
  },
  {
    name: "courseId",
    label: "Course Name",
    placeholder: "Select Course",
    type: "select",
    componentType: "select",
    options: courses.map((course) => ({
      label: course.title,
      value: course._id,
    })),
  },
  {
    name: "batchId",
    label: "Batch Name",
    placeholder: "Select Batch",
    type: "select",
    componentType: "select",
    options: batch.map((item) => ({
      label: item.batchName,
      value: item._id,
    })),
  },
];
export const initialLiveClassFormData = {
  title: "",
  courseId: "",
  batchId: "",
  scheduledTime: "",
  meetingLink: "",
};

export const liveClassFormControl = (courses = [], batch) => [
  {
    name: "title",
    label: "Class Title",
    placeholder: "Enter class title",
    componentType: "input",
    type: "text",
  },
  {
    name: "scheduledTime",
    label: "Scheduled Time",
    placeholder: "Select class date & time",
    componentType: "input",
    type: "datetime-local",
  },
  {
    name: "meetingLink",
    label: "Meeting Link",
    placeholder: "Enter meeting link",
    componentType: "input",
    type: "text",
  },
  {
    name: "batchId",
    label: "Batch",
    componentType: "select",
    options: batch.map((b) => ({
      value: b._id,
      label: b.batchName,
    })),
  },
  {
    name: "courseId",
    label: "Course",
    componentType: "select",
    options: courses.map((course) => ({
      value: course._id,
      label: course.title,
    })),
  },
];
