import React from "react";
import { Routes, Route } from "react-router-dom";
import UsersPage from "../pages/UserPage";
import EditUser from "../pages/EditUser";
import About from "../pages/About";
import AddUser from "../pages/AddUser";
import Login from "../pages/Login";
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
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/edit-user/:id" element={<EditUser />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default AppRoutes;
