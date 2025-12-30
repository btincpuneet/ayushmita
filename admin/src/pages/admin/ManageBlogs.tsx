import { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Edit,
  Trash2,
  Globe,
  Image as ImageIcon,
  Star,
} from "lucide-react";
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
import { API_BASE } from "../../config/api";

const BLOG_API = `${API_BASE}/api/blogs`;
const DISEASE_API = `${API_BASE}/api/diseases`;
const TREATMENT_API = `${API_BASE}/api/treatments`;

const emptyForm = {
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
  blog_image: null as File | null,
};

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [diseases, setDiseases] = useState<any[]>([]);
  const [treatments, setTreatments] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(emptyForm);

  /* ================= HELPERS ================= */
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  const loadBlogs = async () => {
    const res = await axios.get(BLOG_API);
    setBlogs(res.data.data || []);
  };

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

  const handleSubmit = async () => {
    if (
      !form.title ||
      !form.slug ||
      !form.description_html
    ) {
      return toast.error("Please fill all required fields");
    }

    if (!form.is_global && form.disease_id === "0") {
      return toast.error("Disease is required for non-global blogs");
    }

    const fd = new FormData();

    Object.entries({
      title: form.title,
      slug: form.slug,
      short_description: form.short_description,
      description_html: form.description_html,
      author_name: form.author_name,
      status: form.status,
      meta_title: form.meta_title,
      meta_description: form.meta_description,
      meta_keywords: form.meta_keywords,
      tags: form.tags,
      is_global: form.is_global ? "1" : "0",
      is_featured: form.is_featured ? "1" : "0",
    }).forEach(([k, v]) => fd.append(k, v));

    if (!form.is_global) {
      fd.append("disease_id", form.disease_id);
      if (form.treatment_id !== "0") {
        fd.append("treatment_id", form.treatment_id);
      }
    }

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
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Something went wrong");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this blog?")) return;
    await axios.delete(`${BLOG_API}/${id}`);
    toast.success("Blog deleted");
    loadBlogs();
  };

  /* ================= UI ================= */
  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
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

      {/* BLOG LIST */}
      {blogs.map((b) => (
        <div key={b.id} className="border p-4 rounded mb-3 flex gap-4">
          <div className="w-32 h-20 bg-muted flex items-center justify-center">
            {b.blog_image ? (
              <img
                src={`${API_BASE}${b.blog_image}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageIcon className="opacity-40" />
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-semibold">{b.title}</h3>
            <p className="text-sm text-muted-foreground">
              {b.is_global ? "🌍 Global" : `Disease ID: ${b.disease_id}`}
              {b.treatment_id && ` | Treatment ID: ${b.treatment_id}`}
              {b.is_featured && " ⭐ Featured"}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => {
                setEditing(b);
                setForm({ ...emptyForm, ...b, blog_image: null });
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

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Blog" : "Create Blog"}
            </DialogTitle>
          </DialogHeader>

          {/* VISIBILITY */}
          <div className="flex gap-6 mb-6">
            <label className="flex items-center gap-2">
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
              <Globe className="w-4 h-4" /> Global
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) =>
                  setForm({ ...form, is_featured: e.target.checked })
                }
              />
              <Star className="w-4 h-4" /> Featured
            </label>
          </div>

          {/* DISEASE / TREATMENT */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <select
              className="border rounded px-3 py-2 disabled:bg-gray-100"
              value={form.disease_id}
              disabled={form.is_global}
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
              className="border rounded px-3 py-2 disabled:bg-gray-100"
              value={form.treatment_id}
              disabled={form.is_global || form.disease_id === "0"}
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

          {/* TITLE */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Title *"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                  slug: slugify(e.target.value),
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

          <RichTextEditor
            label="Content *"
            value={form.description_html}
            onChange={(v) =>
              setForm({ ...form, description_html: v })
            }
            minHeight={300}
          />

          <Input
            type="file"
            accept="image/*"
            className="mt-6"
            onChange={(e) =>
              setForm({
                ...form,
                blog_image: e.target.files?.[0] || null,
              })
            }
          />

          {/* SEO */}
          <div className="mt-8 border-t pt-6">
            <h3 className="font-semibold mb-4">SEO</h3>
            <div className="grid grid-cols-2 gap-4">
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
                setForm({
                  ...form,
                  meta_description: e.target.value,
                })
              }
            />
            <Input
              className="mt-4"
              placeholder="Tags"
              value={form.tags}
              onChange={(e) =>
                setForm({ ...form, tags: e.target.value })
              }
            />
          </div>

          <DialogFooter className="mt-6">
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