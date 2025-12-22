import axios from "axios";

const VITE_BASE = (import.meta as any).env?.VITE_BASE_URL;
const BASE_URL = VITE_BASE ? VITE_BASE.replace(/\/$/, "") : "";
const API_TREATMENT = `${BASE_URL}/api/treatments`;


export const getTreatmentsByDisease = async (diseaseId: number | string) => {
  return axios.get(`${API_TREATMENT}/disease/${diseaseId}`);
};

export const getTreatmentBySlug = async (slug: string) => {
  return axios.get(`${API_TREATMENT}/single/${slug}`);
};


export const createTreatment = async (form: FormData) => {
  return axios.post(API_TREATMENT + "/", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};


export const updateTreatment = async (id: number, form: FormData) => {
  return axios.put(`${API_TREATMENT}/${id}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};


export const deleteTreatment = async (id: number) => {
  return axios.delete(`${API_TREATMENT}/${id}`);
};
