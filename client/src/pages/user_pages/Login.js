import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInUser, setError } from "../../features/auth/authSlice";
import ErrorMessage from "../../pages/ErrorMessage";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const { error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(setError(null));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = {
      email: email,
      password: password,
    };

    dispatch(logInUser(formData));
  };

  if (loading)
    return (
      <div
        className="text-center"
        style={{ fontSize: "30px", textAlign: "center" }}
      >
        Loading...
      </div>
    );
  return (
    <div className="content mt-5">
      <h2 className="text-center mt-5">Login User</h2>
      <ErrorMessage message={error} />
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
