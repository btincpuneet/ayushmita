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
const DUMMY_IMAGE = "https://via.placeholder.com/150x150?text=No+Image";

const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

/* ---------------- TYPES ---------------- */
interface NewsEvent {
  id: number;
  title: string;
  slug: string;
  editor_content: string;
  image?: string | null;
  status: "active" | "inactive";
}

const ManageNewsEvents = () => {
  const [items, setItems] = useState<NewsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<NewsEvent | null>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    editor_content: "",
    status: "active",
    image: null as File | null,
    existingImage: null as string | null,
    removeImage: false,
  });

  /* ---------------- FETCH ---------------- */
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
    });
  };

  /* ---------------- ADD ---------------- */
  const handleAdd = () => {
    setEditing(null);
    resetForm();
    setOpen(true);
  };

  /* ---------------- EDIT ---------------- */
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
    });
    setOpen(true);
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    try {
      if (!form.title) return toast.error("Title is required");
      if (!form.editor_content) return toast.error("Content is required");

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("slug", form.slug);
      formData.append("editor_content", form.editor_content);
      formData.append("status", form.status);
      formData.append("removeImage", String(form.removeImage));

      if (form.image) {
        formData.append("image", form.image);
      }

      if (editing) {
        await axios.put(`${API_URL}/${editing.id}`, formData, {
          headers: { ...authHeader() },
        });
        toast.success("News/Event updated");
      } else {
        await axios.post(API_URL, formData, {
          headers: { ...authHeader() },
        });
        toast.success("News/Event created");
      }

      setOpen(false);
      fetchItems();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  /* ---------------- DELETE ---------------- */
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
    <div className="p-4 sm:p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">Manage News & Events</h1>
        <Button onClick={handleAdd}>+ Add News/Event</Button>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white shadow rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3">
                  <img
                    src={item.image ? `${API_BASE}/${item.image}` : DUMMY_IMAGE}
                    alt={item.title}
                    className="h-12 w-12 rounded object-cover border"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src = DUMMY_IMAGE)
                    }
                  />
                </td>

                <td className="p-3 font-medium">{item.title}</td>
                <td className="p-3 text-xs text-gray-500">{item.slug}</td>

                <td className="p-3">
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

                <td className="p-3 text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
                      title="Edit"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded bg-red-500 hover:bg-red-600 text-white"
                      title="Delete"
                    >
                      Delete{" "}
                    </button>
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

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white shadow rounded p-4 space-y-2">
            <img
              src={item.image ? `${API_BASE}/${item.image}` : DUMMY_IMAGE}
              alt={item.title}
              className="h-40 w-full rounded object-cover"
              onError={(e) =>
                ((e.target as HTMLImageElement).src = DUMMY_IMAGE)
              }
            />

            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-xs text-gray-500 break-all">{item.slug}</p>

            <p className="text-sm">
              Status:{" "}
              <span
                className={
                  item.status === "active"
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {item.status}
              </span>
            </p>

            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                className="flex-1"
                onClick={() => handleEdit(item)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="flex-1"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit News/Event" : "Add News/Event"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
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
                  value={form.slug}
                  onChange={(e) => updateForm("slug", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Content</label>
              <RichTextEditor
                value={form.editor_content}
                onChange={(html) => updateForm("editor_content", html)}
                minHeight={250}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Image</label>

              <Input
                type="file"
                accept="image/*"
                disabled={form.removeImage}
                onChange={(e) =>
                  updateForm("image", e.target.files?.[0] || null)
                }
              />

              {form.existingImage && !form.removeImage && (
                <img
                  src={`${API_BASE}/${form.existingImage}`}
                  className="h-24 rounded border"
                />
              )}

              {form.existingImage && (
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.removeImage}
                    onChange={(e) =>
                      updateForm("removeImage", e.target.checked)
                    }
                  />
                  Remove existing image
                </label>
              )}
            </div>

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

export default ManageNewsEvents;
