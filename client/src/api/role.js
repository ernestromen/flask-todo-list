import axios from "axios";

export default {
  addRole(formData) {
    return axios.post("http://localhost:5000/add-role", formData);
  },
  getAllRoles() {
    return axios.get("http://localhost:5000/roles");
  },
  updateRole(formData) {
    return axios.put(`http://localhost:5000/edit-role`, formData, {
      withCredentials: true,
    });
  },
  getRole(id) {
    return axios.get(`http://localhost:5000/edit-role/${id}`);
  },
  deleteRole(id) {
    return axios.delete("http://localhost:5000/delete-role", {
      headers: { "Content-Type": "application/json" },
      data: { id },
    });
  },
};
