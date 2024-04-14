// src/services/UserService.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getUsers() {
    return apiClient.get("/users");
  },
  createUser(user) {
    return apiClient.post("/users", user);
  },
  updateUser(id, user) {
    return apiClient.put(`/users/${id}`, user);
  },
  deleteUser(id) {
    return apiClient.delete(`/users/${id}`);
  },
  loginUser(credentials) {
    return apiClient.post("/users/login", credentials);
  },
  isLoggedIn() {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    }
    return false;
  },
};
