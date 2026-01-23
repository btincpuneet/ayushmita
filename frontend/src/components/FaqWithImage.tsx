import React, { useState, useEffect } from "react";
import { API_BASE } from "../config/api";
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
        const response = await fetch(`${API_BASE}/api/faqs`);
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
      <div className="max-w-6xl mx-auto px-5 py-12 md:py-16 lg:py-10">
        <h2
          className="
            text-center mb-12
            text-[28px] leading-[1]
            sm:text-[32px] sm:leading-[67px] faq-sections
          "        >
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start [overflow-anchor:none]">



          <div className="lg:col-span-7">
            <div className="faq-grid-right">
              {faqs.map((f) => {
                const isActive = open === f.id;

                return (
                  <div
                    key={f.id}
                    className={`faq-item ${isActive ? "active" : ""}`}
                  >
                    <div
                      className="faq-question"
                      onClick={() => toggle(f.id)}
                    >
                      {f.q}
                      <span className="faq-icon">
                        {isActive ? "−" : "+"}
                      </span>
                    </div>

                    <div className="faq-answer">
                      {f.a}
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
