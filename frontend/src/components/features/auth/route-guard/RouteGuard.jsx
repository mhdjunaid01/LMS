import { AuthContext } from "@/context/AuthContext";
import React, { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";

const RouteGuard = ({ element, authenticated, user }) => {
  const location = useLocation();
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-xl font-bold">Loading...</h1>
      </div>
    );
  }

  // Redirect unauthenticated users to /auth
  if (!authenticated && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth" />;
  } 
  
  // Redirect authenticated users away from /auth to their respective dashboards
  if (authenticated && location.pathname.includes("/auth")) {
    if (user?.role === "admin") {
      return <Navigate to="/admin" />;
    }
    if (user?.role === "instructor") {
      return <Navigate to="/instructor" />;
    }
    if (user?.role === "student") {
      return <Navigate to="/student" />;
    }
  }

  // Redirect users trying to access restricted areas
  if (authenticated) {
    if (user?.role === "admin" && (location.pathname.includes("/instructor") || location.pathname.includes("/student"))) {
      return <Navigate to="/admin" />;
    }
    if (user?.role === "instructor" && (location.pathname.includes("/admin") || location.pathname.includes("/student"))) {
      return <Navigate to="/instructor" />;
    }
    if (user?.role === "student" && (location.pathname.includes("/admin") || location.pathname.includes("/instructor"))) {
      return <Navigate to="/student" />;
    }
  }

  // Ensure admin is always redirected to /admin dashboard
  if (authenticated && user?.role === "admin" && location.pathname !== "/admin") {
    return <Navigate to="/admin" />;
  }

  // Otherwise, render the requested page
  return <>{element}</>;
};

export default RouteGuard;
