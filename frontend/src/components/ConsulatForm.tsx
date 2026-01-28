
import React, { useState } from "react";
import axios from "axios";
import { API_BASE } from "../config/api";
import Swal from "sweetalert2";
 
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
  const [success, setSuccess] = useState("");
 
  const validateField = (name: keyof FormData, value: string): string => {
    const trimmed = value.trim();
 
    switch (name) {
      case "fullName": {
        if (!trimmed) return "Full name is required";
        if (trimmed.length < 3) return "Full name is too short";
        if (trimmed.length > 50) return "Full name is too long";
        if (!/^[A-Za-z\s'.-]+$/.test(trimmed))
          return "Full name contains invalid characters";
        return "";
      }
 
      case "phoneNumber": {
        if (!trimmed) return "Phone number is required";
        if (!/^[0-9]+$/.test(trimmed))
          return "Phone number must contain only digits";
        if (trimmed.length !== 10)
          return "Phone number must be 10 digits";
        return "";
      }
 
      case "email": {
        if (!trimmed) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed))
          return "Enter a valid email address";
        return "";
      }
 
      case "country": {
        if (!trimmed) return "Please select a country";
        return "";
      }
 
      case "treatment": {
        if (!trimmed) return "Treatment is required";
        if (trimmed.length < 3)
          return "Treatment must be at least 3 characters";
        if (trimmed.length > 100)
          return "Treatment must not exceed 100 characters";
        return "";
      }
 
      case "requirements": {
        if (!trimmed) return "Requirements are required";
        if (trimmed.length < 10)
          return "Requirements must be at least 10 characters";
        if (trimmed.length > 500)
          return "Requirements must not exceed 500 characters";
        return "";
      }
 
      default:
        return "";
    }
 
  };
 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
 
    setFormData((prev) => ({ ...prev, [name]: value }));
 
    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
 
    const newErrors: Partial<FormData> = {};
    let isValid = true;
 
    (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        isValid = false;
        newErrors[key] = error;
      }
    });
 
    setErrors(newErrors);
 
    if (!isValid) return;
 
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
          name: formData.fullName,
          email: formData.email,
          mobile: formData.phoneNumber,
          country: formData.country,
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
    } catch (err) {
      setSuccess("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
 
  const ErrorText = ({ name }: { name: keyof FormData }) =>
    errors[name] ? <p className="text-red-300 text-xs mt-1">{errors[name]}</p> : null;
 
  return (
    <div className="max-w-7xl mx-auto flex justify-center py-10 px-4">
      <div className="w-full rounded-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-xl bg-[#2A6506]">
 
        {/* Left Section */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400"
            alt="Consultation"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute top-10 left-8 text-white pr-10">
            <h2 className="text-2xl font-bold">Book Your Free Consultation</h2>
            <p className="mt-2 text-sm">
              Submit the form and our health expert will reach out within 24 hours.
            </p>
          </div>
        </div>
 
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-4 text-white">
 
          {success && (
            <p className="text-green-300 text-sm font-medium">{success}</p>
          )}
 
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label>Full Name</label>
              <input
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="p-2 rounded bg-white text-black w-full"
              />
              <ErrorText name="fullName" />
            </div>
 
            <div>
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                placeholder="Enter your phone number"
                inputMode="numeric"
                maxLength={10}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
                  ) {
                    e.preventDefault();
                  }
                }}
                className="p-2 rounded bg-white text-black w-full"
              />
              <ErrorText name="phoneNumber" />
            </div>
 
          </div>
 
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
 
                value={formData.email}
                onChange={handleChange}
                className="p-2 rounded bg-white text-black w-full"
              />
              <ErrorText name="email" />
            </div>
 
            <div>
              <label>Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="p-2 rounded bg-white text-black w-full"
              >
                <option value="">Select Country</option>
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
                <option>Canada</option>
              </select>
              <ErrorText name="country" />
            </div>
          </div>
 
          <div>
            <label>Treatment</label>
            <input
              name="treatment"
              placeholder="Enter treatment or procedure name"
 
              value={formData.treatment}
              onChange={handleChange}
              className="p-2 rounded bg-white text-black w-full"
            />
            <ErrorText name="treatment" />
          </div>
 
          <div>
            <label>Requirements</label>
            <textarea
              name="requirements"
              placeholder="Describe your medical requirements or concerns"
              value={formData.requirements}
              onChange={handleChange}
              className="p-2 rounded bg-white text-black w-full h-28"
            />
            <ErrorText name="requirements" />
          </div>
 
          <button
            type="submit"
            disabled={loading}
            className="bg-[#F0A324] py-3 rounded text-lg font-medium"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};
 
export default ConsultationForm;
 
 