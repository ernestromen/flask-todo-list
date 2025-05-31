import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/users/userSlice";
import roleReducer from "../features/roles/roleSlice";
import permissionReducer from "../features/permissions/permissionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    role: roleReducer,
    permission: permissionReducer,
  },
});
