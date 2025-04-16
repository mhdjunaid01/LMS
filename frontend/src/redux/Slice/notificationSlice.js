import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    unreadCount: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
    addNotification(state, action) {
      state.notifications = [action.payload, ...state.notifications];
    },
    removeNotification(state, action) {
      state.notifications = state.notifications.filter(
        (notification) => notification._id !== action.payload
      );
    },
    setUnreadCount(state, action) {
      state.unreadCount = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setNotifications,
  addNotification,
  removeNotification,
  setUnreadCount,
  setIsLoading,
  setError,
} = notificationSlice.actions;

export default notificationSlice.reducer;