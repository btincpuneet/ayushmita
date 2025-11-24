import React, { useState } from "react";
import faqImage from "../assets/hero-medical.jpg";
import Container from "./Container";
import '../css/faq.css'
const defaultFaqs = [
  {
    id: 1,
    q: "Why choose our medical for your family?",
    a: "We provide personalised care plans, experienced staff and 24/7 support to ensure your family's health and comfort.",
  },
  {
    id: 2,
    q: "Why we are different from others?",
    a: "Our multidisciplinary team, evidence-based care and continuity of service make us stand out.",
  },
  {
    id: 3,
    q: "Trusted & experience senior care & love",
    a: "We focus on dignity, independence and specialised geriatric expertise for seniors.",
  },
  {
    id: 4,
    q: "How to get appointment for emergency cases?",
    a: "Call our emergency hotline or use the online booking — urgent referrals are prioritised immediately.",
  },
];

type FaqWithImageProps = {
  imageUrl?: string;
  faqs?: typeof defaultFaqs;
  highlight?: { count: string; label: string };
};

const FaqWithImage: React.FC<FaqWithImageProps> = ({
  imageUrl = faqImage,
  faqs = defaultFaqs,
  highlight = { count: "84k+", label: "Happy Patients" },
}) => {
  const [open, setOpen] = useState<number | null>(null);
  const toggle = (id: number) => setOpen(open === id ? null : id);

  return (
    <section className="relative bg-white py-16 md:py-20 overflow-hidden">
      {/* Decorative scribbles */}
      <div className="hidden lg:block absolute left-6 top-1/3 opacity-20 pointer-events-none">
        <svg
          width="120"
          height="160"
          viewBox="0 0 120 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 20 C60 90, 10 140, 80 150"
            stroke="#FDE68A"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      <div className="hidden lg:block absolute right-6 top-6 opacity-20 pointer-events-none">
        <svg
          width="90"
          height="90"
          viewBox="0 0 90 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 50 Q45 10, 80 50"
            stroke="#BFDBFE"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <Container >
    

        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-gray-800 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center faq-section-medical" >
          {/* LEFT: image area */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative">
              <div
                className="bg-white rounded-xl"
                style={{
                  boxShadow: "0 30px 80px rgba(15,23,42,0.08)",
                  padding: "18px",
                }}
              >
                <img
                  src={imageUrl}
                  alt="doctor and patient"
                  className="block object-cover rounded-xl"
                  style={{
                    width: 460,
                    height: 320,
                    maxWidth: "100%",
                    border: "10px solid #ffffff",
                    boxShadow: "0 18px 40px rgba(2,6,23,0.06)",
                  }}
                />
              </div>

              {/* floating round icon right middle */}
              <div
                className="absolute -right-10 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-white"
                style={{
                  width: 70,
                  height: 70,
                  boxShadow: "0 14px 30px rgba(2,6,23,0.12)",
                }}
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M12 2C15.866 2 19 5.134 19 9c0 5.25-7 11-7 11s-7-5.75-7-11c0-3.866 3.134-7 7-7z"
                      fill="#FFEFF0"
                    />
                    <path
                      d="M12 7a2 2 0 100 4 2 2 0 000-4z"
                      fill="#FF6B8A"
                    />
                  </svg>
                </div>
              </div>

              {/* floating badge bottom-left */}
              <div
                className="absolute -left-7 -bottom-10 bg-white rounded-xl flex items-center gap-4"
                style={{
                  padding: "14px 20px",
                  boxShadow: "0 20px 50px rgba(2,6,23,0.08)",
                  minWidth: 220,
                }}
              >
                <div
                  className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-xl"
                  aria-hidden
                >
                  😊
                </div>
                <div>
                  <div className="text-lg font-bold text-amber-600">
                    {highlight.count}
                  </div>
                  <div className="text-sm text-gray-500">
                    {highlight.label}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: FAQ list */}
          <div className="lg:col-span-7">
            <div className="space-y-5">
              {faqs.map((f) => {
                const isOpen = open === f.id;
                return (
                  <div key={f.id}>
                    <button
                      onClick={() => toggle(f.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${f.id}`}
                      className="w-full text-left flex items-center justify-between gap-4 py-5 px-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="text-gray-800 font-semibold lg:text-lg">
                        {f.q}
                      </span>
                      <span
                        className={`flex-shrink-0 w-8 h-8 rounded-full bg-white border border-amber-200 flex items-center justify-center text-amber-500 transition-transform ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden
                        >
                          <path
                            d="M12 5v14M5 12h14"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    <div
                      id={`faq-panel-${f.id}`}
                      role="region"
                      className={`mt-2 px-6 overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      }`}
                      style={{ transitionProperty: "max-height, opacity" }}
                    >
                      <p className="text-gray-600 leading-relaxed pb-3">
                        {f.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FaqWithImage;
