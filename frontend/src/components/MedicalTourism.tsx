// import React from "react";

// const countries = [
//     { id: "in", name: "India", flag: "https://flagcdn.com/w80/in.png" },
//     { id: "us", name: "USA", flag: "https://flagcdn.com/w80/us.png" },
//     { id: "ae", name: "UAE", flag: "https://flagcdn.com/w80/ae.png" },
//     { id: "mx", name: "Mexico", flag: "https://flagcdn.com/w80/mx.png" },
//     { id: "ca", name: "Canada", flag: "https://flagcdn.com/w80/ca.png" },
// ];

// export default function MedicalTourism() {
//     return (
//         <section className="py-12 md:py-20 bg-white">
//             <div className="max-w-7xl mx-auto px-6">



//                 {/* Heading */}
//                 <div className=" text-center">
//                     <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
//                         Top Medical Tourism
//                     </h2>
//                     <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
//                         Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//                     </p>
//                 </div>

//                 {/* Country Tiles */}
//                 <div className="mt-12 flex justify-center">
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
//                         {countries.map((c) => (
//                             <button
//                                 key={c.id}
//                                 className="flex flex-col items-center justify-center text-center gap-3 
//         bg-white rounded-lg p-4 w-32 h-32 shadow-sm hover:shadow-lg transition"
//                                 type="button"
//                                 aria-label={`Select ${c.name}`}
//                                 onClick={() => alert(`Selected ${c.name}`)}
//                             >
//                                 <div className="w-16 h-10 rounded-md overflow-hidden bg-white flex items-center justify-center">
//                                     <img
//                                         src={c.flag}
//                                         alt={`${c.name} flag`}
//                                         className="w-full h-full object-cover"
//                                     />
//                                 </div>
//                                 <span className="text-sm font-medium text-gray-700">{c.name}</span>
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//             </div>
//         </section>
//     );
// }
import React from "react";
import Container from "./Container";

const countries = [
  { id: "in", name: "India", flag: "https://flagcdn.com/w80/in.png" },
  { id: "us", name: "USA", flag: "https://flagcdn.com/w80/us.png" },
  { id: "ae", name: "UAE", flag: "https://flagcdn.com/w80/ae.png" },
  { id: "mx", name: "Mexico", flag: "https://flagcdn.com/w80/mx.png" },
  { id: "ca", name: "Canada", flag: "https://flagcdn.com/w80/ca.png" },
];

const MedicalTourism: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="relative w-full max-w-7xl mx-auto px-4 py-8 md:py-8">

        {/* Heading */}
        <div className="text-center">
          <h2 className=" md:text-4xl"
            style={{
              fontFamily: 'Ubuntu',
              fontWeight: 700,
              fontStyle: 'normal',
              fontSize: '32px',
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'center',
              color: '#333333',
            }}
          >
            Top Medical Tourism
          </h2>
          <p
            className="mt-4 text-center"
            style={{
              fontFamily: 'Ubuntu',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '100%',
              letterSpacing: '0%',

            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>

        {/* Country tiles */}
        <div className="mt-12 flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {countries.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-label={`Select ${c.name}`}
                className="flex flex-col items-center justify-center text-center gap-3
                           bg-white rounded-xl p-4 w-32 h-32 shadow-sm hover:shadow-lg 
                           border border-gray-100 hover:border-amber-300
                           transition-all duration-200"
                onClick={() => alert(`Selected ${c.name}`)}
              >
                <div className="w-16 h-10 rounded-md overflow-hidden bg-white flex items-center justify-center">
                  <img
                    src={c.flag}
                    alt={`${c.name} flag`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="c.name" style={{
                  fontFamily: 'Ubuntu',
                  fontWeight: 400,          // Regular weight
                  fontStyle: 'normal',      // Regular corresponds to normal
                  fontSize: '14px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  textAlign: 'center',
                  // leading-trim is not standard CSS, so it's ignored
                }}>
                  {c.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicalTourism;
