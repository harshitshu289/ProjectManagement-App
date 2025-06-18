
import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromStorage || null,
    isAuthenticated: !!userFromStorage,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
