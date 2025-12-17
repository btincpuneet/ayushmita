import React, { useEffect, useState, useMemo } from "react";
import { categoryApi } from "@/services/api";
import { Category } from "@/types/content";

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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

/* =========================
   TYPES
========================= */
type SortKey = "name" | "status" | "is_include_top_nav";
type SortOrder = "asc" | "desc";

/* =========================
   DEFAULT FORM
========================= */
const emptyForm = {
  name: "",
  description: "",
  url: "",
  status: "active",
  is_include_top_nav: false,
};

export default function ManageCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState(emptyForm);

  const [sortBy, setSortBy] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const { toast } = useToast();

  /* =========================
     LOAD DATA
  ========================= */
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await categoryApi.getAll();
      setCategories(res || []);
    } catch {
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* =========================
     SORT HANDLER
  ========================= */
  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  /* =========================
     SORTED DATA
  ========================= */
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];

      if (typeof valA === "string") {
        return sortOrder === "asc"
          ? valA.localeCompare(valB as string)
          : (valB as string).localeCompare(valA);
      }

      if (typeof valA === "boolean") {
        return sortOrder === "asc"
          ? Number(valA) - Number(valB)
          : Number(valB) - Number(valA);
      }

      return 0;
    });
  }, [categories, sortBy, sortOrder]);

  /* =========================
     ADD / EDIT
  ========================= */
  const handleAdd = () => {
    setForm(emptyForm);
    setEditing(null);
    setOpen(true);
  };

  const handleEdit = (cat: Category) => {
    setEditing(cat);
    setForm({
      name: cat.name,
      description: cat.description || "",
      url: cat.url || "",
      status: cat.status,
      is_include_top_nav: cat.is_include_top_nav,
    });
    setOpen(true);
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async () => {
    if (!form.name.trim()) {
      return toast({
        title: "Validation Error",
        description: "Category name is required",
        variant: "destructive",
      });
    }

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
      toast({
        title: "Error",
        description: "Failed to save category",
        variant: "destructive",
      });
    }
  };

  /* =========================
     DELETE
  ========================= */
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this category?")) return;

    try {
      await categoryApi.delete(id);
      toast({ title: "Deleted", description: "Category deleted" });
      loadData();
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
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
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="p-4 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name {sortBy === "name" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>

              <th className="p-4">URL</th>

              <th
                className="p-4 cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status {sortBy === "status" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>

              <th
                className="p-4 cursor-pointer"
                onClick={() => handleSort("is_include_top_nav")}
              >
                Top Nav{" "}
                {sortBy === "is_include_top_nav" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>

              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedCategories.map((cat) => (
              <tr key={cat.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{cat.name}</td>
                <td className="p-4">{cat.url || "-"}</td>

                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-sm rounded ${
                      cat.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {cat.status}
                  </span>
                </td>

                <td className="p-4">
                  {cat.is_include_top_nav ? "Yes" : "No"}
                </td>

                <td className="p-4 text-right flex justify-end gap-4">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && sortedCategories.length === 0 && (
          <p className="text-center py-6 text-gray-600">
            No categories found.
          </p>
        )}
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-3">
            <Label>Name *</Label>
            <Input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <Label>URL</Label>
            <Input
              value={form.url}
              onChange={(e) =>
                setForm({ ...form, url: e.target.value })
              }
            />

            <Label>Description</Label>
            <Textarea
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <div className="flex items-center gap-6 mt-3">
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.status === "active"}
                  onCheckedChange={(ch) =>
                    setForm({
                      ...form,
                      status: ch ? "active" : "inactive",
                    })
                  }
                />
                <Label>Active</Label>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={form.is_include_top_nav}
                  onCheckedChange={(ch) =>
                    setForm({
                      ...form,
                      is_include_top_nav: ch,
                    })
                  }
                />
                <Label>Top Nav</Label>
              </div>
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
}
