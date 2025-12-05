import React from "react";
import Container from "../../Container";


const cancerSpecialitiesData = [
  { name: "Anal Cancer Treatment" },
  { name: "Bile Duct Cancer Treatment" },
  { name: "Bladder Cancer Treatment" },
  { name: "Blood Cancer Treatment" },
  { name: "Gallbladder Cancer Treatment" },
  { name: "Head and Neck Cancer Treatment" },
  { name: "Liver Cancer Treatment" },
  { name: "Lung Cancer Treatment" },
  { name: "Nasopharyngeal Cancer Treatment" },
  { name: "Oral Cancer Treatment" },

  { name: "Bone Cancer Treatment" },
  { name: "Brain Cancer Treatment" },
  { name: "Breast Cancer Treatment" },
  { name: "Car T-Cell Therapy" },
  { name: "Ovarian Cancer Treatment" },
  { name: "Pancreatic Cancer Treatment" },
  { name: "Penile Cancer Treatment" },
  { name: "Primary Bone Cancer Treatment" },
  { name: "Prostate Cancer Treatment" },
  { name: "Salivary Gland Cancer Treatment" },

  { name: "Cervical Cancer Treatment" },
  { name: "Chemotherapy Treatment" },
  { name: "Colon Cancer Treatment" },
  { name: "Esophagus Cancer Treatment" },
  { name: "Skin Cancer Treatment" },
  { name: "Stomach Cancer Treatment" },
  { name: "Thyroid Cancer Treatment" },
  { name: "Uterine Cancer Treatment" },
  { name: "Vaginal Cancer Treatment" },
  { name: "Vulvar Cancer Treatment" },
];


export default function AdditionalSpecialitiesCancer() {
  return (
    <section className="w-full bg-[#f5f5f5] py-16">
      <Container>
       
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-10">
          Additional Specialities We Cover – Cancer
        </h2>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-10">
          {cancerSpecialitiesData.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
             
              <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full mt-1"></span>

              
              <p className="text-[15px] text-gray-700 leading-relaxed">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
