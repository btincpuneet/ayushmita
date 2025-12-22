// import React, { useState } from "react";
// import axios from "axios";

// const BookingForm: React.FC = () => {
//   const [form, setForm] = useState({
//     name: "",
//     country: "",
//     city: "",
//     mobile: "",
//     requirement: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://127.0.0.1:5001/api/book-consultation", form);
//       alert("Consultation request sent successfully!");
//       setForm({
//         name: "",
//         country: "",
//         city: "",
//         mobile: "",
//         requirement: "",
//       });
//     } catch {
//       alert("Failed to send request");
//     }
//   };

//   return (
//    <div className="bg-[#2A6506] p-6 rounded-2xl shadow-2xl w-full sticky top-6 sider-form-section">

//       {/* Title */}
//       <h3 className="text-[#FFFFFF] text-center"
//       style={{
//   fontFamily: "Ubuntu, sans-serif",
//   fontWeight: 700,
//   fontStyle: "normal",
//   fontSize: "24px",
//   lineHeight: "32px",
//   letterSpacing: "0%",
// }}

//       >
//         Book Your Free Consultation
//       </h3>
//       <p className="text-[#FFFFFF] text-center mt-1 mb-6"
//       style={{
//   fontFamily: "Ubuntu, sans-serif",
//   fontWeight: 400,
//   fontStyle: "normal",
//   fontSize: "12px",
//   lineHeight: "18px",
//   letterSpacing: "0%",
// }}

//       >
//         Our health expert will contact you within 24 hours
//       </p>

//       {/* Form */}
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         {/* Full Name */}
//         <div>
//           <label className="text-[#FFFFFF] mb-1 block"
//           style={{
//   fontFamily: "Ubuntu, sans-serif",
//   fontWeight: 400,
//   fontStyle: "normal",
//   fontSize: "14px",
//   lineHeight: "140%",
//   letterSpacing: "0%",
// }}

//           >
//             Full Name
//           </label>
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             required
//             placeholder="Enter your full name"
//             className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 
//               focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
//               style={{
//   fontFamily: "Ubuntu, sans-serif",
//   fontWeight: 400,
//   fontStyle: "normal",
//   fontSize: "14px",
//   lineHeight: "140%",
//   letterSpacing: "0%",
//   color: "#33333380",
// }}

//           />
//         </div>

//         {/* Country */}
//         <div>
//           <label className="text-[#FFFFFF] mb-1 block"
//           style={{
//   fontFamily: "Ubuntu, sans-serif",
//   fontWeight: 400,
//   fontStyle: "normal",
//   fontSize: "14px",
//   lineHeight: "140%",
//   letterSpacing: "0%",
// }}

//           >
//             Country
//           </label>
//           <select
//             name="country"
//             value={form.country}
//             onChange={handleChange}
//             required
//             className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 
//               focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
//               style={{
//   fontFamily: "Ubuntu, sans-serif",
//   fontWeight: 400,
//   fontStyle: "normal",
//   fontSize: "14px",
//   lineHeight: "140%",
//   letterSpacing: "0%",
//   color: "#33333380",
// }}

//           >
//             <option value="">Select Country</option>
//             <option value="India">India</option>
//             <option value="Turkey">Turkey</option>
//             <option value="USA">USA</option>
//           </select>
//         </div>

//         {/* City */}
//         <div>
//           <label className="text-[#FFFFFF] mb-1 block"
//           style={{
//   fontFamily: "Ubuntu, sans-serif",
//   fontWeight: 400,
//   fontStyle: "normal",
//   fontSize: "14px",
//   lineHeight: "140%",
//   letterSpacing: "0%",
// }}
// >
//             City
//           </label>
//           <select
//             name="city"
//             value={form.city}
//             onChange={handleChange}
//             required
//             className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 
//               focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
//               style={{
//   fontFamily: "Ubuntu, sans-serif",
//   fontWeight: 400,
//   fontStyle: "normal",
//   fontSize: "14px",
//   lineHeight: "140%",
//   letterSpacing: "0%",
//   color: "#33333380",
// }}

//           >
//             <option value="">Select City</option>
//             <option value="Delhi">Delhi</option>
//             <option value="Mumbai">Mumbai</option>
//             <option value="Istanbul">Istanbul</option>
//           </select>
//         </div>

//         {/* Mobile */}
//         <div>
//           <label className="text-[#FFFFFF] mb-1 block"
//           style={{
//   fontFamily: "Ubuntu, sans-serif",
//   fontWeight: 400,
//   fontStyle: "normal",
//   fontSize: "14px",
//   lineHeight: "140%",
//   letterSpacing: "0%",
// }}
// >
//             Mobile Number
//           </label>
//           <input
//             name="mobile"
//             value={form.mobile}
//             onChange={handleChange}
//             required
//             placeholder="+91 XXXXX XXXXX"
//             className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 
//               focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
//               style={{
//   fontFamily: "Ubuntu, sans-serif",
//   fontWeight: 400,
//   fontStyle: "normal",
//   fontSize: "14px",
//   lineHeight: "140%",
//   letterSpacing: "0%",
//   color: "#33333380",
// }}

//           />
//         </div>

//         {/* Requirement */}
//         <div>
//           <label className="text-[#FFFFFF] mb-1 block"
//           style={{
//   fontFamily: "Ubuntu, sans-serif",
//   fontWeight: 400,
//   fontStyle: "normal",
//   fontSize: "14px",
//   lineHeight: "140%",
//   letterSpacing: "0%",
// }}

//           >
//             Treatment Requirement
//           </label>
//           <textarea
//             name="requirement"
//             value={form.requirement}
//             onChange={handleChange}
//             rows={3}
//             placeholder="Describe your medical concern"
//             className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300  resize-none
//               focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
//               style={{
//   fontFamily: "Ubuntu, sans-serif",
//   fontWeight: 400,
//   fontStyle: "normal",
//   fontSize: "14px",
//   lineHeight: "140%",
//   letterSpacing: "0%",
//   color: "#33333380",
// }}

//           />
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full mt-2 bg-[#F0A324] hover:bg-[#F0A324] text-black 
//             py-3 rounded-lg transition duration-200 active:scale-[0.98]"
//             style={{
//   fontFamily: "'Open Sans', sans-serif",
//   fontWeight: 600,
//   fontSize: "18px",
//   lineHeight: "100%",
//   letterSpacing: "0%",
// }}

//         >
//           Submit Request
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BookingForm;
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const BASE_URL = "http://127.0.0.1:5001/api";

const BookingForm: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    country: "",
    city: "",
    mobile: "",
    requirement: "",
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

    // Show loading popup
    Swal.fire({
      title: "Sending Request...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await axios.post(`${BASE_URL}/form-submit`, {
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
        name: "",
        country: "",
        city: "",
        mobile: "",
        requirement: "",
      });
    } catch (error) {
      console.error(error);

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
    <div className="bg-[#2A6506] p-6 rounded-2xl shadow-2xl w-full sticky top-6 sider-form-section">
      {/* Title */}
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

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <label className="text-white mb-1 block">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-white mb-1 block">Country</label>
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
          <label className="text-white mb-1 block">City</label>
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
          <label className="text-white mb-1 block">Mobile Number</label>
          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            required
            placeholder="+91 XXXXX XXXXX"
            className="w-full h-11 px-3 rounded-lg bg-white border border-gray-300 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-white mb-1 block">
            Treatment Requirement
          </label>
          <textarea
            name="requirement"
            value={form.requirement}
            onChange={handleChange}
            rows={3}
            placeholder="Describe your medical concern"
            className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 resize-none focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-[#F0A324] text-black py-3 rounded-lg transition duration-200 disabled:opacity-70"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
