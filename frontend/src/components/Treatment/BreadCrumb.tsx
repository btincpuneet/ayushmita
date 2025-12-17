import React from "react";
import { IoChevronForward } from "react-icons/io5";
import Container from "../Container";

interface Props {
  onTabClick: (tab: string) => void;
  activeTab: string;
  tabs?: string[];
}

const DEFAULT_TABS = [
  "Cancer",
  "Cardiology",
  "Cosmetic Surgery",
  "Cosmetology",
  "Dental Care",
  "Dermatology",
  "Endocrinology",
  "ENT",
  "Gastroenterology",
  "Gender Reassignment Surgery",
];

export default function BreadCrumb({ onTabClick, activeTab, tabs }: Props) {
  const resolvedTabs = tabs && tabs.length ? tabs : DEFAULT_TABS;

  return (
    <div className="bg-[#2A6506] w-full">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div
          className="flex items-center gap-8 py-3"
          style={{
            fontFamily: "Ubuntu",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "13px",
            lineHeight: "30px",
            letterSpacing: "0%",
            color: "#FFFFFF",
          }}
        >

          {resolvedTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabClick(tab)}
              className={`whitespace-nowrap transition ${activeTab === tab ? "text-yellow-300 font-semibold" : "hover:text-yellow-300"
                }`}
            >
              {tab}
            </button>
          ))}
          <IoChevronForward className="text-yellow-400 text-lg flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}
