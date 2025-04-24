import { createSlice } from "@reduxjs/toolkit";

const attendanceSlice = createSlice({
  name: "attendanceData",
  initialState: {
    students: [],
    attendanceRecords: {},
    attendanceReport: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    getStudents: (state, action) => {
      state.students = action.payload;
    },
    getAttendanceRecords: (state, action) => {
      state.attendanceRecords = action.payload;
    },
    getAttendanceReport: (state, action) => {
      state.attendanceReport = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },

    clearStudents: (state) => {
      state.students = [];
    },
  },
});

export const {
  getStudents,
  getAttendanceRecords,
  getAttendanceReport,
  setIsLoading,
  setError,
  clearStudents, 
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
