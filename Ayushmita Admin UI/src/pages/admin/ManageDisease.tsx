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
//     status: 1, // Number
//     image: null,
//   });

//   const [preview, setPreview] = useState(null);

//   const loadDiseases = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(API_URL);
//       setDiseases(res.data.data || []);
//     } catch {
//       toast.error("Failed to load diseases");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     loadDiseases();
//   }, []);

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
//       status: item.status, // number 1 or 0
//       image: null,
//     });

//     if (item.image_base64) {
//       setPreview(`data:image/png;base64,${item.image_base64}`);
//     }

//     setOpen(true);
//   };

//   const handleSubmit = async () => {
//     const fd = new FormData();

//     // Convert values properly
//     fd.append("name", form.name);
//     fd.append("slug", form.slug);
//     fd.append("short_description", form.short_description);
//     fd.append("description_html", form.description_html);
//     fd.append("seo_title", form.seo_title);
//     fd.append("seo_description", form.seo_description);
//     fd.append("seo_keywords", form.seo_keywords);
//     fd.append("status", Number(form.status)); // ensure number

//     if (form.image) {
//       fd.append("image", form.image);
//     }

//     try {
//       if (editing) {
//         await axios.put(`${API_URL}/${editing.id}`, fd);
//         toast.success("Disease updated!");
//       } else {
//         await axios.post(API_URL, fd);
//         toast.success("Disease added!");
//       }

//       setOpen(false);
//       loadDiseases();
//     } catch (err) {
//       toast.error("Save failed");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Delete this disease?")) return;
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       toast.success("Disease deleted!");
//       loadDiseases();
//     } catch {
//       toast.error("Delete failed");
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between mb-6">
//         <h1 className="text-2xl font-bold">Manage Diseases</h1>
//         <Button onClick={handleAdd}>+ Add Disease</Button>
//       </div>

//       {/* TABLE */}
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
//                   {d.image_base64 ? (
//                     <img
//                       src={`data:image/png;base64,${d.image_base64}`}
//                       className="w-20 h-20 rounded object-cover"
//                     />
//                   ) : (
//                     <div className="w-20 h-20 bg-gray-200 rounded" />
//                   )}
//                 </td>

//                 <td className="p-3">{d.name}</td>
//                 <td className="p-3">{d.slug}</td>

//                 <td className="p-3">
//                   {d.status === 1 ? (
//                     <span className="text-green-600 font-semibold">Active</span>
//                   ) : (
//                     <span className="text-red-600 font-semibold">Inactive</span>
//                   )}
//                 </td>

//                 <td className="p-3 text-right">
//                   <button
//                     className="text-blue-600 mr-3"
//                     onClick={() => handleEdit(d)}
//                   >
//                     Edit
//                   </button>

//                   <button
//                     className="text-red-600"
//                     onClick={() => handleDelete(d.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {diseases.length === 0 && (
//           <p className="text-center py-6 text-gray-600">
//             No diseases found.
//           </p>
//         )}
//       </div>

//       {/* POPUP FORM */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="max-w-3xl">
//           <DialogHeader>
//             <DialogTitle>
//               {editing ? "Edit Disease" : "Add New Disease"}
//             </DialogTitle>
//           </DialogHeader>

//           <div className="grid gap-3 max-h-[70vh] overflow-y-auto pr-2">
//             <Input
//               placeholder="Disease Name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />

//             <Input
//               placeholder="Slug (URL)"
//               value={form.slug}
//               onChange={(e) => setForm({ ...form, slug: e.target.value })}
//             />

//             <Textarea
//               placeholder="Short Description"
//               value={form.short_description}
//               onChange={(e) =>
//                 setForm({ ...form, short_description: e.target.value })
//               }
//             />

//             {/* HTML EDITOR */}
//             <div className="mt-3">
//               <label className="text-sm font-medium mb-1 block">
//                 HTML Description
//               </label>
//               <ReactQuill
//                 theme="snow"
//                 value={form.description_html}
//                 onChange={(value) =>
//                   setForm({ ...form, description_html: value })
//                 }
//                 className="bg-white rounded"
//               />
//             </div>

//             <Input
//               placeholder="SEO Title"
//               value={form.seo_title}
//               onChange={(e) =>
//                 setForm({ ...form, seo_title: e.target.value })
//               }
//             />

//             <Textarea
//               placeholder="SEO Description"
//               value={form.seo_description}
//               onChange={(e) =>
//                 setForm({ ...form, seo_description: e.target.value })
//               }
//             />

//             <Input
//               placeholder="SEO Keywords"
//               value={form.seo_keywords}
//               onChange={(e) =>
//                 setForm({ ...form, seo_keywords: e.target.value })
//               }
//             />

//             <select
//               className="border p-2 rounded"
//               value={form.status}
//               onChange={(e) =>
//                 setForm({ ...form, status: Number(e.target.value) })
//               }
//             >
//               <option value={1}>Active</option>
//               <option value={0}>Inactive</option>
//             </select>

//             {/* IMAGE UPLOAD */}
//             <div>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   const f = e.target.files[0];
//                   setForm({ ...form, image: f });

//                   if (f) setPreview(URL.createObjectURL(f));
//                 }}
//               />
//               {preview && (
//                 <img
//                   src={preview}
//                   className="w-40 mt-3 rounded object-cover"
//                 />
//               )}
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

  const loadDiseases = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setDiseases(res.data.data || []);
    } catch {
      toast.error("Failed to load diseases");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadDiseases();
  }, []);

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

    if (item.image) {
      setPreview(`http://127.0.0.1:5001${item.image}`);
    }

    setOpen(true);
  };

  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("slug", form.slug);
    fd.append("short_description", form.short_description);
    fd.append("description_html", form.description_html);
    fd.append("seo_title", form.seo_title);
    fd.append("seo_description", form.seo_description);
    fd.append("seo_keywords", form.seo_keywords);
    fd.append("status", Number(form.status));

    if (form.image) {
      fd.append("image", form.image);
    }

    try {
      if (editing) {
        await axios.put(`${API_URL}/${editing.id}`, fd);
        toast.success("Disease updated!");
      } else {
        await axios.post(API_URL, fd);
        toast.success("Disease added!");
      }

      setOpen(false);
      loadDiseases();
    } catch {
      toast.error("Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this disease?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Disease deleted!");
      loadDiseases();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Diseases</h1>
        <Button onClick={handleAdd}>+ Add Disease</Button>
      </div>

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
                      className="w-20 h-20 rounded object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded" />
                  )}
                </td>

                <td className="p-3">{d.name}</td>
                <td className="p-3">{d.slug}</td>

                <td className="p-3">
                  {d.status === 1 ? (
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

        {diseases.length === 0 && (
          <p className="text-center py-6 text-gray-600">
            No diseases found.
          </p>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Disease" : "Add New Disease"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-3 max-h-[70vh] overflow-y-auto pr-2">
            <Input
              placeholder="Disease Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <Input
              placeholder="Slug (URL)"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
            />

            <Textarea
              placeholder="Short Description"
              value={form.short_description}
              onChange={(e) =>
                setForm({ ...form, short_description: e.target.value })
              }
            />

            <div className="mt-3">
              <label className="text-sm font-medium mb-1 block">
                HTML Description
              </label>
              <ReactQuill
                theme="snow"
                value={form.description_html}
                onChange={(value) =>
                  setForm({ ...form, description_html: value })
                }
                className="bg-white rounded"
              />
            </div>

            <Input
              placeholder="SEO Title"
              value={form.seo_title}
              onChange={(e) =>
                setForm({ ...form, seo_title: e.target.value })
              }
            />

            <Textarea
              placeholder="SEO Description"
              value={form.seo_description}
              onChange={(e) =>
                setForm({ ...form, seo_description: e.target.value })
              }
            />

            <Input
              placeholder="SEO Keywords"
              value={form.seo_keywords}
              onChange={(e) =>
                setForm({ ...form, seo_keywords: e.target.value })
              }
            />

            <select
              className="border p-2 rounded"
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: Number(e.target.value) })
              }
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>

            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files[0];
                  setForm({ ...form, image: f });

                  if (f) setPreview(URL.createObjectURL(f));
                }}
              />

              {preview && (
                <img
                  src={preview}
                  className="w-40 mt-3 rounded object-cover"
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
