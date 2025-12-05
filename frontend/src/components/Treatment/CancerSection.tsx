import React from "react";
import Container from "../Container";
import { useNavigate } from "react-router-dom";
import cancerImg from "../../assets/treatment.jpg";

export default function CancerSection() {
  const navigate = useNavigate();

  const items = [
    [
      "Anal Cancer Treatment",
      "Bile Duct Cancer Treatment",
      "Bladder Cancer Treatment",
      "Blood Cancer Treatment",
      "Gallbladder Cancer Treatment",
      "Head and Neck Cancer Treatment",
      "Liver Cancer Treatment",
      "Lung Cancer Treatment",
      "Nasopharyngeal Cancer Treatment",
      "Oral Cancer Treatment",
    ],
    [
      "Bone Cancer Treatment",
      "Brain Cancer Treatment",
      "Breast Cancer Treatment",
      "Car T-Cell Therapy",
      "Ovarian Cancer Treatment",
      "Pancreatic Cancer Treatment",
      "Penile Cancer Treatment",
      "Primary Bone Cancer Treatment",
      "Prostate Cancer Treatment",
      "Salivary Gland Cancer Treatment",
    ],
    [
      "Cervical Cancer Treatment",
      "Chemotherapy Treatment",
      "Colon Cancer Treatment",
      "Esophagus Cancer Treatment",
      "Skin Cancer Treatment",
      "Stomach Cancer Treatment",
      "Thyroid Cancer Treatment",
      "Uterine Cancer Treatment",
      "Vaginal Cancer Treatment",
      "Vulvar Cancer Treatment",
    ],
  ];

  const handleNavigate = (item) => {
    if (item === "Bile Duct Cancer Treatment") {
      navigate("/bile-duct-cancer-treatment"); 
    }
  };

  return (
    <div className="w-full bg-white py-14">
      <Container>
        <div className="rounded-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

         
            <div className="flex justify-center lg:justify-start">
              <img
                src={cancerImg}
                alt="Cancer Treatment"
                className="rounded-xl w-full max-w-[420px] object-cover"
              />
            </div>

        
            <div>
              <h2 className="text-3xl font-bold mb-6">Cancer</h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-700">
                {items.map((col, i) => (
                  <div key={i}>
                    {col.map((item) => (
                      <p
                        key={item}
                        onClick={() => handleNavigate(item)}
                        className={`mb-2 cursor-pointer ${
                          item === "Bile Duct Cancer Treatment"
                            ? "hover:text-orange-500"
                            : ""
                        }`}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
}
