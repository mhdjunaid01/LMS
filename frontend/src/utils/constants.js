import {
  BarChart,
  Book,
  BookUp2,
  Bot,
  BotIcon,
  CalendarCheck,
  CalendarDays,
  CheckSquareIcon,
  Clock,
  FolderCog,
  Group,
  LogOut,
  MessageCircle,
  School,
  Timer,
  User,
  UserRoundPlus,
} from "lucide-react";
import AdminDashboardPage from "@/components/admin-view/AdminDashboardPage";
import AttendanceManagement from "@/components/common/attendance-management/AttendanceManagement";
import BatchManagement from "@/components/common/batch-management/BatchManagement";
import CourseManagement from "@/components/common/course-management/CourseManagement";
import InstructorManagement from "@/components/admin-view/instructorManagement/InstructorManagement";
import InstructorRegister from "@/components/admin-view/instructorManagement/InstructorRegister";
import StudentManagement from "@/components/common/studentManagement/StudentManagement";
import StudentRegister from "@/components/common/studentManagement/StudentRegister";
import AddBatch from "@/components/common/batch-management/AddBatch";
import AddCourse from "@/components/common/course-management/AddCourse";
import EnrollStudents from "@/components/common//studentManagement/EnrollStudents";
import Profile from "@/components/student-view/Profile";
import ChatBot from "@/components/student-view/ChatBot";
import DeepSeek from "@/components/student-view/DeepSeek";
import Notifications from "@/components/student-view/Notifications";
import Schedule from "@/components/student-view/Schedule";
import Attendance from "@/components/student-view/Attendance";
import NotificationsTab from "@/components/student-view/NotificationsTab";
import ScheduleClass from "@/components/instructor-view/ScheduleClass";
import AttendanceReport from "@/components/common/attendance-management/AttendanceReport";
import InstructorDashboardPage from "@/components/instructor-view/InstructorDashboardPage";
import StudentDashBoardPage from "@/components/student-view/StudentDashBoardPage";
export const menuItems = [
  {
    icon: BarChart,
    label: "Dashboard",
    value: "dashboard",
    component: AdminDashboardPage,
    roles: ["admin"],
  },
  {
    icon: BarChart,
    label: "Dashboard",
    value: "dashboard",
    component: InstructorDashboardPage,
    roles: ["instructor"],
  },
  {
    icon: BarChart,
    label: "Dashboard",
    value: "dashboard",
    component: StudentDashBoardPage,
    roles: ["student"],
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
    icon: CheckSquareIcon,
    label: "Attendance Report",
    value: "attendanceReport",
    component: AttendanceReport,
    roles: ["instructor"],
  },
  {
    icon: Timer,
    label: "Schedule Live Class",
    value: "ScheduleLiveClass",
    component: ScheduleClass,
    roles: ["instructor"],
  },
  {
    icon: FolderCog,
    label: "Instructor Management",
    value: "instructorManagement",
    component: InstructorManagement,
    roles: ["admin"], 
  },
  {
    icon:User,
    label: "Profile ",
    value: "profile",
    component:Profile,
    roles: ["student"], 
  },
  {
    icon: CalendarCheck,
    label: "Attendance ",
    value: "attendance",
    component:Attendance,
    roles: ["student"], 
  },
 
  {
    icon: Clock,
    label: "Schedule ",
    value: "schedule",
    component:Schedule,
    roles: ["student"], 
  },
  {
    icon: NotificationsTab,
    label: "Notifications ",
    value: "notifications",
    component: Notifications,
    roles: ["student"], 
  },
  
  {
    icon:BotIcon,
    label: "DeepSeek ",
    value: "DeepSeek",
    component:DeepSeek,
    roles: ["student","admin","instructor"], 
  },
  {
    icon:MessageCircle,
    label: "ChatBox ",
    value: "ChatBox",
    component:ChatBot,
    roles: ["student","instructor"], 
  },
  {
    icon: FolderCog,
    label: "Student Management",
    value: "studentManagement",
    component: StudentManagement,
    roles: ["admin", "instructor"], 
  },
  {
    icon: LogOut,
    label: "Logout",
    value: "logout",
    component: null,
    roles: ["admin", "instructor","student"],
  },
];

export const getFilteredMenuItems = (role) =>
  menuItems.filter((item) => item.roles.includes(role));
