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
      className="relative border border-[#fef9e8] bg-[#fef9e8]"
    >
      <div className="max-w-7xl mx-auto mt-20 text-center pt-10 pb-10">
        <p className={`text-sm ${breadcrumbColor} mb-2`}>
          {breadcrumbs.map((item, index) => (
            <span key={index}>
              <span
                className={`cursor-pointer ${item.link ? "hover:underline" : ""
                  }`}
                style={index !== 0 ? { color: highlightColor } : {}}
                onClick={() => item.link && navigate(item.link)}
              >
                {item.label}
              </span>
              {index !== breadcrumbs.length - 1 && " / "}
            </span>
          ))}
        </p>

        <h1 className="hospital-treatment-low-price text-2xl">
          {title}
        </h1>

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
