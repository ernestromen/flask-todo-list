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

const initialState = {
  users: [],
  loading: false,
  error: false,
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
      });
  },
});

export const { users, setUsers, setError } = userSlice.actions;
export default userSlice.reducer;
