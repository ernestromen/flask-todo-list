import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSuccess,getAllPermissions,getPermission,updatePermission } from "../../features/permissions/permissionSlice";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../pages/ErrorMessage";
import SuccessMessage from "../../pages/SuccessMessage";

function EditPermission() {
  const [description, setDescription] = useState("");
  const [permissionName, setPermissionName] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();

  const { role, error, success, loading } = useSelector((state) => state.role);
  const { permission,permissions } = useSelector((state) => state.permission);

  useEffect(() => {
    dispatch(getPermission(id));
  }, []);

  useEffect(() => {
    setPermissionName(permission.name);
    setDescription(permission.description);
  }, [permission]);

  useEffect(() => {
    dispatch(getAllPermissions());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = {
      id,
      name: permissionName,
      description: description,
    };
    dispatch(updatePermission(formData));
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
          <label htmlFor="permissionname" className="form-label">
            role name
          </label>
          <input
            value={permissionName}
            type="text"
            className="form-control"
            id="rolename"
            placeholder="Enter your permission name"
            onChange={(e) => setPermissionName(e.target.value)}
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
        <button type="submit" className="btn btn-primary w-100">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditPermission;
