import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserAPI from "../../api/user";

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

export const addUser = createAsyncThunk(
  "auth/addUser",
  async (formData, { rejectWithValue }) => {
    try {
      let response = await UserAPI.addUser(formData);

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
  user: null,
  loading: null,
  error: null,
  success: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      state.user = action.payload.user;
    },
    setSuccess: (state, action) => {
      state.success = action.payload.message;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.users = action.payload;
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
        state.users = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.success = action.payload.message;
        state.loading = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(checkLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = action.payload.loggedIn;
        state.user = action.payload.user.username;
      })
      .addCase(checkLogin.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { setLoggedIn } = authSlice.actions;
export default authSlice.reducer;
