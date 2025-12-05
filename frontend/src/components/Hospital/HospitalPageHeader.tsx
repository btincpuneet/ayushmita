import React from "react";
import { ChevronDown } from "lucide-react";

interface HeaderProps {
  title: string;
  countries: string[];
  cities: string[];
  selectedCountry: string;
  selectedCity: string;
  onCountryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const HospitalPageHeader: React.FC<HeaderProps> = ({
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
      <div className="text-center mb-8">
        {/* Breadcrumb */}
        <p className="text-sm text-gray-500">
          Home <span className="text-yellow-500">/ Hospitals</span>
        </p>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mt-2">{title}</h1>
      </div>

      {/* Filter Bar */}
      <div className="flex justify-center">
        <div className="bg-[#7CB342] px-6 py-3 rounded-lg flex gap-4 items-center w-full max-w-2xl">

          {/* Country */}
          <div className="relative w-1/2">
            <select
              value={selectedCountry}
              onChange={onCountryChange}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md appearance-none outline-none cursor-pointer pr-10 text-sm"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
              size={18}
            />
          </div>

          {/* City */}
          <div className="relative w-1/2">
            <select
              value={selectedCity}
              onChange={onCityChange}
              disabled={!selectedCountry}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md appearance-none outline-none cursor-pointer pr-10 text-sm disabled:bg-gray-100"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
              size={18}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HospitalPageHeader;
