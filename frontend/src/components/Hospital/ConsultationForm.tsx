import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const ConsultationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    city: "",
    mobile: "",
    requirements: "",
  });

  const countries = ["Turkey", "India", "UAE", "Germany", "Thailand"];
  const citiesByCountry: Record<string, string[]> = {
    Turkey: ["Istanbul", "Ankara", "Izmir"],
    India: ["Delhi", "Mumbai", "Bangalore"],
    UAE: ["Dubai", "Abu Dhabi", "Sharjah"],
    Germany: ["Berlin", "Munich", "Frankfurt"],
    Thailand: ["Bangkok", "Phuket", "Chiang Mai"],
  };

  const cities = formData.country ? citiesByCountry[formData.country] || [] : [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "country" ? { city: "" } : {}),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! We will contact you within 24 hours.");
  };

  return (
    <div className="bg-[#7CB342] p-6 rounded-xl sticky top-24 text-black">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-1">Book Your Free Consultation</h2>
      <p className="text-md mb-5">
        Submit the form and our health expert will reach out within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="w-full px-3 py-3 bg-white border border-gray-300 rounded-md outline-none"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <div className="relative">
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-3 py-3 bg-white border border-gray-300 rounded-md appearance-none cursor-pointer outline-none pr-10"
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />
          </div>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <div className="relative">
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!formData.country}
              className="w-full px-3 py-3 bg-white border border-gray-300 rounded-md appearance-none cursor-pointer outline-none pr-10 disabled:bg-gray-100"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />
          </div>
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-sm font-medium mb-1">Mobile</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            required
            className="w-full px-3 py-3 bg-white border border-gray-300 rounded-md outline-none"
          />
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Describe your treatment requirements
          </label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Tell us about your medical needs..."
            className="w-full px-3 py-3 bg-white border border-gray-300 rounded-md outline-none min-h-[100px] resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#333] text-white py-3 rounded-md font-semibold hover:bg-black transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ConsultationForm;
