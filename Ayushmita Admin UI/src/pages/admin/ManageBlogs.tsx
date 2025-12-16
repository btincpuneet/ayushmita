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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const API_URL = "http://127.0.0.1:5001/api/blogs";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    category_id: "",
    title: "",
    slug: "",
    short_description: "",
    description_html: "",
    is_global: 1,
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setBlogs(res.data.data || []);
    } catch {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const generateSlug = (text) => {
    return text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  };

  const handleAdd = () => {
    setEditing(null);
    setForm({
      category_id: "",
      title: "",
      slug: "",
      short_description: "",
      description_html: "",
      is_global: 1,
      image: null,
    });
    setPreview(null);
    setOpen(true);
  };

  const handleEdit = (item) => {
    setEditing(item);
    setForm({
      category_id: item.category_id,
      title: item.title,
      slug: item.slug,
      short_description: item.short_description,
      description_html: item.description_html,
      is_global: item.is_global,
      image: null,
    });

    setPreview(item.image ? `http://127.0.0.1:5001${item.image}` : null);
    setOpen(true);
  };

  const handleSubmit = async () => {
    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) fd.append(key, value);
    });

    try {
      if (editing) {
        await axios.put(`${API_URL}/${editing.id}`, fd);
        toast.success("Blog updated");
      } else {
        await axios.post(API_URL, fd);
        toast.success("Blog created");
      }
      setOpen(false);
      loadBlogs();
    } catch {
      toast.error("Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this blog?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Blog deleted");
      loadBlogs();
    } catch {
      toast.error("Delete failed");
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
        <Button onClick={handleAdd}>+ Add Blog</Button>
      </div>

      <div className="bg-white shadow rounded">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Category ID</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((b) => (
              <tr key={b.id} className="border-b">
                <td className="p-3">
                  {b.image ? (
                    <img
                      src={`http://127.0.0.1:5001${b.image}`}
                      className="w-20 h-20 rounded object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded" />
                  )}
                </td>

                <td className="p-3">{b.title}</td>
                <td className="p-3">{b.slug}</td>
                <td className="p-3">{b.category_id}</td>

                <td className="p-3 text-right">
                  <button className="text-blue-600 mr-3" onClick={() => handleEdit(b)}>
                    Edit
                  </button>
                  <button className="text-red-600" onClick={() => handleDelete(b.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && blogs.length === 0 && (
          <p className="text-center py-6 text-gray-600">No blogs found.</p>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Blog" : "Create Blog"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-3 max-h-[70vh] overflow-y-auto pr-2">
            <Input
              placeholder="Category ID"
              type="number"
              value={form.category_id}
              onChange={(e) => updateForm("category_id", e.target.value)}
            />

            <Input
              placeholder="Blog Title"
              value={form.title}
              onChange={(e) => {
                updateForm("title", e.target.value);
                updateForm("slug", generateSlug(e.target.value));
              }}
            />

            <Input
              placeholder="Slug"
              value={form.slug}
              onChange={(e) => updateForm("slug", e.target.value)}
            />

            <Textarea
              placeholder="Short Description"
              value={form.short_description}
              onChange={(e) => updateForm("short_description", e.target.value)}
            />

            <div>
              <label className="text-sm font-medium">HTML Description</label>
              <ReactQuill
                theme="snow"
                value={form.description_html}
                onChange={(val) => updateForm("description_html", val)}
                modules={quillModules}
                className="bg-white rounded"
              />
            </div>

            <select
              className="border p-2 rounded"
              value={form.is_global}
              onChange={(e) => updateForm("is_global", Number(e.target.value))}
            >
              <option value={1}>Global Blog (Yes)</option>
              <option value={0}>Not Global</option>
            </select>

            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files[0];
                  updateForm("image", f);
                  if (f) setPreview(URL.createObjectURL(f));
                }}
              />

              {preview && <img src={preview} className="w-40 mt-3 rounded" />}
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

export default ManageBlogs;
