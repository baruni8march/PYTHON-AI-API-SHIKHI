import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  timeout: 60000,
});

export default apiClient;