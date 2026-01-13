import axios from "axios";
import { API_BASE } from "../config/api";
import { authHeader } from "../utils/auth";
const API_ABOUT = `${API_BASE}/api/contact-us`;

export const aboutUsService = {
  getAll: async () => {
    const res = await axios.get(API_ABOUT);
    return res.data;
  },

  getById: async (id: number) => {
    const res = await axios.get(`${API_ABOUT}/${id}`);
    return res.data;
  },

  create: async (data: {
    title: string;
    content_html: string;
    status: string;
  }) => {
    const res = await axios.post(API_ABOUT, data, {
      headers: authHeader(),
    });
    return res.data;
  },

  update: async (
    id: number,
    data: {
      title: string;
      content_html: string;
      status: string;
    }
  ) => {
    const res = await axios.put(`${API_ABOUT}/${id}`, data, {
      headers: authHeader(),
    });
    return res.data;
  },

  remove: async (id: number) => {
    const res = await axios.delete(`${API_ABOUT}/${id}`, {
      headers: authHeader(),
    });
    return res.data;
  },
};
