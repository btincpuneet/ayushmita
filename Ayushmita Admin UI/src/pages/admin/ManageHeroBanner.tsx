import { useEffect, useState } from "react";
import { heroBannerApi } from "@/services/banner";

export default function ManageHeroBanner() {
  const [banners, setBanners] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const BASE_URL = "http://127.0.0.1:5001";

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    button_text: "",
    button_url: "",
    sort_order: 1,
    image: null as File | null,
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      const res = await heroBannerApi.getAll();
      setBanners(res || []);
    } catch (err) {
      console.error(err);
    }
  };

  const openCreateModal = () => {
    clearForm();
    setModalOpen(true);
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm((prev) => ({ ...prev, image: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const clearForm = () => {
    setForm({
      title: "",
      subtitle: "",
      description: "",
      button_text: "",
      button_url: "",
      sort_order: 1,
      image: null,
    });

    setPreviewImage(null);
    setEditingId(null);
    setErrorMsg("");
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
      sort_order: banner.sort_order,
      image: null,
    });

    const img = banner.image?.startsWith("/uploads")
      ? `${BASE_URL}${banner.image}`
      : banner.image;

    setPreviewImage(img);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this banner?")) return;

    try {
      await heroBannerApi.delete(id);
      loadBanners();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Hero Banner Management</h1>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          + Add Banner
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border p-3">Image</th>
              <th className="border p-3">Title</th>
              <th className="border p-3">Subtitle</th>
              <th className="border p-3">Button</th>
              <th className="border p-3">Sort</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {banners.map((banner: any) => {
                  {{console.log(banner.image)}}
              return (

                <tr key={banner.id} className="border hover:bg-gray-50">
                <td className="p-3">
                  {/* FIXED: Now image loads correctly */}
                  {banner.image ? (
                    <img
                      src={`${BASE_URL}${banner.image}`}
                      alt=""
                      className="w-20 h-14 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-14 bg-gray-200 rounded" />
                  )}
                </td>
                  <td className="p-3 font-semibold">{banner.title}</td>
                  <td className="p-3">{banner.subtitle}</td>
                  <td className="p-3">{banner.button_text}</td>
                  <td className="p-3">{banner.sort_order}</td>

                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => handleEdit(banner)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(banner.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}

            {!banners.length && (
              <tr>
                <td colSpan={6} className="text-center p-5">
                  No banners found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
            <h2 className="text-xl font-bold mb-3">
              {editingId ? "Edit Hero Banner" : "Create Hero Banner"}
            </h2>

            {errorMsg && (
              <p className="bg-red-100 text-red-600 p-2 rounded mb-3">
                {errorMsg}
              </p>
            )}

            {/* Form Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <input
                className="border p-2 rounded"
                placeholder="Title *"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <input
                className="border p-2 rounded"
                placeholder="Subtitle"
                value={form.subtitle}
                onChange={(e) =>
                  setForm({ ...form, subtitle: e.target.value })
                }
              />

              <textarea
                className="border p-2 rounded col-span-2"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <input
                className="border p-2 rounded"
                placeholder="Button Text"
                value={form.button_text}
                onChange={(e) =>
                  setForm({ ...form, button_text: e.target.value })
                }
              />

              <input
                className="border p-2 rounded"
                placeholder="Button URL"
                value={form.button_url}
                onChange={(e) =>
                  setForm({ ...form, button_url: e.target.value })
                }
              />

              <input
                type="number"
                className="border p-2 rounded"
                placeholder="Sort Order"
                value={form.sort_order}
                onChange={(e) =>
                  setForm({
                    ...form,
                    sort_order: Number(e.target.value),
                  })
                }
              />

              {/* Image Upload */}
              <div className="col-span-2">
                <label className="font-semibold">
                  Image {editingId ? "" : "*"}
                </label>

                <input
                  type="file"
                  onChange={handleImage}
                  className="mt-2"
                />

                {previewImage && (
                  <img
                    src={previewImage}
                    className="w-40 mt-4 rounded shadow border"
                    alt="Preview"
                  />
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setModalOpen(false);
                  clearForm();
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
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
