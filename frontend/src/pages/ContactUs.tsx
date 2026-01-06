import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../config/api";
import Swal from "sweetalert2";
// import "../css/contact.css";
import UseSeo from '../hooks/useSeo';

import Header from "../components/Header";
import Footer from "../components/Footer";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";

const ContactUs = () => {
  const [cmsContent, setCmsContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [seoData, setSeoData] = useState("")
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/contact-us`);
        setSeoData(res.data.data[0]);
        console.log("12", res.data.data[0].seo_title)
      } catch (error) {
        console.error("Failed to load contact CMS content", error);
      }
    };

    fetchStats();
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    country: "",
    treatment: "",
    message: "",
  });


  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCmsContent();
  }, []);

  const fetchCmsContent = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/contact-us`);
      if (res.data?.data?.length > 0) {
        setCmsContent(res.data.data[0].content_html);
      }

    } catch (error) {
      console.error("Failed to load contact CMS content", error);
    } finally {
      setLoading(false);
    }
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (value.length < 2) error = "Minimum 2 characters required";
        break;

      case "mobile":
        if (!value.trim()) error = "Phone number is required";
        else if (!/^[0-9]{7,15}$/.test(value))
          error = "Enter valid phone number (7–15 digits)";
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
        ) {
          error = "Enter a valid email address";
        }
        break;


      case "country":
        if (!value) error = "Country is required";
        break;

      case "message":
        if (!value.trim()) error = "Message is required";
        else if (value.length < 10)
          error = "Minimum 10 characters required";
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }
    if (name === "email") {
      if (/\s/.test(value)) return;
      if (value.length > 100) return;
    }
    setFormData({ ...formData, [name]: value });

    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    Swal.fire({
      title: "Please wait...",
      text: "Sending your message",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      setSubmitting(true);

      await axios.post(`${API_BASE}/api/form-submit`, {
        type: "contact",
        data: formData,
      });

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for contacting us. We will get back to you shortly.",
        confirmButtonColor: "#f5a623",
      });

      setFormData({
        name: "",
        mobile: "",
        email: "",
        country: "",
        treatment: "",
        message: "",
      });

      setErrors({});
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Failed to send message. Please try again later.",
        confirmButtonColor: "#f5a623",
      });
    } finally {
      setSubmitting(false);
    }
  };

  UseSeo(seoData.seo_title, seoData.seo_description, seoData.seo_keywords);

  return (
    <>
      <Header />

      <TreatmentHeader
        title="Contact Us"
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Contact Us" },
        ]}
      />

      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gray-100 rounded-2xl shadow-md p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-6">
              <div className="rounded-xl p-6 contact-us-pgs-1">
                {loading ? (
                  <p className="text-gray-500">Loading...</p>
                ) : (
                  <div
                    className="max-w-none text-sm"
                    dangerouslySetInnerHTML={{ __html: cmsContent }}
                  />
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="have-a-questionss mb-4">
                Have questions? Contact us
              </h3>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="name-form-sec">
                    <label className="contact-form-section">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input ${errors.name ? "border-red-500" : ""}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                  </div>

                  <div className="name-form-sec">
                    <label className="contact-form-section">Phone Number</label>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      maxLength={10}
                      className={`input ${errors.mobile ? "border-red-500" : ""}`}
                    />
                    {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="name-form-sec">
                    <label className="contact-form-section">Email ID</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                  </div>

                  <div className="name-form-sec">
                    <label className="contact-form-section">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`input ${errors.country ? "border-red-500" : ""}`}
                    >
                      <option value="">Select Country</option>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                    </select>
                    {errors.country && <p className="text-red-500 text-xs">{errors.country}</p>}
                  </div>
                </div>

                <div className="name-form-sec">
                  <label className="contact-form-section">Which Treatment Are You Looking For ?</label>
                  <input
                    type="text"
                    name="treatment"
                    value={formData.treatment}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                <div className="name-form-sec">
                  <label className="contact-form-section">Describe your treatment requirements</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`input resize-none ${errors.message ? "border-red-500" : ""}`}
                  />
                  {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#F0A324] py-[12px] rounded-md transition disabled:opacity-60 contact-page-submit-btn"
                >
                  {submitting ? "Please wait..." : "Send Message"}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      <section className="h-[350px] w-full">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps?q=Ghaziabad&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
        />
      </section>

      <Footer />
    </>
  );
};

export default ContactUs;
