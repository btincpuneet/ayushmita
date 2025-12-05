// src/services/banner.ts
import axios from "axios";

const API_URL = "http://127.0.0.1:5001/api/hero-banners";

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
