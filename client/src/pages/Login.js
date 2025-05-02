import React, { useState } from "react";
import useLogIn from "../hooks/useLogIn";
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  // const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading } = useSelector((state) => state.auth);

  const logIn = useLogIn();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = {
      email: email,
      password: password,
    };

   dispatch(logInUser(formData));
  };

  return (
    <div className="content">
      <h2 className="text-center mt-3">Login User</h2>
      {/* {error && (
        <div className="m-auto bg-danger text-light w-25 p-3 text-center my-3">
          Error: {error.message}
        </div>
      )} */}
      <form
        className="p-4 border rounded shadow-sm"
        style={{ maxWidth: "400px", margin: "0 auto" }}
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            value={email}
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            value={password}
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Log in
        </button>
      </form>
    </div>
  );
}

export default Login;
