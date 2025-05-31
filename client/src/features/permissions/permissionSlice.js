import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PermissionAPI from "../../api/permission";

export const addRole = createAsyncThunk(
  "permission/addPermission",
  async (formData, { rejectWithValue }) => {
    try {
      let response = await PermissionAPI.addPermission(formData);

      return response.data;
    } catch (err) {
      // return rejectWithValue(err.response?.data || err.message);
      return rejectWithValue(
        (err.response && err.response.data) || err.message
      );
    }
  }
);

export const getAllPermissions = createAsyncThunk(
  "permission/getAllPermissions",
  async (_, { rejectWithValue }) => {
    try {
      let response = await PermissionAPI.getAllPermissions();
      return response.data;
    } catch (err) {
      // return rejectWithValue(err.response?.data || err.message);
      return rejectWithValue(
        (err.response && err.response.data) || err.message
      );
    }
  }
);

export const getPermission = createAsyncThunk(
  "permission/getPermission",

  async (id, { dispatch, rejectWithValue }) => {
    try {
      let response = await PermissionAPI.getPermission(id);
      dispatch(setPermission(response.data));

      return response.data;
    } catch (err) {
      // return rejectWithValue(err.response?.data || err.message);
      return rejectWithValue(
        (err.response && err.response.data) || err.message
      );
    }
  }
);

export const updatePermission = createAsyncThunk(
  "auth/updatePermission",
  async (formdata, { dispatch, rejectWithValue }) => {
    try {
      let response = await PermissionAPI.updatePermission(formdata);
      dispatch(setPermission(response.data));

      return response.data;
    } catch (err) {
      return rejectWithValue(
        (err.response && err.response.data) || err.message
      );
    }
  }
);

export const deletePermission = createAsyncThunk(
  "auth/deletePermission",
  async (id, { rejectWithValue }) => {
    try {
      let response = await PermissionAPI.deletePermission(id);

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
  permission: [],
  permissions: [],
  loading: false,
  error: null,
  success: null,
};

const roleSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setPermission: (state, action) => {
      state.permission = action.payload;
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
      .addCase(getAllPermissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPermissions.fulfilled, (state, action) => {
        state.permissions = action.payload;
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(getAllPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePermission.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePermission.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(updatePermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPermission.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPermission.fulfilled, (state, action) => {
        state.role = action.payload;
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(getPermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePermission.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        const deletedId = action.payload.id;
        state.users = state.users.filter((user) => user.id !== deletedId);
        state.success = action.payload.message;
        state.loading = false;
      })
      .addCase(deletePermission.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { users, setUsers, setPermission, setSuccess, setError } =
  roleSlice.actions;
export default roleSlice.reducer;
