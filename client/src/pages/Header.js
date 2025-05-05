import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../features/auth/authSlice";

function Header() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logOutUser());
  };

  return (
    <div className="header" style={{ borderBottom: "10px solid grey" }}>
      <h1>Admin Dashboard</h1>
      {user ? <span>hello {user}</span> : <span>nothing to see here</span>}
      {isLoggedIn ? (
        <div>
          <button className="btn btn-success">Logged in</button>
          <form onSubmit={handleSubmit}>
            <button className="btn btn-danger">Log off</button>
          </form>
        </div>
      ) : (
        <button className="btn btn-danger">Logged off</button>
      )}
    </div>
  );
}

export default Header;
