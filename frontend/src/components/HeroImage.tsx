import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ModalAppointment from "../components/Treatment/ModalAppointment"
import "../css/responsive.css";
const HeroImage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language.split("-")[0] || "en";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [banner, setBanner] = useState(null);
  const API = "http://127.0.0.1:5001/api/hero-banners";

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          setBanner(data.data[0]); // get first hero banner
        }
      })
      .catch((err) => console.log("Hero fetch error:", err));
  }, []);

  if (!banner) return null;

  const {
    title,
    subtitle,
    description,
    image,
    button_text,
    button_url,
  } = banner;

  return (
    <>
      <section
        className="relative w-full pt-20 bg-sky-50 h-screen"
        aria-label={title}
      >
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={`http://127.0.0.1:5001${image}`}
            alt={title}
            className="w-full h-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-25 flex items-center over-image-section">
          <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-8">

            {/* TEXT SECTION */}
            <div className="sticky-item-over-image">
              <p className="text-[#F0A324] mb-4" style={{
  fontFamily: "Roboto, sans-serif",
  fontWeight: 700,
  fontSize: "22px",
  lineHeight: "28px",
  letterSpacing: "0px",
}}
>
                {subtitle}
              </p>

              <h1 className=" heading-of-pgs">
                {title}
              </h1>

              <p className="mt-5 leading-[28px]" style={{
  fontFamily: "Ubuntu, sans-serif",
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "20px",
  lineHeight: "28px",
  letterSpacing: "0px",
}}
>
                {description}
              </p>

              {button_text && (
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center px-7 py-3 rounded-full bg-[#F0A324]"
                  >
                    {button_text}
                    <svg
                      className="ml-3 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14M13 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}

            </div>

            <div />
          </div>
        </div>
      </section>
      <ModalAppointment
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>

  );
};

export default HeroImage;
