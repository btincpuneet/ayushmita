import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_URL = "http://127.0.0.1:5001/api/doctors";

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
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch doctors from API only
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        if (res.data?.data) {
          setItems(res.data.data);
        }
      })
      .catch((err) => console.log("API Error:", err))
      .finally(() => setLoading(false));
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
      <div className="max-w-7xl mx-auto px-5 py-12 text-center">
        <h2
          style={{
            fontFamily: "Ubuntu",
            fontWeight: 700,
            fontSize: "32px",
            textAlign: "center",
          }}
        >
          Professional Care Provider
        </h2>

        <p
          className="mt-2 mb-10"
          style={{
            fontFamily: "Ubuntu",
            fontWeight: 400,
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>

        {/* Loader */}
        {loading && <p className="text-gray-500">Loading doctors...</p>}

        {/* Empty state when API returns no doctors */}
        {!loading && items.length === 0 && (
          <p className="text-gray-500">No doctors found.</p>
        )}

        {/* Slider */}
        {!loading && items.length > 0 && (
          <div className="relative">
            <Slider {...settings}>
              {items.map((d) => (
                <div key={d.id} className="px-3 flex justify-center">
                  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden w-full max-w-[320px]">
                    <div className="w-full h-64 bg-gray-100 overflow-hidden">
                      <img
                        src={
                          d.image_url
                            ? `http://127.0.0.1:5001${d.image_url}`
                            : "/no-image.png"
                        }
                        alt={d.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="p-5 text-center">
                      <h3
                        style={{
                          fontFamily: "Inter",
                          fontWeight: 600,
                          fontSize: "25px",
                          lineHeight: "150%",
                        }}
                      >
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
        )}
      </div>

      {/* styles */}
      <style>{`
        .slick-slide > div {
          height: 100%;
          display: flex;
          align-items: stretch;
          justify-content: center;
        }
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
