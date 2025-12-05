import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import axios from "axios";

interface Hospital {
  id?: number;
  name: string;
  country: string;
  city: string;
  description?: string;
  status: string;
  image_url?: any;
}

export default function ManageTopPartnerHospitals() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<any>({
    name: "",
    country: "",
    city: "",
    description: "",
    status: "active",
    image: null,
  });

  const [editId, setEditId] = useState<number | null>(null);

  const API = "http://127.0.0.1:5001/api/hospitals";

  // ===============================
  // LOAD HOSPITALS
  // ===============================
  const fetchHospitals = async () => {
    try {
      const res = await axios.get(API);
      let list = res?.data?.data;

      // ensure array format
      if (list && !Array.isArray(list)) list = [list];

      setHospitals(list || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setHospitals([]);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  // ===============================
  // OPEN CREATE
  // ===============================
  const openCreate = () => {
    setEditId(null);
    setForm({
      name: "",
      country: "",
      city: "",
      description: "",
      status: "active",
      image: null,
    });
    setOpen(true);
  };

  // ===============================
  // SUBMIT CREATE / UPDATE
  // ===============================
  const handleSubmit = async () => {
    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) fd.append(key, value as any);
    });

    if (editId) {
      await axios.put(`${API}/${editId}`, fd);
    } else {
      await axios.post(API, fd);
    }

    setOpen(false);
    fetchHospitals();
  };

  // ===============================
  // DELETE
  // ===============================
  const handleDelete = async (id: number) => {
    await axios.delete(`${API}/${id}`);
    fetchHospitals();
  };

  // ===============================
  // OPEN EDIT
  // ===============================
  const handleEdit = (h: Hospital) => {
    setEditId(h.id!);
    setForm({
      name: h.name,
      country: h.country,
      city: h.city,
      description: h.description,
      status: h.status,
      image: null,
    });
    setOpen(true);
  };

  // Convert buffer → base64
  const convertImage = (buffer: any) => {
    if (!buffer) return null;
    if (typeof buffer === "string") return buffer;

    const base64String = btoa(
      new Uint8Array(buffer.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );

    return `data:image/png;base64,${base64String}`;
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Manage Top Partner Hospitals</h1>
        <Button onClick={openCreate}>+ Add Hospital</Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <table className="w-full text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Country</th>
                <th className="p-2 border">City</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {hospitals.map((h) => (
                <tr key={h.id} className="border">
                  <td className="p-2 border">
                    {h.image_url ? (
                      <img
                        src={convertImage(h.image_url)}
                        className="h-12 rounded"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td className="p-2 border">{h.name}</td>
                  <td className="p-2 border">{h.country}</td>
                  <td className="p-2 border">{h.city}</td>
                  <td className="p-2 border">{h.status}</td>

                  <td className="p-2 border flex gap-2">
                    <Button size="sm" onClick={() => handleEdit(h)}>
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(h.id!)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editId ? "Edit Hospital" : "Add Hospital"}</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Hospital Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <Input
              placeholder="Country"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />

            <Input
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />

            <Textarea
              placeholder="Description"
              className="col-span-2"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <div className="col-span-2">
              <label className="text-sm font-medium">Image</label>
              <Input
                type="file"
                onChange={(e) =>
                  setForm({ ...form, image: e.target.files?.[0] || null })
                }
              />
            </div>

            <div>
              <Select
                value={form.status}
                onValueChange={(v) => setForm({ ...form, status: v })}
              >
                <SelectTrigger>Status</SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button onClick={handleSubmit}>
              {editId ? "Update" : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
