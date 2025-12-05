import React, { useState } from "react";
import Container from "../Container";

import {
  FaHeartbeat,
  FaTooth,
  FaUserMd,
  FaStethoscope,
  FaEye,
  FaBrain,
  FaLungs,
  FaHandHoldingMedical,
} from "react-icons/fa";

import { IoChevronForward } from "react-icons/io5";

export default function TreatmentCategorySidebar() {
  const categories = [
    {
      id: 1,
      name: "Cancer",
      icon: FaHeartbeat,
      treatments: [
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
    },
    { id: 2, name: "Cardiology Treatment", icon: FaStethoscope, treatments: [] },
    { id: 3, name: "Cosmetic Surgery", icon: FaUserMd, treatments: [] },
    { id: 4, name: "Cosmetology", icon: FaHandHoldingMedical, treatments: [] },
    { id: 5, name: "Dental Care", icon: FaTooth, treatments: [] },
    { id: 6, name: "Dermatology", icon: FaEye, treatments: [] },
    { id: 7, name: "Endocrinology", icon: FaBrain, treatments: [] },
    { id: 8, name: "ENT", icon: FaLungs, treatments: [] },
    { id: 9, name: "Gastroenterology", icon: FaHeartbeat, treatments: [] },
  ];

  const [active, setActive] = useState(1);

  return (
    <div className="w-full mt-10">

      <Container>
        
        <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center px-3">
          Treatments In India at Low Cost
        </h2>

       
        <div className="flex flex-col lg:flex-row gap-6 w-full">

       
          <div
            className="
              w-full lg:w-[320px] bg-white shadow-lg rounded-2xl p-4 border border-gray-200
              overflow-x-auto overflow-y-auto sidebar-scroll
              flex lg:flex-col gap-4
              max-h-[750px]
            "
          >
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer border min-w-[220px] lg:min-w-full
                  transition-all
                  ${
                    active === cat.id
                      ? "bg-yellow-100 border-yellow-500 shadow-md"
                      : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <cat.icon className="text-yellow-500 text-xl" />
                  <span className="font-medium text-base lg:text-lg">
                    {cat.name}
                  </span>
                </div>
                {active === cat.id && (
                  <IoChevronForward className="text-yellow-600 text-xl hidden lg:block" />
                )}
              </div>
            ))}
          </div>

          <div className="flex-1 bg-white shadow-lg rounded-xl p-6 md:p-10 border border-gray-200">
            <h3 className="text-xl md:text-2xl font-bold mb-6">
              {categories.find((c) => c.id === active)?.name}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 text-gray-700 text-base md:text-lg">
              {categories
                .find((c) => c.id === active)
                ?.treatments.map((t, index) => (
                  <p
                    key={index}
                    className="hover:text-orange-600 cursor-pointer"
                  >
                    {t}
                  </p>
                ))}

             
              {categories.find((c) => c.id === active)?.treatments.length ===
                0 && <p className="text-gray-500">No treatments available.</p>}
            </div>
          </div>
        </div>

        <style>{`
          .sidebar-scroll::-webkit-scrollbar {
            height: 6px;
            width: 8px;
          }
          .sidebar-scroll::-webkit-scrollbar-thumb {
            background: #c9c9c9;
            border-radius: 10px;
          }
        `}</style>
      </Container>
    </div>
  );
}
