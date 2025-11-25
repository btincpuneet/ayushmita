import React from "react";
import Container from "./Container";

const localFallback = "/fallback-hospital.jpg"; // TODO: apna local path use karo

const hospitalData = [
  {
    country: "India",
    flag: "https://flagcdn.com/w80/in.png",
    hospitals: [
      {
        name: "Medanta, Gurgaon",
        image:
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=800&fit=crop",
      },
      {
        name: "Indraprastha Apollo, New Delhi",
        image:
          "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1200&h=800&fit=crop",
      },
      {
        name: "AIIMS, Delhi",
        image:
          "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&h=800&fit=crop",
      },
      {
        name: "SGR, New Delhi",
        image:
          "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=1200&h=800&fit=crop",
      },
    ],
  },
  {
    country: "USA",
    flag: "https://flagcdn.com/w80/us.png",
    hospitals: [
      {
        name: "Hospital Study, USA",
        image:
          "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200&h=800&fit=crop",
      },
      {
        name: "Hospital Study, USA",
        image:
          "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?w=1200&h=800&fit=crop",
      },
      {
        name: "Hospital Study, USA",
        image:
          "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&h=800&fit=crop",
      },
      {
        name: "Hospital Study, USA",
        image:
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=800&fit=crop",
      },
    ],
  },
];

const TopPartnerHospitals: React.FC = () => {
  return (
    <section className="bg-white">
      <Container className="py-16">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
            Top Partner Hospitals
          </h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
            Locate top hospitals by simply exploring some of our top partnering
            hospitals.
          </p>
        </div>

        {/* Two cards side-by-side like Figma */}
        <div className="grid gap-8 md:grid-cols-2 ">
          {hospitalData.map((countryBlock, idx) => (
            <div
              key={countryBlock.country}
              className="relative bg-gray-100 rounded-2xl p-6 md:p-7 border border-gray-100 "
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-5 ">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  {countryBlock.country}
                </h3>
                <img
                  src={countryBlock.flag}
                  alt={`${countryBlock.country} flag`}
                  className="w-8 h-6 object-contain rounded-sm shadow-sm"
                />
              </div>

              {/* 2x2 hospital grid */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {countryBlock.hospitals.map((h, i) => (
                  <article
                    key={h.name + i}
                    className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100"
                  >
                    <div className="w-full h-24 sm:h-28 md:h-32 overflow-hidden">
                      <img
                        src={h.image || localFallback}
                        alt={h.name}
                        className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = localFallback;
                        }}
                      />
                    </div>
                    <div className="px-2.5 py-2">
                      <p className="text-xs sm:text-sm text-gray-600 truncate">
                        {h.name}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              {/* View all */}
              <button className="mt-6 w-full py-3 rounded-lg bg-amber-500 text-black text-sm font-semibold hover:bg-amber-600 transition">
                View All
              </button>

              {/* Floating arrow bubble on right card like Figma */}
              {idx === 1 && (
                <div className="hidden md:flex absolute -right-7 top-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 bg-white rounded-full shadow-[0_10px_25px_rgba(15,23,42,0.15)] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-amber-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TopPartnerHospitals;
