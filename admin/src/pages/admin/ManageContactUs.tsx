
import { useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";

import { Plus, Edit3, Trash2, FileText, Info } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import { aboutUsService } from "@/services/about";

const emptyForm = {
  title: "",
  content_html: "",
  seo_title: "",
  seo_description: "",
  seo_keywords: "",
  status: "active",
};

const ManageContactUs = () => {
  const [sections, setSections] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState(emptyForm);
  const cleanHtml = (html: string) =>
    html.replace(/undefined(http)/g, "$1");
  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      const res = await aboutUsService.getAll();
      setSections(res.data);
    } catch {
      toast.error("Failed to load Contact Us");
    }
  };

  const handleAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

const handleEdit = (item: any) => {
  setEditing(item);
  setForm({
    title: item.title,
    content_html: cleanHtml(item.content_html || ""),
    seo_title: item.seo_title || "",
    seo_description: item.seo_description || "",
    seo_keywords: item.seo_keywords || "",
    status: item.status,
  });
  setOpen(true);
};

  const handleSubmit = async () => {
    if (!form.title || !form.content_html) {
      toast.error("Title and content are required");
      return;
    }

    try {
      editing
        ? await aboutUsService.update(editing.id, form)
        : await aboutUsService.create(form);

      toast.success(editing ? "Updated" : "Created");
      setOpen(false);
      loadSections();
    } catch {
      toast.error("Save failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this section?")) return;

    try {
      await aboutUsService.remove(id);
      toast.success("Deleted");
      loadSections();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-card border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Manage Contact Us</h1>
              <p className="text-xs text-muted-foreground">CMS Content</p>
            </div>
          </div>

          <Button onClick={handleAdd} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Section
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-6">
        {sections.length === 0 && (
          <div className="bg-card rounded-xl border p-12 text-center">
            <FileText className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No Content</h3>
            <Button onClick={handleAdd}>Create</Button>
          </div>
        )}

        {sections.map((item) => (
          <div key={item.id} className="bg-card border rounded-xl">
            <div className="p-6 flex justify-between border-b">
              <div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                  {item.status}
                </span>
                <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div
              className="p-6 cms-content"
              dangerouslySetInnerHTML={{ __html: item.content_html }}
            />
          </div>
        ))}
      </main>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Contact Us" : "Add Contact Us"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label>Title *</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>

            <RichTextEditor
              key={editing?.id || "new"}
              label="Content *"
              value={form.content_html}
              onChange={(val) => setForm({ ...form, content_html: val })}
              minHeight={250}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="SEO Title"
                value={form.seo_title}
                onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
              />
              <Input
                placeholder="SEO Keywords"
                value={form.seo_keywords}
                onChange={(e) => setForm({ ...form, seo_keywords: e.target.value })}
              />
            </div>

            <textarea
              className="w-full min-h-[90px] px-3 py-2 border rounded-lg"
              placeholder="SEO Description"
              value={form.seo_description}
              onChange={(e) => setForm({ ...form, seo_description: e.target.value })}
            />

            <select
              className="w-full h-10 px-3 rounded-lg border"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>{editing ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageContactUs;
