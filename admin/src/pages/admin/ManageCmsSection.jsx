import { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/RichTextEditor";

const API_BASE = "http://localhost:5001/api";
const FRONTEND_BASE = "http://localhost:8080";

export default function ManageCmsPage() {
  const [pages, setPages] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    content_html: "",
    status: "active",
  });

  const fetchPages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/cms-pages`);
      setPages(res.data.data || []);
    } catch {
      toast.error("Failed to load CMS pages");
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const createSlug = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleSubmit = async () => {
    if (!form.title || !form.slug) {
      return toast.error("Title and Slug are required");
    }

    try {
      if (editing) {
        await axios.put(`${API_BASE}/cms-pages/${editing.id}`, form);
        toast.success("Page updated");
      } else {
        await axios.post(`${API_BASE}/cms-pages`, form);
        toast.success("Page created");
      }

      setOpen(false);
      resetForm();
      fetchPages();
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    }
  };

  const handleEdit = (page) => {
    setEditing(page);
    setForm({
      title: page.title,
      slug: page.slug,
      content_html: page.content_html,
      status: page.status,
    });
    setOpen(true);
  };

  const resetForm = () => {
    setEditing(null);
    setForm({
      title: "",
      slug: "",
      content_html: "",
      status: "active",
    });
  };

  return (
    <div className="p-6 space-y-6">
      
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">CMS Pages</h1>
        <Button onClick={() => { resetForm(); setOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          Create Page
        </Button>
      </div>

     
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">URL</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {pages.map((page, i) => (
              <tr key={page.id} className="border-t">
                <td className="p-3">{i + 1}</td>
                <td className="p-3 font-medium">{page.title}</td>

                <td className="p-3">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    /{page.slug}
                  </a>
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      page.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {page.status}
                  </span>
                </td>

                <td className="p-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(page)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}

            {pages.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-400">
                  No CMS pages found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit CMS Page" : "Create CMS Page"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                  slug: createSlug(e.target.value),
                })
              }
            />

            <Input
              placeholder="Slug"
              value={form.slug}
              onChange={(e) =>
                setForm({ ...form, slug: e.target.value })
              }
            />

            <RichTextEditor
              value={form.content_html}
              onChange={(val) =>
                setForm({ ...form, content_html: val })
              }
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editing ? "Update Page" : "Create Page"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
