
import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "./Container";
import { API_BASE } from "../config/api";

const PromoSlider: React.FC = () => {
  const ref = useRef<Slider | null>(null);
  const [current, setCurrent] = useState(0);
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/promo-sliders`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const activePromos = data.data
            .filter((item) => item.status === "active")
            .map((item) => ({
              image: `${API_BASE}${item.image_url}`,
            }));

          setPromos(activePromos);
        }
      })
      .catch((err) => console.log("Error fetching promos:", err));
  }, []);

  if (promos.length === 0) return null;

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    speed: 520,
    dots: true,
    arrows: false,
    autoplay: true,
    afterChange: (index: number) => setCurrent(index),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(3, promos.length),
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, promos.length),
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, centerPadding: "40px", arrows: false },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, centerPadding: "24px", arrows: false },
      },
    ],
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="flex items-center justify-center mt-20">{dots}</ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div className="dot-outer">
        <div className="dot-inner" />
      </div>
    ),
  };

  return (
    <section className="bg-white promoslider-sections">
      <Container className="py-10 lg:py-12">
        <div className="relative">
          <Slider ref={ref} {...settings}>
            {promos.map((p, idx) => (
              <div key={idx} className="images">
                <div>
                  <div className="relative flex items-center">
                    <div className="overflow-hidden flex-shrink-0 border-[10px] border-white rounded-2xl w-full">
                      <img
                        src={p?.image}
                        alt="slider"
                        title="slider"
                        style={{
                          width: "100%",
                          height: "199.15px",
                          borderRadius: "20px",
                          objectFit: "cover",
                        }}
                        className="rounded object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>
      {/* Dots Styling */}
      <style>{`
        .slick-slide > div {
          height: 100%;
          display: flex;
          align-items: stretch;
          justify-content: center;
        }

        .slick-dots li button { display: none; }
        .slick-dots li { margin: 0 4px; }

        .dot-outer {
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: #fbbf24;
          opacity: 0.7;
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
          border: 1px solid #be7c0bff;
        }
        .slick-dots li.slick-active .dot-inner {
          width: 6px;
          height: 6px;
          background: #f59e0b;
        }
      `}</style>
    </section>
  );
};

export default PromoSlider;
