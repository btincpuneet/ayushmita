import axios from "axios";
import { API_BASE } from "../config/api";

const API_BUTTON = `${API_BASE}/api/button`;

export const buttonAppointmentApi = {
  getAll: async () => {
    const res = await axios.get(API_BUTTON);
    return res.data.data;
  },

  getOne: async (id: number) => {
    const res = await axios.get(`${API_BUTTON}/${id}`);
    return res.data.data;
  },

  create: async (data: any) => {
    const res = await axios.post(API_BUTTON, data);
    return res.data.data;
  },

  update: async (id: number, data: any) => {
    const res = await axios.put(`${API_BUTTON}/${id}`, data);
    return res.data.data;
  },

  delete: async (id: number) => {
    const res = await axios.delete(`${API_BUTTON}/${id}`);
    return res.data;
  },
};
