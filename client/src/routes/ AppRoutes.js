import React from "react";
import { Routes, Route } from "react-router-dom";
import UsersPage from "../pages/UserPage";
import About from "../pages/About";
import AddUser from "../pages/AddUser";
import Login from "../pages/Login";
import { Navigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";

function AppRoutes() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<UsersPage plusIcon={faPlus} />} />
      <Route path="/login" element={isLoggedIn ? (<Navigate to="/" replace />): (<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>)} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default AppRoutes;
