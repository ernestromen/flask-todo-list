import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../pages/ErrorMessage";
import SuccessMessage from "../../pages/SuccessMessage";
import Select from "react-select";
import { getAllPermissions } from "../../features/permissions/permissionSlice";
import { addRole } from "../../features/roles/roleSlice";
function AddRole() {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");

  const [permissionsList, setPermissionsList] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const { permissions } = useSelector((state) => state.permission);

  const { error, success, loading } = useSelector((state) => state.role);

  const { error: authError } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = {
      name: roleName,
      description: description,
      permissions: selectedPermissions,
    };

    dispatch(addRole(formData));

    setRoleName("");
    setDescription("");
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

      setPermissionsList(allOptions);
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
            value={roleName}
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Role name"
            onChange={(e) => setRoleName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            value={description}
            className="form-control"
            id="email"
            placeholder="Enter Description"
            onChange={(e) => setDescription(e.target.value)}
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
