import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Star } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/testimonial.css";

interface Testimonial {
  id: number;
  name: string;
  message: string;
  rating: number;
  image_url: string;
  status: string;
}

interface ArrowProps {
  onClick?: () => void;
}

import { API_BASE } from "../config/api";
const API = `${API_BASE}/api/testimonials`;

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <span></span>
);

const OverlapNextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    aria-label="Next"
    onClick={onClick}
    className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 
w-12 h-12 bg-white rounded-full shadow-lg 
items-center justify-center cursor-pointer z-10
"
    style={{ zIndex: 30 }}
  >
    <svg width="34" height="18" viewBox="0 0 34 18" fill="none">
      <path
        d="M26.95 10.4811L22.65 15.0054L25 17.4685L33.3333 8.73424L25 0L22.65 2.46305L26.95 6.98739H0V10.4811H26.95Z"
        fill="#F0A324"
      />
    </svg>
  </button>
);

const TestimonialSlider: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const toggleReadMore = (id: number) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const MAX_LENGTH = 90;
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [])
  const fetchTestimonials = async () => {
    try {
      const res = await fetch(API);
      const json = await res.json();
      const activeItems = json.data.filter((t: Testimonial) => t.status === "active");
      setTestimonials(activeItems);
    } catch (error) {
      console.log("Error fetching testimonials:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

 const settings: Settings = {
    dots: true,
    infinite: testimonials.length > 3,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: !isMobile,

    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,

    nextArrow: <OverlapNextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],

    customPaging: () => (
      <div className="dot-outer">
        <div className="dot-inner" />
      </div>
    ),

    appendDots: (dots: React.ReactNode) => (
      <div className="dots-wrapper home-page-sliders-sections">
        <ul className="flex items-center justify-center gap-2 sections">
          {dots}
        </ul>
      </div>
    ),
  };



  return (
    <section
      className="px-4 customer-happiness-sections"
      style={{ backgroundColor: "#F6F7F9" }}
    >
      <div className="max-w-6xl mx-auto px-5 py-20 md:py-20 lg:py-20 happiness">
        <div className="container max-w-6xl  !px-0  mx-auto relative">
          <h2
            className="text-center mb-6  headings-section-it"
          >
            Customer Happiness Guaranteed
          </h2>

          <div className="relative">
            {loading && (
              <p className="text-center text-gray-500 py-10">
                Loading testimonials...
              </p>
            )}

            {!loading && testimonials.length === 0 && (
              <p className="text-center text-gray-500 py-10">
                No testimonials available.
              </p>
            )}

            {!loading && testimonials.length > 0 && (
              <Slider
                {...settings}
                key={`${testimonials.length}-${isMobile}`}
              >
                {testimonials.map((t) => (
                  <div key={t.id} className="px-3 md:px-4">
                    <div className="bg-white rounded-2xl p-4 min-h-[24rem] hover:scale-105 transition-transform flex flex-col items-center text-center"
                    >
                      <img
                        src={`${API_BASE}${t.image_url}`}
                        alt={t.name}
                        title={t.name}
                        className="w-[70px] h-[70px] rounded-full object-cover mb-4"
                        loading="lazy"
                      />

                      <h3
                        style={{
                          fontFamily: "Ubuntu",
                          fontWeight: 700,
                          fontStyle: "normal",
                          fontSize: "20px",
                          lineHeight: "150%",
                          letterSpacing: "0.5%",
                          textAlign: "center",
                        }}
                      >
                        {t.name}
                      </h3>

                      <div className="flex gap-1 my-3">
                        {Array.from({ length: t.rating }).map((_, idx) => (
                          <Star key={idx} className="w-5 h-5 text-yellow-500 " fill="currentColor" />
                        ))}
                      </div>

                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded === t.id ? "max-h-[500px] opacity-100" : "max-h-[120px] opacity-90"
                          }`}
                      >
                        <p
                          className="slider-message-section-1"
                          style={{
                            fontFamily: "Inter",
                            fontWeight: 400,
                            fontSize: "20px",
                            lineHeight: "150%",
                            textAlign: "center",
                          }}
                        >
                          {expanded === t.id || t.message.length <= MAX_LENGTH
                            ? t.message
                            : `${t.message.slice(0, MAX_LENGTH)}...`}
                        </p>
                      </div>


                      {t.message.length > MAX_LENGTH && (
                        <button
                          onClick={() => toggleReadMore(t.id)}
                          className="mt-2 text-[#F0A324] font-semibold text-sm transition-all duration-300 hover:underline hover:translate-y-[-1px]"
                        >
                          {expanded === t.id ? "Read Less" : "Read More"}
                        </button>
                      )}

                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
