import axios from "axios";

export const api = axios.create({
  baseURL: ((import.meta as any).env?.VITE_BASE_URL || "").replace(/\/$/, "") + "/api",
});

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
