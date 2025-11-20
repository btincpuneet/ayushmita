import React from "react";

/**
 * Local uploaded image (you provided this file in the conversation)
 * We'll use this as the fallback local image.
 */
const localFallback = "/mnt/data/5efff216-07b8-4b48-8f23-b7c530ec62f3.png";

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

export default function TopPartnerHospitalsNoSlider() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
          Top Partner Hospitals
        </h2>
        <p className="mt-3 text-gray-500">
          Lorem Ipsum is simply dummy text of the printing industry.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {hospitalData.map((countryBlock) => (
          <div
            key={countryBlock.country}
            className="relative bg-white rounded-2xl p-6"
            style={{
              boxShadow: "0 6px 18px rgba(8,20,40,0.06)",
            }}
          >
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {countryBlock.country}
              </h3>
              <img
                src={countryBlock.flag}
                alt={`${countryBlock.country} flag`}
                className="w-8 h-6 object-contain rounded-sm shadow-sm"
              />
            </div>

            {/* Static grid (no slider). Two columns on md+, one column on small screens. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {countryBlock.hospitals.map((h, i) => (
                <article
                  key={h.name + i}
                  className="bg-gray-50 rounded-xl overflow-hidden"
                >
                  <div className="w-full h-40 overflow-hidden">
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

                  <div className="p-3">
                    <p className="text-sm text-gray-600">{h.name}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Optional floating icon (kept only visually, not functional) */}
            {countryBlock.country === "USA" && (
              <div className="hidden md:flex absolute right-[-28px] top-1/2 -translate-y-1/2">
                <div
                  className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center"
                  style={{ boxShadow: "0 8px 28px rgba(13,30,68,0.12)" }}
                >
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

            <button className="mt-6 w-full py-3 rounded-full bg-amber-500 text-white font-semibold hover:bg-amber-600 transition">
              View All
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
