import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE } from "../config/api";

interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  country: string;
  treatment: string;
  requirements: string;
}

const ConsultationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    email: "",
    country: "",
    treatment: "",
    requirements: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);

 const validateField = (name: keyof FormData, value: string) => {
  let error = "";

  if (name === "fullName") {
    const trimmed = value.trim();

    if (!trimmed) {
      error = "Full name is required";
    } else if (!/^[A-Za-z]+(\s+[A-Za-z]+)+$/.test(trimmed)) {
      error = "Enter first and last name only (letters only)";
    } else if (trimmed.length < 3) {
      error = "Minimum 3 characters required";
    } else if (trimmed.length > 50) {
      error = "Maximum 50 characters allowed";
    }
  }

  if (name === "phoneNumber") {
    if (!/^[0-9]{10}$/.test(value))
      error = "Phone number must be exactly 10 digits";
  }

  if (name === "email") {
    if (!/^\S+@\S+\.\S+$/.test(value))
      error = "Enter a valid email address";
  }

  if (name === "country") {
    if (!value) error = "Country is required";
  }

  if (name === "treatment") {
    if (value.trim().length < 3)
      error = "Minimum 3 characters required";
    if (value.trim().length > 100)
      error = "Maximum 100 characters allowed";
  }

  if (name === "requirements") {
    if (value.trim().length < 10)
      error = "Minimum 10 characters required";
    if (value.trim().length > 500)
      error = "Maximum 500 characters allowed";
  }

  setErrors((prev) => ({ ...prev, [name]: error }));
  return !error;
};


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof FormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = (Object.keys(formData) as (keyof FormData)[]).every(
      (key) => validateField(key, formData[key])
    );

    if (!isValid) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Form",
        text: "Please fix the errors before submitting",
      });
      return;
    }

    setLoading(true);

    Swal.fire({
      title: "Sending Request",
      text: "Please wait...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      await axios.post(`${API_BASE}/api/form-submit`, {
        type: "consultation",
        data: {
          appointment_date: "",
          name: formData.fullName,
          email: formData.email,
          mobile: formData.phoneNumber,
          country: formData.country,
          city: "",
          age: "",
          gender: "",
          requirement: `${formData.treatment} - ${formData.requirements}`,
          hidden_url: window.location.href,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Request Sent",
        text: "Our health expert will contact you within 24 hours",
        confirmButtonColor: "#F0A324",
      });

      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        country: "",
        treatment: "",
        requirements: "",
      });
      setErrors({});
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  const ErrorText = ({ name }: { name: keyof FormData }) =>
    errors[name] ? (
      <p className="text-red-300 text-xs mt-1">{errors[name]}</p>
    ) : null;

  return (
    <div className="max-w-7xl mx-auto flex justify-center py-10 px-4">
      <div
        className="w-full rounded-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-xl"
        style={{ background: "linear-gradient(180deg, #2A6506 100%)" }}
      >
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=280&fit=crop"
            alt="Consultation"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute top-10 left-8 text-white pr-10">
            <h2 style={{ fontFamily: "Ubuntu", fontWeight: 700, fontSize: "28px" }}>
              Book Your Free Consultation
            </h2>
            <p className="mt-2" style={{ fontSize: "14px" }}>
              Submit the form and our health expert will reach out within 24 hours.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-4 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Full Name</label>
              <input name="fullName" value={formData.fullName} onChange={handleChange} className="p-2 rounded bg-white text-black w-full" />
              <ErrorText name="fullName" />
            </div>

            <div>
              <label>Phone Number</label>
              <input name="phoneNumber" maxLength={10} value={formData.phoneNumber} onChange={handleChange} className="p-2 rounded bg-white text-black w-full" />
              <ErrorText name="phoneNumber" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Email ID</label>
              <input name="email" value={formData.email} onChange={handleChange} className="p-2 rounded bg-white text-black w-full" />
              <ErrorText name="email" />
            </div>

            <div>
              <label>Country</label>
              <select name="country" value={formData.country} onChange={handleChange} className="p-2 rounded bg-white text-black w-full">
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
              </select>
              <ErrorText name="country" />
            </div>
          </div>

          <div>
            <label>Which Treatment Are You Looking For?</label>
            <input name="treatment" value={formData.treatment} onChange={handleChange} className="p-2 rounded bg-white text-black w-full" />
            <ErrorText name="treatment" />
          </div>

          <div>
            <label>Treatment Requirements</label>
            <textarea name="requirements" value={formData.requirements} onChange={handleChange} className="p-2 rounded bg-white text-black w-full h-28" />
            <ErrorText name="requirements" />
          </div>

          <button type="submit" disabled={loading} style={{ background: "#F0A324", padding: "12px", borderRadius: "6px", fontSize: "18px" }}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConsultationForm;
