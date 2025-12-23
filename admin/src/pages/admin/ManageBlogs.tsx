import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, Globe, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/RichTextEditor";

/* ================= CONFIG ================= */

const BASE_URL = "http://127.0.0.1:5001";
const BLOG_API = `${BASE_URL}/api/blogs`;
const DISEASE_API = `${BASE_URL}/api/diseases`;
const TREATMENT_API = `${BASE_URL}/api/treatments`;

/* ================= FORM ================= */

const emptyForm: any = {
  title: "",
  slug: "",
  short_description: "",
  description_html: "",

  disease_id: "0",
  treatment_id: "0",

  author_name: "Admin",
  is_global: false,
  is_featured: false,
  status: "published",

  meta_title: "",
  meta_description: "",
  meta_keywords: "",
  tags: "",

  blog_image: null,
};

/* ================= COMPONENT ================= */

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [diseases, setDiseases] = useState<any[]>([]);
  const [treatments, setTreatments] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(emptyForm);

  /* ================= HELPERS ================= */

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  const loadBlogs = async () => {
    const res = await axios.get(BLOG_API);
    setBlogs(res.data.data || []);
  };

  /* ================= EFFECTS ================= */

  useEffect(() => {
    loadBlogs();
    axios.get(DISEASE_API).then((r) => setDiseases(r.data.data || []));
  }, []);

  useEffect(() => {
    if (!form.is_global && form.disease_id !== "0") {
      axios
        .get(`${TREATMENT_API}/disease/${form.disease_id}`)
        .then((r) => setTreatments(r.data.treatments || []));
    } else {
      setTreatments([]);
    }
  }, [form.disease_id, form.is_global]);

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    if (
      !form.title ||
      !form.slug ||
      !form.short_description ||
      !form.description_html
    ) {
      return toast.error("Required fields are missing");
    }

    if (!form.is_global && form.disease_id === "0") {
      return toast.error("Disease is required for non-global blog");
    }

    const fd = new FormData();

    Object.entries(form).forEach(([key, value]: any) => {
      if (value !== null && key !== "blog_image") {
        fd.append(key, value);
      }
    });

    fd.set("is_global", form.is_global ? "1" : "0");
    fd.set("is_featured", form.is_featured ? "1" : "0");

    fd.set(
      "disease_id",
      form.is_global ? "" : String(form.disease_id)
    );

    fd.set(
      "treatment_id",
      form.is_global || form.treatment_id === "0"
        ? ""
        : String(form.treatment_id)
    );

    if (form.blog_image) {
      fd.append("blog_image", form.blog_image);
    }

    try {
      editing
        ? await axios.put(`${BLOG_API}/${editing.id}`, fd)
        : await axios.post(BLOG_API, fd);

      toast.success(editing ? "Blog updated" : "Blog created");

      setOpen(false);
      setEditing(null);
      setForm(emptyForm);
      loadBlogs();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id: number) => {
    if (!confirm("This will permanently delete the blog")) return;

    await axios.delete(`${BLOG_API}/${id}`);
    toast.success("Blog deleted");
    loadBlogs();
  };

  /* ================= UI ================= */

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Blog Manager</h1>
        <Button
          onClick={() => {
            setEditing(null);
            setForm(emptyForm);
            setOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Blog
        </Button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {blogs.map((b) => (
          <div
            key={b.id}
            className="flex items-center gap-4 border rounded-lg p-4"
          >
            <div className="w-32 h-20 bg-muted flex items-center justify-center overflow-hidden">
              {b.blog_image ? (
                <img
                  src={`${BASE_URL}/${b.blog_image}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon className="w-8 h-8 opacity-40" />
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">{b.title}</h3>
              <p className="text-sm text-muted-foreground">
                {b.is_global ? "Global Blog" : "Disease Based"}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => {
                  setEditing(b);
                  setForm({
                    ...emptyForm,
                    ...b,
                    disease_id: b.disease_id ? String(b.disease_id) : "0",
                    treatment_id: b.treatment_id
                      ? String(b.treatment_id)
                      : "0",
                    is_global: Boolean(b.is_global),
                    is_featured: Boolean(b.is_featured),
                    blog_image: null,
                  });
                  setOpen(true);
                }}
              >
                <Edit className="w-4 h-4 mr-1" /> Edit
              </Button>

              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(b.id)}
              >
                <Trash2 className="w-4 h-4 mr-1" /> Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Blog" : "Create Blog"}
            </DialogTitle>
          </DialogHeader>

          {/* GLOBAL */}
          <label className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={form.is_global}
              onChange={(e) =>
                setForm({
                  ...form,
                  is_global: e.target.checked,
                  disease_id: "0",
                  treatment_id: "0",
                })
              }
            />
            <Globe className="w-4 h-4" /> Global Blog
          </label>

          {/* DISEASE / TREATMENT */}
          <div className="grid grid-cols-2 gap-4">
            <select
              disabled={form.is_global}
              className="border rounded px-3 py-2"
              value={form.disease_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  disease_id: e.target.value,
                  treatment_id: "0",
                })
              }
            >
              <option value="0">Select Disease *</option>
              {diseases.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            <select
              disabled={form.is_global || form.disease_id === "0"}
              className="border rounded px-3 py-2"
              value={form.treatment_id}
              onChange={(e) =>
                setForm({ ...form, treatment_id: e.target.value })
              }
            >
              <option value="0">Select Treatment</option>
              {treatments.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* TITLE / SLUG */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input
              placeholder="Title *"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                  slug: generateSlug(e.target.value),
                })
              }
            />
            <Input
              placeholder="Slug *"
              value={form.slug}
              onChange={(e) =>
                setForm({ ...form, slug: e.target.value })
              }
            />
          </div>

          {/* BLOG IMAGE */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">
              Blog Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  blog_image: e.target.files?.[0] || null,
                })
              }
            />

            {editing?.blog_image && (
              <img
                src={`${BASE_URL}/${editing.blog_image}`}
                className="mt-2 h-24 rounded object-cover"
              />
            )}
          </div>

        

          <RichTextEditor
            label="Full Content *"
            value={form.description_html}
            onChange={(v) =>
              setForm({ ...form, description_html: v })
            }
            minHeight={300}
          />

          {/* SEO */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input
              placeholder="Meta Title"
              value={form.meta_title}
              onChange={(e) =>
                setForm({ ...form, meta_title: e.target.value })
              }
            />
            <Input
              placeholder="Meta Keywords"
              value={form.meta_keywords}
              onChange={(e) =>
                setForm({ ...form, meta_keywords: e.target.value })
              }
            />
          </div>

          <Input
            className="mt-4"
            placeholder="Meta Description"
            value={form.meta_description}
            onChange={(e) =>
              setForm({ ...form, meta_description: e.target.value })
            }
          />

          <Input
            className="mt-4"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={(e) =>
              setForm({ ...form, tags: e.target.value })
            }
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editing ? "Update Blog" : "Create Blog"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
