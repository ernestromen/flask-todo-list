import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../features/auth/authSlice";
import {
  faSignInAlt,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Header() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logOutUser());
  };

  return (
    <div className="outercontainer border-bottom border-dark">
      <header className="header" style={{ borderBottom: "10px solid grey" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 col-sm-3 col-12 order-md-1 order-sm-3 order-1 logo_section text-center mb-2"></div>

            <div className="col-xl-8 col-md-7 col-sm-4 col-6 order-md-2 order-sm-1 order-2 ">
              <h1 className="text-center">Admin Dashboard</h1>
            </div>

            <div className="col-xl-2 col-md-3 col-sm-5 col-6 pt-3 order-md-3 order-sm-2 order-3">
              <div className="row">
                <div className="col-6">
                  {user ? (
                    <FontAwesomeIcon
                      className="cursor-pointer"
                      icon={faUser}
                      title={user.username}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="cursor-pointer"
                      icon={faUser}
                      title="User"
                    />
                  )}
                </div>
                <div className="col-6">
                  {isLoggedIn ? (
                    <div className="row">
                      <div className="col-6"></div>
                      <div className="col-6">
                        <form onSubmit={handleSubmit}>
                          <button className="btn btn-danger">
                            <FontAwesomeIcon
                              icon={faSignOutAlt}
                              title="Logout"
                            />
                          </button>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <div className="row">
                      <div className="col-6">
                        <Link to="/login" className="btn btn-success">
                          <FontAwesomeIcon icon={faSignInAlt} title="Login" />
                        </Link>
                      </div>
                      <div className="col-6"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
