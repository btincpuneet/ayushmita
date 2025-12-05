// import React from "react";

// interface Props {
//   countries: string[];
//   cities: string[];
//   onCountryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
//   onCityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
// }

// const HospitalFilter: React.FC<Props> = ({
//   countries,
//   cities,
//   onCountryChange,
//   onCityChange,
// }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <select
//         className="border p-3 rounded bg-white shadow-sm border-green-500"
//         onChange={onCountryChange}
//       >
//         <option value="">Select Country</option>
//         {countries.map((c) => (
//           <option key={c} value={c}>
//             {c}
//           </option>
//         ))}
//       </select>

//       <select
//         className="border p-3 rounded bg-white shadow-sm border-green-500"
//         onChange={onCityChange}
//       >
//         <option value="">Select City</option>
//         {cities.map((c) => (
//           <option key={c} value={c}>
//             {c}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default HospitalFilter;
import React from "react";
import Select from "react-select";

interface Props {
  countries: { label: string; value: string }[];
  cities: { label: string; value: string }[];
  onCountryChange: (value: any) => void;
  onCityChange: (value: any) => void;
}

const HospitalFilter: React.FC<Props> = ({
  countries,
  cities,
  onCountryChange,
  onCityChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* Country Select */}
      <Select
        options={countries}
        onChange={onCountryChange}
        placeholder="Select Country"
        className="text-black"
        styles={{
          control: (base) => ({
            ...base,
            borderColor: "#22c55e",
            borderRadius: "10px",
            padding: "4px",
            boxShadow: "none",
            "&:hover": { borderColor: "#16a34a" },
          }),
        }}
      />

      {/* City Select */}
      <Select
        options={cities}
        onChange={onCityChange}
        placeholder="Select City"
        className="text-black"
        styles={{
          control: (base) => ({
            ...base,
            borderColor: "#22c55e",
            borderRadius: "10px",
            padding: "4px",
            boxShadow: "none",
            "&:hover": { borderColor: "#16a34a" },
          }),
        }}
      />
    </div>
  );
};

export default HospitalFilter;
