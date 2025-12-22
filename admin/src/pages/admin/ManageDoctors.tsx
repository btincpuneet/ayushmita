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
import RichTextEditor from "@/components/RichTextEditor";

const API_URL = "http://127.0.0.1:5001/api/doctors";
const BASE_URL = "http://127.0.0.1:5001";

interface Doctor {
  id: number;
  name: string;
  title: string;
  specialty: string;
  country: string;
  city: string;
  experience: string;
  short_description: string;
  description: string;
  description_html: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  canonical_url: string;
  status: number;
  image_url?: string;
}

const emptyForm = {
  name: "",
  title: "",
  specialty: "",
  country: "",
  city: "",
  experience: "",
  short_description: "",
  description: "",
  description_html: "",
  seo_title: "",
  seo_description: "",
  seo_keywords: "",
  canonical_url: "",
  status: 1,
  image: null as File | null,
};

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Doctor | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  /* ================= LOAD ================= */
  const loadDoctors = async () => {
    try {
      const res = await axios.get(API_URL);
      setDoctors(res.data.data || []);
    } catch {
      toast.error("Failed to load doctors");
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  /* ================= ADD ================= */
  const handleAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setPreview(null);
    setOpen(true);
  };

  /* ================= EDIT ================= */
  const handleEdit = (item: Doctor) => {
    setEditing(item);
    setForm({
      ...item,
      image: null,
    });

    setPreview(item.image_url ? `${BASE_URL}${item.image_url}` : null);
    setOpen(true);
  };

  /* ================= SAVE ================= */
  const handleSubmit = async () => {
    const fd = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) fd.append(key, value as any);
    });

    try {
      if (editing) {
        await axios.put(`${API_URL}/${editing.id}`, fd);
        toast.success("Doctor updated");
      } else {
        await axios.post(API_URL, fd);
        toast.success("Doctor created");
      }
      setOpen(false);
      loadDoctors();
    } catch {
      toast.error("Save failed");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this doctor?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Doctor deleted");
      loadDoctors();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Doctors</h1>
        <Button onClick={handleAdd}>+ Add Doctor</Button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Specialty</th>
              <th className="p-3">Location</th>
              <th className="p-3">Experience</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((d) => (
              <tr key={d.id} className="border-b">
                <td className="p-3">
                  {d.image_url ? (
                    <img
                      src={`${BASE_URL}${d.image_url}`}
                      className="w-16 h-16 rounded object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded" />
                  )}
                </td>

                <td className="p-3">
                  <div className="font-medium">{d.name}</div>
                  <div className="text-xs text-gray-500">{d.title}</div>
                </td>

                <td className="p-3">{d.specialty}</td>

                <td className="p-3">
                  {d.city}, {d.country}
                </td>

                <td className="p-3">{d.experience} yrs</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      d.status === 1
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {d.status === 1 ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="p-3 text-right">
                  <button
                    onClick={() => handleEdit(d)}
                    className="text-blue-600 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(d.id)}
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
          <p className="text-center py-6 text-gray-500">No doctors found</p>
        )}
      </div>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Doctor" : "Add Doctor"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/>
            <Input placeholder="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})}/>
            <Input placeholder="Specialty" value={form.specialty} onChange={(e)=>setForm({...form,specialty:e.target.value})}/>
            <Input placeholder="Country" value={form.country} onChange={(e)=>setForm({...form,country:e.target.value})}/>
            <Input placeholder="City" value={form.city} onChange={(e)=>setForm({...form,city:e.target.value})}/>
            <Input placeholder="Experience (years)" value={form.experience} onChange={(e)=>setForm({...form,experience:e.target.value})}/>

            <Textarea
              placeholder="Short Description"
              value={form.short_description}
              onChange={(e)=>setForm({...form,short_description:e.target.value})}
            />

            <Textarea
              placeholder="Plain Description"
              value={form.description}
              onChange={(e)=>setForm({...form,description:e.target.value})}
            />

            {/* RICH TEXT EDITOR */}
            <div className="col-span-2">
              <RichTextEditor
                label="Doctor Description (HTML)"
                value={form.description_html}
                onChange={(html)=>setForm({...form,description_html:html})}
                minHeight={250}
              />
            </div>

            {/* HTML PREVIEW */}
            {form.description_html && (
              <div
                className="col-span-2 border rounded-lg p-4 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: form.description_html }}
              />
            )}

            <Input placeholder="SEO Title" value={form.seo_title} onChange={(e)=>setForm({...form,seo_title:e.target.value})}/>
            <Textarea placeholder="SEO Description" value={form.seo_description} onChange={(e)=>setForm({...form,seo_description:e.target.value})}/>
            <Textarea placeholder="SEO Keywords" value={form.seo_keywords} onChange={(e)=>setForm({...form,seo_keywords:e.target.value})}/>
            <Input className="col-span-2" placeholder="Canonical URL" value={form.canonical_url} onChange={(e)=>setForm({...form,canonical_url:e.target.value})}/>

            <select
              className="border p-2 rounded"
              value={form.status}
              onChange={(e)=>setForm({...form,status:Number(e.target.value)})}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>

            <Input
              type="file"
              accept="image/*"
              onChange={(e)=>{
                const file = e.target.files?.[0];
                if (!file) return;
                setForm({...form,image:file});
                setPreview(URL.createObjectURL(file));
              }}
            />

            {preview && (
              <img src={preview} className="col-span-2 h-40 rounded object-cover"/>
            )}
          </div>

          <DialogFooter>
            <Button onClick={handleSubmit}>
              {editing ? "Update Doctor" : "Create Doctor"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageDoctors;
