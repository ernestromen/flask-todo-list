import React from "react";
import { Routes, Route } from "react-router-dom";
import UsersPage from "../pages/UserPage";
import About from "../pages/About";
import AddUser from "../pages/AddUser";
import Login from "../pages/Login";
import { Navigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

function AppRoutes() {
  // const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<UsersPage plusIcon={faPlus} />} />
      <Route path="/login" element={isLoggedIn ? (<Navigate to="/" replace />): (<Login/>)} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default AppRoutes;
