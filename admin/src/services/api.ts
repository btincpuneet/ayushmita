import axios from "axios";
import { Category } from "@/types/content";
import { API_BASE } from "../config/api";
import { authHeader } from "../utils/auth";

const API_URL = `${API_BASE}/api`;


export const categoryApi = {
  async getAll(): Promise<Category[]> {
    const res = await axios.get(`${API_URL}/categories`);
    return res.data; 
  },

  async create(data: Omit<Category, "id">): Promise<Category> {
    const res = await axios.post(`${API_URL}/categories`, data, {
      headers: authHeader(),
    });
    return res.data.data;
  },

  async update(
    id: string | number,
    updates: Partial<Category>
  ): Promise<Category> {
    const res = await axios.put(`${API_URL}/categories/${id}`, updates, {
      headers: authHeader(),
    });
    return res.data.data;
  },

  async delete(id: string | number): Promise<boolean> {
    await axios.delete(`${API_URL}/categories/${id}`, {
      headers: authHeader(),
    });
    return true;
  },
};
