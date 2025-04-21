import React from "react";
import { Routes, Route } from "react-router-dom";
import UsersPage from "../pages/UserPage";
import About from "../pages/About";
import AddUser from "../pages/AddUser";
import Login from "../pages/Login";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UsersPage plusIcon={faPlus} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default AppRoutes;
