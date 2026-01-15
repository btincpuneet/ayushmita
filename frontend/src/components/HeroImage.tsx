import React, { useEffect, useState } from "react";
import { API_BASE } from "../config/api";
import { useTranslation } from "react-i18next";
import ModalAppointment from "../components/Treatment/ModalAppointment"
import "../css/responsive.css";
import axios from "axios";
import useSeo from '../hooks/useSeo';

const HeroImage = () => {
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [banner, setBanner] = useState(null);
  const [seoData, setSeoData] = useState({
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/global-settings`);
        setSeoData(res.data.data);
      } catch (error) {
        console.error("Failed to load contact CMS content", error);
      }
    };

    fetchStats();
  }, []);
  useEffect(() => {
    const fetchHeroBanner = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/hero-active-banners`);

        if (res.data?.success && res.data?.data?.length > 0) {
          setBanner(res.data.data[0]);
        }
      } catch (error) {
        console.error("Hero fetch error:", error);
      }
    };

    fetchHeroBanner();
  }, []);
  useSeo(seoData.seo_title, seoData.seo_description, seoData.seo_keywords);


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
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={`${API_BASE}${image}`}
            alt={title}
            className="w-full h-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-25 flex items-center over-image-section">
          <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-8">

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
