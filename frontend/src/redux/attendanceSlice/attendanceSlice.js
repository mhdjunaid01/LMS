import { createSlice } from "@reduxjs/toolkit";

export const attendanceSlice = createSlice({
  name: "attendanceData",
  initialState: {
    students: [],
    attendanceRecords: {},
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
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  getStudents,
  getAttendanceRecords,
  setIsLoading,
  setError,
} = attendanceSlice.actions;
export default attendanceSlice.reducer;