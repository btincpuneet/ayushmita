import React from "react";
import Container from "../Container";
import cancerImg from "../../assets/treatment.jpg";

export default function CosmetologySection() {
  const items = [
    [
      "Blemish Removal",
      "Carboxitherapy",
      "Cellulite Treatment",
      "Chemical Peel Treatment",
      "Hand Rejuvenation Treatment",
      "IPL Hair Removal Treatment"
    ],
    [
      "IPL Photorejuvenation Treatment",
      "Laser Hair Removal Treatment",
      "Laser Skin Resurfacing Treatment",
      "Laser Tattoo Removal Treatment",
      "Microdermabrasion Treatment",
      "Platelet Rich Plasma Facial Treatment"
    ],
    [
      "Pore Reduction Treatment",
      "Skin Lightening Treatment",
      "Skin Needling Treatment",
      "Skin Tightening Treatment",
      "Skin Tone Adjustment Treatment",
      "Stem Cell Facelift Treatment"
    ]
  ];

  return (
    <section className="w-full bg-[#f5f5f5] py-16">
      <Container>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">


          <div>
            <h2 className="text-3xl font-bold mb-6">Cosmetology</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-700">
              {items.map((col, idx) => (
                <div key={idx}>
                  {col.map((text) => (
                    <p key={text} className="mb-2">{text}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>


          <div className="flex justify-center lg:justify-end">
            <img
              src={cancerImg}
              alt="Cosmetology Treatment"
              className="rounded-xl shadow-lg w-full max-w-[420px] h-auto object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
