import { useEffect, useState } from "react";
import axios from "axios";

const VITE_BASE = (import.meta).env?.VITE_BASE_URL;
const BASE_URL = VITE_BASE ? VITE_BASE.replace(/\/$/, "") : "";
const API = `${BASE_URL}/api/cms-sections`;

export default function ManageCMSSection() {
  const [sections, setSections] = useState([]);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    slug: "",
    title: "",
    status: "active",
    content_json: "",
    content_html: "",
  });

  // Fetch all sections
  const fetchSections = async () => {
    const res = await axios.get(API);
    setSections(res.data.data);
  };

  useEffect(() => {
    fetchSections();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save (Create / Update)
  const handleSubmit = async () => {
    const payload = {
      ...form,
      content_json: JSON.parse(form.content_json || "{}"),
    };

    if (editing) {
      await axios.put(`${API}/${editing.id}`, payload);
    } else {
      await axios.post(API, payload);
    }

    resetForm();
    fetchSections();
  };

  // Edit
  const handleEdit = (section) => {
    setEditing(section);
    setForm({
      slug: section.slug,
      title: section.title || "",
      status: section.status,
      content_json: JSON.stringify(section.content_json || {}, null, 2),
      content_html: section.content_html || "",
    });
  };

  // Delete (soft)
  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    await axios.delete(`${API}/${id}`);
    fetchSections();
  };

  const resetForm = () => {
    setEditing(null);
    setForm({
      slug: "",
      title: "",
      status: "active",
      content_json: "",
      content_html: "",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          {editing ? "Edit CMS Section" : "Create CMS Section"}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="Slug (contact-info)"
            className="border rounded px-3 py-2"
          />

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="border rounded px-3 py-2"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <textarea
            name="content_json"
            value={form.content_json}
            onChange={handleChange}
            placeholder="Content JSON"
            rows="5"
            className="border rounded px-3 py-2 font-mono text-sm"
          />

          <textarea
            name="content_html"
            value={form.content_html}
            onChange={handleChange}
            placeholder="Content HTML"
            rows="5"
            className="border rounded px-3 py-2 font-mono text-sm"
          />
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleSubmit}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            {editing ? "Update" : "Create"}
          </button>

          {editing && (
            <button
              onClick={resetForm}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* LIST */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">CMS Sections</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Slug</th>
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {sections.map((section) => (
              <tr key={section.id} className="border-b">
                <td className="py-2">{section.slug}</td>
                <td>{section.title || "-"}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      section.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {section.status}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleEdit(section)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(section.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
