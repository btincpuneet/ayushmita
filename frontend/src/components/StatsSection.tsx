// // import React from "react";
// // import { Heart, Building2, Beaker, Stethoscope } from "lucide-react";

// // const stats = [
// //   {
// //     icon: Heart,
// //     count: "5000+",
// //     label: "Happy Patients",
// //     bgColor: "bg-stat-blue-bg",
// //     iconColor: "text-stat-blue",
// //   },
// //   {
// //     icon: Building2,
// //     count: "200+",
// //     label: "Hospitals",
// //     bgColor: "bg-stat-coral-bg",
// //     iconColor: "text-stat-coral",
// //   },
// //   {
// //     icon: Beaker,
// //     count: "1000+",
// //     label: "Laboratories",
// //     bgColor: "bg-stat-yellow-bg",
// //     iconColor: "text-stat-yellow",
// //   },
// //   {
// //     icon: Stethoscope,
// //     count: "700+",
// //     label: "Expert Doctors",
// //     bgColor: "bg-stat-green-bg",
// //     iconColor: "text-stat-green",
// //   },
// // ];

// // export const StatsSection = () => {
// //   return (
// //     <section className="py-12 md:py-16 lg:py-20 bg-background">
// //       <div className="container mx-auto px-4">
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
// //           {/* Left side - Text content */}
// //           <div className="space-y-4">
// //             <h2 className="text-3xl md:text-4xl font-bold text-foreground">
// //               Our Families
// //             </h2>
// //             <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
// //               We will work with you to develop individualised care plans,
// //               including management of chronic diseases. If we cannot assist, we
// //               can provide referrals or advice about the type of practitioner you
// //               require. We treat all enquiries sensitively and in the strictest
// //               confidence.
// //             </p>
// //           </div>

// //           {/* Right side - Stats grid */}
// //           <div className="grid grid-cols-2 gap-6 md:gap-8 border">
// //             {stats.map((stat, index) => {
// //               const Icon = stat.icon;
// //               return (
// //                 <div
// //                   key={index}
// //                   className="flex flex-col border items-center justify-center text-center space-y-4 p-6"
// //                 >
// //                   <div
// //                     className={`${stat.bgColor} w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center`}
// //                   >
// //                     <Icon className={`w-10 h-10 md:w-12 md:h-12 ${stat.iconColor}`} />
// //                   </div>
// //                   <div>
// //                     <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
// //                       {stat.count}
// //                     </div>
// //                     <div className="text-sm md:text-base text-muted-foreground font-medium">
// //                       {stat.label}
// //                     </div>
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };
// import React from "react";
// import { Heart, Building2, Beaker, Stethoscope } from "lucide-react";

// const stats = [
//   {
//     icon: Heart,
//     count: "5000+",
//     label: "Happy Patients",
//     bgColor: "bg-stat-blue-bg",
//     iconColor: "text-stat-blue",
//   },
//   {
//     icon: Building2,
//     count: "200+",
//     label: "Hospitals",
//     bgColor: "bg-stat-coral-bg",
//     iconColor: "text-stat-coral",
//   },
//   {
//     icon: Beaker,
//     count: "1000+",
//     label: "Laboratories",
//     bgColor: "bg-stat-yellow-bg",
//     iconColor: "text-stat-yellow",
//   },
//   {
//     icon: Stethoscope,
//     count: "700+",
//     label: "Expert Doctors",
//     bgColor: "bg-stat-green-bg",
//     iconColor: "text-stat-green",
//   },
// ];

// export const StatsSection = () => {
//   return (
//     <section className="py-12 md:py-16 lg:py-20 bg-[#FCF7F2]">
//       <div className="container max-w-7xl mx-auto  px-4">
//         {/* Use lg:grid-cols-2 and center items vertically on lg+.
//             On smaller screens we keep normal flow (stacked) and center text horizontally. */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
//           {/* Left side - Text content */}
//           <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left lg:self-center">
//             <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
//               Our Families
//             </h2>
//             <p className="mt-3 text-base md:text-lg text-muted-foreground leading-relaxed">
//               We will work with you to develop individualised care plans,
//               including management of chronic diseases. If we cannot assist, we
//               can provide referrals or advice about the type of practitioner you
//               require. We treat all enquiries sensitively and in the strictest
//               confidence.
//             </p>
//           </div>

//           {/* Right side - Stats grid (2x2 staggered) */}
//           <div className="grid grid-cols-2 gap-6 md:gap-8">
//             {stats.map((stat, index) => {
//               const Icon = stat.icon;
//               // Stagger right column cards (index 1 and 3) on md+
//               const stagger = index === 1 || index === 3 ? "md:translate-y-8" : "";

//               return (
//                 <div
//                   key={index}
//                   className={`${stagger} flex flex-col items-center text-center space-y-4 p-6 md:p-8
//                     bg-white rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.06)] h-full`}
//                 >
//                   <div
//                     className={`${stat.bgColor} w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center`}
//                   >
//                     <Icon className={`w-10 h-10 md:w-12 md:h-12 ${stat.iconColor}`} />
//                   </div>

//                   <div className="flex-1 flex flex-col justify-center">
//                     <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1">
//                       {stat.count}
//                     </div>
//                     <div className="text-sm md:text-base text-muted-foreground font-medium">
//                       {stat.label}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// StatsSection.tsx
import React from "react";
import { Heart, Building2, Beaker, Stethoscope } from "lucide-react";
import Container from "./Container";

const stats = [
  {
    icon: Heart,
    count: "5000+",
    label: "Happy Patients",
    bg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    icon: Building2,
    count: "200+",
    label: "Hospitals",
    bg: "bg-rose-50",
    iconColor: "text-rose-500",
  },
  {
    icon: Beaker,
    count: "1000+",
    label: "Laboratories",
    bg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    icon: Stethoscope,
    count: "700+",
    label: "Expert Doctors",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
];

export const StatsSection: React.FC = () => {
  return (
    <section className="bg-[#F8EFBC80]">
      <div className="relative w-full max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ---------------------- */}
          {/* Left Text Content     */}
          {/* ---------------------- */}
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left px-4 lg:px-0">
            <h2 style={{
              fontFamily: 'Ubuntu',
              fontWeight: 700,          // Bold
              fontStyle: 'normal',      // Bold is handled via fontWeight
              fontSize: '32px',
              lineHeight: '67px',
              letterSpacing: '0%',
              verticalAlign: 'middle',
              color: '#111827',          // Tailwind text-gray-900
              // leading-trim: NONE is not standard CSS, so it's ignored
            }}>
              Our Families
            </h2>
            <p className="mt-4 leading-relaxed"
              style={{
                fontFamily: 'Inter',
                fontWeight: 500,          
                fontStyle: 'normal',      
                fontSize: '17px',
                lineHeight: '28px',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                color: '#4B5563',          
              }}>
              We will work with you to develop individualised care plans,
              including management of chronic diseases. If we cannot assist, we
              can provide referrals or advice about the type of practitioner
              you require. We treat all enquiries sensitively and in the
              strictest confidence.
            </p>
          </div>

          {/* ---------------------- */}
          {/* Right Stats Cards     */}
          {/* ---------------------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8 px-4 lg:px-0">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const stagger = index === 1 || index === 3 ? "md:translate-y-6" : "";

              return (
                <div
                  key={stat.label}
                  className={`${stagger} w-full max-w-xs sm:max-w-none mx-auto bg-white rounded-sm shadow-[0_10px_30px_rgba(15,23,42,0.06)] p-6 md:p-7 flex flex-col items-center text-center space-y-4`}
                >
                  {/* Icon Circle */}
                  <div
                    className={`${stat.bg} w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center`}
                  >
                    <Icon className={`w-8 h-8 md:w-10 md:h-10 ${stat.iconColor}`} />
                  </div>

                  {/* Text Content */}
                  <div>
                    <div className="count-familiess"
                      style={{
                        fontFamily: 'Ubuntu',
                        fontWeight: 700,     
                        fontStyle: 'normal', 
                        fontSize: '48px',
                        lineHeight: '48px',
                        letterSpacing: '0%',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                      }}>
                      {stat.count}
                    </div>
                    <div className="mt-1"
                      style={{
                        fontFamily: 'Ubuntu',
                        fontWeight: 500,         
                        fontStyle: 'normal',     
                        fontSize: '18px',
                        lineHeight: '28px',
                        letterSpacing: '0%',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        // leading-trim: NONE is not standard CSS, so it's ignored
                      }}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

