import { createSlice } from "@reduxjs/toolkit";
import { initialLiveClassFormData } from "@/config/customForms";
import { fetchScheduleClassData, scheduleLiveClassAction } from "@/redux/Action/scheduleClassAction.js";

const initialState = {
  scheduleClassData: [],
  liveClassData: initialLiveClassFormData,
  isLoading: false,
  error: null,
  isScheduled: false,
};

const scheduleClassSlice = createSlice({
  name: "scheduleClass",
  initialState,
  reducers: {
    setScheduleClassData(state, action) {
      state.scheduleClassData = action.payload;
    },
      setLiveClassData: (state, action) => {
    state.liveClassData = {
      ...state.liveClassData,
      ...action.payload
    };
  },

    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    resetScheduleClassData(state) {
      state.scheduleClassData = [];
    },
    resetError(state) {
      state.error = null;
    },
    resetLiveClassFormData(state) {
      state.liveClassData = initialLiveClassFormData;
    },
    resetScheduleState(state) {
      state.isScheduled = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScheduleClassData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchScheduleClassData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.scheduleClassData = action.payload || [];
      })
      .addCase(fetchScheduleClassData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(scheduleLiveClassAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isScheduled = false;
      })
      .addCase(scheduleLiveClassAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isScheduled = true;
        state.liveClassData = initialLiveClassFormData;
      })
      .addCase(scheduleLiveClassAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setScheduleClassData,
  setLiveClassData,
  setIsLoading,
  setError,
  resetScheduleClassData,
  resetError,
  resetLiveClassFormData,
  resetScheduleState,
} = scheduleClassSlice.actions;

export default scheduleClassSlice.reducer;