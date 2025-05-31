import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  updateUser,
  setSuccess,
  setError,
} from "../../features/users/userSlice";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../pages/ErrorMessage";
import SuccessMessage from "../../pages/SuccessMessage";

function EditUser() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();

  const { user, error, success, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser(id));
  }, []);

  useEffect(() => {
    setUserName(user.username);
    setEmail(user.email);
    setPassword(user.password);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = {
      id,
      username: userName,
      email: email,
      password: password,
    };
    dispatch(updateUser(formData));
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
      <h2 className="text-center mt-5">Edit User</h2>

      <SuccessMessage
        message={success}
        clearSuccess={() => dispatch(setSuccess(null))}
      />
      <ErrorMessage message={error} />
      <form
        className="p-4 border rounded shadow-sm mt-3"
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
            className="form-control"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditUser;
