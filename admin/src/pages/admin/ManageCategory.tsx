
import React, { useEffect, useState } from "react";
import { categoryApi } from "@/services/api";
import { Category } from "@/types/content";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const emptyForm = {
  name: "",
  description: "",
  url: "",
  status: "active" as "active" | "inactive",
  is_include_top_nav: true,
};

function SortableRow({
  cat,
  children,
}: {
  cat: Category;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: String(cat.id) });

  return (
    <tr
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      {...listeners}
      className="border-b cursor-move bg-white"
    >
      {children}
    </tr>
  );
}

export default function ManageCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState(emptyForm);

  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const loadData = async () => {
    const res = await categoryApi.getAll();
    setCategories(res);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = categories.findIndex(
      (c) => String(c.id) === active.id
    );
    const newIndex = categories.findIndex(
      (c) => String(c.id) === over.id
    );

    const reordered = arrayMove(categories, oldIndex, newIndex).map(
      (c, i) => ({ ...c, sort_order: i + 1 })
    );

    setCategories(reordered);

    await Promise.all(
      reordered.map((c) =>
        categoryApi.update(c.id, { sort_order: c.sort_order })
      )
    );

    toast({ title: "Order updated successfully" });
  };

  const handleAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const handleEdit = (cat: Category) => {
    setEditing(cat);
    setForm({
      name: cat.name,
      description: cat.description,
      url: cat.url,
      status: cat.status,
      is_include_top_nav: cat.is_include_top_nav,
    });
    setOpen(true);
  };

 

  const handleSubmit = async () => {
    // Frontend validation
    if (!form.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Category name is required",
        variant: "destructive",
      });
      return;
    }

    if (!form.status) {
      toast({
        title: "Validation Error",
        description: "Please select category status",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editing) {
        await categoryApi.update(editing.id, form);
        toast({
          title: "Success",
          description: "Category updated successfully",
        });
      } else {
        await categoryApi.create(form);
        toast({
          title: "Success",
          description: "Category created successfully",
        });
      }

      setOpen(false);
      loadData();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete category?")) return;

    await categoryApi.delete(id);
    toast({ title: "Category deleted" });
    loadData();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Categories</h1>
        <Button onClick={handleAdd}>+ Add Category</Button>
      </div>

      <div className="bg-white rounded shadow">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={categories.map((c) => String(c.id))}
            strategy={verticalListSortingStrategy}
          >
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Order</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">URL</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((cat) => (
                  <SortableRow key={cat.id} cat={cat}>
                    <td className="p-3">{cat.sort_order}</td>
                    <td className="p-3">{cat.name}</td>
                    <td className="p-3">{cat.url}</td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${cat.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {cat.status}
                      </span>
                    </td>

                    <td className="p-3 text-right space-x-3">
                      <Button size="sm" onClick={() => handleEdit(cat)}>
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(cat.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </SortableRow>
                ))}
              </tbody>
            </table>
          </SortableContext>
        </DndContext>
      </div>

      {/* ADD / EDIT DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Category" : "Add Category"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cat-name">Name <span className="text-red-500">*</span></Label>
                <Input
                  id="cat-name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="e.g., Cardiology"
                />
              </div>
              <div>
                <Label htmlFor="cat-url">URL <span className="text-red-500">*</span></Label>
                <Input
                  id="cat-url"
                  value={form.url}
                  onChange={(e) =>
                    setForm({ ...form, url: e.target.value })
                  }
                  placeholder="e.g., /cardiology"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cat-desc">Description</Label>
              <Textarea
                id="cat-desc"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Brief description of this category..."
              />
            </div>

            <div>
              <Label htmlFor="cat-status">Status</Label>
              <Select
                value={form.status}
                onValueChange={(value: "active" | "inactive") =>
                  setForm({ ...form, status: value })
                }
              >
                <SelectTrigger id="cat-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
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
