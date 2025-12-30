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
import { Plus, Edit, Trash, X } from "lucide-react";

const API_BASE = "http://127.0.0.1:5001/api";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
  status: number;
}

/* ================= SORTABLE ROW ================= */
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

/* ================= MAIN ================= */
export default function ManageFaq() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<FAQ | null>(null);

  const [form, setForm] = useState({
    question: "",
    answer: "",
    status: 1,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  /* ================= LOAD ================= */
  const loadFaqs = async () => {
    const res = await axios.get(`${API_BASE}/faqs`);
    setFaqs(res.data); // backend ordered
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  /* ================= DRAG END ================= */
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = faqs.findIndex((f) => String(f.id) === active.id);
    const newIndex = faqs.findIndex((f) => String(f.id) === over.id);

    const reordered = arrayMove(faqs, oldIndex, newIndex).map(
      (f, index) => ({ ...f, sort_order: index + 1 })
    );

    // ✅ UI update first
    setFaqs(reordered);

    // ✅ Save order in DB
    await Promise.all(
      reordered.map((f) =>
        axios.put(`${API_BASE}/faqs/${f.id}`, {
          sort_order: f.sort_order,
        })
      )
    );
  };

  /* ================= ADD ================= */
  const handleAdd = () => {
    setEditing(null);
    setForm({ question: "", answer: "", status: 1 });
    setOpen(true);
  };

  /* ================= EDIT ================= */
  const handleEdit = (faq: FAQ) => {
    setEditing(faq);
    setForm({
      question: faq.question,
      answer: faq.answer,
      status: faq.status,
    });
    setOpen(true);
  };

  /* ================= SAVE ================= */
  const handleSubmit = async () => {
    if (editing) {
      await axios.put(`${API_BASE}/faqs/${editing.id}`, form);
    } else {
      await axios.post(`${API_BASE}/faqs`, {
        ...form,
        sort_order: faqs.length + 1,
      });
    }

    setOpen(false);
    loadFaqs();
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    if (!confirm("Delete FAQ?")) return;
    await axios.delete(`${API_BASE}/faqs/${id}`);
    loadFaqs();
  };

  /* ================= UI ================= */
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
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((faq) => (
                  <SortableRow key={faq.id} faq={faq}>
                    <td className="p-3">{faq.sort_order}</td>
                    <td className="p-3">{faq.question}</td>
                    <td className="p-3">
                      {faq.status === 1 ? "Active" : "Inactive"}
                    </td>
                    <td className="p-3 text-right space-x-3">
                      <button
                        className="text-blue-600"
                        onClick={() => handleEdit(faq)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => handleDelete(faq.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </SortableRow>
                ))}
              </tbody>
            </table>
          </SortableContext>
        </DndContext>
      </div>

      {/* MODAL */}
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
