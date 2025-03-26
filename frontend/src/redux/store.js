import { configureStore } from "@reduxjs/toolkit";
import attendanceReducer from "./attendanceSlice/attendanceSlice.js";

export const store = configureStore({
  reducer: {
    attendanceData: attendanceReducer, 
  },
});