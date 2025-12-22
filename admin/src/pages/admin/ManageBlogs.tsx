
// export default ManageBlogs;
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
import { toast } from "sonner";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  Clock, 
  User, 
  Star,
  Globe,
  Search,
  Image as ImageIcon,
  FileText
} from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";

const VITE_BASE = (import.meta as any).env?.VITE_BASE_URL;
const BASE_URL = VITE_BASE ? VITE_BASE.replace(/\/$/, "") : "";
const API_URL = `${BASE_URL}/api/blogs`;

const decodeHTML = (html: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

interface Blog {
  id: number;
  category_id: number;
  title: string;
  slug: string;
  image: string | null;
  short_description: string;
  description_html: string;
  author_name: string;
  author_avatar: string | null;
  is_featured: boolean;
  is_global: boolean;
  status: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  view_count: number;
  reading_time: string;
  tags: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

const emptyForm = {
  category_id: "",
  title: "",
  slug: "",
  short_description: "",
  description_html: "",
  author_name: "Admin",
  is_global: true,
  is_featured: false,
  status: "published",
  meta_title: "",
  meta_description: "",
  meta_keywords: "",
  tags: "",
  reading_time: "",
  image: null as File | null,
};

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState<string | null>(null);
  const [viewBlog, setViewBlog] = useState<Blog | null>(null);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setBlogs(res.data.data || []);
    } catch {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const handleAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setPreview(null);
    setOpen(true);
  };

  const handleEdit = (item: Blog) => {
    setEditing(item);
    setForm({
      category_id: String(item.category_id),
      title: item.title,
      slug: item.slug,
      short_description: item.short_description || "",
      description_html: item.description_html || "",
      author_name: item.author_name || "Admin",
      is_global: item.is_global,
      is_featured: item.is_featured,
      status: item.status,
      meta_title: item.meta_title || "",
      meta_description: item.meta_description || "",
      meta_keywords: item.meta_keywords || "",
      tags: item.tags || "",
      reading_time: item.reading_time || "",
      image: null,
    });
    setPreview(item.image ? `${BASE_URL}${item.image}` : null);
    setOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.slug || !form.category_id) {
      toast.error("Title, slug, and category are required");
      return;
    }

    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (typeof value === "boolean") {
          fd.append(key, value ? "1" : "0");
        } else if (value instanceof File) {
          fd.append(key, value);
        } else {
          fd.append(key, String(value));
        }
      }
    });

    try {
      if (editing) {
        await axios.put(`${API_URL}/${editing.id}`, fd);
        toast.success("Blog updated successfully");
      } else {
        await axios.post(API_URL, fd);
        toast.success("Blog created successfully");
      }
      setOpen(false);
      loadBlogs();
    } catch {
      toast.error("Save failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Blog deleted");
      loadBlogs();
    } catch {
      toast.error("Delete failed");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Blog Manager</h1>
              <p className="text-muted-foreground mt-1">Create and manage your blog posts</p>
            </div>
            <Button onClick={handleAdd} className="gap-2">
              <Plus className="w-4 h-4" />
              Add New Blog
            </Button>
          </div>

          {/* Search */}
          <div className="mt-6 relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-xl border animate-pulse">
                <div className="aspect-video bg-muted rounded-t-xl" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 mx-auto text-muted-foreground/50" />
            <h3 className="mt-4 text-xl font-semibold text-foreground">No blogs found</h3>
            <p className="text-muted-foreground mt-2">Get started by creating your first blog post</p>
            <Button onClick={handleAdd} className="mt-6 gap-2">
              <Plus className="w-4 h-4" />
              Create Blog
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-card rounded-xl border shadow-card overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                {/* Image */}
                <div className="aspect-video bg-muted relative overflow-hidden">
                  {blog.image ? (
                    <img
                      src={`${BASE_URL}${blog.image}`}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-muted-foreground/30" />
                    </div>
                  )}
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {blog.is_featured && (
                      <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" /> Featured
                      </span>
                    )}
                    {blog.is_global && (
                      <span className="px-2 py-1 bg-info text-info-foreground text-xs font-medium rounded-full flex items-center gap-1">
                        <Globe className="w-3 h-3" /> Global
                      </span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        blog.status === "published"
                          ? "bg-success text-success-foreground"
                          : "bg-warning text-warning-foreground"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {blog.short_description || "No description available"}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {blog.author_name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(blog.published_at)}
                    </span>
                    {blog.reading_time && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {blog.reading_time}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-5 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1.5"
                      onClick={() => setViewBlog(blog)}
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1.5"
                      onClick={() => handleEdit(blog)}
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(blog.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Dialog */}
      <Dialog open={!!viewBlog} onOpenChange={() => setViewBlog(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {viewBlog && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{viewBlog.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {viewBlog.image && (
                  <img
                    src={`${BASE_URL}${viewBlog.image}`}
                    alt={viewBlog.title}
                    className="w-full max-h-80 object-cover rounded-lg"
                  />
                )}
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" /> {viewBlog.author_name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {formatDate(viewBlog.published_at)}
                  </span>
                  {viewBlog.reading_time && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {viewBlog.reading_time}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" /> {viewBlog.view_count} views
                  </span>
                </div>
                <div
                  className="cms-content"
                  dangerouslySetInnerHTML={{ __html: decodeHTML(viewBlog.description_html) }}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit/Create Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {editing ? "Edit Blog Post" : "Create New Blog Post"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Basic Info */}
            <Input
              placeholder="Category ID *"
              value={form.category_id}
              onChange={(e) => setForm({ ...form, category_id: e.target.value })}
            />
            <Input
              placeholder="Author Name"
              value={form.author_name}
              onChange={(e) => setForm({ ...form, author_name: e.target.value })}
            />
            <Input
              placeholder="Blog Title *"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                  slug: form.slug || generateSlug(e.target.value),
                })
              }
              className="md:col-span-2"
            />
            <Input
              placeholder="Slug *"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
            />
            <Input
              placeholder="Reading Time (e.g., 5 min)"
              value={form.reading_time}
              onChange={(e) => setForm({ ...form, reading_time: e.target.value })}
            />

            {/* Short Description */}
            <div className="md:col-span-2">
              <RichTextEditor
                label="Short Description"
                value={form.short_description}
                onChange={(val) => setForm({ ...form, short_description: val })}
                placeholder="Enter a brief description..."
                minHeight={120}
              />
            </div>

            {/* Full Description */}
            <div className="md:col-span-2">
              <RichTextEditor
                label="Full Content (HTML & CSS supported)"
                value={form.description_html}
                onChange={(val) => setForm({ ...form, description_html: val })}
                placeholder="Enter full blog content..."
                minHeight={250}
              />
            </div>

            {/* SEO Fields */}
            <Input
              placeholder="Meta Title"
              value={form.meta_title}
              onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
            />
            <Input
              placeholder="Meta Keywords (comma separated)"
              value={form.meta_keywords}
              onChange={(e) => setForm({ ...form, meta_keywords: e.target.value })}
            />
            <Input
              placeholder="Meta Description"
              value={form.meta_description}
              onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
              className="md:col-span-2"
            />
            <Input
              placeholder="Tags (comma separated)"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="md:col-span-2"
            />

            {/* Status & Toggles */}
            <select
              className="border p-2 rounded-md bg-card text-foreground"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_global}
                  onChange={(e) => setForm({ ...form, is_global: e.target.checked })}
                  className="w-4 h-4 rounded border-input"
                />
                <span className="text-sm flex items-center gap-1">
                  <Globe className="w-4 h-4" /> Global
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_featured}
                  onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                  className="w-4 h-4 rounded border-input"
                />
                <span className="text-sm flex items-center gap-1">
                  <Star className="w-4 h-4" /> Featured
                </span>
              </label>
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Featured Image
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    setForm({ ...form, image: f });
                    setPreview(URL.createObjectURL(f));
                  }
                }}
              />
              {(preview || editing?.image) && (
                <img
                  src={preview || `${BASE_URL}${editing?.image}`}
                  alt="Preview"
                  className="w-48 h-32 object-cover rounded-lg mt-3 border"
                />
              )}
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editing ? "Update Blog" : "Create Blog"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageBlogs;
