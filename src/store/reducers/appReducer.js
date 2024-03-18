import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userType: null,
  user: null,
};

export const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.isAuthenticated = true;
      state.userType = action.payload.userType;
      state.user = action.payload.user;
    },
    removeUser: (state) => {
      state.isAuthenticated = false;
      state.userType = null;
      state.user = null;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { addUser, removeUser, updateUser } = appReducer.actions;

export default appReducer.reducer;
