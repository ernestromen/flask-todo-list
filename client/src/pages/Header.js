import React from "react";
import { useAuth } from "../context/AuthContext";
import useLogOut from "../hooks/useLogOut";


function Header() {
  const { isLoggedIn } = useAuth();
  const logOut = useLogOut();

  const handleSubmit = (e) => {
    e.preventDefault();
    logOut()
  };

  return (
    <div className="header" style={{ borderBottom: "10px solid grey" }}>
      <h1>Admin Dashboard</h1>
      {isLoggedIn ? (
        <div>
          <button className="btn btn-success">Logged in</button>
          <form onSubmit={handleSubmit}>
            <button className="btn btn-danger">Log off</button>
          </form>
        </div>
      ) : (
        <button className="btn btn-danger">Logged off</button>
      )}{" "}
    </div>
  );
}

export default Header;
