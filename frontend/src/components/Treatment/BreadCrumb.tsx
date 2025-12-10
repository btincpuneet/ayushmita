import React, { useMemo, useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import Container from "../Container";

interface Props {
  onTabClick: (tab: string) => void;
  tabs?: string[];
  initialActive?: string;
}

const DEFAULT_TABS = [
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

export default function TreatmentTabs({ onTabClick, tabs, initialActive }: Props) {
  const resolvedTabs = useMemo(() => (tabs && tabs.length ? tabs : DEFAULT_TABS), [tabs]);
  const [activeTab, setActiveTab] = useState<string>(initialActive || resolvedTabs[0] || "");

  const handleClick = (tab: string) => {
    setActiveTab(tab);
    onTabClick(tab);
  };

  return (
    <div className="bg-[#1c2b08] text-white w-full">
      <Container>
        <div className="flex items-center gap-8 overflow-x-auto py-3 text-sm font-medium">
          {resolvedTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleClick(tab)}
              className={`whitespace-nowrap transition ${
                activeTab === tab ? "text-yellow-300 font-semibold" : "hover:text-yellow-300"
              }`}
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
