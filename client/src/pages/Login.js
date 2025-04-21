import React, { useEffect, useState } from "react";
import axios from "axios";

function AddUser() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // console.log("hello?");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(password);
    console.log(email);

    let formData = {
      email: email,
      password: password,
    }

    axios
      .post("http://localhost:5000/login",formData)
      .then((response) => {
        console.log(response);
        // setUsers(response.data);
        // setIsLoaded(true);
      })
      .catch((error) => {
        setError(error);
        setIsLoaded(true);
      });
  };

  if (error) return <div className="m-auto bg-danger text-light  w-50 p-3 text-center">Error: {error.message}</div>;

  return (
    <div className="content">
      <h2 className="text-center mt-3">Login User</h2>
      <form
        className="p-4 border rounded shadow-sm"
        style={{ maxWidth: "400px", margin: "0 auto" }}
        onSubmit={handleSubmit}
      >

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            value={email}
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            value={password}
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Log in
        </button>
      </form>
    </div>
  );
}

export default AddUser;
