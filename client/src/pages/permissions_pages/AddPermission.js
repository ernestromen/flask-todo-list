import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPermission } from "../../features/permissions/permissionSlice";
import ErrorMessage from "../../pages/ErrorMessage";
import SuccessMessage from "../../pages/SuccessMessage";

function AddPermission() {
  const [permissionName, setPermissionName] = useState("");
  const [description, setDescription] = useState("");
  const { loading } = useSelector((state) => state.user);

  const { error: authError } = useSelector((state) => state.auth);
  const { error, success } = useSelector((state) => state.permission);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = {
      name: permissionName,
      description: description,
    };

    dispatch(addPermission(formData));
    setPermissionName("");
    setDescription("");
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
            Permission name
          </label>
          <input
            value={permissionName}
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Permission name"
            onChange={(e) => setPermissionName(e.target.value)}
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

        <button type="submit" className="btn btn-primary w-100">
          Add Permission
        </button>
      </form>
    </div>
  );
}

export default AddPermission;
