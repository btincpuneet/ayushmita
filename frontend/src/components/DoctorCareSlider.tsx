import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Next"
      type="button"
      className="doctor-arrow absolute top-1/2 -translate-y-1/2 right-[-28px] bg-white shadow-lg border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center z-30"
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
}

export default function DoctorCareSlider() {
  const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5001/api/doctors")
      .then((res) => {
        if (res.data.success) {
          const mapped = res.data.data.map((d) => ({
            name: d.name,
            specialty: d.specialty,
            image: `http://127.0.0.1:5001${d.image_url}`,
          }));
          setDoctors(mapped);
        }
      })
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 550,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4200,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <></>,
    responsive: [
      { breakpoint: 1600, settings: { slidesToShow: 4 } },
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 820, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
    appendDots: (dots) => (
      <div>
        <ul className="flex justify-center gap-2 mt-8">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="dot-outer flex items-center justify-center mt-5">
        <div className="dot-inner" />
      </div>
    ),
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-5 py-12 md:py-16 lg:py-16 text-center">
        <h2 className="Professional"
          style={{
            fontFamily: 'Ubuntu',
            fontWeight: 700,
            fontSize: '32px',
            lineHeight: '100%',
            textAlign: 'center',
          }}>
          Professional Care Provider
        </h2>

        <p className="mt-2 mb-10"
          style={{
            fontFamily: 'Ubuntu',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '100%',
            textAlign: 'center',
          }}>
          Meet our expert doctors providing world-class medical care.
        </p>

        <div className="relative">
          <Slider {...settings}>
            {doctors.map((d, i) => (
              <div key={i} className="px-3 flex justify-center">
                <div 
                  onClick={() => navigate(`/doctor/${slugify(d.name)}`)}

                className="bg-white rounded-2xl border border-gray-200 overflow-hidden w-full max-w-[320px]">

                  <div className="w-full h-64 overflow-hidden bg-gray-100">
                    <img
                      src={d.image}
                      alt={d.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="p-5 text-center">
                    <h3
                      style={{
                        fontFamily: 'Inter',
                        fontWeight: 600,
                        fontSize: '25px',
                        lineHeight: '150%',
                      }}>
                      {d.name}
                    </h3>

                    <p className="text-amber-500 font-medium mt-1 uppercase text-sm tracking-wide">
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
        .slick-dots li .dot-outer {
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: #fbbf24;
          opacity: 0.7;
        }
        .slick-dots li .dot-inner {
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
          background: #f59e0b;
        }

        .doctor-arrow { display: flex !important; }
        @media (max-width: 768px) {
          .doctor-arrow { display: none !important; }
        }
      `}</style>
    </section>
  );
}
