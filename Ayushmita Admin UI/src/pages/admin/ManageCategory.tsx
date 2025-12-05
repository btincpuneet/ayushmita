// import React, { useState, useEffect } from "react";
// import { categoryApi } from "@/services/api";
// import { Category } from "@/types/content";

// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { DialogFooter } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/hooks/use-toast";

// import { Pencil, Trash2 } from "lucide-react";

// const emptyForm = {
//   name: "",
//   description: "",
//   url: "",
//   status: "active",
//   // image: "",
//   is_include_top_nav: true,
// };

// export default function ManageCategory() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [open, setOpen] = useState(false);
//   const [editing, setEditing] = useState<Category | null>(null);

//   const [form, setForm] = useState(emptyForm);
//   const { toast } = useToast();

//   // Load Categories
//   const loadData = async () => {
//     setLoading(true);
//     try {
//       const res = await categoryApi.getAll();
//       setCategories(res);
//     } catch {
//       toast({ title: "Error", description: "Failed to load categories", variant: "destructive" });
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   // Add new
//   const handleAdd = () => {
//     setForm(emptyForm);
//     setEditing(null);
//     setOpen(true);
//   };

//   // Edit
//   const handleEdit = (cat: Category) => {
//     setEditing(cat);
//     setForm({
//       name: cat.name,
//       description: cat.description,
//       url: cat.url,
//       status: cat.status,
//       // image: cat.image,
//       is_include_top_nav: cat.is_include_top_nav,
//     });
//     setOpen(true);
//   };

//   // Submit
//   const handleSubmit = async () => {
//     try {
//       if (editing) {
//         await categoryApi.update(editing.id, form);
//         toast({ title: "Updated", description: "Category updated successfully" });
//       } else {
//         await categoryApi.create(form);
//         toast({ title: "Created", description: "Category created successfully" });
//       }

//       setOpen(false);
//       loadData();
//     } catch {
//       toast({ title: "Error", description: "Failed to save category", variant: "destructive" });
//     }
//   };

//   // Delete
//   const handleDelete = async (id: string) => {
//     if (!confirm("Delete this category?")) return;
//     try {
//       await categoryApi.delete(id);
//       toast({ title: "Deleted", description: "Category deleted" });
//       loadData();
//     } catch {
//       toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between mb-6">
//         <h1 className="text-2xl font-bold">Manage Categories</h1>
//         <Button onClick={handleAdd}>+ Add Category</Button>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow">
//         <table className="w-full text-left">
//           <thead className="bg-gray-100">
//             <tr>
//               {/* <th className="p-3">Image</th> */}
//               <th className="p-3">Name</th>
//               <th className="p-3">URL</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Top Nav</th>
//               <th className="p-3 text-right">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {categories.map((cat) => (
//               <tr key={cat.id} className="border-b">
//                 {/* <td className="p-3">
//                   {cat.image ? (
//                     <img
//                       src={cat.image}
//                       alt=""
//                       className="w-20 h-14 object-cover rounded"
//                     />
//                   ) : (
//                     <div className="w-20 h-14 bg-gray-200 rounded" />
//                   )}
//                 </td> */}

//                 <td className="p-3">{cat.name}</td>
//                 <td className="p-3">{cat.url}</td>

//                 <td className="p-3">
//                   <span
//                     className={`px-2 py-1 text-sm rounded ${
//                       cat.status === "active"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-red-100 text-red-600"
//                     }`}
//                   >
//                     {cat.status}
//                   </span>
//                 </td>

//                 <td className="p-3">{cat.is_include_top_nav ? "Yes" : "No"}</td>

//                 <td className="p-3 text-right">
//                   <button onClick={() => handleEdit(cat)} className="text-blue-600 mr-4">
//                     <Pencil size={18} />
//                   </button>

//                   <button onClick={() => handleDelete(cat.id)} className="text-red-600">
//                     <Trash2 size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {!loading && categories.length === 0 && (
//           <p className="text-center py-6 text-gray-600">No categories found.</p>
//         )}
//       </div>

//       {/* Modal */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{editing ? "Edit Category" : "Add New Category"}</DialogTitle>
//           </DialogHeader>

//           <div className="grid gap-3">
//             <Label>Name *</Label>
//             <Input
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />

//             <Label>URL</Label>
//             <Input
//               value={form.url}
//               onChange={(e) => setForm({ ...form, url: e.target.value })}
//             />

//             <Label>Description</Label>
//             <Textarea
//               rows={2}
//               value={form.description}
//               onChange={(e) => setForm({ ...form, description: e.target.value })}
//             />

//             <Label>Image URL</Label>
//             <Input
//               value={form.image}
//               onChange={(e) => setForm({ ...form, image: e.target.value })}
//               placeholder="https://..."
//             />

//             {/* Image Preview */}
//             {form.image && (
//               <img
//                 src={form.image}
//                 className="w-40 h-28 rounded object-cover mt-2"
//               />
//             )}

//             {/* Switches */}
//             <div className="flex items-center gap-6 mt-3">
//               <div className="flex items-center gap-2">
//                 <Switch
//                   checked={form.status === "active"}
//                   onCheckedChange={(ch) =>
//                     setForm({ ...form, status: ch ? "active" : "inactive" })
//                   }
//                 />
//                 <Label>Active</Label>
//               </div>

//               <div className="flex items-center gap-2">
//                 <Switch
//                   checked={form.is_include_top_nav}
//                   onCheckedChange={(ch) =>
//                     setForm({ ...form, is_include_top_nav: ch })
//                   }
//                 />
//                 <Label>Top Nav</Label>
//               </div>
//             </div>
//           </div>

//           <DialogFooter>
//             <Button onClick={handleSubmit}>{editing ? "Update" : "Create"}</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { categoryApi } from "@/services/api";
import { Category } from "@/types/content";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

import { Pencil, Trash2 } from "lucide-react";

const emptyForm = {
  name: "",
  description: "",
  url: "",
  status: "active",
  // image: "",      // ❌ Commented image field
  is_include_top_nav: true,
};

export default function ManageCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const [form, setForm] = useState(emptyForm);
  const { toast } = useToast();

  // Load Categories
 const loadData = async () => {
  setLoading(true);
  try {
    const res = await categoryApi.getAll();

    // ⬅ Sort so that latest item appears on TOP
    const sorted = [...res].reverse();

    setCategories(sorted);
  } catch {
    toast({
      title: "Error",
      description: "Failed to load categories",
      variant: "destructive",
    });
  }
  setLoading(false);
};


  useEffect(() => {
    loadData();
  }, []);

  // Add new
  const handleAdd = () => {
    setForm(emptyForm);
    setEditing(null);
    setOpen(true);
  };

  // Edit
  const handleEdit = (cat: Category) => {
    setEditing(cat);
    setForm({
      name: cat.name,
      description: cat.description,
      url: cat.url,
      status: cat.status,
      // image: cat.image,   // ❌ Removed image part
      is_include_top_nav: cat.is_include_top_nav,
    });
    setOpen(true);
  };

  // Submit
  const handleSubmit = async () => {
    try {
      if (editing) {
        await categoryApi.update(editing.id, form);
        toast({ title: "Updated", description: "Category updated successfully" });
      } else {
        await categoryApi.create(form);
        toast({ title: "Created", description: "Category created successfully" });
      }

      setOpen(false);
      loadData();
    } catch {
      toast({ title: "Error", description: "Failed to save category", variant: "destructive" });
    }
  };

  // Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    try {
      await categoryApi.delete(id);
      toast({ title: "Deleted", description: "Category deleted" });
      loadData();
    } catch {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Categories</h1>
        <Button onClick={handleAdd}>+ Add Category</Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">URL</th>
              <th className="p-3">Status</th>
              <th className="p-3">Top Nav</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b">
                <td className="p-3">{cat.name}</td>
                <td className="p-3">{cat.url}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-sm rounded ${
                      cat.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {cat.status}
                  </span>
                </td>

                <td className="p-3">{cat.is_include_top_nav ? "Yes" : "No"}</td>

                <td className="p-3 text-right flex justify-end gap-4">
                  <button onClick={() => handleEdit(cat)} className="text-blue-600 hover:text-blue-800">
                    {/* <Pencil size={18} /> */}
                    Edit
                  </button>

                  <button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:text-red-800">
                    {/* <Trash2 size={18} /> */}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && categories.length === 0 && (
          <p className="text-center py-6 text-gray-600">No categories found.</p>
        )}
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Category" : "Add New Category"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-3">
            <Label>Name *</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <Label>URL</Label>
            <Input
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />

            <Label>Description</Label>
            <Textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            {/* ❌ Removed Image Input */}
            {/* <Label>Image</Label>
            <Input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            /> */}
            
            {/* ❌ Removed Image Preview */}

            {/* Switches */}
            <div className="flex items-center gap-6 mt-3">
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.status === "active"}
                  onCheckedChange={(ch) =>
                    setForm({ ...form, status: ch ? "active" : "inactive" })
                  }
                />
                <Label>Active</Label>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={form.is_include_top_nav}
                  onCheckedChange={(ch) =>
                    setForm({ ...form, is_include_top_nav: ch })
                  }
                />
                <Label>Top Nav</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSubmit}>{editing ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
