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
import RichTextEditor from "@/components/RichTextEditor";

const API_URL = `${API_BASE}/api/hospitals`;

const emptyForm = {
  name: "",
  country: "",
  city: "",
  address: "",
  founded_year: "",
  hospital_beds: "",
  description_html: "",
};

export default function ManageTopPartnerHospitals() {
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchHospitals = async () => {
    try {
      const res = await axios.get(API_URL);
      setHospitals(res.data.data || []);
    } catch {
      toast.error("Failed to load hospitals");
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFile(null);
    setOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditing(item.id);
    setForm({
      name: item.name,
      country: item.country,
      city: item.city,
      address: item.address,
      founded_year: item.founded_year || "",
      hospital_beds: item.hospital_beds || "",
      description_html: item.description_html || "",
    });
    setFile(null);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this hospital?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Deleted successfully");
      fetchHospitals();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) =>
        fd.append(k, v as string)
      );
      if (file) fd.append("image", file);

      if (editing) {
        await axios.put(`${API_URL}/${editing}`, fd);
        toast.success("Updated successfully");
      } else {
        await axios.post(API_URL, fd);
        toast.success("Created successfully");
      }

      setOpen(false);
      fetchHospitals();
    } catch {
      toast.error("Failed to save data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Manage Top Partner Hospitals</h1>
        <Button onClick={handleCreate}>Add Hospital</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Beds</th>
              <th className="p-2 border">Founded</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {hospitals.length ? (
              hospitals.map((h) => (
                <tr key={h.id}>
                  <td className="p-2 border">
                    <img
                      src={`${API_BASE}${h.image_url}`}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </td>

                  <td className="p-2 border font-semibold">{h.name}</td>
                  <td className="p-2 border">{h.city} {h.country}</td>
                  <td className="p-2 border text-center">{h.hospital_beds || "-"}</td>
                  <td className="p-2 border text-center">{h.founded_year || "-"}</td>

                  <td className="p-2 border">
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleEdit(h)}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(h.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No hospitals found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Hospital" : "Add Hospital"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input name="name" placeholder="Hospital Name" value={form.name} onChange={handleChange} />

            <div className="grid grid-cols-2 gap-3">
              <Input name="country" placeholder="Country" value={form.country} onChange={handleChange} />
              <Input name="city" placeholder="City" value={form.city} onChange={handleChange} />
            </div>

            <Input name="address" placeholder="Address" value={form.address} onChange={handleChange} />

            <div className="grid grid-cols-2 gap-3">
              <Input name="founded_year" placeholder="Founded Year" value={form.founded_year} onChange={handleChange} />
              <Input name="hospital_beds" placeholder="Beds" value={form.hospital_beds} onChange={handleChange} />
            </div>

            <RichTextEditor
              label="Hospital Description"
              value={form.description_html}
              onChange={(html) =>
                setForm({ ...form, description_html: html })
              }
              minHeight={250}
              showWordCount
            />

            {form.description_html && (
              <div className="border rounded-lg p-4">
                <p className="text-xs font-semibold mb-2 text-gray-500">
                  Live Preview
                </p>
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: form.description_html,
                  }}
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <DialogFooter>
            <Button disabled={loading} onClick={handleSubmit}>
              {loading ? "Saving..." : editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
