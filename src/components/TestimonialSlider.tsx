// src/components/TestimonialSlider.jsx
import React from "react";
import Slider from "react-slick";
import { Star } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/*
  Reference image (you provided):
  /mnt/data/0b80bbfc-2d79-4d55-87a5-90fd546c0a97.png
*/

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
    className="
      absolute top-1/2 left-6 -translate-y-1/2
      w-14 h-14 rounded-full shadow-2xl bg-white flex items-center justify-center
      hover:scale-105 transition-transform
    "
    style={{ zIndex: 30 }}
  >
    {/* Same orange arrow but flipped for previous */}
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fb923c">
      <path d="M15 6l-6 6 6 6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </button>
);


/* The big circular arrow overlapping the right card (like in your screenshot) */
const OverlapNextArrow = ({ onClick }) => (
  <button
    aria-label="Next"
    onClick={onClick}
    className="
      absolute top-1/2 right-6 -translate-y-1/2
      w-14 h-14 rounded-full shadow-2xl bg-white flex items-center justify-center
      ring-0 hover:scale-105 transition-transform
    "
    style={{ zIndex: 30 }}
  >
    {/* orange arrow matching your image */}
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fb923c">
      <path d="M9 6l6 6-6 6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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
    nextArrow: <OverlapNextArrow />, // overlapping next arrow
    prevArrow: <PrevArrow />,
    customPaging: () => (
      // we return an empty node; styling applied via CSS to create the ring + inner dot
      <div className="dot-outer"><div className="dot-inner" /></div>
    ),
    appendDots: (dots) => (
      <div className="dots-wrapper">
        <ul className="flex items-center justify-center gap-6">{dots}</ul>
      </div>
    ),
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto relative">
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-10">
          Customer Happiness Guaranteed
        </h2>

        <div className="relative">
          <Slider {...settings}>
            {testimonials.map((t, i) => (
              <div key={i} className="px-3 md:px-4">
                <div
                  className="
                    bg-white rounded-2xl p-8 h-96
                    transition-transform duration-300
                    hover:scale-105 hover:shadow-2xl
                    flex flex-col items-center text-center
                  "
                >
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-24 h-24 rounded-full object-cover mb-4 shadow-md"
                    loading="lazy"
                  />

                  <h3 className="text-xl font-semibold text-gray-900">
                    {t.name}
                  </h3>

                  <div className="flex gap-1 my-3">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="w-5 h-5 text-yellow-500" />
                    ))}
                  </div>

                  <p className="text-gray-600 leading-relaxed">{t.review}</p>
                </div>
              </div>
            ))}
          </Slider>

          {/* Optional: reference image overlay for debugging / comparison */}
          {/* <img src="/mnt/data/0b80bbfc-2d79-4d55-87a5-90fd546c0a97.png" alt="reference" className="hidden" /> */}
        </div>
      </div>
    </section>
  );
}
