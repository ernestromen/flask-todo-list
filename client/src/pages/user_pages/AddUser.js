import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setSuccess, setError } from "../../features/users/userSlice";
import ErrorMessage from "../../pages/ErrorMessage";
import SuccessMessage from "../../pages/SuccessMessage";

function AddUser() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { error, success, loading } = useSelector((state) => state.user);

  const { error: authError } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = {
      username: userName,
      email: email,
      role: role,
      password: password,
    };

    dispatch(addUser(formData));
    setUserName("");
    setEmail("");
    setRole("");
    setPassword("");
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
      <h2 className="text-center mt-5">Add User</h2>
      <SuccessMessage message={success} />
      <ErrorMessage message={error} />
      <ErrorMessage message={authError} />
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
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            id="role"
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
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
