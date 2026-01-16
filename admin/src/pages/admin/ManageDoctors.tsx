import { useEffect, useState } from "react";
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
import RichTextEditor from "@/components/RichTextEditor";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";


interface Hospital {
  id: number;
  name: string;
}

interface Doctor {
  id: number;
  name: string;
  title: string;
  specialty: string;
  country: string;
  city: string;
  experience: string;
  status: number;
  image_url?: string;
  hospitals?: Hospital[];
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
  hospitals: [] as number[],
  image: null as File | null,
};

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Doctor | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const DOCTOR_API = `${API_BASE}/api/doctors`;
  const HOSPITAL_API = `${API_BASE}/api/hospitals`;
  const COUNTRY_API = `${API_BASE}/api/countries`;
  const CITY_API = `${API_BASE}/api/cities`;

  const loadDoctors = async () => {
    const res = await axios.get(DOCTOR_API);
    setDoctors(res.data.data || []);
  };

  const loadHospitals = async () => {
    const res = await axios.get(HOSPITAL_API);
    setHospitals(res.data.data || []);
  };

  useEffect(() => {
    loadDoctors();
    loadHospitals();
  }, []);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const res = await axios.get(COUNTRY_API);
        setCountries(res.data.data.map((c: any) => c.country));
      } catch {
        toast.error("Failed to load countries");
      }
    };

    loadCountries();
  }, []);
  useEffect(() => {
    if (!form.country) {
      setCities([]);
      setForm({ ...form, city: "" });
      return;
    }

    const loadCities = async () => {
      try {
        const res = await axios.get(CITY_API, {
          params: { country: form.country },
        });
        setCities(res.data.data.map((c: any) => c.city));
      } catch {
        toast.error("Failed to load cities");
      }
    };

    loadCities();
  }, [form.country]);

  const handleAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setPreview(null);
    setOpen(true);
  };

  const handleEdit = (doctor: Doctor) => {
    setEditing(doctor);
    setForm({
      ...emptyForm,
      ...doctor,
      hospitals: doctor.hospitals?.map((h) => h.id) || [],
      image: null,
    });
    setPreview(
      doctor.image_url ? `${API_BASE}${doctor.image_url}` : null
    );
    setOpen(true);
    if (doctor.country) {
      axios
        .get(CITY_API, { params: { country: doctor.country } })
        .then((res) =>
          setCities(res.data.data.map((c: any) => c.city))
        );
    }

  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this doctor?")) return;
    try {
      await axios.delete(`${DOCTOR_API}/${id}`);
      toast.success("Doctor deleted");
      loadDoctors();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleSubmit = async () => {
    const fd = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => fd.append(`${key}[]`, String(v)));
      } else if (value !== null) {
        fd.append(key, value as any);
      }
    });

    try {
      if (editing) {
        await axios.put(`${DOCTOR_API}/${editing.id}`, fd);
        toast.success("Doctor updated");
      } else {
        await axios.post(DOCTOR_API, fd);
        toast.success("Doctor created");
      }
      setOpen(false);
      loadDoctors();
    } catch {
      toast.error("Save failed");
    }
  };

  const selectedHospitalNames = hospitals
    .filter((h) => form.hospitals.includes(h.id))
    .map((h) => h.name)
    .join("");




  return (
    <div className="p-6">
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
              <th className="p-3">Experience</th>
              <th className="p-3">Hospitals</th>
              <th className="p-3">Location</th>
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
                      src={`${API_BASE}${d.image_url}`}
                      alt={`${d.name} - ${d.specialty || "Doctor"}`}
                      title={`${d.name} - ${d.specialty || "Doctor"}`}
                      className="w-14 h-14 rounded object-cover"
                    />

                  ) : (
                    <div className="w-14 h-14 bg-gray-200 rounded" />
                  )}
                </td>

                <td className="p-3 font-medium">{d.name}</td>
                <td className="p-3">{d.specialty}</td>
                <td className="p-3">{d.experience || "-"}</td>
                <td className="p-3 text-xs text-gray-600">
                  {d.hospitals?.map((h) => h.name).join("") || "-"}
                </td>
                <td className="p-3">
                  {d.city}, {d.country}
                </td>
                <td className="p-3">
                  {d.status === 1 ? "Active" : "Inactive"}
                </td>
                <td className="space-x-2 text-right">
                  <Button size="sm" onClick={() => handleEdit(d)}>
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(d.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Doctor" : "Add Doctor"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Doctor Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <div className="col-span-2">
              <label className="text-sm font-medium mb-1 block">
                Select Hospitals
              </label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between text-left"
                  >
                    <span className="truncate">
                      {selectedHospitalNames || "Select hospitals"}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-2">
                  <ScrollArea className="h-52">
                    {hospitals.map((h) => {
                      const checked = form.hospitals.includes(h.id);
                      return (
                        <div
                          key={h.id}
                          className="flex items-center gap-2 p-2 hover:bg-muted rounded cursor-pointer"
                          onClick={() =>
                            setForm({
                              ...form,
                              hospitals: checked
                                ? form.hospitals.filter(
                                  (id) => id !== h.id
                                )
                                : [...form.hospitals, h.id],
                            })
                          }
                        >
                          <Checkbox checked={checked} />
                          <span className="text-sm">{h.name}</span>
                        </div>
                      );
                    })}
                  </ScrollArea>
                </PopoverContent>
              </Popover>
            </div>

            <Input
              placeholder="Title / Designation"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <Input
              placeholder="Specialty *"
              value={form.specialty}
              onChange={(e) =>
                setForm({ ...form, specialty: e.target.value })
              }
            />

            <Input
              placeholder="Experience (e.g. 10 Years)"
              value={form.experience}
              onChange={(e) =>
                setForm({ ...form, experience: e.target.value })
              }
            />

            <select
              className="border rounded px-3 py-2 text-sm"
              value={form.country}
              onChange={(e) =>
                setForm({ ...form, country: e.target.value, city: "" })
              }
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>


            <select
              className="border rounded px-3 py-2 text-sm"
              value={form.city}
              disabled={!form.country}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>


            <select
              className="border rounded px-3 py-2 text-sm"
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: Number(e.target.value) })
              }
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setForm({ ...form, image: file });
                setPreview(URL.createObjectURL(file));
              }}
            />

            {preview && (
              <img
                src={preview}
                className="col-span-2 h-40 rounded object-cover"
              />
            )}

            <Textarea
              className="col-span-2"
              placeholder="Short Description"
              value={form.short_description}
              onChange={(e) =>
                setForm({
                  ...form,
                  short_description: e.target.value,
                })
              }
            />

            <Textarea
              className="col-span-2"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />


            <div className="col-span-2">
              <RichTextEditor
                label="Doctor Full Description"
                value={form.description_html}
                onChange={(html) =>
                  setForm({ ...form, description_html: html })
                }
              />
            </div>


            <Input
              placeholder="SEO Title"
              value={form.seo_title}
              onChange={(e) =>
                setForm({ ...form, seo_title: e.target.value })
              }
            />

            <Input
              placeholder="Canonical URL"
              value={form.canonical_url}
              onChange={(e) =>
                setForm({ ...form, canonical_url: e.target.value })
              }
            />

            <Textarea
              placeholder="SEO Description"
              value={form.seo_description}
              onChange={(e) =>
                setForm({ ...form, seo_description: e.target.value })
              }
            />

            <Textarea
              placeholder="SEO Keywords"
              value={form.seo_keywords}
              onChange={(e) =>
                setForm({ ...form, seo_keywords: e.target.value })
              }
            />


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
