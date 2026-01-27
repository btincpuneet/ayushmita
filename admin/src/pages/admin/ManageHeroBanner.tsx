import { useEffect, useState } from "react";
import { heroBannerApi } from "@/services/banner";
import { API_BASE } from "../../config/api";
import { Button } from "@/components/ui/button";

export default function ManageHeroBanner() {
  const [banners, setBanners] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    button_text: "",
    button_url: "",
    status: "inactive",

    image_alt: "",
    image_title: "",
    image_caption: "",

    image: null as File | null,
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    const res = await heroBannerApi.getAll();
    setBanners(res || []);
  };

  const clearForm = () => {
    setForm({
      title: "",
      subtitle: "",
      description: "",
      button_text: "",
      button_url: "",
      status: "inactive",

      image_alt: "",
      image_title: "",
      image_caption: "",

      image: null,
    });

    setPreviewImage(null);
    setEditingId(null);
    setErrorMsg("");
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm((prev) => ({ ...prev, image: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!form.title) return setErrorMsg("Title is required");
    if (!editingId && !form.image)
      return setErrorMsg("Image is required");

    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) fd.append(key, value as any);
    });

    try {
      setLoading(true);
      setErrorMsg("");

      if (editingId) await heroBannerApi.update(editingId, fd);
      else await heroBannerApi.create(fd);

      await loadBanners();
      clearForm();
      setModalOpen(false);
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (banner: any) => {
    setEditingId(banner.id);

    setForm({
      title: banner.title,
      subtitle: banner.subtitle,
      description: banner.description,
      button_text: banner.button_text,
      button_url: banner.button_url,
      status: banner.status,

      image_alt: banner.image_alt || "",
      image_title: banner.image_title || "",
      image_caption: banner.image_caption || "",

      image: null,
    });

    setPreviewImage(`${API_BASE}${banner.image}`);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this banner?")) return;
    await heroBannerApi.delete(id);
    loadBanners();
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hero Banner Management</h1>
        <Button
          onClick={() => {
            clearForm();
            setModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          + Add Banner
        </Button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-xl rounded-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border p-3">Image</th>
              <th className="border p-3">Title</th>
              <th className="border p-3">Subtitle</th>
              <th className="border p-3">Description</th>
              <th className="border p-3">Image ALT</th>
              <th className="border p-3">Image Title</th>
              <th className="border p-3">Button Text</th>
              <th className="border p-3">Button URL</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {banners.map((banner) => (
              <tr key={banner.id} className="border hover:bg-gray-50 align-top">
                <td className="p-3">
                  <img
                    src={`${API_BASE}${banner.image}`}
                    alt={banner.image_alt || banner.title}
                    title={banner.image_title || banner.title}
                    className="w-24 h-16 object-cover rounded"
                  />
                </td>

                <td className="p-3 font-semibold">{banner.title}</td>
                <td className="p-3">{banner.subtitle || "-"}</td>
                <td className="p-3">{banner.description || "-"}</td>
                <td className="p-3">{banner.image_alt || "-"}</td>
                <td className="p-3">{banner.image_title || "-"}</td>
                <td className="p-3">{banner.button_text || "-"}</td>
                <td className="p-3 break-all">
                  {banner.button_url || "-"}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      banner.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {banner.status}
                  </span>
                </td>

                <td className="p-3 flex gap-2">
                  <Button size="sm" onClick={() => handleEdit(banner)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(banner.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}

            {!banners.length && (
              <tr>
                <td colSpan={10} className="text-center p-6 text-gray-500">
                  No banners found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[650px]">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Edit Hero Banner" : "Create Hero Banner"}
            </h2>

            {errorMsg && (
              <p className="bg-red-100 text-red-600 p-2 mb-3 rounded">
                {errorMsg}
              </p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <input className="border p-2" placeholder="Title *"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <select className="border p-2"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="inactive">Inactive</option>
                <option value="active">Active</option>
              </select>

              <input className="border p-2 col-span-2" placeholder="Subtitle"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              />

              <textarea className="border p-2 col-span-2" placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />

              <input className="border p-2" placeholder="Image ALT"
                value={form.image_alt}
                onChange={(e) => setForm({ ...form, image_alt: e.target.value })}
              />

              <input className="border p-2" placeholder="Image Title"
                value={form.image_title}
                onChange={(e) => setForm({ ...form, image_title: e.target.value })}
              />

              <input className="border p-2 col-span-2" placeholder="Image Caption"
                value={form.image_caption}
                onChange={(e) => setForm({ ...form, image_caption: e.target.value })}
              />

              <input type="file" onChange={handleImage} />

              {previewImage && (
                <img src={previewImage} className="w-40 rounded border" />
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setModalOpen(false);
                  clearForm();
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-blue-300"
              >
                {loading ? "Saving..." : editingId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
