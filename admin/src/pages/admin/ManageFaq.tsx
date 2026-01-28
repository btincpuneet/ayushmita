import { useEffect, useState } from "react";
import axios from "axios";
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
import { X } from "lucide-react";
import { API_BASE } from "../../config/api";
import { Button } from "@/components/ui/button";
import { authHeader } from "../../utils/auth";

const API_URL = `${API_BASE}/api`;

interface FAQ {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
  status: number;
  faq_type: "home" | "hospital" | "doctor";
  hospital_id?: number | null;
  doctor_id?: number | null;

  hospital?: {
    id: number;
    name: string;
  } | null;

  doctor?: {
    id: number;
    name: string;
  } | null;
}


interface DropdownItem {
  id: number;
  name: string;
}

function SortableRow({
  faq,
  children,
}: {
  faq: FAQ;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: String(faq.id) });

  return (
    <tr
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className="border-b cursor-move bg-white"
    >
      {children}
    </tr>
  );
}

export default function ManageFaq() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [hospitals, setHospitals] = useState<DropdownItem[]>([]);
  const [doctors, setDoctors] = useState<DropdownItem[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const showApiError = (error: any, fallback: string) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      fallback;

    console.error("API ERROR:", error);
    setApiError(message);
  };

  const [form, setForm] = useState({
    question: "",
    answer: "",
    status: 1,
    faq_type: "home" as "home" | "hospital" | "doctor",
    hospital_id: null as number | null,
    doctor_id: null as number | null,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const loadFaqs = async () => {
    try {
      setLoading(true);
      setApiError(null);

      const res = await axios.get(`${API_URL}/get-active-faqs`, {
        headers: authHeader(),
      });

      setFaqs(res.data.data);
    } catch (error) {
      showApiError(error, "Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };



  const loadHospitals = async () => {
    try {
      const res = await axios.get(`${API_URL}/faqs/hospitals/dropdown`, {
        headers: authHeader(),
      });
      setHospitals(res.data.data);
    } catch (error) {
      showApiError(error, "Failed to load hospitals");
    }
  };

  const loadDoctors = async () => {
    const res = await axios.get(`${API_URL}/faqs/doctors/dropdown`);
    setDoctors(res.data.data);
  };

  useEffect(() => {
    loadFaqs();
    loadHospitals();
    loadDoctors();
  }, []);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = faqs.findIndex(f => String(f.id) === active.id);
    const newIndex = faqs.findIndex(f => String(f.id) === over.id);

    const reordered = arrayMove(faqs, oldIndex, newIndex).map((f, i) => ({
      ...f,
      sort_order: i + 1,
    }));

    setFaqs(reordered);

    try {
      await Promise.all(
        reordered.map(f =>
          axios.put(
            `${API_URL}/faqs/${f.id}`,
            { sort_order: f.sort_order },
            { headers: authHeader() }
          )
        )
      );
    } catch (error) {
      showApiError(error, "Failed to update FAQ order");
      loadFaqs(); // rollback
    }
  };


  const handleAdd = () => {
    setEditing(null);
    setForm({
      question: "",
      answer: "",
      status: 1,
      faq_type: "home",
      hospital_id: null,
      doctor_id: null,
    });
    setOpen(true);
  };

  const handleEdit = (faq: FAQ) => {
    setEditing(faq);
    setForm({
      question: faq.question,
      answer: faq.answer,
      status: faq.status,
      faq_type: faq.faq_type,
      hospital_id: faq.hospital_id ?? null,
      doctor_id: faq.doctor_id ?? null,
    });
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      setApiError(null);

      const payload = {
        ...form,
        sort_order: editing ? undefined : faqs.length + 1,
      };

      if (editing) {
        await axios.put(`${API_URL}/faqs/${editing.id}`, payload, {
          headers: authHeader(),
        });
      } else {
        await axios.post(`${API_URL}/faqs`, payload, {
          headers: authHeader(),
        });
      }

      setOpen(false);
      loadFaqs();
    } catch (error) {
      showApiError(error, "Failed to save FAQ");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete FAQ?")) return;

    try {
      await axios.delete(`${API_URL}/faqs/${id}`, {
        headers: authHeader(),
      });
      loadFaqs();
    } catch (error) {
      showApiError(error, "Failed to delete FAQ");
    }
  };


  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage FAQs</h1>
        <button
          onClick={handleAdd}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add FAQ
        </button>
      </div>
      {apiError && (
        <div className="mb-4 rounded bg-red-100 text-red-700 px-4 py-2">
          {apiError}
        </div>
      )}

      {loading && (
        <p className="text-gray-500 mb-4">Loading FAQs...</p>
      )}

      <div className="bg-white rounded shadow">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={faqs.map((f) => String(f.id))}
            strategy={verticalListSortingStrategy}
          >
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Order</th>
                  <th className="p-3">Question</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Linked To</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {faqs.map((faq) => (
                  <SortableRow key={faq.id} faq={faq}>
                    <td className="p-3">{faq.sort_order}</td>

                    <td className="p-3">{faq.question}</td>

                    <td className="p-3 capitalize font-medium">
                      {faq.faq_type}
                    </td>

                    <td className="p-3">
                      {faq.faq_type === "hospital" && (
                        <span className="text-blue-600">
                          {faq.hospital?.name || "—"}
                        </span>
                      )}

                      {faq.faq_type === "doctor" && (
                        <span className="text-green-600">
                          {faq.doctor?.name || "—"}
                        </span>
                      )}

                      {faq.faq_type === "home" && (
                        <span className="text-gray-400">Home Page</span>
                      )}
                    </td>

                    <td className="p-3">
                      {faq.status === 1 ? "Active" : "Inactive"}
                    </td>

                    <td className="p-3 text-right space-x-2">
                      <Button size="sm" onClick={() => handleEdit(faq)}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(faq.id)}
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

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 w-[420px] rounded">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {editing ? "Edit FAQ" : "Add FAQ"}
              </h3>
              <button onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <input
              className="border w-full p-2 mb-2"
              placeholder="Question"
              value={form.question}
              onChange={(e) =>
                setForm({ ...form, question: e.target.value })
              }
            />

            <textarea
              className="border w-full p-2 mb-2"
              placeholder="Answer"
              value={form.answer}
              onChange={(e) =>
                setForm({ ...form, answer: e.target.value })
              }
            />

            <select
              className="border w-full p-2 mb-2"
              value={form.faq_type}
              onChange={(e) =>
                setForm({
                  ...form,
                  faq_type: e.target.value as any,
                  hospital_id: null,
                  doctor_id: null,
                })
              }
            >
              <option value="home">Home</option>
              <option value="hospital">Hospital</option>
              <option value="doctor">Doctor</option>
            </select>

            {form.faq_type === "hospital" && (
              <select
                className="border w-full p-2 mb-2"
                value={form.hospital_id ?? ""}
                onChange={(e) =>
                  setForm({ ...form, hospital_id: Number(e.target.value) })
                }
              >
                <option value="">Select Hospital</option>
                {hospitals.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
              </select>
            )}

            {form.faq_type === "doctor" && (
              <select
                className="border w-full p-2 mb-2"
                value={form.doctor_id ?? ""}
                onChange={(e) =>
                  setForm({ ...form, doctor_id: Number(e.target.value) })
                }
              >
                <option value="">Select Doctor</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            )}

            <select
              className="border w-full p-2 mb-4"
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: Number(e.target.value) })
              }
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>

            <div className="flex justify-end gap-2">
              <button onClick={() => setOpen(false)}>Cancel</button>
              <button
                onClick={handleSubmit}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
