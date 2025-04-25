import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useCheckLogin from "../hooks/useCheckLogin";

function Sidebar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  useCheckLogin(isLoggedIn, setIsLoggedIn);

  return (
    <div className="sidebar">
      <Link className="active" to="/">
        Home
      </Link>
      <Link to="/login">Login</Link>
      <Link to="/add-user">Add User</Link>

      <Link to="/about">About</Link>
      {isLoggedIn ? (
        <button className="btn btn-success">Logged in</button>
      ) : (
        <button className="btn btn-danger">Logged off</button>
      )}
    </div>
  );
}

export default Sidebar;
