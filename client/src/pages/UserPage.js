import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { fetchAllUsers, deleteUser,setSuccess } from "../features/users/userSlice";

function UsersPage({ plusIcon }) {
  const { users, loading, error,success } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(setSuccess(null));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [success,dispatch]);

  const handleDeletion = (id) => {
    dispatch(deleteUser(id));
  };
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  if (error) return <div className="text-center">Error: {error}</div>;

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
      {success && (
        <div
          className="m-auto bg-success text-light w-25 p-3 text-center"
          style={{ position: "relative", top: "51%" }}
        >
          {success}
        </div>
      )}
      <div className="text-center my-3 mt-5">
        <Link to="/add-user">
          <FontAwesomeIcon icon={plusIcon} className="addUserButton fa-3x" />
        </Link>
      </div>
      <table className="w-50 m-auto  table-bordered">
        <thead>
          <tr>
            <th>username</th>
            <th>email</th>
            <th>created at</th>
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
              <td>
                <button className="btn btn-success">Edit</button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeletion(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;
