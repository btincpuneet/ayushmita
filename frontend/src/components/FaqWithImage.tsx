import React, { useState } from "react";
import faqImage from "../assets/hero-medical.jpg";
import care from "../assets/care.png";
import Smile from "../assets/smile.png";
import "../css/Faq.css";

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
    <section className="relative bg-white overflow-hidden">
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
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative">
              <div
                className="bg-white rounded-xl"
                style={{
                  boxShadow: "0 30px 80px rgba(15,23,42,0.08)",
                }}
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

              <div
                className="absolute -right-10 top-45 -translate-y-1/2 flex items-center justify-center rounded-full bg-white"
                style={{
                  width: 70,
                  height: 70,
                  boxShadow: "0 14px 30px rgba(2,6,23,0.12)",
                }}
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <img
                    src={care}
                    alt="care"
                    className="w-11 h-11 object-contain"
                  />
                </div>
              </div>

              <div
                className="absolute -left-7 top-80 bg-white rounded-xl flex items-center gap-4"
                style={{
                  padding: "14px 10px",
                  boxShadow: "0 20px 50px rgba(2,6,23,0.08)",
                  minWidth: 220,
                }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center text-xl"
                  aria-hidden
                >
                  <img
                    src={Smile}
                    alt="smile"
                    className="w-11 h-11 object-contain"
                  />
                </div>
                <div>
                  <div
                    className="highlight"
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 600,
                      fontStyle: "normal",
                      fontSize: "24px",
                      lineHeight: "33.6px",
                      letterSpacing: "0%",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {highlight.count}
                  </div>
                  <div
                    className="label"
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 400,
                      fontStyle: "normal",
                      fontSize: "17px",
                      lineHeight: "28px",
                      letterSpacing: "0%",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {highlight.label}
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                      className="w-full text-left flex items-center justify-between gap-4 py-5 bg-white transition-shadow"
                    >
                      <span
                        className="faqueestion"
                        style={{
                          fontFamily: "Ubuntu",
                          fontWeight: 700,
                          fontStyle: "normal",
                          fontSize: "18px",
                          lineHeight: "30px",
                          letterSpacing: "0%",
                          verticalAlign: "middle",
                        }}
                      >
                        {f.q}
                      </span>
                      <span
                        className={`flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center text-amber-500 transition-transform ${
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
      </div>
    </section>
  );
};

export default FaqWithImage;
