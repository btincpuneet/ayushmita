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

const API_URL = "http://127.0.0.1:5001/api/doctors"; 
const BASE_URL = "http://127.0.0.1:5001";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    title: "",
    specialty: "",
    description: "",
    status: "active",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // Load all doctors
  const loadDoctors = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setDoctors(res.data.data);
    } catch (err) {
      toast.error("Failed to load doctors");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  // Open Add Doctor
  const handleAdd = () => {
    setEditing(null);
    setForm({
      name: "",
      title: "",
      specialty: "",
      description: "",
      status: "active",
      image: null,
    });
    setPreview(null);
    setOpen(true);
  };

  // Open Edit Doctor
  const handleEdit = (item) => {
    setEditing(item);
    setForm({
      name: item.name,
      title: item.title,
      specialty: item.specialty,
      description: item.description,
      status: item.status,
      image: null,
    });

    // Convert blob → base64 URL
    if (item.image_base64) {
      setPreview(`data:image/png;base64,${item.image_base64}`);
    }

    setOpen(true);
  };

  // Submit form (Create or Update)
  const handleSubmit = async () => {
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null) formData.append(key, form[key]);
    });

    try {
      if (editing) {
        await axios.put(`${API_URL}/${editing.id}`, formData);
        toast.success("Doctor updated!");
      } else {
        await axios.post(API_URL, formData);
        toast.success("Doctor created!");
      }

      setOpen(false);
      loadDoctors();
    } catch (err) {
      console.log(err);
      toast.error("Save failed");
    }
  };

  // Delete doctor
  const handleDelete = async (id) => {
    if (!confirm("Delete this doctor?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Doctor deleted!");
      loadDoctors();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Doctors</h1>
        <Button onClick={handleAdd}>+ Add Doctor</Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Title</th>
              <th className="p-3">Specialty</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3">
                  {item.image_base64 ? (
                    <img
                      src={`data:image/png;base64,${item.image_base64}`}
                      className="w-20 h-20 object-cover rounded"
                      alt=""
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded" />
                  )}
                </td>

                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.title}</td>
                <td className="p-3">{item.specialty}</td>

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

        {doctors.length === 0 && (
          <p className="text-center py-6 text-gray-600">
            No doctors found.
          </p>
        )}
      </div>

      {/* Form Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Doctor" : "Add New Doctor"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-3">
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <Input
              placeholder="Specialty"
              value={form.specialty}
              onChange={(e) =>
                setForm({ ...form, specialty: e.target.value })
              }
            />

            <Textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
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

export default ManageDoctors;
