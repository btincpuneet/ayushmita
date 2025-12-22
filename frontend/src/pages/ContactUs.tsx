import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import Header from "../components/Header";
import Footer from "../components/Footer";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";

const API_BASE = "http://127.0.0.1:5001/api";

const ContactUs = () => {
  const [cmsContent, setCmsContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    country: "",
    treatment: "",
    message: "",
  });

  useEffect(() => {
    fetchCmsContent();
  }, []);

  const fetchCmsContent = async () => {
    try {
      const res = await axios.get(`${API_BASE}/contact-us`);
      if (res.data?.data?.length > 0) {
        setCmsContent(res.data.data[0].content_html);
      }
    } catch (error) {
      console.error("Failed to load contact CMS content", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Please wait...",
      text: "Sending your message",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      setSubmitting(true);

      await axios.post(`${API_BASE}/form-submit`, {
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


              <div className="bg-white rounded-xl p-6 shadow-sm">
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
              <h3 className="font-semibold mb-4 text-lg">
                Have questions? Contact us
              </h3>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input"
                    required
                  />

                  <input
                    type="text"
                    name="mobile"
                    placeholder="Phone Number"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email ID"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                    required
                  />

                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </select>
                </div>

                <input
                  type="text"
                  name="treatment"
                  placeholder="Which Treatment Are You Looking For?"
                  value={formData.treatment}
                  onChange={handleChange}
                  className="input"
                />

                <textarea
                  rows={4}
                  name="message"
                  placeholder="Describe your treatment requirements"
                  value={formData.message}
                  onChange={handleChange}
                  className="input resize-none"
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-yellow-500 py-3 rounded-md font-semibold hover:bg-yellow-600 transition disabled:opacity-60"
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
