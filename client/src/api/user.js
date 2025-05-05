import axios from "axios";

export default {
  login(payload) {
    return axios.post("http://localhost:5000/login", payload, {
      withCredentials: true,
    });
  },
  logOut() {
    return axios.post(
      "http://localhost:5000/logout",
      {},
      {
        withCredentials: true,
      }
    );
  },
  getAllUsers() {
    return axios.get("http://localhost:5000/users");
  },
};
