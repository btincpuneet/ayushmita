// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "sonner";

// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const quillModules = {
//   toolbar: [
//     [{ header: [1, 2, 3, false] }],
//     ["bold", "italic", "underline"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ align: [] }],
//     ["link", "image"],
//     ["code-block"],
//     ["clean"],
//   ],
// };

// const quillFormats = [
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "list",
//   "bullet",
//   "align",
//   "link",
//   "image",
//   "code-block",
// ];

// const API_TREATMENT = "http://127.0.0.1:5001/api/treatments";
// const API_DISEASE = "http://127.0.0.1:5001/api/diseases";
// const API_SINGLE_TREATMENT = "http://127.0.0.1:5001/api/treatments/single";

// const ManageTreatments = () => {
//   const [filteredTreatments, setFilteredTreatments] = useState([]);
//   const [diseases, setDiseases] = useState([]);
//   const [selectedDiseaseForFilter, setSelectedDiseaseForFilter] = useState("");

//   const [selectedTreatmentSlug, setSelectedTreatmentSlug] = useState("");
//   const [singleTreatment, setSingleTreatment] = useState(null);

//   const [open, setOpen] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [preview, setPreview] = useState(null);

//   const [form, setForm] = useState({
//     disease_id: "",
//     name: "",
//     slug: "",
//     short_description: "",
//     description_html: "",
//     seo_title: "",
//     seo_description: "",
//     seo_keywords: "",
//     canonical_url: "",
//     status: "active",
//     image: null,
//   });

//   useEffect(() => {
//     loadDiseases();
//   }, []);

//   useEffect(() => {
//     if (selectedTreatmentSlug) loadSingleTreatment(selectedTreatmentSlug);
//   }, [selectedTreatmentSlug]);

//   const loadDiseases = async () => {
//     try {
//       const res = await axios.get(API_DISEASE);
//       setDiseases(res.data.data);
//     } catch { }
//   };

//   const loadTreatmentsByDisease = async (id) => {
//     try {
//       const res = await axios.get(`${API_TREATMENT}/disease/${id}`);
//       setFilteredTreatments(res.data.treatments);
//     } catch { }
//   };

//   const loadSingleTreatment = async (slug) => {
//     try {
//       const res = await axios.get(`${API_SINGLE_TREATMENT}/${slug}`);
//       setSingleTreatment(res.data.treatment);
//     } catch {
//       setSingleTreatment(null);
//     }
//   };

//   const handleAdd = () => {
//     setEditing(null);
//     setForm({
//       disease_id: "",
//       name: "",
//       slug: "",
//       short_description: "",
//       description_html: "",
//       seo_title: "",
//       seo_description: "",
//       seo_keywords: "",
//       canonical_url: "",
//       status: "active",
//       image: null,
//     });
//     setPreview(null);
//     setOpen(true);
//   };

//   const handleEdit = () => {
//     if (!singleTreatment) return;

//     setEditing(singleTreatment);
//     setForm({
//       disease_id: Number(singleTreatment.disease_id),
//       name: singleTreatment.name,
//       slug: singleTreatment.slug,
//       short_description: singleTreatment.short_description,
//       description_html: singleTreatment.description_html,
//       seo_title: singleTreatment.seo_title,
//       seo_description: singleTreatment.seo_description,
//       seo_keywords: singleTreatment.seo_keywords,
//       canonical_url: singleTreatment.canonical_url,
//       status: singleTreatment.status == 1 ? "active" : "inactive",
//       image: null,
//     });

//     if (singleTreatment.image_base64) {
//       setPreview(`data:image/png;base64,${singleTreatment.image_base64}`);
//     }

//     setOpen(true);
//   };

//   const handleSubmit = async () => {
//     try {
//       if (!form.disease_id) {
//         toast.error("Select disease");
//         return;
//       }

//       const fd = new FormData();

//       Object.keys(form).forEach((key) => {
//         if (key === "disease_id") fd.append("disease_id", Number(form.disease_id));
//         else if (key === "status") fd.append("status", form.status === "active" ? 1 : 0);
//         else fd.append(key, form[key]);
//       });

//       if (editing) {
//         await axios.put(`${API_TREATMENT}/${editing.id}`, fd);
//         toast.success("Updated successfully");
//       } else {
//         await axios.post(API_TREATMENT, fd);
//         toast.success("Treatment added");
//       }

//       setOpen(false);

//       if (selectedDiseaseForFilter) loadTreatmentsByDisease(selectedDiseaseForFilter);
//       if (selectedTreatmentSlug) loadSingleTreatment(selectedTreatmentSlug);
//     } catch {
//       toast.error("Failed to save treatment");
//     }
//   };

//   const handleDelete = async () => {
//     if (!singleTreatment) return;
//     if (!confirm("Delete this treatment?")) return;

//     try {
//       await axios.delete(`${API_TREATMENT}/${singleTreatment.id}`);
//       toast.success("Deleted");

//       if (selectedDiseaseForFilter) loadTreatmentsByDisease(selectedDiseaseForFilter);

//       setSingleTreatment(null);
//       setSelectedTreatmentSlug("");
//     } catch { }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between mb-6">
//         <h1 className="text-2xl font-bold">Manage Treatments</h1>
//         <Button onClick={handleAdd}>+ Add Treatment</Button>
//       </div>

//       {/* FILTER BOX */}
//       <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-4">
//         <div>
//           <p className="font-semibold mb-1">Select Disease</p>
//           <select
//             className="border rounded p-2 w-full"
//             value={selectedDiseaseForFilter}
//             onChange={(e) => {
//               const id = Number(e.target.value);
//               setSelectedDiseaseForFilter(id);
//               setSelectedTreatmentSlug("");
//               setSingleTreatment(null);
//               if (id) loadTreatmentsByDisease(id);
//             }}
//           >
//             <option value="">-- Select Disease --</option>
//             {diseases.map((d) => (
//               <option key={d.id} value={d.id}>
//                 {d.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {selectedDiseaseForFilter && (
//           <div>
//             <p className="font-semibold mb-1">Select Treatment</p>
//             <select
//               className="border rounded p-2 w-full"
//               value={selectedTreatmentSlug}
//               onChange={(e) => setSelectedTreatmentSlug(e.target.value)}
//             >
//               <option value="">-- Select Treatment --</option>
//               {filteredTreatments.map((t) => (
//                 <option key={t.id} value={t.slug}>
//                   {t.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}
//       </div>

//       {/* SINGLE TREATMENT VIEW */}
//       {singleTreatment && (
//         <div className="p-4 bg-white rounded shadow mb-6">
//           <div className="flex justify-between items-start">
//             <h2 className="text-xl font-bold">{singleTreatment.name}</h2>
//             <div className="flex gap-3">
//               <Button onClick={handleEdit}>Edit</Button>
//               <Button variant="destructive" onClick={handleDelete}>
//                 Delete
//               </Button>
//             </div>
//           </div>

//           {singleTreatment.image && (
//             <img
//               src={`http://127.0.0.1:5001${singleTreatment.image}`}
//               alt="Treatment"
//               className="w-60 rounded my-4"
//             />
//           )}

//           <div
//             className="prose max-w-none"
//             dangerouslySetInnerHTML={{ __html: singleTreatment.description_html }}
//           />


//           {/* <div
//             className="prose mt-4"
//             dangerouslySetInnerHTML={{
//               __html: singleTreatment.description_html,
//             }}
//           /> */}
//         </div>
//       )}

//       {/* DIALOG FORM */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="max-h-[90vh] overflow-y-auto  max-w-4xl w-full">
//           <DialogHeader>
//             <DialogTitle>{editing ? "Edit Treatment" : "Add Treatment"}</DialogTitle>
//           </DialogHeader>

//           <div className="grid gap-5 mt-3">

//             {/* Row 1 */}
//             <select
//               className="border rounded p-2"
//               value={form.disease_id}
//               onChange={(e) => setForm({ ...form, disease_id: Number(e.target.value) })}
//             >
//               <option value="">Select Disease</option>
//               {diseases.map((d) => (
//                 <option key={d.id} value={d.id}>
//                   {d.name}
//                 </option>
//               ))}
//             </select>

//             <Input
//               placeholder="Treatment Name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />

//             <Input
//               placeholder="Slug"
//               value={form.slug}
//               onChange={(e) => setForm({ ...form, slug: e.target.value })}
//             />

//             {/* SHORT DESC */}
//             <div>
//               <p className="font-medium mb-1">Short Description</p>
//               <ReactQuill
//                 modules={quillModules}
//                 formats={quillFormats}
//                 value={form.short_description}
//                 onChange={(value) => setForm({ ...form, short_description: value })}
//               />
//             </div>

//             {/* FULL DESC */}
//             <div>
//               <p className="font-medium mb-1">Full Description</p>
//               <ReactQuill
//                 modules={quillModules}
//                 formats={quillFormats}
//                 value={form.description_html}
//                 onChange={(value) => setForm({ ...form, description_html: value })}
//               />
//             </div>

//             {/* SEO FIELDS */}
//             <div className="grid gap-4">
//               <Input
//                 placeholder="SEO Title"
//                 value={form.seo_title}
//                 onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
//               />

//               <Textarea
//                 placeholder="SEO Description"
//                 value={form.seo_description}
//                 onChange={(e) => setForm({ ...form, seo_description: e.target.value })}
//               />

//               <Input
//                 placeholder="SEO Keywords"
//                 value={form.seo_keywords}
//                 onChange={(e) => setForm({ ...form, seo_keywords: e.target.value })}
//               />

//               <Input
//                 placeholder="Canonical URL"
//                 value={form.canonical_url}
//                 onChange={(e) => setForm({ ...form, canonical_url: e.target.value })}
//               />
//             </div>

//             {/* STATUS */}
//             <select
//               className="border rounded p-2"
//               value={form.status}
//               onChange={(e) => setForm({ ...form, status: e.target.value })}
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>

//             {/* IMAGE UPLOAD */}
//             <div>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   const file = e.target.files[0];
//                   setForm({ ...form, image: file });
//                   if (file) setPreview(URL.createObjectURL(file));
//                 }}
//               />

//               {preview && (
//                 <img src={preview} className="w-40 mt-3 rounded shadow" />
//               )}
//             </div>
//           </div>

//           <DialogFooter className="mt-4">
//             <Button onClick={handleSubmit}>{editing ? "Update" : "Create"}</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ManageTreatments;

import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
const BASE_URL = "http://127.0.0.1:5001";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "image"],
    ["code-block"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "align",
  "link",
  "image",
  "code-block",
];

const API_TREATMENT = "http://127.0.0.1:5001/api/treatments";
const API_DISEASE = "http://127.0.0.1:5001/api/diseases";
const API_SINGLE_TREATMENT = "http://127.0.0.1:5001/api/treatments/single";

const ManageTreatments = () => {
  const [filteredTreatments, setFilteredTreatments] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [selectedDiseaseForFilter, setSelectedDiseaseForFilter] = useState("");

  const [selectedTreatmentSlug, setSelectedTreatmentSlug] = useState("");
  const [singleTreatment, setSingleTreatment] = useState(null);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    disease_id: "",
    name: "",
    slug: "",
    short_description: "",
    description_html: "",
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    canonical_url: "",
    status: "active",
    image: null,
  });

  useEffect(() => {
    loadDiseases();
  }, []);

  useEffect(() => {
    if (selectedTreatmentSlug) loadSingleTreatment(selectedTreatmentSlug);
  }, [selectedTreatmentSlug]);

  const loadDiseases = async () => {
    const res = await axios.get(API_DISEASE);
    setDiseases(res.data.data);
  };

  const loadTreatmentsByDisease = async (id) => {
    const res = await axios.get(`${API_TREATMENT}/disease/${id}`);
    setFilteredTreatments(res.data.treatments);
  };

  const loadSingleTreatment = async (slug) => {
    const res = await axios.get(`${API_SINGLE_TREATMENT}/${slug}`);
    setSingleTreatment(res.data.treatment);
  };

  const handleAdd = () => {
    setEditing(null);
    setForm({
      disease_id: "",
      name: "",
      slug: "",
      short_description: "",
      description_html: "",
      seo_title: "",
      seo_description: "",
      seo_keywords: "",
      canonical_url: "",
      status: "active",
      image: null,
    });
    setPreview(null);
    setOpen(true);
  };

  const handleEdit = () => {
    if (!singleTreatment) return;

    setEditing(singleTreatment);

    setForm({
      disease_id: Number(singleTreatment.disease_id),
      name: singleTreatment.name,
      slug: singleTreatment.slug,
      short_description: singleTreatment.short_description,
      description_html: singleTreatment.description_html,
      seo_title: singleTreatment.seo_title,
      seo_description: singleTreatment.seo_description,
      seo_keywords: singleTreatment.seo_keywords,
      canonical_url: singleTreatment.canonical_url,
      status: singleTreatment.status == 1 ? "active" : "inactive",
      image: null,
    });

    setPreview(singleTreatment.image);
    setOpen(true);
  };

  const handleSubmit = async () => {
    const fd = new FormData();

    fd.append("disease_id", form.disease_id);
    fd.append("name", form.name);
    fd.append("slug", form.slug);
    fd.append("short_description", form.short_description);
    fd.append("description_html", form.description_html);
    fd.append("seo_title", form.seo_title);
    fd.append("seo_description", form.seo_description);
    fd.append("seo_keywords", form.seo_keywords);
    fd.append("canonical_url", form.canonical_url);
    fd.append("status", form.status === "active" ? 1 : 0);

    if (form.image) fd.append("image", form.image);

    if (editing) {
      await axios.put(`${API_TREATMENT}/${editing.id}`, fd);
      toast.success("Updated successfully");
    } else {
      await axios.post(API_TREATMENT, fd);
      toast.success("Treatment added");
    }

    setOpen(false);

    if (selectedDiseaseForFilter) loadTreatmentsByDisease(selectedDiseaseForFilter);
    if (selectedTreatmentSlug) loadSingleTreatment(selectedTreatmentSlug);
  };

  const handleDelete = async () => {
    if (!singleTreatment) return;
    if (!confirm("Delete this treatment?")) return;

    await axios.delete(`${API_TREATMENT}/${singleTreatment.id}`);
    toast.success("Deleted");

    loadTreatmentsByDisease(selectedDiseaseForFilter);
    setSingleTreatment(null);
    setSelectedTreatmentSlug("");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Treatments</h1>
        <Button onClick={handleAdd}>+ Add Treatment</Button>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold mb-1">Select Disease</p>
          <select
            className="border rounded p-2 w-full"
            value={selectedDiseaseForFilter}
            onChange={(e) => {
              const id = Number(e.target.value);
              setSelectedDiseaseForFilter(id);
              setSelectedTreatmentSlug("");
              setSingleTreatment(null);
              if (id) loadTreatmentsByDisease(id);
            }}
          >
            <option value="">-- Select Disease --</option>
            {diseases.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {selectedDiseaseForFilter && (
          <div>
            <p className="font-semibold mb-1">Select Treatment</p>
            <select
              className="border rounded p-2 w-full"
              value={selectedTreatmentSlug}
              onChange={(e) => setSelectedTreatmentSlug(e.target.value)}
            >
              <option value="">-- Select Treatment --</option>
              {filteredTreatments.map((t) => (
                <option key={t.id} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {singleTreatment && (
        <div className="p-4 bg-white rounded shadow mb-6">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold">{singleTreatment.name}</h2>
            <div className="flex gap-3">
              <Button onClick={handleEdit}>Edit</Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>

          {singleTreatment.image && (
            <img
              src={`${BASE_URL}${singleTreatment?.image}`}
              className="w-60 rounded my-4"
            />
          )}

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: singleTreatment.description_html }}
          />
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Treatment" : "Add Treatment"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-5 mt-3">
            <select
              className="border rounded p-2"
              value={form.disease_id}
              onChange={(e) => setForm({ ...form, disease_id: Number(e.target.value) })}
            >
              <option value="">Select Disease</option>
              {diseases.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            <Input
              placeholder="Treatment Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <Input
              placeholder="Slug"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
            />

            <div>
              <p className="font-medium mb-1">Short Description</p>
              <ReactQuill
                modules={quillModules}
                formats={quillFormats}
                value={form.short_description}
                onChange={(value) => setForm({ ...form, short_description: value })}
              />
            </div>

            <div>
              <p className="font-medium mb-1">Full Description</p>
              <ReactQuill
                modules={quillModules}
                formats={quillFormats}
                value={form.description_html}
                onChange={(value) => setForm({ ...form, description_html: value })}
              />
            </div>

            <Input
              placeholder="SEO Title"
              value={form.seo_title}
              onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
            />

            <Textarea
              placeholder="SEO Description"
              value={form.seo_description}
              onChange={(e) => setForm({ ...form, seo_description: e.target.value })}
            />

            <Input
              placeholder="SEO Keywords"
              value={form.seo_keywords}
              onChange={(e) => setForm({ ...form, seo_keywords: e.target.value })}
            />

            <Input
              placeholder="Canonical URL"
              value={form.canonical_url}
              onChange={(e) => setForm({ ...form, canonical_url: e.target.value })}
            />

            <select
              className="border rounded p-2"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setForm({ ...form, image: file });
                  if (file) setPreview(URL.createObjectURL(file));
                }}
              />

              {preview && (
<img
  src={`${BASE_URL}${singleTreatment?.image}`}
  className="w-60 rounded my-4"
/>              )}
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button onClick={handleSubmit}>{editing ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageTreatments;
