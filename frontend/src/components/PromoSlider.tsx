import React, { useState, useEffect } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "./Container";
import { API_BASE } from "../config/api";


interface Promo {
  image: string;
}

interface PromoApiItem {
  status: string;
  image_url: string;
}

interface PromoApiResponse {
  success: boolean;
  data: PromoApiItem[];
}

const PromoSlider: React.FC = () => {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/api/promo-sliders`)
      .then((res) => res.json())
      .then((data: PromoApiResponse) => {
        if (data.success) {
          const activePromos: Promo[] = data.data
            .filter((item) => item.status === "active")
            .map((item) => ({
              image: `${API_BASE}${item.image_url}`,
            }));

          setPromos(activePromos);
        }
      })
      .catch((err) => console.error("Error fetching promos:", err));
  }, []);

  if (promos.length === 0) return null;

  const settings: Settings = {
    centerMode: true,
    centerPadding: isMobile ? "24px" : "0px",
    slidesToShow: isMobile ? 1 : Math.min(3, promos.length),
    slidesToScroll: 1,
    infinite: promos.length > 3,
    speed: 520,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerPadding: "24px",
          centerMode: true,
        },
      },
    ],

    appendDots: (dots: React.ReactNode) => (
      <div className="mt-20">
        <ul className="flex items-center justify-center">{dots}</ul>
      </div>
    ),

    customPaging: () => (
      <div className="dot-outer">
        <div className="dot-inner" />
      </div>
    ),
  };


  return (
    <section className="bg-white promoslider-sections">
      <Container className="py-10 lg:py-12">
        <div className="relative">
          <Slider
            {...settings}
            key={`${promos.length}-${isMobile}`}
          >
            {promos.map((promo, idx) => (
              <div key={idx} className="images">
                <div className="relative flex items-center">
                  <div className="overflow-hidden flex-shrink-0 border-[10px] border-white rounded-2xl w-full">
                    <img
                      src={promo.image}
                      alt="slider"
                      title="slider"
                      className="rounded object-cover w-full"
                      style={{ height: "199.15px" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>

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
          border: 1px solid #be7c0bff;
        }

        .slick-dots li.slick-active .dot-inner {
          width: 6px;
          height: 6px;
        }
      `}</style>
    </section>
  );
};

export default PromoSlider;
