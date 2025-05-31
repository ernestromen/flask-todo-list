import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRole,
  updateRole,
  setSuccess,
  setError,
} from "../../features/roles/roleSlice";
import { getAllPermissions } from "../../features/permissions/permissionSlice";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../pages/ErrorMessage";
import SuccessMessage from "../../pages/SuccessMessage";
import Select from "react-select";

function EditPermission() {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [permissionName, setPermission] = useState("");
  const [permissionsList, setPermissionsList] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const { id } = useParams();
  const dispatch = useDispatch();

  const { role, error, success, loading } = useSelector((state) => state.role);
  const { permissions } = useSelector((state) => state.permission);
  useEffect(() => {
    dispatch(getRole(id));
  }, []);

  useEffect(() => {
    setRoleName(role.name);
    setDescription(role.description);
  }, [role]);

  useEffect(() => {
    dispatch(getAllPermissions());
  }, []);

  useEffect(() => {
    if (permissions.length > 0) {
      const mapped = permissions.map((permission) => ({
        label: permission.name,
        value: permission.name,
      }));
      setPermissionsList(mapped);
    }
  }, [permissions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = {
      id,
      name: roleName,
      description: description,
      permissions: selectedPermissions.map((p) => p.value),
    };
    dispatch(updateRole(formData));
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

  let countries = [{ label: "angola", value: "hello afrika" }];
  return (
    <div className="content mt-5">
      <h2 className="text-center mt-5">Edit Permission</h2>
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
          <label htmlFor="rolename" className="form-label">
            role name
          </label>
          <input
            value={roleName}
            type="text"
            className="form-control"
            id="rolename"
            placeholder="Enter your rolename"
            onChange={(e) => setRoleName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            value={description}
            type="description"
            className="form-control"
            id="description"
            placeholder="Enter your description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>

          <Select
            options={permissionsList}
            isMulti
            value={selectedPermissions}
            onChange={setSelectedPermissions}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditPermission;
