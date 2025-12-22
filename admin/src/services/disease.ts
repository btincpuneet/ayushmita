// src/services/disease.ts
import axios from "axios";

const API_DISEASE = "http://127.0.0.1:5001/api/diseases";

// Get all diseases
export const getDiseases = async () => {
  return axios.get(API_DISEASE);
};

// Create disease
export const createDisease = async (data: FormData) => {
  return axios.post(API_DISEASE, data);
};

// Update disease
export const updateDisease = async (id: number, data: FormData) => {
  return axios.put(`${API_DISEASE}/${id}`, data);
};

// Delete disease
export const deleteDisease = async (id: number) => {
  return axios.delete(`${API_DISEASE}/${id}`);
};
