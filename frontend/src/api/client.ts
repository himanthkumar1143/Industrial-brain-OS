import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach Authorization header from localStorage or sessionStorage
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers["Authorization"] = `Bearer ${token}`;
  } else if (config.headers && config.headers["Authorization"]) {
    delete config.headers["Authorization"];
    delete client.defaults.headers.common["Authorization"];
  }
  return config;
}, (error) => Promise.reject(error));

// Response interceptor to handle automatic logout on session expiration (HTTP 401)
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (token) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        delete client.defaults.headers.common["Authorization"];
        window.dispatchEvent(new Event("auth:logout"));
      }
    }
    return Promise.reject(error);
  }
);

export default client;
