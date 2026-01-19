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
import { authHeader } from "@/utils/auth";

const API_URL = `${API_BASE}/api/hospitals`;

const emptyForm = {
  name: "",
  country: "",
  city: "",
  address: "",
  founded_year: "",
  hospital_beds: "",
  description_html: "",
  seo_title: "",
  seo_description: "",
  seo_keywords: "",
  canonical_url: "",
  status: "active",
  image_alt: "",
  image_title: "",
};


export default function ManageTopPartnerHospitals() {
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = React.useRef<HTMLInputElement | null>(null);


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

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/countries`)
      .then((res) => setCountries(res.data.data.map((c: any) => c.country)))
      .catch(() => toast.error("Failed to load countries"));
  }, []);

  useEffect(() => {
    if (!form.country) {
      setCities([]);
      return;
    }

    axios
      .get(`${API_BASE}/api/cities`, {
        params: { country: form.country },
      })
      .then((res) => setCities(res.data.data.map((c: any) => c.city)))
      .catch(() => toast.error("Failed to load cities"));
  }, [form.country]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
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
      seo_title: item.seo_title || "",
      seo_description: item.seo_description || "",
      seo_keywords: item.seo_keywords || "",
      canonical_url: item.canonical_url || "",
      status: item.status || "active",
      image_alt: item.image_alt || "",
      image_title: item.image_title || "",
    });

    setPreview(item.image_url ? `${API_BASE}${item.image_url}` : null);

    setFile(null);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this hospital?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: authHeader(),
      });
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
      Object.entries(form).forEach(([k, v]) => fd.append(k, v as string));
      if (file) fd.append("image", file);

      const config = {
        headers: {
          ...authHeader(),
          "Content-Type": "multipart/form-data",
        },
      };

      if (editing) {
        await axios.put(`${API_URL}/${editing}`, fd, config);
        toast.success("Updated successfully");
      } else {
        await axios.post(API_URL, fd, config);
        toast.success("Created successfully");
      }

      setOpen(false);
      fetchHospitals();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Unable to save hospital details. Please check the form and try again.";

      toast.error(message);
    }
    finally {
      setLoading(false);
    }
  };



  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Manage Hospitals</h1>
        <Button onClick={handleCreate}>Add Hospital</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Image Alt</th>
              <th className="p-2 border">Image Title</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Beds</th>
              <th className="p-2 border">Founded</th>
              <th className="p-2 border">Status</th>

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
                      alt={h.image_alt || h.name}
                      title={h.image_title || h.name}
                      className="w-16 h-16 rounded object-cover"
                    />

                  </td>
                  <td className="p-2 border text-sm">
                    {h.image_alt || "-"}
                  </td>

                  <td className="p-2 border text-sm">
                    {h.image_title || "-"}
                  </td>
                  <td className="p-2 border font-semibold">{h.name}</td>
                  <td className="p-2 border">{h.city}, {h.country}</td>
                  <td className="p-2 border text-center">{h.hospital_beds || "-"}</td>
                  <td className="p-2 border text-center">{h.founded_year || "-"}</td>
                  <td className="p-2 border text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${h.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {h.status}
                    </span>
                  </td>

                  <td className="p-2 border">
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleEdit(h)}>Edit</Button>
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
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Hospital" : "Add Hospital"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input name="name" placeholder="Hospital Name" value={form.name} onChange={handleChange} />

            <div className="grid grid-cols-2 gap-3">
              <select
                className="border rounded px-3 py-2 text-sm"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value, city: "" })}
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <select
                className="border rounded px-3 py-2 text-sm"
                value={form.city}
                disabled={!form.country}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              >
                <option value="">Select City</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <Input name="address" placeholder="Address" value={form.address} onChange={handleChange} />

            <div className="grid grid-cols-2 gap-3">
              <Input name="founded_year" placeholder="Founded Year" value={form.founded_year} onChange={handleChange} />
              <Input name="hospital_beds" placeholder="Beds" value={form.hospital_beds} onChange={handleChange} />
            </div>

            <RichTextEditor
              label="Hospital Description"
              value={form.description_html}
              onChange={(html) => setForm({ ...form, description_html: html })}
              minHeight={250}
              showWordCount
            />
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>


            <div className="border rounded-lg p-4 space-y-3">
              <p className="text-sm font-semibold text-gray-600">SEO Settings</p>
              <Input name="seo_title" placeholder="SEO Title" value={form.seo_title} onChange={handleChange} />
              <Input name="seo_description" placeholder="SEO Description" value={form.seo_description} onChange={handleChange} />
              <Input name="seo_keywords" placeholder="SEO Keywords" value={form.seo_keywords} onChange={handleChange} />
              <Input name="canonical_url" placeholder="Canonical URL" value={form.canonical_url} onChange={handleChange} />
            </div>
            <label className="text-sm font-medium mb-1 block">
              Image
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0] || null;
                setFile(selectedFile);

                if (selectedFile) {
                  setPreview(URL.createObjectURL(selectedFile));
                }
              }}

            />
            {preview && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">
                  {editing ? "Current Hospital Image" : "Selected Image"}
                </p>

                <img
                  src={preview}
                  alt="Hospital Preview"
                  className="w-40 h-40 object-cover rounded border"
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Image ALT (SEO)
                </label>
                <Input
                  name="image_alt"
                  value={form.image_alt}
                  onChange={handleChange}
                  placeholder="Hospital image alt text"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Image Title
                </label>
                <Input
                  name="image_title"
                  value={form.image_title}
                  onChange={handleChange}
                  placeholder="Hospital image title"
                />
              </div>
            </div>

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
