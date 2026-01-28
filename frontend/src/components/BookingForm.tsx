import React, { useState } from "react";
import axios from "axios";
import { API_BASE } from "../config/api";
import Swal from "sweetalert2";
 
const BookingForm: React.FC = () => {
  const [form, setForm] = useState({
    appointment_date: "",
    name: "",
    email: "",
    mobile: "",
    country: "",
    city: "",
    age: "",
    gender: "",
    requirement: "",
    hidden_url: window.location.href,
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
 
  const [loading, setLoading] = useState(false);
  const validateField = (name: string, value: string) => {
    const trimmed = value.trim();
 
    switch (name) {
      case "appointment_date":
        return trimmed ? "" : "Please select an appointment date.";
 
      case "name":
        if (!trimmed) return "Full name is required.";
        if (trimmed.length < 3) return "Name must be at least 3 characters.";
        return "";
 
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)
          ? ""
          : "Enter a valid email address.";
 
      case "mobile":
        return /^[0-9]{10}$/.test(trimmed)
          ? ""
          : "Mobile number must be 10 digits.";
 
      case "country":
        return trimmed ? "" : "Please select a country.";
 
      case "city":
        return trimmed ? "" : "Please select a city.";
 
      case "age":
        const ageNum = Number(trimmed);
        if (!ageNum || ageNum < 1 || ageNum > 120)
          return "Enter a valid age.";
        return "";
 
      case "gender":
        return trimmed ? "" : "Please select gender.";
 
      case "requirement":
        if (!trimmed) return "Requirement is required.";
        if (trimmed.length < 10)
          return "Minimum 10 characters required.";
        return "";
 
      default:
        return "";
    }
  };
 
 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
 
    setForm({ ...form, [name]: value });
 
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 
    const newErrors: Partial<typeof form> = {};
    let isValid = true;
 
    Object.keys(form).forEach((key) => {
      if (key === "hidden_url") return;
 
      const error = validateField(key, form[key as keyof typeof form]);
      if (error) {
        isValid = false;
        newErrors[key as keyof typeof form] = error;
      }
    });
 
    setErrors(newErrors);
 
    if (!isValid) return;
    setLoading(true);
 
    Swal.fire({
      title: "Submitting Request",
      text: "Please wait...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
 
    try {
      await axios.post(`${API_BASE}/api/form-submit`, {
        type: "consultation",
        data: form,
      });
 
      Swal.fire({
        icon: "success",
        title: "Request Submitted",
        text: "Our health expert will contact you within 24 hours.",
        confirmButtonColor: "#F0A324",
      });
 
      setForm({
        appointment_date: "",
        name: "",
        email: "",
        mobile: "",
        country: "",
        city: "",
        age: "",
        gender: "",
        requirement: "",
        hidden_url: window.location.href,
      });
 
      setErrors({});
    } catch {
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
    <div className="bg-[#2A6506] p-6 rounded-2xl shadow-2xl w-full top-6 sider-form-section">
      <h3
        className="text-[#FFFFFF] text-center"
        style={{
          fontFamily: "Ubuntu, sans-serif",
          fontWeight: 700,
          fontSize: "24px",
          lineHeight: "32px",
        }}
      >
        Book Your Free Consultation
      </h3>
 
      <p
        className="text-[#FFFFFF] text-center mt-1 mb-6"
        style={{
          fontFamily: "Ubuntu, sans-serif",
          fontWeight: 400,
          fontSize: "12px",
          lineHeight: "18px",
        }}
      >
        Our health expert will contact you within 24 hours
      </p>
 
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
 
        <div>
          <label className="text-white block mb-1">Select appointment date</label>
          <input
            type="date"
            name="appointment_date"
            value={form.appointment_date}
            onChange={handleChange}
            className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 focus:outline-none"
          />
          {errors.appointment_date && (
            <p className="text-red-300 text-xs mt-1">{errors.appointment_date}</p>
          )}
        </div>
 
        <div>
          <label className="text-white block mb-1">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 focus:outline-none"
          />
          {errors.name && (
            <p className="text-red-300 text-xs mt-1">{errors.name}</p>
          )}
        </div>
 
        <div>
          <label className="text-white block mb-1">Your Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-300 text-xs mt-1">{errors.email}</p>
          )}
        </div>
 
        <div>
          <label className="text-white block mb-1">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            value={form.mobile}
            inputMode="numeric"
            maxLength={10}
            placeholder="Enter your mobile number"
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
 
              setForm((prev) => ({ ...prev, mobile: digits }));
 
              setErrors((prev) => ({
                ...prev,
                mobile: validateField("mobile", digits),
              }));
            }}
 
            className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 focus:outline-none"
          />
          {errors.mobile && (
            <p className="text-red-300 text-xs mt-1">{errors.mobile}</p>
          )}
        </div>
 
        <div>
          <label className="text-white block mb-1">Country</label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 focus:outline-none"
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="Turkey">Turkey</option>
            <option value="USA">USA</option>
          </select>
          {errors.country && (
            <p className="text-red-300 text-xs mt-1">{errors.country}</p>
          )}
        </div>
 
        <div>
          <label className="text-white block mb-1">City</label>
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 focus:outline-none"
          >
            <option value="">Select City</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Istanbul">Istanbul</option>
          </select>
          {errors.city && (
            <p className="text-red-300 text-xs mt-1">{errors.city}</p>
          )}
        </div>
 
        <div>
          <label className="text-white block mb-1">Your Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Enter your age"
            className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 focus:outline-none"
          />
          {errors.age && (
            <p className="text-red-300 text-xs mt-1">{errors.age}</p>
          )}
        </div>
 
        <div>
          <label className="text-white block mb-1">Select Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 focus:outline-none"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-300 text-xs mt-1">{errors.gender}</p>
          )}
        </div>
 
        <div>
          <label className="text-white block mb-1">Treatment Requirement</label>
          <textarea
            name="requirement"
            value={form.requirement}
            onChange={handleChange}
            rows={3}
            placeholder="Describe your medical condition or treatment requirement"
            className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 resize-none focus:outline-none"
          />
          {errors.requirement && (
            <p className="text-red-300 text-xs mt-1">{errors.requirement}</p>
          )}
        </div>
 
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-[#F0A324] text-black py-3 rounded-lg transition duration-200 disabled:opacity-70"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
 
export default BookingForm;