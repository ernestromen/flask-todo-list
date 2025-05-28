import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserAPI from "../../api/user";

export const logInUser = createAsyncThunk(
  "auth/logInUser",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      let response = await UserAPI.login(formData);

      dispatch(setLoggedIn({ isLoggedIn: true, currentUser: response.data }));

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

export const checkLogin = createAsyncThunk(
  "auth/checkLogin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserAPI.checkLogin();
      return response.data;
    } catch (err) {
      return rejectWithValue(
        (err.response && err.response.data) || err.message
      );
    }
  }
);

const initialState = {
  isLoggedIn: false,
  currentUser: null,
  loading: null,
  error: null,
  success: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.currentUser = action.payload.user;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logOutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.currentUser = null;
        state.users = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = action.payload.loggedIn;
        state.currentUser = action.payload.user;
      })
      .addCase(checkLogin.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.currentUser = null;
        state.error = action.payload;
      });
  },
});

export const { setLoggedIn, setError } = authSlice.actions;
export default authSlice.reducer;
