import { configureStore } from "@reduxjs/toolkit";
import attendanceReducer from "./Slice/attendanceSlice.js";
import notificationReducer from "./Slice/notificationSlice.js";
import scheduleClassReducer from "./Slice/scheduleSlice.js";
import toggleThemeReducer from "./Slice/toggleTheme.js"; // Import the toggleTheme slice
export const store = configureStore({
  reducer: {
    attendanceData: attendanceReducer, 
    notification: notificationReducer, 
    scheduleClass: scheduleClassReducer,
    toggleTheme: toggleThemeReducer, 
  },
});
