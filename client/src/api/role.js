import axios from "axios";

export default {
  addRole(formData) {
    return axios.post("http://localhost:5000/add-role", formData);
  },
  updateRole(formData) {
    return axios.post(`http://localhost:5000/edit-role`, formData, {
      withCredentials: true,
    });
  },
  getRole(id) {
    return axios.get(`http://localhost:5000/edit-role/${id}`);
  },
  deleteRole(id) {
    return axios.post("http://localhost:5000/delete-role", { id });
  },
};
