import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../pages/ErrorMessage";
import SuccessMessage from "../../pages/SuccessMessage";
import Select from "react-select";
import {
  getRole,
  updateRole,
  setSuccess,
  setError,
} from "../../features/roles/roleSlice";
import { getAllPermissions } from "../../features/permissions/permissionSlice";

function AddRole() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [permissionsList, setPermissionsList] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const { currentUser } = useSelector((state) => state.auth);
  const { permissions } = useSelector((state) => state.permission);

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

    setUserName("");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    dispatch(getAllPermissions());
  }, []);

  useEffect(() => {
    if (permissions && permissions.length > 0) {
      const allOptions = permissions.map((p) => ({
        label: p.name,
        value: p.name,
      }));

      setPermissionsList(allOptions); // full list
    }
  }, [permissions]);

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
      {console.log("Permissions:", permissions)}
      <h2 className="text-center mt-5">Add Role</h2>
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
        <div className="mb-3">
          <label htmlFor="permissions" className="form-label">
            Permissions
          </label>

          <Select
            options={permissionsList}
            isMulti
            value={selectedPermissions}
            onChange={setSelectedPermissions}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add Role
        </button>
      </form>
    </div>
  );
}

export default AddRole;
