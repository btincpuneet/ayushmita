import React, { useState } from "react";
import axios from "axios";
import { API_BASE } from "../../config/api";
import Swal from "sweetalert2";

interface ModalAppointmentProps {
  isOpen: boolean;
  onClose: () => void;
}

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

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const validateField = (name: string, value: any) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (!/^[a-zA-Z\s]+$/.test(value))
          error = "Only letters allowed";
        else if (value.length < 2)
          error = "Minimum 2 characters required";
        break;

      case "phone":
        if (!value.trim()) error = "Phone number is required";
        else if (!/^[0-9]{10}$/.test(value))
          error = "Phone number must be exactly 10 digits";
        break;

      case "message":
        if (!value.trim()) error = "Message is required";
        else if (value.length < 10)
          error = "Minimum 10 characters required";
        break;

      case "agree":
        if (!value) error = "Consent is required";
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;

    // Phone: digits only, max 10
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    // Name: letters & spaces only
    if (name === "name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

    const fieldValue = type === "checkbox" ? checked : value;

    setForm((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    setErrors((prev: any) => ({
      ...prev,
      [name]: validateField(name, fieldValue),
    }));
  };

  const validateForm = () => {
    const newErrors: any = {};

    Object.keys(form).forEach((key) => {
      const error = validateField(key, (form as any)[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    Swal.fire({
      title: "Submitting...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      await axios.post(`${API_BASE}/api/form-submit`, {
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

      setErrors({});
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
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-3xl"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-xl font-semibold bg-[#F6F7F9] px-4 py-4  rounded-t-2xl book-btn-item-title">
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
                className={`w-full border rounded-md px-3 py-2 text-sm ${
                  errors.name ? "border-red-500" : "border-gray-400"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="form-names">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                maxLength={10}
                className={`w-full border rounded-md px-3 py-2 text-sm ${
                  errors.phone ? "border-red-500" : "border-gray-400"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone}</p>
              )}
            </div>
          </div>

          <div>
            <label className="form-names">
              Describe your treatment requirements
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 text-sm h-24 ${
                errors.message ? "border-red-500" : "border-gray-400"
              }`}
            />
            {errors.message && (
              <p className="text-red-500 text-xs">{errors.message}</p>
            )}
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
          {errors.agree && (
            <p className="text-red-500 text-xs">{errors.agree}</p>
          )}

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
