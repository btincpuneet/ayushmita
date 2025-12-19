import React from "react";
import { ChevronDown } from "lucide-react";

interface DoctorPageHeaderProps {
  title: string;
  countries: string[];
  cities: string[];
  selectedCountry: string;
  selectedCity: string;
  onCountryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DoctorPageHeader: React.FC<DoctorPageHeaderProps> = ({
  title,
  countries,
  cities,
  selectedCountry,
  selectedCity,
  onCountryChange,
  onCityChange,
}) => {
  return (
    <section className="bg-[#fef9e8] py-10 border-b border-gray-200 mt-20">
      {/* TITLE */}
      <div className="text-center mb-9">
        <p className="text-[#87898C]"
        style={{
  fontFamily: "Ubuntu, sans-serif",
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "14px",
  lineHeight: "100%",
  letterSpacing: "0%",
}}

        >
          Home <span className="text-[#F0A324]">/ Doctors</span>
        </p>

        <h1 className="mt-2" style={{
  fontFamily: "Ubuntu, sans-serif",
  fontWeight: 700,
  fontStyle: "normal",
  fontSize: "48px",
  lineHeight: "100%",
  letterSpacing: "0%",
  textAlign: "center",
}}
>
          {title}
        </h1>
      </div>

      {/* FILTER BAR */}
      <div className="flex justify-center">
        <div className="bg-[#F0A324] px-6 py-3 rounded-lg flex gap-4 items-center w-full max-w-2xl headings-search-location">

          {/* COUNTRY */}
          <div className="relative w-1/2 space-placeholder">
            <select
              value={selectedCountry}
              onChange={onCountryChange}
              className="w-full px-3 py-2 bg-white border border-[#E7E6E6] rounded-md appearance-none outline-none cursor-pointer pr-10"
            style={{
  fontFamily: "Ubuntu, sans-serif",
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "14px",
  lineHeight: "140%",
  letterSpacing: "0%",
}}

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

          {/* CITY */}
          <div className="relative w-1/2 space-placeholder">
            <select
              value={selectedCity}
              onChange={onCityChange}
              disabled={!selectedCountry}
              className="w-full px-3 py-2 bg-white border border-[#E7E6E6] rounded-md appearance-none outline-none cursor-pointer pr-10 disabled:bg-gray-100"
              style={{
  fontFamily: "Ubuntu, sans-serif",
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "14px",
  lineHeight: "140%",
  letterSpacing: "0%",
}}

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
