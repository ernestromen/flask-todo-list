import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RoleAPI from "../../api/role";

export const addRole = createAsyncThunk(
  "auth/addRole",
  async (formData, { rejectWithValue }) => {
    try {
      let response = await RoleAPI.addRole(formData);

      return response.data;
    } catch (err) {
      // return rejectWithValue(err.response?.data || err.message);
      return rejectWithValue(
        (err.response && err.response.data) || err.message
      );
    }
  }
);

export const fetchAllRoles = createAsyncThunk(
  "auth/fetchAllRoles",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      let response = await RoleAPI.getAllRoles();
      dispatch(setRoles(response.data));

      return response.data;
    } catch (err) {
      return rejectWithValue(
        (err.response && err.response.data) || err.message
      );
    }
  }
);

export const getRole = createAsyncThunk(
  "auth/getRole",

  async (id, { dispatch, rejectWithValue }) => {
    try {
      let response = await RoleAPI.getRole(id);
      dispatch(setRole(response.data));

      return response.data;
    } catch (err) {
      // return rejectWithValue(err.response?.data || err.message);
      return rejectWithValue(
        (err.response && err.response.data) || err.message
      );
    }
  }
);

export const updateRole = createAsyncThunk(
  "auth/updateRole",
  async (formdata, { dispatch, rejectWithValue }) => {
    try {
      let response = await RoleAPI.updateRole(formdata);
      dispatch(setRole(response.data));

      return response.data;
    } catch (err) {
      return rejectWithValue(
        (err.response && err.response.data) || err.message
      );
    }
  }
);

export const deleteRole = createAsyncThunk(
  "auth/deleteRole",
  async (id, { rejectWithValue }) => {
    try {
      let response = await RoleAPI.deleteRole(id);

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
  role: [],
  roles: [],
  loading: false,
  error: null,
  success: null,
};

const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
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
      .addCase(addRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(addRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRole.fulfilled, (state, action) => {
        state.role = action.payload;
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(getRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        const deletedId = action.payload.id;
        state.roles = state.roles.filter((role) => role.id !== deletedId);
        state.success = action.payload.message;
        state.loading = false;
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { users, setUsers, setRoles, setRole, setSuccess, setError } =
  roleSlice.actions;
export default roleSlice.reducer;
