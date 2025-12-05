import React from "react";
import { useNavigate } from "react-router-dom";

export default function Breadcrumb({
  title = "Page Title",
  homeText = "Home",
  parentName = "Treatment",
  parentLink = "/treatmentdetails",
  separator = "/",
  bgColor = "#F8EFBC80",
  titleColor = "text-black",
  breadcrumbColor = "text-gray-500",
  highlightColor = "#F0A324",
}) {
  const navigate = useNavigate();

  return (
    <div
      className="pb-10  mt-20"
      style={{ backgroundColor: bgColor }}
    >
      <div className={`max-w-7xl mx-auto px-4 pt-10 flex flex-col items-center text-center`}>

        <p className={`text-sm ${breadcrumbColor} mb-2`}>
          {homeText} {separator}{" "}
          <span
            className="font-medium cursor-pointer hover:underline"
            style={{ color: highlightColor }}
            onClick={() => navigate(parentLink)}
          >
            {parentName}
          </span>
        </p>

       
        <h1 className={`text-4xl font-bold mt-2 ${titleColor}`}>{title}</h1>
      </div>
    </div>
  );
}
