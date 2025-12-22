import axios from "axios";

const VITE_BASE = (import.meta as any).env?.VITE_BASE_URL;
const BASE_URL = VITE_BASE ? VITE_BASE.replace(/\/$/, "") : "";
const API_URL = `${BASE_URL}/api/hero-banners`;

export const heroBannerApi = {
  getAll: async () => {
    const res = await axios.get(`${API_URL}?all=true`);
    return res.data.data;

  },


  create: async (formData) => {
    const res = await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
  },

  update: async (id, formData) => {
    const res = await axios.put(`${API_URL}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
  },

  delete: async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  },
};
