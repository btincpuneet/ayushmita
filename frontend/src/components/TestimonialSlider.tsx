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

const API = "http://127.0.0.1:5001/api/testimonials";

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
 <span></span>
);

const OverlapNextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    aria-label="Next"
    onClick={onClick}
    className="absolute top-1/2 -right-8 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3500,
    nextArrow: <OverlapNextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: () => (
      <div className="dot-outer">
        <div className="dot-inner" />
      </div>
    ),
    appendDots: (dots: React.ReactNode) => (
      <div className="dots-wrapper">
        <ul className="flex items-center justify-center">{dots}</ul>
      </div>
    ),
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 375, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section
      className="px-4 customer-happiness-sections"
      style={{ backgroundColor: "#F6F7F9" }}
    >
      <div className="max-w-7xl mx-auto px-5 py-14 md:py-14 lg:py-14">
        <div className="container max-w-7xl mx-auto relative">
          <h2
            className="text-center mb-6"
            style={{
              fontFamily: "Ubuntu",
              fontWeight: 700,
              fontSize: "32px",
              lineHeight: "71px",
              textAlign: "center",
            }}
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
              <Slider {...settings}>
                {testimonials.map((t) => (
                  <div key={t.id} className="px-3 md:px-4">
                    <div className="bg-white rounded-2xl p-4 h-96 hover:scale-105 transition-transform flex flex-col items-center text-center">
                      <img
                        src={`http://127.0.0.1:5001${t.image_url}`}
                        alt={t.name}
                        className="w-24 h-24 rounded-full object-cover mb-4"
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
                          <Star key={idx} className="w-5 h-5 text-yellow-500 " fill="currentColor"/>
                        ))}
                      </div>

                      <p
                        style={{
                          fontFamily: "Inter",
                          fontWeight: 400,
                          fontStyle: "normal",
                          fontSize: "20px",
                          lineHeight: "150%",
                          letterSpacing: "0%",
                          textAlign: "center",
                        }}
                      >
                        {t.message}
                      </p>
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
