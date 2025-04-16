import { createSlice } from "@reduxjs/toolkit";

const toggleTheme = createSlice({
    name: "toggleTheme",
    initialState: {
        isDarkMode: false,
    },
    reducers: {
        toggleTheme: (state) => {
        state.isDarkMode = !state.isDarkMode;
        },
    },

})

export const { toggleTheme: toggleThemeAction } = toggleTheme.actions;
export default toggleTheme.reducer;