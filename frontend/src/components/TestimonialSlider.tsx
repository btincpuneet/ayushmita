import React from "react";
import Slider from "react-slick";
import { Star } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "./Container";
import '../css/testimonial.css'

const testimonials = [
  {
    name: "Jassica Andrew",
    rating: 5,
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  },
  {
    name: "Darlene Robertson",
    rating: 5,
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  },
  {
    name: "Savannah Nguyen",
    rating: 5,
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
  },
  {
    name: "Savannah Nguyen",
    rating: 5,
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
  }
];

const PrevArrow = ({ onClick }) => (
  <button
    aria-label="Previous"
    onClick={onClick}
    className="absolute top-1/2 -left-2 -translate-y-1/2 w-14 h-14 rounded-full shadow-2xl bg-white flex items-center justify-center hover:scale-105 transition-transform"
    style={{ zIndex: 30 }}
  >
    <svg
      width="34"
      height="18"
      viewBox="0 0 34 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.05 10.4811H34V6.98739H7.05L11.35 2.46305L9 0L0.666667 8.73424L9 17.4685L11.35 15.0054L7.05 10.4811Z"
        fill="#F0A324"
      />
    </svg>

  </button>
);


const OverlapNextArrow = ({ onClick }) => (
  <button
    aria-label="Next"
    onClick={onClick}
    className="absolute top-1/2 -right-2 -translate-y-1/2 w-14 h-14 rounded-full shadow-2xl bg-white flex items-center justify-center hover:scale-105 transition-transform"
    style={{ zIndex: 30 }}
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


export default function TestimonialSlider() {
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
      <div className="dot-outer"><div className="dot-inner" /></div>
    ),
    appendDots: (dots) => (
      <div className="dots-wrapper">
        <ul className="flex items-center justify-center gap-0">{dots}</ul>
      </div>
    ),
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 375, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="px-4 customer-happiness-sections" style={{ backgroundColor: '#F6F7F9' }}>
      <div className="max-w-7xl mx-auto px-5 py-12 md:py-16 lg:py-12 ">
        <div className="container max-w-7xl mx-auto relative">
          <h2 className="text-center mb-10"
            style={{
              fontFamily: 'Ubuntu',
              fontWeight: 700,          // Bold
              fontStyle: 'normal',      // Bold is handled via fontWeight
              fontSize: '32px',
              lineHeight: '71px',
              letterSpacing: '0%',
              textAlign: 'center',
            }}>
            Customer Happiness Guaranteed
          </h2>

          <div className="relative">
            <Slider {...settings}>
              {testimonials.map((t, i) => (
                <div key={i} className="px-3 md:px-4">
                  <div
                    className="bg-white rounded-2xl p-4 h-96 transition-transform duration-300 hover:scale-105 hover:rounded-2xl flex flex-col items-center text-center"
                  >

                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-24 h-24 rounded-full object-cover mb-4 "
                      loading="lazy"
                    />

                    <h3 className="tname"
                      style={{
                        fontFamily: 'Inter',
                        fontWeight: 600,          // Semi Bold
                        fontStyle: 'normal',      // Semi Bold is handled via fontWeight
                        fontSize: '25.05px',
                        lineHeight: '150%',
                        letterSpacing: '0.5%',
                        textAlign: 'center',
                        // leading-trim: NONE is not standard CSS, so it's ignored
                      }}>
                      {t.name}
                    </h3>

                    <div className="flex gap-1 my-3">
                      {Array.from({ length: t.rating }).map((_, idx) => (
                        <Star key={idx} className="w-5 h-5 text-yellow-500" />
                      ))}
                    </div>

                    <p className=" leading-relaxed"
                      style={{
                        fontFamily: 'Inter',
                        fontWeight: 400,          // Regular weight
                        fontStyle: 'normal',      // 'Regular' corresponds to normal
                        fontSize: '20px',
                        lineHeight: '150%',
                        letterSpacing: '0%',
                        textAlign: 'center',
                        // leading-trim: NONE is not standard CSS, so it's ignored
                      }}
                    >{t.review}</p>

                  </div>
                </div>
              ))}
            </Slider>

          </div>
        </div>
      </div>
    </section>
  );
}
