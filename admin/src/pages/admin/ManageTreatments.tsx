import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../../config/api";
import { authHeader } from "@/utils/auth";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Plus,
  Edit3,
  Trash2,
  FileText,
  Search,
  ChevronRight,
  Stethoscope,
  Image as ImageIcon
} from "lucide-react";

import RichTextEditor from "@/components/RichTextEditor";

const BASE_URL = API_BASE;
const API_TREATMENT = `${API_BASE}/api/treatments`;
const API_DISEASE = `${API_BASE}/api/diseases`;
const API_SINGLE_TREATMENT = `${API_BASE}/api/treatments/single`;

const decodeHTML = (html: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

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
  image_alt: "",
  image_title: "",
};


const ManageTreatments = () => {
  const [diseases, setDiseases] = useState<any[]>([]);
  const [filteredTreatments, setFilteredTreatments] = useState<any[]>([]);
  const [selectedDiseaseForFilter, setSelectedDiseaseForFilter] =
    useState<number | null>(null);
  const [selectedTreatmentSlug, setSelectedTreatmentSlug] = useState("");
  const [singleTreatment, setSingleTreatment] = useState<any | null>(null);
  const fileRef = React.useRef<HTMLInputElement | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState<string | null>(null);


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


  const handleAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setPreview(null);
    setOpen(true);
  };

  const handleEdit = () => {
    if (!singleTreatment) {
      toast.error("Please select a treatment to edit");
      return;
    }

    if (!singleTreatment.disease_id) {
      toast.error("This treatment is not linked to any disease");
      return;
    }

    if (!singleTreatment.name) {
      toast.error("Treatment name is missing");
      return;
    }

    if (!singleTreatment.slug) {
      toast.error("Treatment slug is missing");
      return;
    }

    setEditing(singleTreatment);

    setForm({
      disease_id: singleTreatment.disease_id ?? null,
      name: singleTreatment.name ?? "",
      slug: singleTreatment.slug ?? "",
      short_description: singleTreatment.short_description ?? "",
      description_html: singleTreatment.description_html ?? "",
      seo_title: singleTreatment.seo_title ?? "",
      seo_description: singleTreatment.seo_description ?? "",
      seo_keywords: singleTreatment.seo_keywords ?? "",
      canonical_url: singleTreatment.canonical_url ?? "",
      status: singleTreatment.status === 1 ? "active" : "inactive",
      image: null,
      image_alt:
        singleTreatment.image_alt && singleTreatment.image_alt !== "null"
          ? singleTreatment.image_alt
          : "",

      image_title:
        singleTreatment.image_title && singleTreatment.image_title !== "null"
          ? singleTreatment.image_title
          : "",
    });
    setExistingImage(
      singleTreatment.image ? `${API_BASE}${singleTreatment.image}` : null
    );

    setPreview(null);
    setOpen(true);
  };


  const handleSubmit = async () => {
    try {

      if (!form.disease_id) {
        toast.error("Please select a disease");
        return;
      }

      if (!form.name.trim()) {
        toast.error("Treatment name is required");
        return;
      }

      if (!form.slug.trim()) {
        toast.error("Slug is required");
        return;
      }

      if (!form.short_description) {
        toast.error("Short description is required");
        return;
      }

      if (!form.description_html) {
        toast.error("Full description is required");
        return;
      }

      if (!form.seo_title.trim()) {
        toast.error("SEO title is required");
        return;
      }

      if (!form.seo_description.trim()) {
        toast.error("SEO description is required");
        return;
      }

      if (!form.seo_keywords.trim()) {
        toast.error("SEO keywords are required");
        return;
      }

      if (!form.canonical_url.trim()) {
        toast.error("Canonical URL is required");
        return;
      }


      const fd = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          fd.append(key, value instanceof File ? value : String(value));
        }
      });

      fd.set("status", form.status === "active" ? "1" : "0");

      const config = {
        headers: {
          ...authHeader(),
          "Content-Type": "multipart/form-data",
        },
      };


      if (editing) {
        await axios.put(`${API_TREATMENT}/${editing.id}`, fd, config);
        toast.success("Treatment updated successfully");
      } else {
        await axios.post(API_TREATMENT, fd, config);
        toast.success("Treatment created successfully");
      }

      setOpen(false);

      if (selectedDiseaseForFilter) {
        loadTreatmentsByDisease(selectedDiseaseForFilter);
      }
    } catch (error: any) {

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      toast.error(message);
    }
  };


  const handleDelete = async () => {
    if (!singleTreatment) return;
    if (!window.confirm("Delete this treatment?")) return;

    try {
      await axios.delete(`${API_TREATMENT}/${singleTreatment.id}`, {
        headers: authHeader(),
      });
      toast.success("Deleted");
      setSingleTreatment(null);
      setSelectedTreatmentSlug("");
    } catch {
      toast.error("Delete failed");
    }
  };


  return (
    <div className="min-h-screen bg-background">

      <header className="sticky top-0 z-40 bg-card border-b shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Manage Treatments</h1>
                <p className="text-xs text-muted-foreground">CMS Content Management</p>
              </div>
            </div>
            <Button onClick={handleAdd} className="gap-2 shadow-card">
              <Plus className="w-4 h-4" />
              Add Treatment
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-6">

        <div className="bg-card rounded-xl shadow-card border p-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">Filter Treatments</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Select Disease</Label>
              <select
                className="w-full h-10 px-3 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={selectedDiseaseForFilter ?? ""}
                onChange={(e) => {
                  const id = Number(e.target.value);
                  setSelectedDiseaseForFilter(id || null);
                  setSelectedTreatmentSlug("");
                  setSingleTreatment(null);
                  if (id) loadTreatmentsByDisease(id);
                }}
              >
                <option value="">Choose a disease...</option>
                {diseases.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedDiseaseForFilter && (
              <div className="space-y-2 animate-slide-in">
                <Label className="text-xs font-medium text-muted-foreground">Select Treatment</Label>
                <select
                  className="w-full h-10 px-3 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={selectedTreatmentSlug}
                  onChange={(e) => setSelectedTreatmentSlug(e.target.value)}
                >
                  <option value="">Choose a treatment...</option>
                  {filteredTreatments.map((t) => (
                    <option key={t.id} value={t.slug}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {singleTreatment && (
          <div className="bg-card rounded-xl shadow-card border overflow-hidden animate-fade-in">
            <div className="bg-gradient-to-r from-primary/5 to-accent/50 p-6 border-b">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  {singleTreatment.image ? (
                    <img
                      src={`${API_BASE}${singleTreatment.image}`}
                      className="w-20 h-20 rounded-lg object-cover shadow-card"
                      alt={singleTreatment.name}
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${singleTreatment.status === 1
                        ? "bg-success/10 text-success"
                        : "bg-muted text-muted-foreground"
                        }`}>
                        {singleTreatment.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">{singleTreatment.name}</h2>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" />
                      {singleTreatment.slug}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleEdit} className="gap-2">
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={handleDelete} className="gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Content Preview</h3>
              </div>

              <div
                className="cms-content bg-muted/30 rounded-lg p-6 border"
                dangerouslySetInnerHTML={{
                  __html: decodeHTML(singleTreatment.description_html),
                }}
              />
            </div>
          </div>
        )}

        {!singleTreatment && selectedDiseaseForFilter && filteredTreatments.length === 0 && (
          <div className="bg-card rounded-xl shadow-card border p-12 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No treatments found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              No treatments are available for the selected disease.
            </p>
            <Button onClick={handleAdd} className="gap-2">
              <Plus className="w-4 h-4" />
              Add First Treatment
            </Button>
          </div>
        )}
      </main>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {editing ? <Edit3 className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-primary" />}
              {editing ? "Edit Treatment" : "Add New Treatment"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="col-span-2 space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Disease *</Label>
              <select
                className="w-full h-10 px-3 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
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
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Treatment Name *</Label>
              <Input
                placeholder="e.g., Chemotherapy"
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
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">URL Slug</Label>
              <Input
                placeholder="e.g., Chemotherapy"
                value={form.name}
                onChange={(e) => {
                  const name = e.target.value;

                  setForm((prev) => ({
                    ...prev,
                    name,
                    slug:

                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-"),
                  }))
                }}
              />

            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium mb-2 block">
                Short Description
              </label>
              <RichTextEditor
                label="Short Description"
                value={form.short_description}
                onChange={(val) =>
                  setForm({ ...form, short_description: val })
                }
                placeholder="Enter a brief description..."
                minHeight={120}
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium mb-2 block">
                Full Description
              </label>
              <RichTextEditor
                label="Full Description (HTML with Image Alignment)"
                value={form.description_html}
                onChange={(val) =>
                  setForm({ ...form, description_html: val })
                }
                placeholder="Enter full treatment description with images..."
                minHeight={250}
              />
            </div>

            <div className="col-span-2 pt-4 border-t">
              <h4 className="text-sm font-semibold text-foreground mb-4">SEO Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground">SEO Title</Label>
                  <Input
                    placeholder="Page title for search engines"
                    value={form.seo_title}
                    onChange={(e) =>
                      setForm({ ...form, seo_title: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground">SEO Keywords</Label>
                  <Input
                    placeholder="keyword1, keyword2, keyword3"
                    value={form.seo_keywords}
                    onChange={(e) =>
                      setForm({ ...form, seo_keywords: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground">SEO Description</Label>
                  <Input
                    placeholder="Brief description for search results"
                    value={form.seo_description}
                    onChange={(e) =>
                      setForm({ ...form, seo_description: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground">Canonical URL</Label>
                  <Input
                    placeholder="https://example.com/treatment"
                    value={form.canonical_url}
                    onChange={(e) =>
                      setForm({ ...form, canonical_url: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Status</Label>
              <select
                className="w-full h-10 px-3 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Featured Image</Label>
              <Input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="cursor-pointer"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  setForm({ ...form, image: f });
                  setPreview(URL.createObjectURL(f));
                }}
              />
            </div>
            {(preview || existingImage) && (
              <div className="col-span-2 mt-4 space-y-3">
                <div className="relative w-fit">
                  <img
                    src={preview || existingImage!}
                    alt={form.image_alt || "Treatment image"}
                    title={form.image_title || ""}
                    className="max-w-xs rounded-lg border shadow"
                  />

                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2"
                    onClick={() => {
                      setPreview(null);
                      setExistingImage(null);
                      setForm({ ...form, image: null });

                      if (fileRef.current) {
                        fileRef.current.value = "";
                      }
                    }}
                  >
                    Remove
                  </Button>
                </div>

                {!preview && (
                  <p className="text-xs text-muted-foreground">
                    Existing image (upload a new one to replace)
                  </p>
                )}
              </div>
            )}


            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">
                Image Alt Text
              </Label>
              <Input
                placeholder="Describe the image for accessibility"
                value={form.image_alt || ""}
                onChange={(e) =>
                  setForm({ ...form, image_alt: e.target.value })
                }
              />

            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">
                Image Title
              </Label>
              <Input
                placeholder="Image title"
                value={form.image_title || ""}
                onChange={(e) =>
                  setForm({ ...form, image_title: e.target.value })
                }
              />

            </div>


          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="gap-2">
              {editing ? "Update Treatment" : "Create Treatment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageTreatments;
