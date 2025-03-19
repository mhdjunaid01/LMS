import axiosInstance from "@/utils/axiosInstance";
import { useCallback, useState } from "react";

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (method, url, data = null) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance({
        method,
        url,
        data,
      });
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  return {request, loading, error};
};

export default useAxios;