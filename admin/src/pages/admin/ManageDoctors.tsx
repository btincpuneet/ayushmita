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
import { SearchableSelect } from "@/components/SearchableSelect";


interface Hospital {
  id: number;
  name: string;
}

interface Doctor {
  id: number;
  name: string;
  title: string;
  speciality_id: number;
  country: string;
  city: string;
  experience: string;
  status: number;
  image_url?: string;
  image_alt?: string;
  image_title?: string;
  hospitals?: Hospital[];
}


const emptyForm = {
  name: "",
  title: "",
  speciality_id: "",
  country: "",
  city: "",
  experience: "",
  short_description: "",
  description: "",
  description_html: "",
  faq_html: "",
  image_alt: "",
  image_title: "",

  seo_title: "",
  seo_description: "",
  seo_keywords: "",
  canonical_url: "",
  status: 1,
  hospitals: [] as number[],
  image: null as File | null,
};
interface Speciality {
  id: number;
  name: string;
}


const ManageDoctors = () => {
  function useDebounce<T>(value: T, delay = 400) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
      const timer = setTimeout(() => setDebounced(value), delay);
      return () => clearTimeout(timer);
    }, [value, delay]);

    return debounced;
  }
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
  const [countrySearch, setCountrySearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const debouncedCountry = useDebounce(countrySearch);
  const debouncedCity = useDebounce(citySearch);



  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const SPECIALITY_API = `${API_BASE}/api/diseases`;

  const loadDoctors = async () => {
    const res = await axios.get(DOCTOR_API);
    setDoctors(res.data.data || []);
  };

  const loadHospitals = async () => {
    const res = await axios.get(HOSPITAL_API);
    setHospitals(res.data.data || []);
  };
  useEffect(() => {
    axios.get(SPECIALITY_API)
      .then(res => setSpecialities(res.data.data || []))
      .catch(() => toast.error("Failed to load specialities"));
  }, []);

  useEffect(() => {
    loadDoctors();
    loadHospitals();
  }, []);

  // useEffect(() => {
  //   if (!form.country) {
  //     setCities([]);
  //     return;
  //   }

  //   axios
  //     .get(CITY_API, {
  //       params: debouncedCity
  //         ? { country: form.country, search: debouncedCity }
  //         : { country: form.country },
  //     })
  //     .then((res) =>
  //       setCities(res.data.data.map((c: any) => c.city))
  //     )
  //     .catch(() => toast.error("Failed to load cities"));
  // }, [debouncedCity, form.country]);

  // useEffect(() => {
  //   if (!form.country) {
  //     setCities([]);
  //     return;
  //   }

  //   axios
  //     .get(CITY_API, {
  //       params: debouncedCity
  //         ? { country: form.country, search: debouncedCity }
  //         : { country: form.country },
  //     })
  //     .then((res) =>
  //       setCities(res.data.data.map((c: any) => c.city))
  //     )
  //     .catch(() => toast.error("Failed to load cities"));
  // }, [debouncedCity, form.country]);
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/countries`, {
        params: debouncedCountry ? { search: debouncedCountry } : {},
      })
      .then((res) =>
        setCountries(res.data.data.map((c: any) => c.country))
      )
      .catch(() => toast.error("Failed to load countries"));
  }, [debouncedCountry]);

  useEffect(() => {
    if (!form.country) {
      setCities([]);
      return;
    }

    axios
      .get(`${API_BASE}/api/cities`, {
        params: debouncedCity
          ? { country: form.country, search: debouncedCity }
          : { country: form.country },
      })
      .then((res) =>
        setCities(res.data.data.map((c: any) => c.city))
      )
      .catch(() => toast.error("Failed to load cities"));
  }, [debouncedCity, form.country]);
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
      speciality_id: doctor.speciality_id,

      image_alt: doctor.image_alt || "",
      image_title: doctor.image_title || "",

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
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Something went wrong. Please try again.";

      toast.error(message);
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
      <div className="bg-white rounded border shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image </th>
              <th className="p-3">Img Alt</th>
              <th className="p-3">Img Title</th>
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
                      alt={d.image_alt || d.name}
                      title={d.image_title || d.name}
                      className="w-14 h-14 rounded object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gray-200 rounded" />
                  )}
                </td>
                <td className="p-3 text-xs">
                  {d.image_alt || "-"}
                </td>
                <td className="p-3 text-xs">
                  {d.image_title || "-"}
                </td>
                <td className="p-3 font-medium">{d.name}</td>
                <td className="p-3">
                  {specialities.find(s => s.id === d.speciality_id)?.name || "-"}
                </td>
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
                <td className="flex gap-[10px] p-[15px]">
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
        <DialogContent className="max-w-7xl">
          <div className="max-h-[70vh] overflow-y-auto pr-2">
            <DialogHeader>
              <DialogTitle>
                {editing ? "Edit Doctor" : "Add Doctor"}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Doctor Name *
                </label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Title / Designation
                </label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

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
                                  ? form.hospitals.filter(id => id !== h.id)
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

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Speciality *
                </label>

                <select
                  className="border rounded px-3 py-2 text-sm w-full"
                  value={form.speciality_id}
                  onChange={(e) =>
                    setForm({ ...form, speciality_id: Number(e.target.value) })
                  }
                >
                  <option value="">Select speciality</option>
                  {specialities.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Experience
                </label>
                <Input
                  type="number"
                  min={0}
                  step={1}
                  value={form.experience}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      experience: e.target.value === ""
                        ? ""
                        : Math.max(0, Number(e.target.value)),
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") e.preventDefault();
                  }}
                />
              </div>


              <div>
                <label className="text-sm font-medium mb-1 block">
                  Country
                </label>

                <SearchableSelect
                  options={countries}
                  value={form.country}
                  placeholder="Select country"
                  searchPlaceholder="Search country..."
                  onSearch={setCountrySearch}
                  onChange={(value) => {
                    setForm({ ...form, country: value, city: "" });
                    setCitySearch("");
                  }}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  City
                </label>

                <SearchableSelect
                  options={cities}
                  value={form.city}
                  disabled={!form.country}
                  placeholder={
                    form.country ? "Select city" : "Select country first"
                  }
                  searchPlaceholder="Search city..."
                  onSearch={setCitySearch}
                  onChange={(value) =>
                    setForm({ ...form, city: value })
                  }
                />
              </div>



              <div>
                <label className="text-sm font-medium mb-1 block">
                  Status
                </label>
                <select
                  className="border rounded px-3 py-2 text-sm w-full"
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: Number(e.target.value) })
                  }
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Doctor Image
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setForm({ ...form, image: file });
                    setPreview(URL.createObjectURL(file));
                  }}
                  name="filename"
                />
              </div>

              {preview && (
                <img
                  src={preview}
                  className="col-span-2 h-40 rounded object-cover"
                />
              )}

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Image ALT (SEO)
                </label>
                <Input
                  value={form.image_alt}
                  onChange={(e) =>
                    setForm({ ...form, image_alt: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Image Title
                </label>
                <Input
                  value={form.image_title}
                  onChange={(e) =>
                    setForm({ ...form, image_title: e.target.value })
                  }
                />
              </div>

              <div className="col-span-2">
                <label className="text-sm font-medium mb-1 block">
                  Short Description
                </label>
                <Textarea
                  value={form.short_description}
                  onChange={(e) =>
                    setForm({ ...form, short_description: e.target.value })
                  }
                />
              </div>

              <div className="col-span-2">
                <label className="text-sm font-medium mb-1 block">
                  Description
                </label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              <div className="col-span-2">
                <label className="text-sm font-medium mb-1 block">
                  Doctor Full Description
                </label>
                <RichTextEditor
                  value={form.description_html}
                  onChange={(html) =>
                    setForm({ ...form, description_html: html })
                  }
                  minHeight={250}
                  showWordCount
                />
              </div>

              <div className="col-span-2">
                <label className="text-sm font-medium mb-1 block">
                  Doctor FAQ
                </label>
                <RichTextEditor
                  value={form.faq_html}
                  onChange={(html) =>
                    setForm({ ...form, faq_html: html })
                  }
                  minHeight={200}
                  showWordCount
                />
              </div>


              <div>
                <label className="text-sm font-medium mb-1 block">
                  SEO Title
                </label>
                <Input
                  value={form.seo_title}
                  onChange={(e) =>
                    setForm({ ...form, seo_title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Canonical URL
                </label>
                <Input
                  value={form.canonical_url}
                  onChange={(e) =>
                    setForm({ ...form, canonical_url: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  SEO Description
                </label>
                <Textarea
                  value={form.seo_description}
                  onChange={(e) =>
                    setForm({ ...form, seo_description: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  SEO Keywords
                </label>
                <Textarea
                  value={form.seo_keywords}
                  onChange={(e) =>
                    setForm({ ...form, seo_keywords: e.target.value })
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleSubmit}>
                {editing ? "Update Doctor" : "Create Doctor"}
              </Button>
            </DialogFooter>

          </div>

        </DialogContent>
      </Dialog>


    </div>
  );
};

export default ManageDoctors;
