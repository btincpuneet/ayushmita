import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface ModalAppointmentProps {
  isOpen: boolean;
  onClose: () => void;
}

const BASE_URL = "http://127.0.0.1:5001/api";

const ModalAppointment: React.FC<ModalAppointmentProps> = ({
  isOpen,
  onClose,
}) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? !form.agree : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.agree) {
      Swal.fire({
        icon: "warning",
        title: "Consent Required",
        text: "Please agree to receive notifications.",
      });
      return;
    }

    setLoading(true);

    Swal.fire({
      title: "Submitting...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      await axios.post(`${BASE_URL}/form-submit`, {
        type: "appointment",
        data: {
          name: form.name,
          mobile: form.phone,
          message: form.message,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Appointment Request Sent!",
        text: "Our team will contact you shortly.",
        confirmButtonColor: "#FFB300",
      });

      setForm({
        name: "",
        phone: "",
        message: "",
        agree: false,
      });

      onClose();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-lg shadow-xl relative rounded-2xl">
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-xl font-semibold bg-[#F6F7F9] px-4 py-4 rounded-t-2xl">
          Book An Appointment For Treatment
        </h2>

        <form className="space-y-4 p-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="form-names">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div className="flex flex-col">
              <label className="form-names">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="form-names">Describe your treatment requirements</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm h-24"
            />
          </div>

          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={handleChange}
              name="agree"
              className="mt-1"
            />
            <span className="form-names">
              I agree to receive updates/notifications via WhatsApp
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-1/2 bg-[#ffb300] hover:bg-[#ffaa00] text-black py-2 rounded-md font-medium disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalAppointment;
