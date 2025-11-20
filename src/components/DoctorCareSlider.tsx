// DoctorCareSlider.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* Your providers array */
const providers = [
  {
    name: "Chriss Taylor",
    specialty: "Internal Medicine",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
  },
  {
    name: "Jonshon Aliven",
    specialty: "Internal Medicine",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
  },
  {
    name: "Trikien Munaska",
    specialty: "Internal Medicine",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
  },
  {
    name: "Khabian Jerry",
    specialty: "Internal Medicine",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
  },
   {
    name: "Khabian Jerry",
    specialty: "Internal Medicine",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
  },
];

function Arrow({ direction = "next", onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={direction}
      type="button"
      className={`custom-arrow absolute top-1/2 -translate-y-1/2 bg-white shadow-lg border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center z-30
      ${direction === "next" ? "right-[-28px]" : "left-[-28px]"}`}
    >
      {direction === "next" ? (
        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor">
          <path strokeWidth="2" d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor">
          <path strokeWidth="2" d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
}

export default function DoctorCareSlider({ items = providers }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 550,
    /* default to show 2 slides (you wanted 2 visible) */
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    autoplay: true,
    autoplaySpeed: 4200,
    pauseOnHover: true,
    // nextArrow: <Arrow direction="next" />,
    // prevArrow: <Arrow direction="prev" />,
    responsive: [
      // large desktop
      { breakpoint: 1600, settings: { slidesToShow: 4 } },
      // desktop
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      // laptop
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      // tablet
      { breakpoint: 820, settings: { slidesToShow: 2 } },
      // small phones
      { breakpoint: 480, settings: { slidesToShow: 1 } },
      // extra small
      { breakpoint: 360, settings: { slidesToShow: 1 } },
    ],
    appendDots: (dots:any) => (
      <div>
        <ul className="flex justify-center gap-3 mt-6">{dots}</ul>
      </div>
    ),
    customPaging: () => <div className="w-3 h-3 rounded-full bg-amber-300" />,
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Professional Care Provider
        </h2>
        <p className="text-gray-500 mt-2 mb-10">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>

        <div className="relative">
          <Slider {...settings}>
            {items.map((d, i) => (
              <div key={i} className="px-3 flex justify-center">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-[320px]">
                  {/* Image container: use fixed height and object-position top so face isn't cut */}
                  <div className="w-full h-64 overflow-hidden rounded-t-2xl bg-gray-100">
                    <img
                      src={d.image}
                      alt={d.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="p-5 text-center">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">
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

      {/* important overrides to make slider behave as expected */}
      <style>{`
        /* make the slide inner container stretch to card height */
        .slick-slide > div { height: 100%; display:flex; align-items:stretch; justify-content:center; }

        /* dots visuals */
        .slick-dots { margin: 0; padding: 0; }
        .slick-dots li { display:inline-block; margin: 0 6px; }
        .slick-dots li button { background: transparent; border: none; padding: 0; cursor: pointer; }
        .slick-dots li.slick-active div { background:#F59E0B !important;  rgba(245,158,11,0.18); transform: scale(1.05); }

        /* ensure arrows are visible on small screens */
        .custom-arrow { display:flex !important; }
        @media (max-width: 480px) {
          .custom-arrow { width:40px; height:40px; right:-10px; left:-10px; }
        }
      `}</style>
    </section>
  );
}
