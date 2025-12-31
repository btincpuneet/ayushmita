import React, { useEffect, useState } from "react";
import { buttonAppointmentApi } from "../../services/buttonAppointmentApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface ManageButtonName {
  id: number;
  name: string;
  status: boolean;
}

const emptyForm: Omit<ManageButtonName, "id"> = {
  name: "",
  status: true,
};

export default function ManageButtonName() {
  const [data, setData] = useState<ManageButtonName[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ManageButtonName | null>(null);
  const [form, setForm] = useState(emptyForm);

  const { toast } = useToast();

  const loadData = async () => {
    try {
      const res = await buttonAppointmentApi.getAll();
      setData(res);
    } catch {
      toast({ title: "Failed to load buttons", variant: "destructive" });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const handleEdit = (row: ManageButtonName) => {
    setEditing(row);
    setForm({
      name: row.name,
      status: row.status,
    });
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editing) {
        await buttonAppointmentApi.update(editing.id, form);
        toast({ title: "Button updated successfully" });
      } else {
        await buttonAppointmentApi.create(form);
        toast({ title: "Button created successfully" });
      }

      setOpen(false);
      loadData();
    } catch {
      toast({ title: "Action failed", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete button name?")) return;

    try {
      await buttonAppointmentApi.delete(id);
      toast({ title: "Button deleted successfully" });
      loadData();
    } catch {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Button Name</h1>
        <Button onClick={handleAdd}>+ Add Button</Button>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No buttons found
                </td>
              </tr>
            )}

            {data.map((row) => (
              <tr key={row.id} className="border-b">
                <td className="p-3">{row.id}</td>
                <td className="p-3 font-medium">{row.name}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      row.status
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {row.status ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-3 text-right space-x-3">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleEdit(row)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Button" : "Add Button"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div>
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="Enter button name"
              />
            </div>

            <div className="flex items-center gap-3">
              <Label>Status</Label>
              <Switch
                checked={form.status}
                onCheckedChange={(v) =>
                  setForm({ ...form, status: v })
                }
              />
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
