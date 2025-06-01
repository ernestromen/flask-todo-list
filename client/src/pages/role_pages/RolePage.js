import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { deleteUser } from "../../features/users/userSlice";
import { fetchAllRoles } from "../../features/roles/roleSlice";
import ErrorMessage from "../../pages/ErrorMessage";
import SuccessMessage from "../../pages/SuccessMessage";
import DeleteButton from "../../pages/DeleteButton.js";

function RolePage({ plusIcon }) {
  const {
    error: userError,
    success: userSuccess,
    roles,
    loading,
  } = useSelector((state) => state.role);
  const { error: authError, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleDeletion = (id) => {
    dispatch(deleteUser(id));
  };
  useEffect(() => {
    dispatch(fetchAllRoles());
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
      <h2 className="text-center mt-5">Roles</h2>
      <SuccessMessage message={userSuccess} />
      <ErrorMessage message={userError} />
      <ErrorMessage message={authError} />
      <div className="text-center my-3 mt-5">
        <Link to="/add-role">
          <FontAwesomeIcon icon={plusIcon} className="addEntityButton fa-3x" />
        </Link>
      </div>
      <table className="w-75 m-auto  table-bordered">
        <thead>
          <tr>
            <th>Role</th>
            <th>Permission</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>
                {role.permissions
                  .map((permission) => permission.name)
                  .join(",")}
              </td>
              <td>
                <Link to={`/edit-role/${role.id}`}>
                  <button className="btn btn-success">Edit</button>
                </Link>
              </td>
              <td>
                {Object.values(currentUser.permissions || {}).some(
                  (permissions) => permissions.includes("delete_users")
                ) && <DeleteButton role={role} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RolePage;
