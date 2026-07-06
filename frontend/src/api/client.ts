import axios from "axios";
import { DEFAULT_API_CONFIG } from "../constants/api";
import { normalizeApiError } from "./errors";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  timeout: DEFAULT_API_CONFIG.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach Authorization header and X-Request-ID
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers["Authorization"] = `Bearer ${token}`;
  } else if (config.headers && config.headers["Authorization"]) {
    delete config.headers["Authorization"];
    delete client.defaults.headers.common["Authorization"];
  }

  // Attach unique X-Request-ID for distributed tracing & observability
  config.headers = config.headers ?? {};
  if (!config.headers["X-Request-ID"]) {
    const requestId =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `req-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    config.headers["X-Request-ID"] = requestId;
  }

  return config;
}, (error) => Promise.reject(error));

// Response interceptor to handle automatic logout on HTTP 401 and error normalization
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
    return Promise.reject(normalizeApiError(error));
  }
);

export default client;
