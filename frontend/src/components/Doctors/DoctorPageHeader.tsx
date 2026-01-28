import React from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface DoctorPageHeaderProps {
  title: string;
  countries: string[];
  cities: string[];
  selectedCountry: string;
  selectedCity: string;
  breadcrumbs: BreadcrumbItem[];
  onCountryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DoctorPageHeader: React.FC<DoctorPageHeaderProps> = ({
  title,
  countries,
  cities,
  breadcrumbs,
  selectedCountry,
  selectedCity,
  onCountryChange,
  onCityChange,
}) => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#fef9e8] py-10 border-b border-gray-200 mt-20">
      <div className="text-center mb-9">

        <p className="text-sm mb-2 text-[#87898C]">
          {breadcrumbs.map((item, index) => (
            <span key={index}>
              <span
                className={`${
                  item.link ? "hover:underline" : ""
                }`}
                style={index !== 0 ? { color: "#F0A324" } : {}}
                onClick={() => item.link && navigate(item.link)}
              >
                {item.label}
              </span>
              {index !== breadcrumbs.length - 1 && " / "}
            </span>
          ))}
        </p>

        <h1
          className="mt-2"
          style={{
            fontFamily: "Ubuntu, sans-serif",
            fontWeight: 700,
            fontSize: "48px",
            lineHeight: "100%",
            textAlign: "center",
          }}
        >
          {title}
        </h1>
      </div>

      <div className="flex justify-center">
        <div className="bg-[#F0A324] px-6 py-3 rounded-lg flex gap-4 items-center w-full max-w-2xl headings-search-location">

          <div className="relative w-1/2">
            <select
              value={selectedCountry}
              onChange={onCountryChange}
              className="w-full px-3 py-2 bg-white border border-[#E7E6E6] rounded-md appearance-none outline-none cursor-pointer pr-10"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
            />
          </div>

          <div className="relative w-1/2">
            <select
              value={selectedCity}
              onChange={onCityChange}
              disabled={!selectedCountry}
              className="w-full px-3 py-2 bg-white border border-[#E7E6E6] rounded-md appearance-none outline-none cursor-pointer pr-10 disabled:bg-gray-100"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default DoctorPageHeader;
