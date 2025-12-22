import axios from "axios";

const VITE_BASE = (import.meta as any).env?.VITE_BASE_URL;
const BASE_URL = VITE_BASE ? VITE_BASE.replace(/\/$/, "") : "";
const API_DISEASE = `${BASE_URL}/api/diseases`;

export const getDiseases = async () => {
  return axios.get(API_DISEASE);
};

export const createDisease = async (data: FormData) => {
  return axios.post(API_DISEASE, data);
};


export const updateDisease = async (id: number, data: FormData) => {
  return axios.put(`${API_DISEASE}/${id}`, data);
};


export const deleteDisease = async (id: number) => {
  return axios.delete(`${API_DISEASE}/${id}`);
};
