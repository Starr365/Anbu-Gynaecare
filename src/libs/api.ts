import axios from "axios";

const api = axios.create({
  baseURL: "http://ec2-13-58-144-49.us-east-2.compute.amazonaws.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
