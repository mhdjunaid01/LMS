import React, { useContext } from "react";
import CommenHomePage from "./pages/CommenHomePage";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import RouteGuard from "./components/features/auth/route-guard/RouteGuard";
import { AuthContext } from "./context/AuthContext";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFoundPage from "./pages/page_not_found/NotFoundPage";
import StudentDashBoard from "./pages/student/StudentDashBoard";

import { Toaster } from "@/components/ui/sonner"
const App = () => {
  const { auth } = useContext(AuthContext);
  return (
    <div>
     
      <Routes>
        
        <Route path="/" element={<CommenHomePage />} />

        <Route
          path="/auth"
          element={
            <RouteGuard
              element={<AuthPage />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <RouteGuard
              element={<AdminDashboard />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        />

        <Route
          path="/instructor"
          element={
            <RouteGuard
              element={<InstructorDashboard />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        />
           <Route
          path="/student"
          element={
            <RouteGuard
              element={<StudentDashBoard />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster/>
    </div>
  );
};

export default App;