import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {resetLiveClassFormData} from "@/redux/Slice/scheduleSlice.js";
// ✅ Fetch scheduled live classes
export const fetchScheduleClassData = createAsyncThunk(
  "scheduleClass/fetchScheduleClassData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/live-classes/upcoming");
      
      return response.data.classes || []; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch schedule");
    }
  }
);

export const scheduleLiveClassAction = createAsyncThunk(
    "scheduleClass/scheduleLiveClass",
    async (liveClassData, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post("/live-classes/schedule", liveClassData);
        return {
          ...response.data,
          liveClassId: response.data.liveClassId
        };
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Failed to schedule class");
      }
    }
  );
  