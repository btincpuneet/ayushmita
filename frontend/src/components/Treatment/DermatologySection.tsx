import React from "react";
import Container from "../Container";
import cancerImg from "../../assets/treatment.jpg";

export default function DermatologySection() {
  const items = [
    ["Acne Scars Treatment", "Anti-Aging Treatment", "Dermatitis Treatment"],
    ["Eczema Treatment", "Fungal Skin Infection", "Psoriasis Treatment"],
    ["Scar Revision", "Skin Allergy Treatment", "Vitiligo Treatment"]
  ];

  return (
    <section className="w-full bg-[#f5f5f5] py-16">
      <Container>  

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-6">Dermatology</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-700">
              {items.map((col, i) => (
                <div key={i}>
                  {col.map((item) => (
                    <p key={item} className="mb-2">{item}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>

         
          <div className="flex justify-center lg:justify-end">
            <img
              src={cancerImg}
              alt="Dermatology Treatment"
              className="rounded-xl shadow-lg w-full max-w-[420px] h-auto object-cover"
            />
          </div>

        </div>

      </Container>
    </section>
  );
}
