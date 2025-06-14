import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRole,
  updateRole,
  setSuccess,
} from "../../features/roles/roleSlice";
import { getAllPermissions } from "../../features/permissions/permissionSlice";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../pages/ErrorMessage";
import SuccessMessage from "../../pages/SuccessMessage";
import Select from "react-select";

function EditRole() {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [permissionsList, setPermissionsList] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const { id } = useParams();
  const dispatch = useDispatch();

  const { role, error, success, loading } = useSelector((state) => state.role);
  const { permissions } = useSelector((state) => state.permission);
  const { currentUser } = useSelector((state) => state.auth);

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
    if (currentUser && currentUser.permissions && permissions.length > 0) {
      const allOptions = permissions.map((p) => ({
        label: p.name,
        value: p.name,
      }));

      const selectedPermissionNames = role.permissions.map((p) => p.name);
      const userSelected = allOptions.filter((opt) =>
        selectedPermissionNames.includes(opt.value)
      );

      setPermissionsList(allOptions);
      setSelectedPermissions(userSelected);
    }
  }, [currentUser, permissions]);

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

  return (
    <div className="content mt-5">
      <h2 className="text-center mt-5">Edit Role</h2>
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
          Update
        </button>
      </form>
    </div>
  );
}

export default EditRole;
