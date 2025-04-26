import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRedux: false,
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.username;
    },
    logIn: (state, action) => {
      state.isRedux = true;
    },
    logOutAction: (state) => {
      state.isLoggedIn = false;
      state.user = false;
    },
  },
});

export const { logIn, logOutAction, setLoggedIn } = authSlice.actions;
export default authSlice.reducer;
