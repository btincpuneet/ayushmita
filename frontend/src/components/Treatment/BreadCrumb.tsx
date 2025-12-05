import React, { useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import Container from "../Container";

interface Props {
  onTabClick: (tab: string) => void;
}

export default function TreatmentTabs({ onTabClick }: Props) {
  const [activeTab, setActiveTab] = useState("Cancer");

  const tabs = [
    "Cancer",
    "Cardiology Treatment",
    "Cosmetic Surgery",
    "Cosmetology",
    "Dental Care",
    "Dermatology",
    "Endocrinology",
    "ENT",
    "Gastroenterology",
    "Gender Reassignment Surgery",
  ];

  const handleClick = (tab: string) => {
    setActiveTab(tab);
    onTabClick(tab); 
  };

  return (
    <div className="bg-[#1c2b08] text-white w-full">
      <Container>
        <div className="flex items-center gap-8 overflow-x-auto py-3 text-sm font-medium">

          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleClick(tab)}
              className={`whitespace-nowrap transition 
                ${activeTab === tab ? "text-yellow-300 font-semibold" : "hover:text-yellow-300"}
              `}
            >
              {tab}
            </button>
          ))}

          <IoChevronForward className="text-yellow-400 text-lg flex-shrink-0" />
        </div>
      </Container>
    </div>
  );
}
