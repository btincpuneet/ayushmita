import React, { useState } from "react";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-7xl mx-auto flex justify-center py-10 px-4">
      <div
        className="w-[100%] rounded-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-xl"
        style={{
           background: "linear-gradient(180deg, #2A6506 100%)",
        }}
      >
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=280&fit=crop"
            alt="Consultation"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute top-10 left-8 text-white pr-10">
            <h2
  style={{
    fontFamily: "Ubuntu",
    fontWeight: 700,
    fontStyle: "normal",
    fontSize: "28px",
    lineHeight: "32px",
    letterSpacing: "0%",
  }}
>
  Book Your Free Consultation
</h2>

            <p
  className="mt-2"
  style={{
    fontFamily: "Ubuntu",
    fontWeight: 400,
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "18px",
    letterSpacing: "0%",
  }}
>
              Submit the form and our health expert will reach out within 24 hours.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-4 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
  className="block mb-1"
  style={{
    fontFamily: "Ubuntu",
    fontWeight: 400,
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "140%",
    letterSpacing: "0%",
  }}
>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="p-2 rounded bg-white text-black w-full"
              />
            </div>

            <div>
              <label
  className="block mb-1"
  style={{
    fontFamily: "Ubuntu",
    fontWeight: 400,
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "140%",
    letterSpacing: "0%",
  }}
>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="p-2 rounded bg-white text-black w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
  className="block mb-1"
  style={{
    fontFamily: "Ubuntu",
    fontWeight: 400,
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "140%",
    letterSpacing: "0%",
  }}
>Email ID</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 rounded bg-white text-black w-full"
              />
            </div>

            <div>
              <label
  className="block mb-1"
  style={{
    fontFamily: "Ubuntu",
    fontWeight: 400,
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "140%",
    letterSpacing: "0%",
  }}
>Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="p-2 rounded bg-white text-black w-full"
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
              </select>
            </div>
          </div>

          <div>
            <label
  className="block mb-1"
  style={{
    fontFamily: "Ubuntu",
    fontWeight: 400,
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "140%",
    letterSpacing: "0%",
  }}
>
              Which Treatment Are You Looking For?
            </label>
            <input
              type="text"
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              className="p-2 rounded bg-white text-black w-full"
            />
          </div>

          <div>
            <label
  className="block mb-1"
  style={{
    fontFamily: "Ubuntu",
    fontWeight: 400,
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "140%",
    letterSpacing: "0%",
  }}
>Treatment Requirements</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className="p-2 rounded bg-white text-black w-full h-28"
            />
          </div>

         <button
  type="submit"
  style={{
    background: "#F0A324",
    padding: "12px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s",
    fontFamily: "Open Sans",
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: "100%",
    color: "#333333",
    letterSpacing: "0%",
  }}
>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConsultationForm;
