import axios from "axios";

export default {
  getAllPermissions() {
    return axios.get("http://localhost:5000/permissions");
  },
  addPermission(formData) {
    return axios.post("http://localhost:5000/add-permission", formData);
  },
  updatePermission(formData) {
    return axios.post(`http://localhost:5000/edit-permission`, formData, {
      withCredentials: true,
    });
  },
  getPermission(id) {
    return axios.get(`http://localhost:5000/edit-permission/${id}`);
  },
  deletePermission(id) {
    return axios.delete("http://localhost:5000/delete-permission", {
      headers: { "Content-Type": "application/json" },
      data: { id },
    });
  },
};
