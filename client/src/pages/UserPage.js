import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function UsersPage({ plusIcon }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        setError(error);
        setIsLoaded(true);
      });
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="content">
      <h2 className="text-center mt-3">Users</h2>

      <div className="text-center my-3">
      <Link to="/add-user"><FontAwesomeIcon icon={plusIcon} className="addUserButton fa-3x" /></Link>

        
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
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;
