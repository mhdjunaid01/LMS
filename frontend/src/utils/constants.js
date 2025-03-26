import {
  BarChart,
  Book,
  BookUp2,
  CalendarDays,
  FolderCog,
  Group,
  LogOut,
  School,
  UserRoundPlus,
} from "lucide-react";
import AdminDashboardPage from "@/components/admin-view/AdminDashboardPage";
import AttendanceManagement from "@/components/common/attendance-management.jsx/AttendanceManagement";
import BatchManagement from "@/components/common/batch-management/BatchManagement";
import CourseManagement from "@/components/common/course-management/CourseManagement";
import InstructorManagement from "@/components/admin-view/instructorManagement/InstructorManagement";
import InstructorRegister from "@/components/admin-view/instructorManagement/InstructorRegister";
import StudentManagement from "@/components/common/studentManagement/StudentManagement";
import StudentRegister from "@/components/common/studentManagement/StudentRegister";
import TrialStudents from "@/components/common/studentManagement/TrialStudents";
import AddBatch from "@/components/common/batch-management/AddBatch";
import AddCourse from "@/components/common/course-management/AddCourse";
import EnrollStudents from "@/components/common//studentManagement/EnrollStudents";

EnrollStudents
export const menuItems = [
  {
    icon: BarChart,
    label: "Dashboard",
    value: "dashboard",
    component: AdminDashboardPage,
    roles: ["admin", "instructor"],
  },
  {
    icon: UserRoundPlus,
    label: "Add Instructor",
    value: "addInstructor",
    component: InstructorRegister,
    roles: ["admin"],
  },
  {
    icon: UserRoundPlus,
    label: "Add Student",
    value: "addStudent",
    component: StudentRegister,
    roles: ["admin", "instructor"],
  },
  {
    icon: UserRoundPlus,
    label: "Enroll Students",
    value: "enrollStudents",
    component: EnrollStudents,
    roles: ["admin", "instructor"],
  },
  {
    icon: BookUp2,
    label: "Add Course",
    value: "addCourse",
    component: AddCourse,
    roles: ["admin", "instructor"],
  },
  {
    icon: Group,
    label: "Add Batch",
    value: "addBatch",
    component: AddBatch,
    roles: ["admin", "instructor"],
  },
  {
    icon: School,
    label: "Batches",
    value: "batches",
    component: BatchManagement,
    roles: ["admin", "instructor"],
  },
  {
    icon: Book,
    label: "Courses",
    value: "courses",
    component: CourseManagement,
    roles: ["admin", "instructor"],
  },
  {
    icon: CalendarDays,
    label: "Attendance",
    value: "attendance",
    component: AttendanceManagement,
    roles: ["instructor"],
  },
  {
    icon: FolderCog,
    label: "Instructor Management",
    value: "instructorManagement",
    component: InstructorManagement,
    roles: ["admin"], // Only Admin
  },
  {
    icon: FolderCog,
    label: "Trial Students",
    value: "trialStudents",
    component: TrialStudents,
    roles: ["admin", "instructor"], // Admin & Instructor
  },
  {
    icon: FolderCog,
    label: "Student Management",
    value: "studentManagement",
    component: StudentManagement,
    roles: ["admin", "instructor"], // Admin & Instructor
  },
  {
    icon: LogOut,
    label: "Logout",
    value: "logout",
    component: null,
    roles: ["admin", "instructor"], // Everyone can see
  },
];

export const getFilteredMenuItems = (role) =>
  menuItems.filter((item) => item.roles.includes(role));
