import axios from "axios";
import { API_BASE } from "../config/api";

export const api = axios.create({
  baseURL: `${API_BASE}/api`,
});

// Add token automatically
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("admin_dashboard_auth");
  if (stored) {
    const { token } = JSON.parse(stored);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
