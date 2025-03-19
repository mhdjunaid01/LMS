import { createContext, useState, useEffect, useMemo, useCallback } from "react";
import axiosInstance from "@/utils/axiosInstance";
import {
  logInService,
  logOutService,
  registerInstrutorService,
  registerStudentService,
} from "@/services/authServices";
import { initialSignInFormData, initialSignUpFormData } from "@/config/customForms";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({ authenticate: false, user: null });
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);
const [userRole, setUserRole] = useState("");
  const setAuthenticatedUser = useCallback((user) => {
    setAuth({ authenticate: true, user });
  }, []);

  const setUnauthenticatedUser = useCallback(() => {
    setAuth({ authenticate: false, user: null });
  }, []);
  
//verifyToken
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

//handleLoginUser
  const handleLoginUser = async (event) => {
    event.preventDefault();
    setAuthLoading(true);
    try {
      const data = await logInService(signInFormData);
      if (data?.success) {
        setAuthenticatedUser(data.user);

        setShouldReload(true);
      } else {
        setUnauthenticatedUser();
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
//handleRegisterInstrutor
  const handleRegisterInstrutor = useCallback(async (event) => {
    event.preventDefault();
    setAuthLoading(true);
    try {
      await registerInstrutorService(signUpFormData);
      setSignUpFormData(initialSignUpFormData);
    } finally {
      setAuthLoading(false);
    }
  }, [signUpFormData]);

//handleRegisterStudent
  const handleRegisterStudent = useCallback(async (event) => {
    event.preventDefault();
    setAuthLoading(true);
    try {
      await registerStudentService(signUpFormData);
      setSignUpFormData(initialSignUpFormData);
    } finally {
      setAuthLoading(false);
    }
  }, [signUpFormData]);
//removeToken
  const removeToken = useCallback(async () => {
    setUnauthenticatedUser();
    try {
      return await logOutService();
    } catch (error) {
      console.error("Error in removeToken:", error);
      return { success: false, error };
    }
  }, [setUnauthenticatedUser]);

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
