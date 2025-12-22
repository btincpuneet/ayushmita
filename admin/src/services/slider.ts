import axios from "axios";

const VITE_BASE = (import.meta as any).env?.VITE_BASE_URL;
const BASE_URL = VITE_BASE ? VITE_BASE.replace(/\/$/, "") : "";
const API_URL = `${BASE_URL}/api/promo-sliders`;

export interface PromoSlider {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  discount_text: string;
  code_text: string;
  button_text: string;
  status: string;
  image_base64?: string;
}

export const promoSliderApi = {
  // 🔹 Get all
  async getAll(): Promise<PromoSlider[]> {
    const res = await axios.get(API_URL);
    return res.data.data;
  },

  // 🔹 Get single by ID
  async getById(id: string): Promise<PromoSlider> {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data.data;
  },

  // 🔹 Create with multipart/form-data
  async create(data: FormData): Promise<PromoSlider> {
    const res = await axios.post(API_URL, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
  },

  // 🔹 Update (with or without image)
  async update(id: string, data: FormData): Promise<PromoSlider> {
    const res = await axios.put(`${API_URL}/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
  },

  // 🔹 Delete
  async delete(id: string): Promise<boolean> {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  },
};
