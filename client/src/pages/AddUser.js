import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setSuccess } from "../features/users/userSlice";

function AddUser() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { error, success, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(setSuccess(null));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = {
      username: userName,
      email: email,
      password: password,
    };

    dispatch(addUser(formData));
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
      {success && (
        <div
          className="m-auto bg-success text-light w-25 p-3 text-center"
          style={{ position: "relative", top: "51%" }}
        >
          {success}
        </div>
      )}
      <h2 className="text-center mt-5">Add User</h2>
      <form
        className="p-4 border rounded shadow-sm"
        style={{ maxWidth: "400px", margin: "0 auto" }}
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            value={userName}
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter your username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

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
          Register
        </button>
      </form>
    </div>
  );
}

export default AddUser;
