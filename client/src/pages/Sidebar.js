import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link className="active" to="/">
        Users
      </Link>
      <Link to="/roles">Roles</Link>
      <Link to="/permissions">Permissions</Link>
      <Link to="/login">Login</Link>
      <Link to="/add-user">Add User</Link>
      <Link to="/about">About</Link>
    </div>
  );
}

export default Sidebar;
