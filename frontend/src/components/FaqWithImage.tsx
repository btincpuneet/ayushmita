import React, { useState, useEffect } from "react";
import faqImage from "../assets/hero-medical.jpg";
import care from "../assets/care.png";
import Smile from "../assets/smile.png";
import "../css/Faq.css";

const FaqWithImage = ({
  imageUrl = faqImage,
  highlight = { count: "84k+", label: "Happy Patients" },
}) => {
  const [faqs, setFaqs] = useState([]);
  const [open, setOpen] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggle = (id) => setOpen(open === id ? null : id);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5001/api/faqs");
        const data = await response.json();

        // Convert API fields to expected UI format
        const formatted = data.map((item) => ({
          id: item.id,
          q: item.question,
          a: item.answer,
        }));

        setFaqs(formatted);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading FAQs...
      </div>
    );
  }

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 py-12 md:py-16 lg:py-10">
        <h2
          className="
            text-center mb-12
            text-[28px] leading-[1]
            sm:text-[32px] sm:leading-[67px]
          "
          style={{
            fontFamily: "Ubuntu",
            fontWeight: 700,
            fontStyle: "normal",
            letterSpacing: "0%",
            verticalAlign: "middle",
          }}
        >
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center faq-section-medical">

          {/* Left Image Section */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative">
              <div
                className="bg-white rounded-xl"
                style={{ boxShadow: "0 30px 80px rgba(15,23,42,0.08)" }}
              >
                <img
                  src={imageUrl}
                  alt="doctor and patient"
                  className="block object-cover rounded-xl"
                  style={{
                    width: 500,
                    height: 480,
                    maxWidth: "100%",
                    border: "10px solid #ffffff",
                    boxShadow: "0 18px 40px rgba(2,6,23,0.06)",
                  }}
                />
              </div>

              {/* Sticker Icons */}
              <div
                className="absolute -right-10 top-45 -translate-y-1/2 flex items-center justify-center rounded-full bg-white"
                style={{
                  width: 70,
                  height: 70,
                  boxShadow: "0 14px 30px rgba(2,6,23,0.12)",
                }}
              >
                <img src={care} alt="care" className="w-11 h-11" />
              </div>

              <div
                className="absolute -left-7 top-80 bg-white rounded-xl flex items-center gap-4"
                style={{
                  padding: "14px 10px",
                  boxShadow: "0 20px 50px rgba(2,6,23,0.08)",
                  minWidth: 220,
                }}
              >
                <img src={Smile} alt="smile" className="w-11 h-11" />
                <div>
                  <div
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 600,
                      fontSize: "24px",
                      lineHeight: "33px",
                    }}
                  >
                    {highlight.count}
                  </div>
                  <div
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 400,
                      fontSize: "17px",
                      lineHeight: "28px",
                    }}
                  >
                    {highlight.label}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right FAQ Section */}
          <div className="lg:col-span-7">
            <div className="space-y-5">
              {faqs.map((f) => {
                const isOpen = open === f.id;
                return (
                  <div key={f.id}>
                    <button
                      onClick={() => toggle(f.id)}
                      aria-expanded={isOpen}
                      className="w-full text-left flex items-center justify-between py-5 bg-white"
                    >
                      <span
                        style={{
                          fontFamily: "Ubuntu",
                          fontWeight: 700,
                          fontSize: "18px",
                          lineHeight: "30px",
                        }}
                      >
                        {f.q}
                      </span>
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-amber-500 transition-transform ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path
                            d="M12 5v14M5 12h14"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      </span>
                    </button>

                    <div
                      className={`mt-2 px-6 overflow-hidden transition-all ${
                        isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-gray-600 pb-3">{f.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FaqWithImage;
