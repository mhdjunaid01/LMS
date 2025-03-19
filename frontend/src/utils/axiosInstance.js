import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/", // Ensure backend is running at this port
  withCredentials: true, // Allows sending cookies with requests
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization; // Ensure old token is removed if no new one exists
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
