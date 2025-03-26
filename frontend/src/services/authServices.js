import axiosInstance from "@/utils/axiosInstance";

// Centralized error handler
const handleError = (error) => {
  console.error("API Error:", error.response?.data || error.message);
  return { success: false, error: error.response?.data || "An error occurred" };
};

// Handle user login
export const logInService = async (formData) => {
  try {
    console.log("Logging in with data:", formData);
    const response = await axiosInstance.post("/auth/login", formData, { withCredentials: true });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};


// Register instructor
export const registerInstructorService = async (formData) => {
  try {
    console.log("Instructor SignUp Data:", formData);
    const response = await axiosInstance.post("/auth/registerInstructor", formData, { withCredentials: true });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Register student
export const registerStudentService = async (formData) => {
  try {
    console.log("Student SignUp Data:", formData);
    const response = await axiosInstance.post("/auth/addStudent", formData, { withCredentials: true });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Logout user
export const logOutService = async () => {
  try {
    await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
    return { success: true };
  } catch (error) {
    return handleError(error);
  }
};
