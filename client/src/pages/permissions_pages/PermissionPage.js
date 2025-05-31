import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  fetchAllUsers,
  deleteUser,
  setSuccess,
  setError,
} from "../../features/users/userSlice";
import ErrorMessage from "../../pages/ErrorMessage";
import SuccessMessage from "../../pages/SuccessMessage";
import DeleteButton from "../../pages/DeleteButton.js";
import { getAllPermissions } from "../../features/permissions/permissionSlice";

function PermissionPage({ plusIcon }) {
  const {
    error: userError,
    success: userSuccess,
    users,
    loading,
  } = useSelector((state) => state.user);
  const { error: authError, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { permissions } = useSelector((state) => state.permission);

  const handleDeletion = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    dispatch(getAllPermissions());
  }, []);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

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
      <h2 className="text-center mt-5">Permissions</h2>
      <SuccessMessage message={userSuccess} />
      <ErrorMessage message={userError} />
      <ErrorMessage message={authError} />
      <div className="text-center my-3 mt-5">
        <Link to="/add-permission">
          <FontAwesomeIcon icon={plusIcon} className="addEntityButton fa-3x" />
        </Link>
      </div>
      <table className="w-75 m-auto  table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.id}>
              <td>{permission.name}</td>
              <td>{permission.description}</td>
              <td>
                <Link to={`/edit-permission/${permission.id}`}>
                  <button className="btn btn-success">Edit</button>
                </Link>
              </td>
              <td>
                <button className="btn btn-danger">Delete </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PermissionPage;
