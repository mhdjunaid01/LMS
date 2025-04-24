import { createContext, useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axiosInstance from "@/utils/axiosInstance";
import {
  logInService,
  logOutService,
  registerInstructorService,
  registerStudentService,
} from "@/services/authServices";
import { initialSignInFormData, initialSignUpFormData } from "@/config/customForms";
import { toast } from "sonner";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({ authenticate: false, user: null });
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const setAuthenticatedUser = useCallback((user) => {
    setAuth({ authenticate: true, user });
  }, []);

  const setUnauthenticatedUser = useCallback(() => {
    setAuth({ authenticate: false, user: null });
  }, []);

  // verifyToken
  const verifyToken = async () => {
    try {
      const response = await axiosInstance.get("/auth/me");
      if (response.data.success) {
        setAuthenticatedUser(response.data.user);
        setUserRole(response.data.user.role);
      } else {
        setUnauthenticatedUser();
      }
    } catch (error) {
      console.error("Token verification error:", error);
      setUnauthenticatedUser();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  // handleLoginUser
  const handleLoginUser = async (event) => {
    event.preventDefault();
    setAuthLoading(true);
    try {
      const data = await logInService(signInFormData);
      if (data?.success) {
        setAuthenticatedUser(data.user);
        setShouldReload(true);
        toast.success("User Login successfully!");
      } else {
        setUnauthenticatedUser();
        toast.error("User Login Failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setUnauthenticatedUser();
    } finally {
      setAuthLoading(false);
    }
  };

  // Use useEffect to reload only once
  useEffect(() => {
    if (shouldReload) {
      window.location.reload();
    }
  }, [shouldReload]);

  // handleRegisterInstrutor
  const handleRegisterInstrutor = useCallback(
    async (event) => {
      event.preventDefault();
      setAuthLoading(true);
      try {
        await registerInstructorService(signUpFormData);
        setSignUpFormData(initialSignUpFormData);
        toast.success("Instrutor register successfully!");
      } finally {
        setAuthLoading(false);
      }
    },
    [signUpFormData]
  );

  // handleRegisterStudent
  const handleRegisterStudent = useCallback(
    async (event) => {
      event.preventDefault();
      setAuthLoading(true);
      try {
        await registerStudentService(signUpFormData);
        setSignUpFormData(initialSignUpFormData);
        toast.success("Student register successfully!");
      } finally {
        setAuthLoading(false);
      }
    },
    [signUpFormData]
  );

  // removeToken
  const removeToken = useCallback(async () => {
    setUnauthenticatedUser(); // Reset auth state
    setUserRole(""); 
    setSignInFormData(initialSignInFormData);
    setSignUpFormData(initialSignUpFormData);
    try {
      await logOutService(); // Call logout service
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Error in removeToken:", error);
    } finally {
      navigate("/auth"); // Redirect to /auth
    }
  }, [setUnauthenticatedUser, navigate]);

  const contextValue = useMemo(
    () => ({
      signInFormData,
      setSignInFormData,
      handleLoginUser,
      signUpFormData,
      setSignUpFormData,
      handleRegisterInstrutor,
      handleRegisterStudent,
      removeToken,
      auth,
      loading,
      authLoading,
      userRole,
      setUserRole,
      initialSignUpFormData,
    }),
    [
      signInFormData,
      signUpFormData,
      auth,
      loading,
      authLoading,
      handleLoginUser,
      handleRegisterInstrutor,
      handleRegisterStudent,
      removeToken,
      userRole,
      setUserRole,
      initialSignUpFormData,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-xl font-bold">Authenticating...</h1>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
