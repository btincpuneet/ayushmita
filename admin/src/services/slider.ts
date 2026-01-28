// import axios from "axios";
// import { API_BASE } from "../config/api";

// const API_URL = `${API_BASE}/api/promo-sliders`;

// export interface PromoSlider {
//   id: string;
//   title: string;
//   subtitle: string;
//   description: string;
//   discount_text: string;
//   code_text: string;
//   button_text: string;
//   status: string;
//   image_base64?: string;
// }

// export const promoSliderApi = {
//   async getAll(): Promise<PromoSlider[]> {
//     const res = await axios.get(API_URL);
//     return res.data.data;
//   },

//   async getById(id: string): Promise<PromoSlider> {
//     const res = await axios.get(`${API_URL}/${id}`);
//     return res.data.data;
//   },

//   async create(data: FormData): Promise<PromoSlider> {
//     const res = await axios.post(API_URL, data, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return res.data.data;
//   },

//   async update(id: string, data: FormData): Promise<PromoSlider> {
//     const res = await axios.put(`${API_URL}/${id}`, data, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return res.data.data;
//   },

//   async delete(id: string): Promise<boolean> {
//     await axios.delete(`${API_URL}/${id}`);
//     return true;
//   },
// };
