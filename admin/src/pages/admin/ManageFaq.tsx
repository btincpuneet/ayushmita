import { useEffect, useState } from "react";
import axios from "axios";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, Edit, Trash, X } from "lucide-react";
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

  const loadFaqs = async () => {
    const res = await axios.get(`${API_URL}/get-active-faqs`);
    setFaqs(res.data);
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = faqs.findIndex((f) => String(f.id) === active.id);
    const newIndex = faqs.findIndex((f) => String(f.id) === over.id);

    const reordered = arrayMove(faqs, oldIndex, newIndex).map(
      (f, index) => ({ ...f, sort_order: index + 1 })
    );

    setFaqs(reordered);

    await Promise.all(
      reordered.map((f) =>
        axios.put(`${API_URL}/faqs/${f.id}`, {
          sort_order: f.sort_order,
        })
      )
    );
  };

  const handleAdd = () => {
    setEditing(null);
    setForm({ question: "", answer: "", status: 1 });
    setOpen(true);
  };

  const handleEdit = (faq: FAQ) => {
    setEditing(faq);
    setForm({
      question: faq.question,
      answer: faq.answer,
      status: faq.status,
    });
    setOpen(true);
  };

  const handleSubmit = async () => {
    if (editing) {
      await axios.put(`${API_URL}/faqs/${editing.id}`, form, { headers: authHeader() });
    } else {
      await axios.post(`${API_URL}/faqs`, {
        ...form,
        sort_order: faqs.length + 1,
      }, {
        headers: authHeader(),
      });
    }

    setOpen(false);
    loadFaqs();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete FAQ?")) return;
    await axios.delete(`${API_URL}/faqs/${id}`, {
      headers: authHeader(),
    });
    loadFaqs();
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
