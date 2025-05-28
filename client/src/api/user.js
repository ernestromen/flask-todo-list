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
  addUser(formData) {
    return axios.post("http://localhost:5000/add-user", formData);
  },
  updateUser(formData) {
    return axios.post(`http://localhost:5000/edit-user`, formData, {
      withCredentials: true,
    });
  },
  getUser(id) {
    return axios.get(`http://localhost:5000/edit-user/${id}`);
  },
  deleteUser(id) {
    return axios.post("http://localhost:5000/delete-user", { id });
  },
  getAllUsers() {
    return axios.get("http://localhost:5000/users");
  },
  checkLogin() {
    return axios.get("http://localhost:5000/check-login", {
      withCredentials: true,
    });
  },
};
