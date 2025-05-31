import React from "react";
import { Routes, Route } from "react-router-dom";

import AddUser from "../pages/user_pages/AddUser";
import UsersPage from "../pages/user_pages/UserPage";
import EditUser from "../pages/user_pages/EditUser";

import AddRole from "../pages/role_pages/AddRole";
import RolePage from "../pages/role_pages/RolePage";
import EditRole from "../pages/role_pages/EditRole";

import PermissionPage from "../pages/permissions_pages/PermissionPage";
import AddPermission from "../pages/permissions_pages/AddPermission";
import EditPermission from "../pages/permissions_pages/EditPermission";

import About from "../pages/About";

import Login from "../pages/user_pages/Login";
import { Navigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function AppRoutes() {
  // const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <UsersPage plusIcon={faPlus} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/roles"
        element={
          isLoggedIn ? (
            <RolePage plusIcon={faPlus} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/permissions"
        element={
          isLoggedIn ? (
            <PermissionPage plusIcon={faPlus} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route path="/add-user" element={<AddUser />} />
      <Route path="/add-role" element={<AddRole />} />
      <Route path="/add-permission" element={<AddPermission />} />
      <Route path="/edit-permission/:id" element={<EditPermission />} />

      <Route path="/edit-user/:id" element={<EditUser />} />
      <Route path="/edit-role/:id" element={<EditRole />} />

      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default AppRoutes;
