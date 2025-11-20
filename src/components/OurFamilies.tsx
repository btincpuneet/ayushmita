import React from "react";

const stats = [
  { count: "5000+", label: "Happy Patients", color: "bg-blue-100 text-blue-500" },
  { count: "200+", label: "Hospitals", color: "bg-pink-100 text-pink-500" },
  { count: "1000+", label: "Laboratories", color: "bg-yellow-100 text-yellow-500" },
  { count: "700+", label: "Expert Doctors", color: "bg-green-100 text-green-500" },
];

export default function OurFamilies() {
  return (
    <section className="relative overflow-hidden bg-amber-50/20 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
            Our Families
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            We will work with you to develop individualised care plans,
            including management of chronic diseases. If we cannot assist,
            we can provide referrals or advice about the type of practitioner
            you require. We treat all enquiries sensitively and in the strictest
            confidence.
          </p>
        </div>

        {/* RIGHT CARDS */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8">

          {stats.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)]
              p-10 flex flex-col items-center justify-center text-center
              min-h-[240px] w-full"
            >
              {/* Circle Icon Placeholder */}
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${item.color}`}>
                <span className="text-3xl">★</span>
              </div>

              <div className="text-4xl font-extrabold text-gray-800">{item.count}</div>
              <div className="mt-2 text-gray-600 text-lg">{item.label}</div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}


