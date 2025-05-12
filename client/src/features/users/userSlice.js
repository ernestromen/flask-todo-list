import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserAPI from "../../api/user";

export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      let response = await UserAPI.getAllUsers();
      dispatch(setUsers(response.data));

      return response.data;
    } catch (err) {
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

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      let response = await UserAPI.deleteUser(id);
      // dispatch(setLoggedIn(false));
      // return id;
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
  users: [],
  loading: false,
  error: null,
  success: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const deletedId = action.payload.id;
        state.users = state.users.filter((user) => user.id !== deletedId);
        state.success = action.payload.message;
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { users, setUsers, setSuccess } = userSlice.actions;
export default userSlice.reducer;
