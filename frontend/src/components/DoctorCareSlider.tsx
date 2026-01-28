import React, { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import axios from "axios";
import { API_BASE } from "../config/api";
import { useNavigate } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


interface Doctor {
  name: string;
  specialty: string;
  image: string;
}

interface ArrowProps {
  onClick?: () => void;
}


const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Next"
    type="button"
    className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 
      w-12 h-12 bg-white rounded-full shadow-lg 
      items-center justify-center cursor-pointer z-10"
  >
    <svg
      width="34"
      height="18"
      viewBox="0 0 34 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.95 10.4811L22.65 15.0054L25 17.4685L33.3333 8.73424L25 0L22.65 2.46305L26.95 6.98739H0V10.4811H26.95Z"
        fill="#F0A324"
      />
    </svg>
  </button>
);


const DoctorCareSlider: React.FC = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const slugify = (text: string): string =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");


  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  useEffect(() => {
    axios
      .get(`${API_BASE}/api/doctors`)
      .then((res) => {
        if (res.data?.success) {
          const mapped: Doctor[] = res.data.data.map((d: any) => ({
            name: d.name,
            specialty: d.specialty,
            image: `${API_BASE}${d.image_url}`,
          }));
          setDoctors(mapped);
        }
      })
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  if (doctors.length === 0) return null;


  const settings: Settings = {
    dots: true,
    infinite: doctors.length > 4,
    speed: 550,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4200,
    pauseOnHover: true,

    slidesToShow: isMobile ? 1 : 3,
    arrows: !isMobile,
    nextArrow: <NextArrow />,
    prevArrow: <></>,

    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 820, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],

    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="flex justify-center gap-2 mt-8">{dots}</ul>
      </div>
    ),

    customPaging: () => (
      <div className="dot-outer flex items-center justify-center">
        <div className="dot-inner" />
      </div>
    ),
  };


  return (
    <section className="py-10 bg-white mb-8">
      <div className="max-w-6xl mx-auto px-5 text-center">
        <h2 className="text-[32px] font-bold" style={{ fontFamily: "Ubuntu" }}>
          Professional Care Provider
        </h2>

        <p
          className="mt-2 mb-10 text-[16px]"
          style={{ fontFamily: "Ubuntu" }}
        >
          Meet our expert doctors providing world-class medical care.
        </p>

        <div className="relative">
          <Slider
            {...settings}
            key={`${doctors.length}-${isMobile}`}
          >
            {doctors.map((d, i) => (
              <div key={i} className="flex justify-center">
                <div
                  onClick={() => navigate(`/doctor/${slugify(d.name)}`)}
                  className="bg-white rounded-2xl border border-gray-200 
                    overflow-hidden w-full max-w-[320px] cursor-pointer"
                >
                  <div className="overflow-hidden bg-gray-100">
                    <img
                      src={d.image}
                      alt={d.name}
                      title={d.name}
                      className="w-full h-[233px] object-cover object-top"
                    />
                  </div>

                  <div className="p-5 text-center">
                    <h3 className="text-[22px] font-semibold">
                      {d.name}
                    </h3>
                    <p className="text-[#F0A324] mt-1">
                      {d.specialty}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <style>{`
        .slick-slide > div {
          height: 100%;
          display: flex;
          align-items: stretch;
          justify-content: center;
        }

        .slick-dots li button { display: none; }

        .dot-outer {
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          // background: #fbbf24;
          opacity: 0.7;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dot-inner {
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          background: #f59e0b;
        }

        .slick-dots li.slick-active .dot-outer {
          width: 14px;
          height: 14px;
          background: transparent;
          border: 2px solid #f59e0b;
        }

        .slick-dots li.slick-active .dot-inner {
          width: 6px;
          height: 6px;
        }
      `}</style>
    </section>
  );
};

export default DoctorCareSlider;
