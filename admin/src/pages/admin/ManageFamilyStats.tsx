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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const API_URL = `${API_BASE}/api/family-stats`;

const ManageFamilyStats = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const initialForm = {
    title: "",
    description: "",
    count: "",
    label: "",
    icon: null,
    url: "",
    order: 0,
    isActive: true,
  };

  const [form, setForm] = useState(initialForm);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setList(res.data.data || []);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = () => {
    setEditing(null);
    setForm(initialForm);
    setOpen(true);
  };

  const handleEdit = (item) => {
    setEditing(item);
    setForm({
      title: item.title || "",
      description: item.description || "",
      count: item.count || "",
      label: item.label || "",
      icon: null,
      url: item.url || "",
      order: item.order || 0,
      isActive: item.isActive,
    });
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value);
        }
      });

      if (editing) {
        await axios.put(`${API_URL}/${editing.id}`, formData);
        toast.success("Updated successfully");
      } else {
        await axios.post(API_URL, formData);
        toast.success("Created successfully");
      }

      setOpen(false);
      loadData();
    } catch {
      toast.error("Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Deleted successfully");
      loadData();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Family Stats</h1>
        <Button onClick={handleAdd}>+ Add</Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Label</th>
              <th className="p-3">Count</th>
              <th className="p-3">Icon</th>
              <th className="p-3">Order</th>
              <th className="p-3">Active</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && list.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No records found
                </td>
              </tr>
            )}

            {list.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3">{item.label}</td>
                <td className="p-3">{item.count}</td>
                <td className="p-3">
                  {item.icon ? (
                    <img
  src={`${API_BASE}${item.icon}`}
  alt="icon"
  className="h-8 w-8 object-contain"
/>

                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-3">{item.order}</td>
                <td className="p-3">{item.isActive ? "Yes" : "No"}</td>
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

        {loading && (
          <p className="text-center py-6 text-gray-500">Loading...</p>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Family Stat" : "Add Family Stat"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-3">
            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <Textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <Input
              placeholder="Count"
              value={form.count}
              onChange={(e) => setForm({ ...form, count: e.target.value })}
            />

            <Input
              placeholder="Label"
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
            />

            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, icon: e.target.files[0] })
              }
            />

            {editing && editing.icon && !form.icon && (
              <img
                src={editing.icon}
                alt="preview"
                className="h-10 w-10 object-contain"
              />
            )}

            <Input
              placeholder="URL"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />

            <Input
              type="number"
              placeholder="Order"
              value={form.order}
              onChange={(e) =>
                setForm({ ...form, order: Number(e.target.value) })
              }
            />

            <select
              className="border p-2 rounded"
              value={form.isActive ? "yes" : "no"}
              onChange={(e) =>
                setForm({ ...form, isActive: e.target.value === "yes" })
              }
            >
              <option value="yes">Active</option>
              <option value="no">Inactive</option>
            </select>
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

export default ManageFamilyStats;
