import axios from "axios";
import { Category } from "@/types/content";

const API_URL = "http://127.0.0.1:5001/api"; // your backend base URL

export const categoryApi = {
  async getAll(): Promise<Category[]> {
    const res = await axios.get(`${API_URL}/categories`);
    return res.data;
  },

  async create(data: Omit<Category, "id">): Promise<Category> {
    const res = await axios.post(`${API_URL}/categories`, data);
    return res.data.category;
  },

  async update(id: string, updates: Partial<Category>): Promise<Category> {
    const res = await axios.put(`${API_URL}/categories/${id}`, updates);
    return res.data.category;
  },

  async delete(id: string): Promise<boolean> {
    await axios.delete(`${API_URL}/categories/${id}`);
    return true;
  },
};
