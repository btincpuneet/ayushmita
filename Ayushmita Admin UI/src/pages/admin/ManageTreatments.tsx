import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import RichTextEditor from "@/components/RichTextEditor";

/* ---------------- CONSTANTS ---------------- */

const BASE_URL = "http://127.0.0.1:5001";
const API_TREATMENT = `${BASE_URL}/api/treatments`;
const API_DISEASE = `${BASE_URL}/api/diseases`;
const API_SINGLE_TREATMENT = `${BASE_URL}/api/treatments/single`;

/* ---------------- HELPERS ---------------- */

// Decode escaped HTML from backend
const decodeHTML = (html: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

/* ---------------- TYPES ---------------- */

const emptyForm = {
  disease_id: null as number | null,
  name: "",
  slug: "",
  short_description: "",
  description_html: "",
  seo_title: "",
  seo_description: "",
  seo_keywords: "",
  canonical_url: "",
  status: "active",
  image: null as File | null,
};

/* ---------------- COMPONENT ---------------- */

const ManageTreatments = () => {
  const [diseases, setDiseases] = useState<any[]>([]);
  const [filteredTreatments, setFilteredTreatments] = useState<any[]>([]);
  const [selectedDiseaseForFilter, setSelectedDiseaseForFilter] =
    useState<number | null>(null);
  const [selectedTreatmentSlug, setSelectedTreatmentSlug] = useState("");
  const [singleTreatment, setSingleTreatment] = useState<any | null>(null);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState<string | null>(null);

  /* ---------------- LOADERS ---------------- */

  useEffect(() => {
    loadDiseases();
  }, []);

  useEffect(() => {
    if (selectedTreatmentSlug) loadSingleTreatment(selectedTreatmentSlug);
  }, [selectedTreatmentSlug]);

  const loadDiseases = async () => {
    try {
      const res = await axios.get(API_DISEASE);
      setDiseases(res.data.data);
    } catch {
      toast.error("Failed to load diseases");
    }
  };

  const loadTreatmentsByDisease = async (id: number) => {
    try {
      const res = await axios.get(`${API_TREATMENT}/disease/${id}`);
      setFilteredTreatments(res.data.treatments);
    } catch {
      toast.error("Failed to load treatments");
    }
  };

  const loadSingleTreatment = async (slug: string) => {
    try {
      const res = await axios.get(`${API_SINGLE_TREATMENT}/${slug}`);
      setSingleTreatment(res.data.treatment);
    } catch {
      toast.error("Failed to load treatment");
    }
  };

  /* ---------------- ACTIONS ---------------- */

  const handleAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setPreview(null);
    setOpen(true);
  };

  const handleEdit = () => {
    if (!singleTreatment) return;

    setEditing(singleTreatment);
    setForm({
      disease_id: singleTreatment.disease_id,
      name: singleTreatment.name,
      slug: singleTreatment.slug,
      short_description: singleTreatment.short_description || "",
      description_html: singleTreatment.description_html || "",
      seo_title: singleTreatment.seo_title || "",
      seo_description: singleTreatment.seo_description || "",
      seo_keywords: singleTreatment.seo_keywords || "",
      canonical_url: singleTreatment.canonical_url || "",
      status: singleTreatment.status === 1 ? "active" : "inactive",
      image: null,
    });

    setPreview(null);
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (!form.disease_id) {
        toast.error("Select a disease");
        return;
      }

      const fd = new FormData();

      Object.entries(form).forEach(([k, v]) => {
        if (v !== null && v !== undefined) {
          fd.append(k, v instanceof File ? v : String(v));
        }
      });

      fd.set("status", form.status === "active" ? "1" : "0");

      if (editing) {
        await axios.put(`${API_TREATMENT}/${editing.id}`, fd);
        toast.success("Treatment updated");
      } else {
        await axios.post(API_TREATMENT, fd);
        toast.success("Treatment created");
      }

      setOpen(false);

      if (selectedDiseaseForFilter) {
        loadTreatmentsByDisease(selectedDiseaseForFilter);
      }
    } catch {
      toast.error("Save failed");
    }
  };

  const handleDelete = async () => {
    if (!singleTreatment) return;
    if (!window.confirm("Delete this treatment?")) return;

    try {
      await axios.delete(`${API_TREATMENT}/${singleTreatment.id}`);
      toast.success("Deleted");
      setSingleTreatment(null);
      setSelectedTreatmentSlug("");
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Treatments</h1>
        <Button onClick={handleAdd}>+ Add Treatment</Button>
      </div>

      {/* FILTER */}
      <div className="bg-white p-4 rounded shadow grid grid-cols-2 gap-4">
        <select
          className="border p-2 rounded"
          value={selectedDiseaseForFilter ?? ""}
          onChange={(e) => {
            const id = Number(e.target.value);
            setSelectedDiseaseForFilter(id || null);
            setSelectedTreatmentSlug("");
            setSingleTreatment(null);
            if (id) loadTreatmentsByDisease(id);
          }}
        >
          <option value="">Select Disease</option>
          {diseases.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {selectedDiseaseForFilter && (
          <select
            className="border p-2 rounded"
            value={selectedTreatmentSlug}
            onChange={(e) => setSelectedTreatmentSlug(e.target.value)}
          >
            <option value="">Select Treatment</option>
            {filteredTreatments.map((t) => (
              <option key={t.id} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* DETAILS VIEW */}
      {singleTreatment && (
        <div className="bg-white p-6 rounded shadow space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">{singleTreatment.name}</h2>
            <div className="flex gap-2">
              <Button onClick={handleEdit}>Edit</Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>

          {singleTreatment.image && (
            <img
              src={`${BASE_URL}${singleTreatment.image}`}
              className="w-64 rounded"
            />
          )}

          {/* FINAL HTML RENDER */}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: decodeHTML(singleTreatment.description_html),
            }}
          />
        </div>
      )}

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Treatment" : "Add Treatment"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <select
              className="border p-2 rounded col-span-2"
              value={form.disease_id ?? ""}
              onChange={(e) =>
                setForm({ ...form, disease_id: Number(e.target.value) })
              }
            >
              <option value="">Select Disease</option>
              {diseases.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            <Input
              placeholder="Treatment Name"
              value={form.name}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  name: e.target.value,
                  slug:
                    p.slug ||
                    e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-"),
                }))
              }
            />

            <Input
              placeholder="Slug"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
            />

            {/* SHORT DESCRIPTION */}
            <div className="col-span-2">
              <RichTextEditor
                label="Short Description"
                value={form.short_description}
                onChange={(val) =>
                  setForm({ ...form, short_description: val })
                }
                placeholder="Enter a brief description..."
              />
            </div>

            {/* FULL DESCRIPTION */}
            <div className="col-span-2">
              <RichTextEditor
                label="Full Description (HTML & CSS supported)"
                value={form.description_html}
                onChange={(val) =>
                  setForm({ ...form, description_html: val })
                }
                placeholder="Enter full treatment description..."
              />
            </div>

            <Input
              placeholder="SEO Title"
              value={form.seo_title}
              onChange={(e) =>
                setForm({ ...form, seo_title: e.target.value })
              }
            />

            <Input
              placeholder="SEO Keywords"
              value={form.seo_keywords}
              onChange={(e) =>
                setForm({ ...form, seo_keywords: e.target.value })
              }
            />

            <Input
              placeholder="SEO Description"
              value={form.seo_description}
              onChange={(e) =>
                setForm({ ...form, seo_description: e.target.value })
              }
            />

            <Input
              placeholder="Canonical URL"
              value={form.canonical_url}
              onChange={(e) =>
                setForm({ ...form, canonical_url: e.target.value })
              }
            />

            <select
              className="border p-2 rounded"
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                setForm({ ...form, image: f });
                setPreview(URL.createObjectURL(f));
              }}
            />

            {(preview || editing?.image) && (
              <img
                src={preview || `${BASE_URL}${editing.image}`}
                className="w-48 rounded"
              />
            )}
          </div>

          <DialogFooter>
            <Button onClick={handleSubmit}>
              {editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageTreatments;
