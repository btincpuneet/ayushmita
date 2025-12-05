// import axios from "axios";

// const API_URL = "http://127.0.0.1:5001/api"; 

// export const API = {
//   async login(email: string, password: string) {
//     try {
//       const res = await axios.post(`${API_URL}/login`, { email, password });
//       return res.data; // success, token, user
//     } catch (err: any) {
//       return { success: false, message: err.response?.data?.message || "Login failed" };
//     }
//   },
// };
// services/api.ts

import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
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
