import React from "react";
import { useNavigate } from "react-router-dom";
interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface TreatmentHeaderProps {
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: React.ReactNode;
  bgColor?: string;
  breadcrumbColor?: string;
  highlightColor?: string;
}

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
                className={`${index < breadcrumbs.length - 1
                    ? "cursor-pointer hover:underline"
                    : ""
                  }`}
                style={index === breadcrumbs.length - 1 ? { color: highlightColor } : {}}
                onClick={() =>
                  index < breadcrumbs.length - 1 && item.link && navigate(item.link)
                }
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
