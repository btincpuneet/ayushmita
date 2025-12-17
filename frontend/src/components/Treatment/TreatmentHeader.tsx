import React from "react";
import { useNavigate } from "react-router-dom";

/* ---------------------------------------
   TYPES
--------------------------------------- */
interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface TreatmentHeaderProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];

  /* Background */
  bgImage?: string;
  bgColor?: string;
  overlay?: boolean;

  /* Styles */
  titleColor?: string;
  breadcrumbColor?: string;
  highlightColor?: string;
}

/* ---------------------------------------
   COMPONENT
--------------------------------------- */
const TreatmentHeader: React.FC<TreatmentHeaderProps> = ({
  title,
  breadcrumbs = [
    { label: "Home", link: "/" },
    { label: "Treatment", link: "/treatments" },
  ],

  /* Background */
  
  bgColor = "#F8EFBC80",
  overlay = true,

  /* Styles */
  titleColor = "text-black",
  breadcrumbColor = "text-gray-600",
  highlightColor = "#F0A324",
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative mt-20 pb-12"
      style={{
        backgroundColor:  bgColor,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
      )}

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 pt-10 text-center">
        <p className={`text-sm ${breadcrumbColor} mb-2`}>
          {breadcrumbs.map((item, index) => (
            <span key={index}>
             <span
  className={`cursor-pointer ${
    item.link ? "hover:underline" : ""
  } ${index === 0 ? "text-inherit" : ""}`}
  style={index === 0 ? {} : { color: highlightColor }}
  onClick={() => item.link && navigate(item.link)}
>
                {item.label}
              </span>
              {index !== breadcrumbs.length - 1 && " / "}
            </span>
          ))}
        </p>

        <h1 className={`text-4xl font-bold mt-2 ${titleColor}`}>
          {title}
        </h1>
      </div>
    </div>
  );
};

export default TreatmentHeader;
