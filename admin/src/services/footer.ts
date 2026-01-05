import axios from "axios";
import { API_BASE } from "../config/api";
export const footerService = {
  getAll: () => {
    return axios.get(`${API_BASE}/api/footer`);
  },

  getActive: () => {
    return axios.get(`${API_BASE}/api/footer/active`);
  },

  getById: (id: number) => {
    return axios.get(`${API_BASE}/api/footer/${id}`);
  },

  create: (data: {
    title: string;
    content_html: string;
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
    status: string;
  }) => {
    return axios.post(`${API_BASE}/api/footer`, data);
  },

  update: (
    id: number,
    data: {
      title: string;
      content_html: string;
      seo_title: string;
      seo_description: string;
      seo_keywords: string;
      status: string;
    }
  ) => {
    return axios.put(`${API_BASE}/api/footer/${id}`, data);
  },

  remove: (id: number) => {
    return axios.delete(`${API_BASE}/api/footer/${id}`);
  },
};
