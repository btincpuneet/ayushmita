import React, { useState, useEffect } from "react";
import { API_BASE } from "../config/api";
import faqImage from "../assets/hero-medical.jpg";
import "../css/Faq.css";

/* ---------- Types ---------- */

interface Highlight {
  count: string;
  label: string;
}

interface FaqItem {
  id: number;
  q: string;
  a: string;
}

interface ApiFaqItem {
  id: number;
  question: string;
  answer: string;
}

interface ApiResponse {
  success: boolean;
  data: ApiFaqItem[];
}

interface FaqWithImageProps {
  faqType?: string;
  imageUrl?: string;
  highlight?: Highlight;
}

/* ---------- Component ---------- */

const FaqWithImage: React.FC<FaqWithImageProps> = ({
  faqType = "home",
  imageUrl = faqImage,
  highlight = { count: "84k+", label: "Happy Patients" },
}) => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const toggle = (id: number) => {
    setOpen((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch(
          `${API_BASE}/api/active/faqs?faq_type=${faqType}`,
          { cache: "no-store" }
        );

        const result: ApiResponse = await response.json();

        if (result.success) {
          const formatted: FaqItem[] = result.data.map((item) => ({
            id: item.id,
            q: item.question,
            a: item.answer,
          }));

          setFaqs(formatted);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, [faqType]);

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
        <h2 className="text-center mb-12 text-[28px] sm:text-[32px] faq-sections">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6">
              {faqs.map((f) => {
                const isActive = open === f.id;

                return (
                  <div
                    key={f.id}
                    className={`faq-item ${isActive ? "active" : ""}`}
                  >
                    <button
                      type="button"
                      className="faq-question w-full text-left"
                      onClick={() => toggle(f.id)}
                    >
                      {f.q}
                      <span className="faq-icon">
                        {isActive ? "−" : "+"}
                      </span>
                    </button>

                    {isActive && (
                      <div className="faq-answer">
                        {f.a}
                      </div>
                    )}
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
