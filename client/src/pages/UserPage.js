import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  fetchAllUsers,
  deleteUser,
  setSuccess,
  setError,
} from "../features/users/userSlice";
import ErrorMessage from "../pages/ErrorMessage";
import SuccessMessage from "../pages/SuccessMessage";
import DeleteButton from "../pages/DeleteButton.js";

function UsersPage({ plusIcon }) {
  const {
    error: userError,
    success: userSuccess,
    users,
    loading,
  } = useSelector((state) => state.user);
  const { error: authError, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleDeletion = (id) => {
    dispatch(deleteUser(id));
  };
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
      <h2 className="text-center mt-5">Users</h2>
      <SuccessMessage message={userSuccess} />
      <ErrorMessage message={userError} />
      <ErrorMessage message={authError} />
      <div className="text-center my-3 mt-5">
        <Link to="/add-user">
          <FontAwesomeIcon icon={plusIcon} className="addUserButton fa-3x" />
        </Link>
      </div>
      <table className="w-75 m-auto  table-bordered">
        <thead>
          <tr>
            <th>username</th>
            <th>email</th>
            <th>created at</th>
            <th>Role</th>
            <th>Permission</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.created_at}</td>
              <td>{Object.keys(user.roles || {}).join(", ")}</td>
              <td>
                {Object.values(user.roles || {})
                  .flat()
                  .join(", ")}
              </td>
              <td>
                <Link to={`/edit-user/${user.id}`}>
                  <button className="btn btn-success">Edit</button>
                </Link>
              </td>
              <td>
                {Object.values(currentUser.roles || {}).some((permissions) =>
                  permissions.includes("delete_users")
                ) && <DeleteButton user={user} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;
