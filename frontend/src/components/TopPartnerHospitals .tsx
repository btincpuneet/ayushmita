import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const hospitals = [
  {
    name: "Medanta",
    city: "Gurgaon",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=800&fit=crop",
  },
  {
    name: "Indraprastha Apollo",
    city: "New Delhi",
    image:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1200&h=800&fit=crop",
  },
  {
    name: "SGR",
    city: "New Delhi",
    image:
      "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=1200&h=800&fit=crop",
  },
  {
    name: "SGR",
    city: "New Delhi",
    image:
      "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=1200&h=800&fit=crop",
  },
];

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center cursor-pointer z-10"
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

  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center cursor-pointer z-10"
  >
   
    <svg
      width="34"
      height="18"
      viewBox="0 0 34 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.05 7.5189L11.35 2.99464L9 0.531544L0.666687 9.26576L9 18L11.35 15.5369L7.05 11.0126H34V7.5189H7.05Z"
        fill="#F0A324"
      />
    </svg>
  </div>
);

const TopPartnerHospitals = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,

    // 🔶 Figma-style dots
    customPaging: () => (
      <div className="dot-outer flex items-center justify-center">
        <div className="dot-inner" />
      </div>
    ),

    appendDots: (dots) => (
      <div>
        <ul className="flex items-center justify-center mt-8">{dots}</ul>
      </div>
    ),

    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[32px] font-bold" style={{ fontFamily: "Ubuntu" }}>
            Top Partner Hospitals
          </h2>
          <p
            className="mt-3 text-gray-600 max-w-md mx-auto"
            style={{ fontFamily: "Ubuntu", fontSize: "16px" }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>

        <div className="relative">
          <Slider {...settings}>
            {hospitals.map((h, index) => (
              <div key={index} className="px-4">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="h-48 overflow-hidden rounded-xl">
                    <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-[15px]" style={{ fontFamily: "Ubuntu" }}>
                      {h.name}
                    </h3>
                    <p
                      className="text-gray-500 text-[13px]"
                      style={{ fontFamily: "Ubuntu" }}
                    >
                      {h.city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <style>{`
        /* stretch inner slide to card height */
        .slick-slide > div {
          height: 100%;
          display: flex;
          align-items: stretch;
          justify-content: center;
        }

        /* dots base */
        .slick-dots { margin: 0; padding: 0; }
        .slick-dots li { display: inline-block; margin: 0 4px; }
        .slick-dots li button { display: none; }

        /* inactive dot = small filled circle */
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

        /* active dot = ring + filled center */
        .slick-dots li.slick-active .dot-outer {
          width: 14px;
          height: 14px;
          background: transparent;
          border: 2px solid #be7c0bff;
          opacity: 1;
        }
        .slick-dots li.slick-active .dot-inner {
          width: 6px;
          height: 6px;
          background: #f59e0b;
        }

        /* arrow visibility */
        .doctor-arrow { display: flex !important; }
        @media (max-width: 768px) {
          .doctor-arrow { display: none !important; }
        }
      `}</style>
    </section>
  );
};

export default TopPartnerHospitals;
