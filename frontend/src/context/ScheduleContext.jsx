import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/live-classes/upcoming");
      setSchedule(response.data.classes);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <ScheduleContext.Provider
      value={{
        schedule,
        setSchedule,
        loading,
        fetchSchedule,
        error,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

export const useScheduleContext = () => useContext(ScheduleContext);
