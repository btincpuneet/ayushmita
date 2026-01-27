// src/services/treatment.ts
import axios from "axios";
import { API_BASE } from "../config/api";

const API_TREATMENT = `${API_BASE}/api/treatments`;

// =========================
// GET All Treatments of a Disease
// =========================
export const getTreatmentsByDisease = async (diseaseId: number | string) => {
  return axios.get(`${API_TREATMENT}/disease/${diseaseId}`);
};

// =========================
// GET Treatment By Slug
// =========================
export const getTreatmentBySlug = async (slug: string) => {
  return axios.get(`${API_TREATMENT}/single/${slug}`);
};

// =========================
// CREATE Treatment (FormData)
// =========================
export const createTreatment = async (form: FormData) => {
  return axios.post(API_TREATMENT + "/", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// =========================
// UPDATE Treatment (FormData)
// =========================
export const updateTreatment = async (id: number, form: FormData) => {
  return axios.put(`${API_TREATMENT}/${id}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// =========================
// DELETE Treatment
// =========================
export const deleteTreatment = async (id: number) => {
  return axios.delete(`${API_TREATMENT}/${id}`);
};
