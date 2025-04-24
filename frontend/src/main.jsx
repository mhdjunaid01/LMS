import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import { InstructorProvider } from "./context/InstructorContext";
import { StudentProvider } from "./context/StudentContext";
import { BatchProvider } from "./context/BatchContext";
import { CourseProvider } from "./context/CourseContext";
import { EnrollmentProvider } from "./context/EnrollmentContext";
// import { NotificationProvider } from "./context/NotificationContext";
// import { ScheduleProvider } from "./context/ScheduleContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
          <InstructorProvider>
              <StudentProvider>
                <EnrollmentProvider>
                  <CourseProvider>
                    <BatchProvider>
                      <App />
                    </BatchProvider>
                  </CourseProvider>
                </EnrollmentProvider>
              </StudentProvider>
          </InstructorProvider>
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);
