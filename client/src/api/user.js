import axios from "axios";

export default {
    login(payload) {
      return axios.post("http://localhost:5000/login",payload,{ withCredentials: true });
    },
  };