import React from "react";
import { useNavigate } from "react-router-dom";

const TreatmentHeader: React.FC<TreatmentHeaderProps> = ({
  title,
  breadcrumbs = [],
  children,
  bgColor = "#FBF6DE",
  breadcrumbColor = "text-gray-600",
  highlightColor = "#F0A324",
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative border border-[#FBF6DE]"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-7xl mx-auto mt-20 text-center pt-10 pb-10">
        <p className={`text-sm ${breadcrumbColor} mb-2`}>
          {breadcrumbs.map((item, index) => (
            <span key={index}>
              <span
                className={`${index === 0 ? "cursor-pointer hover:underline" : ""}`}
                style={index !== 0 ? { color: highlightColor } : {}}
                onClick={() => index === 0 && item.link && navigate(item.Link)}
              >

                {item.label}
              </span>
              {index !== breadcrumbs.length - 1 && " / "}
            </span>
          ))}
        </p>

        {title && (
          <h1 className="hospital-treatment-low-price text-2xl">
            {title}
          </h1>
        )}


        {children && (
          <div className="mt-8 flex justify-center">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default TreatmentHeader;
