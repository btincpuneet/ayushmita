import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const promos = [
  {
    title: "Get Rs 100 OFF",
    subtitle: "On Doctor Consultation",
    buttonText: "GRAB NOW",
    bgColor: "bg-purple-100",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&h=400&fit=crop",
  },
  {
    title: "FLAT 30% OFF",
    subtitle: "ON VIDEO CONSULTATION",
    code: "USE CODE : FIRST30",
    brand: "zoutons",
    bgColor: "bg-gray-900",
    textColor: "text-white",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
  },
  {
    title: "Get Rs 100 OFF",
    subtitle: "On Doctor Consultation",
    buttonText: "GRAB NOW",
    bgColor: "bg-purple-100",
    image:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=400&fit=crop",
  },
  {
    title: "Get Rs 100 OFF",
    subtitle: "On Doctor Consultation",
    buttonText: "GRAB NOW",
    bgColor: "bg-purple-100",
    image:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=400&fit=crop",
  }
];

export default function PromoSlider() {
  const ref = useRef(null);
  const [current, setCurrent] = useState(0);

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    speed: 520,
    dots: true,
    arrows: false,
    autoplay:true,
    afterChange: (index: any) => setCurrent(index),
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3, centerPadding: "0px" },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, centerPadding: "0px" },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, centerPadding: "0px", arrows: false },
      },
    ],
    appendDots: (dots) => (
      <div>
        <ul className="flex items-center justify-center  ">{dots}</ul>
      </div>
    ),

    customPaging: (i) => (
      <div
        className={`w-4 h-4 flex items-center justify-center rounded-full ${i === current ? "bg-transparent" : "bg-amber-200"
          }`}
        aria-hidden
      >
        <div
          className={`w-2 h-2 rounded-full ${i === current ? "bg-amber-500" : "bg-amber-400/80"
            }`}
        />
      </div>
    ),
  };

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <Slider ref={ref} {...settings}>
            {promos.map((p, idx) => (
              <div key={idx} className="px-3">
                <div
                  className={`${p.bgColor} ${p.textColor || "text-gray-800"} rounded-[18px] overflow-hidden transition-transform duration-300`}
                  style={{ height: 220 }}
                >
                  <div className="relative h-full flex items-center p-6">
                    <div className="flex-1 space-y-2">
                      <h3 className="text-xl md:text-2xl font-extrabold leading-tight">
                        {p.title}
                      </h3>
                      <p className="text-sm md:text-base font-medium">{p.subtitle}</p>

                      {p.code && <p className="mt-1 font-semibold text-amber-400">{p.code}</p>}
                      {p.brand && <p className="mt-1 font-bold">{p.brand}</p>}

                      {p.buttonText && (
                        <button className="mt-3 inline-block bg-amber-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
                          {p.buttonText}
                        </button>
                      )}
                    </div>

                    <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden ml-4 flex-shrink-0 border-4 border-white shadow">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <style>{`
        .slick-center > div > div {
          transform: scale(1.03);
          box-shadow: 0 16px 40px rgba(13,30,68,0.12);
          z-index: 20;
        }
        .slick-slide > div > div {
          transition: transform 300ms ease, box-shadow 300ms ease;
        }
        .slick-dots li button { display: none; }
        .slick-prev { left: -28px; z-index: 30; }
        .slick-next { right: -28px; z-index: 30; }
        @media (max-width: 767px) {
          .slick-prev, .slick-next { display: none !important; }
        }
      `}</style>
    </section>
  );
}

// function PrevArrow({ onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       aria-label="Previous"
//       className="slick-arrow flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md"
//       style={{ border: "none" }}
//     >
//       <ChevronLeft className="w-5 h-5 text-gray-700" />
//     </button>
//   );
// }
// function NextArrow({ onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       aria-label="Next"
//       className="slick-arrow flex items-center justify-center w-10 h-10 rounded-full bg-amber-500 shadow-md"
//       style={{ border: "none" }}
//     >
//       <ChevronRight className="w-5 h-5 text-white" />
//     </button>
//   );
// }
