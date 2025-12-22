import React from "react";
import cancerImg from "../../assets/treatment.jpg";

export default function CosmeticSurgerySection() {
  const items = [
    ["Abdominoplasty Treatment","Breast Augmentation Surgery","Facelift Surgery Treatment"],
    ["Hair Transplant Treatment","Lip Augmentation Treatment","Liposuction Treatment"],
    ["Mommy Makeover Treatment","Rhinoplasty Surgery Treatment","Tummy Tuck Surgery"]
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

         <div>
          <img
            src={cancerImg}
            alt="Cancer Treatment"
            className="rounded-xl  h-80 object-cover text-center"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Cosmetic Surgery</h2>

          <div className="grid grid-cols-3 gap-4 text-sm text-gray-700">
            {items.map((col, i) => (
              <div key={i}>
                {col.map((item) => (
                  <p key={item} className="mb-1">{item}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
