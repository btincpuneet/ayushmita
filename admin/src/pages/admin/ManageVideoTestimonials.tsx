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

const API_URL = `${API_BASE}/api/video-testimonials`;

const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

interface VideoTestimonial {
  id: number;
  name: string;
  slug: string;
  editor_content: string;
  status: "active" | "inactive";
}

const ManageVideoTestimonials = () => {
  const [items, setItems] = useState<VideoTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<VideoTestimonial | null>(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    editor_content: "",
    status: "active",
  });

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}`);
      setItems(res.data?.data || []);
    } catch {
      toast.error("Failed to load video testimonials");
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

  const handleAdd = () => {
    setEditing(null);
    setForm({
      name: "",
      slug: "",
      editor_content: "",
      status: "active",
    });
    setOpen(true);
  };

  const handleEdit = (item: VideoTestimonial) => {
    setEditing(item);
    setForm({
      name: item.name,
      slug: item.slug,
      editor_content: item.editor_content,
      status: item.status,
    });
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (!form.name) {
        toast.error("Name is required");
        return;
      }

      if (!form.editor_content) {
        toast.error("Content is required");
        return;
      }

      if (editing) {
        await axios.put(`${API_URL}/${editing.id}`, form, {
          headers: authHeader(),
        });
        toast.success("Video testimonial updated");
      } else {
        await axios.post(API_URL, form, {
          headers: authHeader(),
        });
        toast.success("Video testimonial created");
      }

      setOpen(false);
      fetchItems();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this video testimonial?")) return;

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
        <h1 className="text-2xl font-bold">Manage Video Testimonials</h1>
        <Button onClick={handleAdd}>+ Add Video Testimonial</Button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3 text-xs text-gray-600">{item.slug}</td>
                <td className="p-3">
                  {item.status === "active" ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Inactive</span>
                  )}
                </td>
                <td className="p-3 text-right space-x-2">
                  <Button size="sm" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && items.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            No video testimonials found.
          </p>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Video Testimonial" : "Add Video Testimonial"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={form.name}
                  onChange={(e) => {
                    updateForm("name", e.target.value);
                    updateForm("slug", generateSlug(e.target.value));
                  }}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Slug</label>
                <Input
                  value={form.slug}
                  onChange={(e) => updateForm("slug", e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Testimonial Content</label>
              <RichTextEditor
                value={form.editor_content}
                onChange={(html) => updateForm("editor_content", html)}
                minHeight={250}
                showWordCount={false}
              />
            </div>

            <div className="flex flex-col gap-1">
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

export default ManageVideoTestimonials;
