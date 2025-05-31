import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setSuccess, setError } from "../../features/users/userSlice";
import ErrorMessage from "../../pages/ErrorMessage";
import SuccessMessage from "../../pages/SuccessMessage";

function AddPermission() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { error, success, loading } = useSelector((state) => state.user);

  const { error: authError } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = {
      username: userName,
      email: email,
      password: password,
    };

    dispatch(addUser(formData));
    setUserName("");
    setEmail("");
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
      <h2 className="text-center mt-5">Add Permission</h2>
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
            id="name"
            placeholder="Enter Role name"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            value={email}
            className="form-control"
            id="email"
            placeholder="Enter Description"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Add Role
        </button>
      </form>
    </div>
  );
}

export default AddPermission;
