import React, { useState } from "react";
import axios from "axios";

const BookingForm: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    country: "",
    city: "",
    mobile: "",
    requirement: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5001/api/book-consultation", form);
      alert("Consultation request sent successfully!");
      setForm({
        name: "",
        country: "",
        city: "",
        mobile: "",
        requirement: "",
      });
    } catch {
      alert("Failed to send request");
    }
  };

  return (
    <div className="bg-[#2A6506] p-6 rounded-2xl shadow-2xl w-full max-w-sm sticky top-6">
      {/* Title */}
      <h3 className="text-xl font-bold text-white text-center">
        Book Your Free Consultation
      </h3>
      <p className="text-xs text-white/90 text-center mt-1 mb-6">
        Our health expert will contact you within 24 hours
      </p>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <label className="text-xs font-medium text-white mb-1 block">
            Full Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 text-sm
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          />
        </div>

        {/* Country */}
        <div>
          <label className="text-xs font-medium text-white mb-1 block">
            Country
          </label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            required
            className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 text-sm
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="Turkey">Turkey</option>
            <option value="USA">USA</option>
          </select>
        </div>

        {/* City */}
        <div>
          <label className="text-xs font-medium text-white mb-1 block">
            City
          </label>
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 text-sm
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          >
            <option value="">Select City</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Istanbul">Istanbul</option>
          </select>
        </div>

        {/* Mobile */}
        <div>
          <label className="text-xs font-medium text-white mb-1 block">
            Mobile Number
          </label>
          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            required
            placeholder="+91 XXXXX XXXXX"
            className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 text-sm
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          />
        </div>

        {/* Requirement */}
        <div>
          <label className="text-xs font-medium text-white mb-1 block">
            Treatment Requirement
          </label>
          <textarea
            name="requirement"
            value={form.requirement}
            onChange={handleChange}
            rows={3}
            placeholder="Describe your medical concern"
            className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 text-sm resize-none
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold
            py-3 rounded-lg transition duration-200 active:scale-[0.98]"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
