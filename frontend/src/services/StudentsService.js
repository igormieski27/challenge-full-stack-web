// src/services/StudentService.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  getStudents() {
    return apiClient.get("/students");
  },
  createStudent(student) {
    return apiClient.post("/students", student);
  },
  updateStudent(id, student) {
    return apiClient.put(`/students/${id}`, student);
  },
  deleteStudent(id) {
    return apiClient.delete(`/students/${id}`);
  },
};
