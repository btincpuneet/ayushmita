import React, { useState, useEffect } from "react";
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

const API_URL = "http://127.0.0.1:5001/api/promo-sliders";
const BASE_URL = "http://127.0.0.1:5001";

const ManagePromoSlider = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    discount_text: "",
    code_text: "",
    button_text: "",
    status: "active",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // Load Data
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setSliders(res.data.data);
    } catch (err) {
      toast.error("Failed to load");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Open Modal for Create
  const handleAdd = () => {
    setEditing(null);
    setForm({
      title: "",
      subtitle: "",
      description: "",
      discount_text: "",
      code_text: "",
      button_text: "",
      status: "active",
      image: null,
    });
    setPreview(null);
    setOpen(true);
  };

  // Open Modal for Update
  const handleEdit = (item) => {
    setEditing(item);
    setForm({
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      discount_text: item.discount_text,
      code_text: item.code_text,
      button_text: item.button_text,
      status: item.status,
      image: null,
    });

    // FIXED: Show image from uploads folder
    if (item.image_url) {
      setPreview(`${BASE_URL}${item.image_url}`);
    }

    setOpen(true);
  };

  // Create or Update
  const handleSubmit = async () => {
    const formData = new FormData();
    Object.keys(form).forEach((k) => {
      if (form[k] !== null) formData.append(k, form[k]);
    });

    try {
      if (editing) {
        await axios.put(`${API_URL}/${editing.id}`, formData);
        toast.success("Slider updated!");
      } else {
        await axios.post(API_URL, formData);
        toast.success("Slider created!");
      }
      setOpen(false);
      loadData();
    } catch (err) {
      toast.error("Error saving");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!confirm("Delete this slider?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Deleted!");
      loadData();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Promo Sliders</h1>
        <Button onClick={handleAdd}>+ Add Slider</Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Subtitle</th>
              <th className="p-3">Discount</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sliders.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3">
                  {/* FIXED: Now image loads correctly */}
                  {item.image_url ? (
                    <img
                      src={`${BASE_URL}${item.image_url}`}
                      alt=""
                      className="w-20 h-14 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-14 bg-gray-200 rounded" />
                  )}
                </td>

                <td className="p-3">{item.title}</td>
                <td className="p-3">{item.subtitle}</td>
                <td className="p-3">{item.discount_text}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-sm rounded ${
                      item.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-3 text-right">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 mr-4"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sliders.length === 0 && (
          <p className="text-center py-6 text-gray-600">No sliders found.</p>
        )}
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Slider" : "Add New Slider"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-3">
            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <Input
              placeholder="Subtitle"
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            />

            <Textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <Input
              placeholder="Discount Text"
              value={form.discount_text}
              onChange={(e) =>
                setForm({ ...form, discount_text: e.target.value })
              }
            />

            <Input
              placeholder="Code Text"
              value={form.code_text}
              onChange={(e) => setForm({ ...form, code_text: e.target.value })}
            />

            <Input
              placeholder="Button Text"
              value={form.button_text}
              onChange={(e) =>
                setForm({ ...form, button_text: e.target.value })
              }
            />

            <select
              className="border p-2 rounded"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            {/* Image Upload */}
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setForm({ ...form, image: file });

                  if (file) {
                    const url = URL.createObjectURL(file);
                    setPreview(url);
                  }
                }}
              />

              {preview && (
                <img
                  src={preview}
                  className="w-40 h-28 mt-3 rounded object-cover"
                />
              )}
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

export default ManagePromoSlider;
