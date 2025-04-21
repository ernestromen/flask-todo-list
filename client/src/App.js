import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppRoutes from "./routes/ AppRoutes";
import { useHistory } from 'react-router';


function App({ plusIcon }) {
  const [isLoggedIn, setIsLoggedIn] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/check-login', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setIsLoggedIn(data.loggedIn);
      });
  }, []);

  return (
    <div>
      <div className="header" style={{ borderBottom: "10px solid grey" }}>
        <h1>Admin Dashboard</h1>
      </div>

      <div className="sidebar">
        <Link className="active" to="/">Users</Link>
        <Link to="/add-user">signup</Link>
        <Link to="/login">login</Link>
        <Link to="/about">About</Link>
        
      </div>

      <div className="main-content">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
