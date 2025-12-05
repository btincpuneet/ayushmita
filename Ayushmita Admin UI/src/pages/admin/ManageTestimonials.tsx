import React, { useEffect, useState } from "react";
import axios from "axios";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  message: string;
  image_base64?: string | null;
}

const ManageTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [form, setForm] = useState({
    id: null as number | null,
    name: "",
    role: "",
    rating: 5,
    message: "",
    image: null as File | null,
  });

  const isEditing = form.id !== null;

  const API = "http://127.0.0.1:5001/api/testimonials";

  // Load testimonials
  const fetchTestimonials = async () => {
    const res = await axios.get(API);
    setTestimonials(res.data.data);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle text input
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Open Add Modal
  const openAddModal = () => {
    setForm({
      id: null,
      name: "",
      role: "",
      rating: 5,
      message: "",
      image: null,
    });
    setPreviewImage(null);
    setModalOpen(true);
  };

  // Edit Modal
  const handleEdit = (t: Testimonial) => {
    setForm({
      id: t.id,
      name: t.name,
      role: t.role,
      rating: t.rating,
      message: t.message,
      image: null,
    });

    if (t.image_base64) {
      setPreviewImage(`data:image/jpeg;base64,${t.image_base64}`);
    }

    setModalOpen(true);
  };

  // Delete
  const handleDelete = async (id: number) => {
    if (window.confirm("Delete this testimonial?")) {
      await axios.delete(`${API}/${id}`);
      fetchTestimonials();
    }
  };

  // Submit Form
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("role", form.role);
    fd.append("rating", String(form.rating));
    fd.append("message", form.message);
    if (form.image) fd.append("image", form.image);

    if (isEditing) {
      await axios.put(`${API}/${form.id}`, fd);
    } else {
      await axios.post(API, fd);
    }

    setModalOpen(false);
    fetchTestimonials();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Testimonials</h1>

        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Testimonial
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Rating</th>
              <th className="p-3 border">Message</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {testimonials.length === 0 && (
              <tr>
                <td className="p-3 border text-center" colSpan={6}>
                  No Testimonials Found
                </td>
              </tr>
            )}

            {testimonials.map((t) => (
              <tr key={t.id} className="border">
                <td className="p-3 border">
                  {t.image_base64 ? (
                    <img
                      src={`data:image/jpeg;base64,${t.image_base64}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>

                <td className="p-3 border">{t.name}</td>
                <td className="p-3 border">{t.role}</td>
                <td className="p-3 border">{t.rating}</td>
                <td className="p-3 border w-[300px]">{t.message}</td>

                <td className="p-3 border space-x-2">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(t)}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(t.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-[500px]">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Testimonial" : "Add Testimonial"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="border p-2 w-full"
                required
              />

              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="Role"
                className="border p-2 w-full"
              />

              <input
                type="number"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                min={1}
                max={5}
                className="border p-2 w-full"
                required
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Message"
                className="border p-2 w-full"
                rows={3}
                required
              ></textarea>

              <input type="file" accept="image/*" onChange={handleImage} />

              {previewImage && (
                <img
                  src={previewImage}
                  className="w-24 h-24 object-cover rounded mt-2"
                />
              )}

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setModalOpen(false)}
                  type="button"
                >
                  Cancel
                </button>

                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  type="submit"
                >
                  {isEditing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTestimonials;
