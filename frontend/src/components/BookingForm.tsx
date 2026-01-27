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

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    Swal.fire({
      title: "Sending Request...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await axios.post(`${API_BASE}/api/form-submit`, {
        type: "consultation",
        data: form,
      });

      Swal.fire({
        icon: "success",
        title: "Request Sent!",
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
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again later.",
        confirmButtonColor: "#F0A324",
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
            required
            className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-white block mb-1">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-white block mb-1">Your Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-white block mb-1">Mobile Number</label>
          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            required
            className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-white block mb-1">Country</label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            required
            className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 focus:outline-none"
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="Turkey">Turkey</option>
            <option value="USA">USA</option>
          </select>
        </div>

        <div>
          <label className="text-white block mb-1">City</label>
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 focus:outline-none"
          >
            <option value="">Select City</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Istanbul">Istanbul</option>
          </select>
        </div>

        <div>
          <label className="text-white block mb-1">Your Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            required
            className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-white block mb-1">Select Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 focus:outline-none"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="text-white block mb-1">Treatment Requirement</label>
          <textarea
            name="requirement"
            value={form.requirement}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 resize-none focus:outline-none"
          />
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
