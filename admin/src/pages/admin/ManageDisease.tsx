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

// const API_URL = "http://127.0.0.1:5001/api/diseases";

// const ManageDiseases = () => {
//   const [diseases, setDiseases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [editing, setEditing] = useState(null);

//   const [form, setForm] = useState({
//     name: "",
//     slug: "",
//     short_description: "",
//     description_html: "",
//     seo_title: "",
//     seo_description: "",
//     seo_keywords: "",
//     status: 1,
//     image: null,
//   });

//   const [preview, setPreview] = useState(null);

//   // ----------------------------------------
//   // Fetch List
//   // ----------------------------------------
//   const loadDiseases = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(API_URL);
//       setDiseases(res.data.data || []);
//     } catch {
//       toast.error("Failed to load diseases");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadDiseases();
//   }, []);

//   // ----------------------------------------
//   // Generic Change Handler
//   // ----------------------------------------
//   const updateForm = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   // ----------------------------------------
//   // Auto Slug Generator
//   // ----------------------------------------
//   const generateSlug = (name) => {
//     return name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
//   };

//   // ----------------------------------------
//   // Add New
//   // ----------------------------------------
//   const handleAdd = () => {
//     setEditing(null);
//     setForm({
//       name: "",
//       slug: "",
//       short_description: "",
//       description_html: "",
//       seo_title: "",
//       seo_description: "",
//       seo_keywords: "",
//       status: 1,
//       image: null,
//     });
//     setPreview(null);
//     setOpen(true);
//   };

//   // ----------------------------------------
//   // Edit
//   // ----------------------------------------
//   const handleEdit = (item) => {
//     setEditing(item);

//     setForm({
//       name: item.name,
//       slug: item.slug,
//       short_description: item.short_description,
//       description_html: item.description_html,
//       seo_title: item.seo_title,
//       seo_description: item.seo_description,
//       seo_keywords: item.seo_keywords,
//       status: item.status,
//       image: null,
//     });

//     setPreview(item.image ? `http://127.0.0.1:5001${item.image}` : null);
//     setOpen(true);
//   };

//   // ----------------------------------------
//   // Submit
//   // ----------------------------------------
//   const handleSubmit = async () => {
//     const fd = new FormData();
//     Object.entries(form).forEach(([key, value]) => {
//       if (value !== null) fd.append(key, value);
//     });

//     try {
//       if (editing) {
//         await axios.put(`${API_URL}/${editing.id}`, fd);
//         toast.success("Disease updated");
//       } else {
//         await axios.post(API_URL, fd);
//         toast.success("Disease added");
//       }
//       setOpen(false);
//       loadDiseases();
//     } catch {
//       toast.error("Save failed");
//     }
//   };

//   // ----------------------------------------
//   // Delete
//   // ----------------------------------------
//   const handleDelete = async (id) => {
//     if (!confirm("Delete this disease?")) return;

//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       toast.success("Deleted successfully");
//       loadDiseases();
//     } catch {
//       toast.error("Delete failed");
//     }
//   };

//   // ----------------------------------------
//   // Quill Editor Config
//   // ----------------------------------------
//   const quillModules = {
//     toolbar: [
//       [{ header: [1, 2, 3, false] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link"],
//       ["clean"],
//     ],
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between mb-6">
//         <h1 className="text-2xl font-bold">Manage Diseases</h1>
//         <Button onClick={handleAdd}>+ Add Disease</Button>
//       </div>

//       {/* Table */}
//       <div className="bg-white shadow rounded">
//         <table className="w-full text-left">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3">Image</th>
//               <th className="p-3">Name</th>
//               <th className="p-3">Slug</th>
//               <th className="p-3">Status</th>
//               <th className="p-3 text-right">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {diseases.map((d) => (
//               <tr key={d.id} className="border-b">
//                 <td className="p-3">
//                   {d.image ? (
//                     <img
//                       src={`http://127.0.0.1:5001${d.image}`}
//                       className="w-20 h-20 rounded object-cover"
//                     />
//                   ) : (
//                     <div className="w-20 h-20 bg-gray-200 rounded" />
//                   )}
//                 </td>

//                 <td className="p-3">{d.name}</td>
//                 <td className="p-3">{d.slug}</td>

//                 <td className="p-3">
//                   {d.status ? (
//                     <span className="text-green-600 font-semibold">Active</span>
//                   ) : (
//                     <span className="text-red-600 font-semibold">Inactive</span>
//                   )}
//                 </td>

//                 <td className="p-3 text-right">
//                   <button className="text-blue-600 mr-3" onClick={() => handleEdit(d)}>
//                     Edit
//                   </button>
//                   <button className="text-red-600" onClick={() => handleDelete(d.id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {!loading && diseases.length === 0 && (
//           <p className="text-center py-6 text-gray-600">No diseases found.</p>
//         )}
//       </div>

//       {/* ----------------------------------------
//           Dialog Form
//       ----------------------------------------- */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="max-w-3xl">
//           <DialogHeader>
//             <DialogTitle>{editing ? "Edit Disease" : "Add New Disease"}</DialogTitle>
//           </DialogHeader>

//           <div className="grid gap-3 max-h-[70vh] overflow-y-auto pr-2">
//             {/* Name + Auto Slug */}
//             <Input
//               placeholder="Disease Name"
//               value={form.name}
//               onChange={(e) => {
//                 updateForm("name", e.target.value);
//                 updateForm("slug", generateSlug(e.target.value));
//               }}
//             />

//             <Input
//               placeholder="Slug"
//               value={form.slug}
//               onChange={(e) => updateForm("slug", e.target.value)}
//             />

//             <Textarea
//               placeholder="Short Description"
//               value={form.short_description}
//               onChange={(e) => updateForm("short_description", e.target.value)}
//             />

//             {/* HTML Description */}
//             <div>
//               <label className="text-sm font-medium">HTML Description</label>
//               <ReactQuill
//                 theme="snow"
//                 value={form.description_html}
//                 onChange={(val) => updateForm("description_html", val)}
//                 modules={quillModules}
//                 className="bg-white rounded"
//               />
//             </div>

//             <Input
//               placeholder="SEO Title"
//               value={form.seo_title}
//               onChange={(e) => updateForm("seo_title", e.target.value)}
//             />

//             <Textarea
//               placeholder="SEO Description"
//               value={form.seo_description}
//               onChange={(e) => updateForm("seo_description", e.target.value)}
//             />

//             <Input
//               placeholder="SEO Keywords"
//               value={form.seo_keywords}
//               onChange={(e) => updateForm("seo_keywords", e.target.value)}
//             />

//             <select
//               className="border p-2 rounded"
//               value={form.status}
//               onChange={(e) => updateForm("status", Number(e.target.value))}
//             >
//               <option value={1}>Active</option>
//               <option value={0}>Inactive</option>
//             </select>

//             {/* Image */}
//             <div>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   const f = e.target.files[0];
//                   updateForm("image", f);
//                   if (f) setPreview(URL.createObjectURL(f));
//                 }}
//               />

//               {preview && <img src={preview} className="w-40 mt-3 rounded" />}
//             </div>
//           </div>

//           <DialogFooter>
//             <Button onClick={handleSubmit}>
//               {editing ? "Update" : "Create"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ManageDiseases;
import React, { useEffect, useState } from "react";
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

const API_URL = "http://127.0.0.1:5001/api/diseases";

const ManageDiseases = () => {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    short_description: "",
    description_html: "",
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    status: 1,
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // ----------------------------------------
  // Fetch Diseases
  // ----------------------------------------
  const loadDiseases = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setDiseases(res.data?.data || []);
    } catch {
      toast.error("Failed to load diseases");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDiseases();
  }, []);

  // ----------------------------------------
  // Helpers
  // ----------------------------------------
  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  // ----------------------------------------
  // Add
  // ----------------------------------------
  const handleAdd = () => {
    setEditing(null);
    setForm({
      name: "",
      slug: "",
      short_description: "",
      description_html: "",
      seo_title: "",
      seo_description: "",
      seo_keywords: "",
      status: 1,
      image: null,
    });
    setPreview(null);
    setOpen(true);
  };

  // ----------------------------------------
  // Edit
  // ----------------------------------------
  const handleEdit = (item) => {
    setEditing(item);
    setForm({
      name: item.name,
      slug: item.slug,
      short_description: item.short_description,
      description_html: item.description_html,
      seo_title: item.seo_title,
      seo_description: item.seo_description,
      seo_keywords: item.seo_keywords,
      status: item.status,
      image: null,
    });
    setPreview(item.image ? `http://127.0.0.1:5001${item.image}` : null);
    setOpen(true);
  };

  // ----------------------------------------
  // Submit
  // ----------------------------------------
  const handleSubmit = async () => {
    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) fd.append(key, value);
    });

    try {
      if (editing) {
        await axios.put(`${API_URL}/${editing.id}`, fd);
        toast.success("Disease updated");
      } else {
        await axios.post(API_URL, fd);
        toast.success("Disease added");
      }
      setOpen(false);
      loadDiseases();
    } catch {
      toast.error("Save failed");
    }
  };

  // ----------------------------------------
  // Delete
  // ----------------------------------------
  const handleDelete = async (id) => {
    if (!confirm("Delete this disease?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Deleted successfully");
      loadDiseases();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Diseases</h1>
        <Button onClick={handleAdd}>+ Add Disease</Button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {diseases.map((d) => (
              <tr key={d.id} className="border-b">
                <td className="p-3">
                  {d.image ? (
                    <img
                      src={`http://127.0.0.1:5001${d.image}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded" />
                  )}
                </td>
                <td className="p-3">{d.name}</td>
                <td className="p-3">{d.slug}</td>
                <td className="p-3">
                  {d.status ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Inactive</span>
                  )}
                </td>
                <td className="p-3 text-right">
                  <button
                    className="text-blue-600 mr-3"
                    onClick={() => handleEdit(d)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(d.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && diseases.length === 0 && (
          <p className="text-center py-6 text-gray-600">
            No diseases found.
          </p>
        )}
      </div>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Disease" : "Add New Disease"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 max-h-[75vh] overflow-y-auto pr-2">
            <Input
              placeholder="Disease Name"
              value={form.name}
              onChange={(e) => {
                updateForm("name", e.target.value);
                updateForm("slug", generateSlug(e.target.value));
              }}
            />

            <Input
              placeholder="Slug"
              value={form.slug}
              onChange={(e) => updateForm("slug", e.target.value)}
            />

            <Textarea
              placeholder="Short Description"
              value={form.short_description}
              onChange={(e) =>
                updateForm("short_description", e.target.value)
              }
            />

            {/* ✅ Rich Text Editor */}
            <RichTextEditor
              label="Detailed Description"
              value={form.description_html}
              onChange={(val) => updateForm("description_html", val)}
              minHeight={300}
            />

            <Input
              placeholder="SEO Title"
              value={form.seo_title}
              onChange={(e) => updateForm("seo_title", e.target.value)}
            />

            <Textarea
              placeholder="SEO Description"
              value={form.seo_description}
              onChange={(e) =>
                updateForm("seo_description", e.target.value)
              }
            />

            <Input
              placeholder="SEO Keywords"
              value={form.seo_keywords}
              onChange={(e) =>
                updateForm("seo_keywords", e.target.value)
              }
            />

            <select
              className="border p-2 rounded"
              value={form.status}
              onChange={(e) =>
                updateForm("status", Number(e.target.value))
              }
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>

            {/* Image */}
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  updateForm("image", file);
                  if (file) setPreview(URL.createObjectURL(file));
                }}
              />
              {preview && (
                <img
                  src={preview}
                  className="w-40 mt-3 rounded"
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

export default ManageDiseases;
