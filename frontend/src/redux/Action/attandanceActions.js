import axiosInstance from "@/utils/axiosInstance";
import { getAttendanceReport, setIsLoading, setError } from "../Slice/attendanceSlice";

export const fetchAttendanceReport = (courseId, batchId) => async (dispatch) => {
  
  try {
    dispatch(setIsLoading(true));
    const res = await axiosInstance.get(`/attendance/attendance-report/${courseId}/${batchId}`);
    console.log("Attendance report response:", res.data);
    if (res.status ===404) {
      throw new Error("No attendance data found for the given course and batch.");
    }
    if (res.data ) {
      dispatch(getAttendanceReport(res.data));
    } else {
      throw new Error("Invalid response format");
    }
  } catch (err) {
    dispatch(setError(err.message || "Failed to fetch attendance report"));
  } finally {
    dispatch(setIsLoading(false));
  }
};

