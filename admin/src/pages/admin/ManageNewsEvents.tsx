import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../../config/api";

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
import { authHeader } from "../../utils/auth";
import RichTextEditor from "@/components/RichTextEditor";

const API_URL = `${API_BASE}/api/news-events`;
const DUMMY_IMAGE = "https://via.placeholder.com/300x200?text=No+Image";

const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

/* ================= TYPES ================= */
interface NewsEvent {
  id: number;
  title: string;
  slug: string;
  editor_content: string;
  image?: string | null;

  image_alt?: string | null;
  image_title?: string | null;

  seo_title?: string | null;
  seo_description?: string | null;
  seo_keywords?: string | null;
  canonical_url?: string | null;

  status: "active" | "inactive";
}

/* ================= COMPONENT ================= */
const ManageNewsEvents = () => {
  const [items, setItems] = useState<NewsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<NewsEvent | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    editor_content: "",
    status: "active",

    image: null as File | null,
    existingImage: null as string | null,
    removeImage: false,

    image_alt: "",
    image_title: "",

    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    canonical_url: "",
  });

  /* ================= FETCH ================= */
  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/active`);
      setItems(res.data?.data || []);
    } catch {
      toast.error("Failed to load news & events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const updateForm = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      editor_content: "",
      status: "active",

      image: null,
      existingImage: null,
      removeImage: false,

      image_alt: "",
      image_title: "",

      seo_title: "",
      seo_description: "",
      seo_keywords: "",
      canonical_url: "",
    });
    setPreviewImage(null);
  };

  /* ================= ADD ================= */
  const handleAdd = () => {
    setEditing(null);
    resetForm();
    setOpen(true);
  };

  /* ================= EDIT ================= */
  const handleEdit = (item: NewsEvent) => {
    setEditing(item);
    setForm({
      title: item.title,
      slug: item.slug,
      editor_content: item.editor_content,
      status: item.status,

      image: null,
      existingImage: item.image || null,
      removeImage: false,

      image_alt: item.image_alt || "",
      image_title: item.image_title || "",

      seo_title: item.seo_title || "",
      seo_description: item.seo_description || "",
      seo_keywords: item.seo_keywords || "",
      canonical_url: item.canonical_url || "",
    });
    setPreviewImage(null);
    setOpen(true);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {
      if (!form.title) return toast.error("Title is required");
      if (!form.editor_content) return toast.error("Content is required");

      const formData = new FormData();
      Object.entries({
        title: form.title,
        slug: form.slug,
        editor_content: form.editor_content,
        status: form.status,
        image_alt: form.image_alt,
        image_title: form.image_title,
        seo_title: form.seo_title,
        seo_description: form.seo_description,
        seo_keywords: form.seo_keywords,
        canonical_url: form.canonical_url,
        removeImage: String(form.removeImage),
      }).forEach(([k, v]) => formData.append(k, v));

      if (form.image) {
        formData.append("image", form.image);
      }

      if (editing) {
        await axios.put(`${API_URL}/${editing.id}`, formData, {
          headers: authHeader(),
        });
        toast.success("News/Event updated");
      } else {
        await axios.post(API_URL, formData, {
          headers: authHeader(),
        });
        toast.success("News/Event created");
      }

      setOpen(false);
      fetchItems();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this news/event?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: authHeader(),
      });
      toast.success("Deleted successfully");
      fetchItems();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage News & Events</h1>
        <Button onClick={handleAdd}>+ Add News/Event</Button>
      </div>

      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3">
                  <img
                    src={item.image ? `${API_BASE}/${item.image}` : DUMMY_IMAGE}
                    className="h-14 w-20 object-cover rounded border"
                  />
                </td>
                <td className="p-3 font-medium">{item.title}</td>
                <td className="p-3 text-xs text-gray-500">{item.slug}</td>
                <td className="p-3 text-center">
                  <span
                    className={
                      item.status === "active"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex flex-col-2 items-end gap-2">
                    <Button
                      size="sm"
                      className="w-20"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      className="w-20"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && items.length === 0 && (
          <p className="text-center py-6 text-gray-500">No news/events found</p>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle>
              {editing ? "Edit News/Event" : "Add News/Event"}
            </DialogTitle>
          </DialogHeader>

          <div className="max-h-[70vh] overflow-y-auto px-6 py-4 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Title <span className="text-red-500">*</span></label>
                <Input
                  placeholder="e.g., Hospital Opens New Wing"
                  value={form.title}
                  onChange={(e) => {
                    updateForm("title", e.target.value);
                    updateForm("slug", generateSlug(e.target.value));
                  }}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Slug</label>
                <Input
                  placeholder="e.g., hospital-opens-new-wing"
                  value={form.slug}
                  onChange={(e) => updateForm("slug", e.target.value)}
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="text-sm font-medium">Content <span className="text-red-500">*</span></label>
              <RichTextEditor
                value={form.editor_content}
                onChange={(v) => updateForm("editor_content", v)}
                minHeight={250}
              />
            </div>

            {/* Image */}
            <div>
              <label className="text-sm font-medium">Image</label>
              <Input
                type="file"
                accept="image/*"
                placeholder="Select image file"
                disabled={form.removeImage}
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  updateForm("image", file);
                  setPreviewImage(file ? URL.createObjectURL(file) : null);
                }}
              />

              {(previewImage || form.existingImage) && !form.removeImage && (
                <img
                  src={previewImage || `${API_BASE}/${form.existingImage}`}
                  className="mt-3 h-32 rounded border object-cover"
                  alt="Preview"
                />
              )}
            </div>

            {/* Image Meta */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Image Alt Text</label>
                <Input
                  value={form.image_alt}
                  onChange={(e) => updateForm("image_alt", e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Image Title</label>
                <Input
                  value={form.image_title}
                  onChange={(e) => updateForm("image_title", e.target.value)}
                />
              </div>
            </div>

            {/* SEO */}
            <div className="border rounded p-4 bg-gray-50 space-y-4">
              <h3 className="font-semibold">SEO Settings</h3>

              <Input
                placeholder="SEO Title"
                value={form.seo_title}
                onChange={(e) => updateForm("seo_title", e.target.value)}
              />

              <textarea
                rows={3}
                className="w-full border rounded px-3 py-2"
                placeholder="SEO Description"
                value={form.seo_description}
                onChange={(e) => updateForm("seo_description", e.target.value)}
              />

              <Input
                placeholder="SEO Keywords"
                value={form.seo_keywords}
                onChange={(e) => updateForm("seo_keywords", e.target.value)}
              />

              <Input
                placeholder="Canonical URL"
                value={form.canonical_url}
                onChange={(e) => updateForm("canonical_url", e.target.value)}
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium">Status</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={form.status}
                onChange={(e) => updateForm("status", e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* FOOTER */}
          <DialogFooter className="px-6 py-4 border-t">
            <Button onClick={handleSubmit}>
              {editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageNewsEvents;
