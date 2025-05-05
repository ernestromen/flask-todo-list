import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserAPI from "../../api/user";
import axios from "axios";

export const logInUser = createAsyncThunk(
  "auth/logInUser",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      let response = await UserAPI.login(formData);

      dispatch(setLoggedIn({ isLoggedIn: true, user: response.data.username }));

      return response.data;
    } catch (err) {
      // return rejectWithValue(err.response?.data || err.message);
      return rejectWithValue(
        (err.response && err.response.data) || err.message
      );
    }
  }
);

export const logOutUser = createAsyncThunk(
  "auth/logOutUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      let response = await UserAPI.logOut();

      dispatch(setLoggedIn(false));

      return response.data;
    } catch (err) {
      // return rejectWithValue(err.response?.data || err.message);
      return rejectWithValue(
        (err.response && err.response.data) || err.message
      );
    }
  }
);

const initialState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInUser.pending, (state) => {
        state.loading = true;
        console.log("pending");
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        console.log("fulfilled");
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("rejected");
      })
      .addCase(logOutUser.pending, (state) => {
        state.loading = true;
        console.log("pending");
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        console.log("fulfilled");
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("rejected");
      });
  },
});

export const { setLoggedIn, setError } = authSlice.actions;
export default authSlice.reducer;
