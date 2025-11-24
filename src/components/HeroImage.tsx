// // import React from "react";
// // import hero from "../assets/hero-medical.jpg";
// // import Container from "./Container";

// // const HeroImage: React.FC = () => {
// //   return (
// //     <section
// //       aria-label="Medical And Health - Hero"
// //       className="relative w-full h-screen overflow-hidden "
// //     >
// //       {/* Background image */}
// //       <div className="absolute inset-0 w-full h-full">
// //         <img
// //           src={hero}
// //           alt="Professional healthcare provider"
// //           loading="eager"
// //           className="block w-full h-full object-cover object-right-top"
// //         />

// //         {/* Soft gradient overlay */}
// //         <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />

// //         {/* Decorative wave top-left */}
// //         <svg
// //           className="absolute left-0 top-0 w-72 h-72 -translate-x-14 -translate-y-14 opacity-25"
// //           viewBox="0 0 600 600"
// //           xmlns="http://www.w3.org/2000/svg"
// //           aria-hidden
// //         >
// //           <g transform="translate(300,300)">
// //             <path
// //               d="M120,-150C160,-120,190,-80,197,-35C205,10,191,60,158,96C125,131,73,153,24,152C-25,151,-50,128,-92,113C-134,98,-193,90,-217,60C-241,30,-230,-21,-207,-55C-183,-88,-147,-104,-109,-128C-71,-151,-35,-182,5,-192C45,-203,90,-193,120,-150Z"
// //               fill="#2563EB"
// //             />
// //           </g>
// //         </svg>
// //       </div>

// //       {/* Foreground text */}
// //       <div className="relative z-10 w-full h-full flex items-center">
// //         <Container className="w-full px-6">
// //           <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            
// //             {/* Left Content */}
// //             <div className="py-16 md:py-24">
// //               <p className="text-[#F6A800] text-base font-semibold mb-4 tracking-wide">
// //                 Medical And Health
// //               </p>

// //               <h1 className="font-extrabold text-[clamp(2.5rem,6vw,4.6rem)] leading-tight text-gray-900 tracking-tight">
// //                 A professional <br />
// //                 and friendly care <br />
// //                 provider.
// //               </h1>

// //               <p className="mt-6 text-gray-600 max-w-xl text-lg">
// //                 Lorem Ipsum is simply dummy text of the printing and typesetting industry.
// //               </p>

// //               <div className="mt-8 flex gap-4 flex-wrap">
// //                 {/* Primary Button */}
// //                 <a
// //                   href="#"
// //                   className="inline-flex items-center px-7 py-3 rounded-full bg-[#F6A800] text-black font-semibold text-base shadow-md hover:brightness-90 transition-all"
// //                 >
// //                   Get a FREE quote
// //                   <svg
// //                     className="ml-3 w-4 h-4"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     strokeWidth="2"
// //                     viewBox="0 0 24 24"
// //                   >
// //                     <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
// //                   </svg>
// //                 </a>
// //               </div>
// //             </div>

// //             {/* Right side empty (image visible) */}
// //             <div className="hidden md:block" />
// //           </div>
// //          </Container>

// //       </div>
// //     </section>
// //   );
// // };

// // export default HeroImage;
// import React from "react";
// import hero from "../assets/hero-medical.jpg";
// import Container from "./Container";

// const HeroImage: React.FC = () => {
//   return (
//     <section
//       aria-label="Medical And Health - Hero"
//       className="relative w-full pt-20 bg-sky-50 h-screen" // pt-20 = fixed header ke niche se start
//     >
//       <div className="relative overflow-hidden">
//         {/* background image */}
//         <div className="absolute inset-0">
//           <img
//             src={hero}
//             alt="Professional healthcare provider"
//             loading="eager"
//             className="block w-full h-full object-cover object-right-top"
//           />
//           {/* gradient overlay */}
//           <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
//         </div>

//         {/* decorative blob */}
//         <svg
//           className="absolute left-0 top-0 w-72 h-72 -translate-x-14 -translate-y-14 opacity-25"
//           viewBox="0 0 600 600"
//           xmlns="http://www.w3.org/2000/svg"
//           aria-hidden
//         >
//           <g transform="translate(300,300)">
//             <path
//               d="M120,-150C160,-120,190,-80,197,-35C205,10,191,60,158,96C125,131,73,153,24,152C-25,151,-50,128,-92,113C-134,98,-193,90,-217,60C-241,30,-230,-21,-207,-55C-183,-88,-147,-104,-109,-128C-71,-151,-35,-182,5,-192C45,-203,90,-193,120,-150Z"
//               fill="#2563EB"
//             />
//           </g>
//         </svg>

//         {/* foreground content */}
//         <Container className="relative z-10">
//           <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 min-h-[480px] lg:min-h-[560px] py-10 lg:py-16">
//             {/* left content */}
//             <div>
//               <p className="text-[#F6A800] text-sm lg:text-base font-semibold mb-4 tracking-wide">
//                 Medical And Health
//               </p>

//               <h1 className="font-extrabold text-[clamp(2.2rem,4vw,3.5rem)] leading-tight text-gray-900 tracking-tight">
//                 A professional <br />
//                 and friendly care <br />
//                 provider.
//               </h1>

//               <p className="mt-6 text-gray-600 max-w-xl text-base lg:text-lg">
//                 Lorem Ipsum is simply dummy text of the printing and typesetting
//                 industry.
//               </p>

//               <div className="mt-8 flex gap-4 flex-wrap">
//                 <a
//                   href="#quote"
//                   className="inline-flex items-center px-7 py-3 rounded-full bg-[#F6A800] text-black font-semibold text-sm lg:text-base shadow-md hover:brightness-95 transition-all"
//                 >
//                   Get a FREE quote
//                   <svg
//                     className="ml-3 w-4 h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M5 12h14M13 5l7 7-7 7"
//                     />
//                   </svg>
//                 </a>
//               </div>
//             </div>

//             {/* right side empty column → image dikh raha hoga */}
//             <div className="hidden md:block" />
//           </div>
//         </Container>
//       </div>
//     </section>
//   );
// };
import React from "react";
import hero from "../assets/hero-medical.jpg";
import Container from "./Container";
import { useTranslation } from "react-i18next";

// ==============================
// 🟧 HERO JSON IN SAME FILE
// ==============================
const heroContentJson = {
  top_label: {
    en: "Medical And Health",
    fr: "Médical et Santé",
    de: "Medizin und Gesundheit",
    es: "Médico y Salud",
    ar: "الطب والصحة",
    yo: "Ilera ati Iṣoogun",
  },

  title_line1: {
    en: "A professional",
    fr: "Un service professionnel",
    de: "Ein professioneller",
    es: "Un proveedor profesional",
    ar: "رعاية مهنية",
    yo: "Oníṣẹ́ amọ̀ja",
  },

  title_line2: {
    en: "and friendly care",
    fr: "et un service amical",
    de: "und freundlicher Service",
    es: "y atención amigable",
    ar: "ورعاية ودودة",
    yo: "ati itọju ore",
  },

  title_line3: {
    en: "provider.",
    fr: "prestataire.",
    de: "Dienstleister.",
    es: "proveedor.",
    ar: "المُقدّم.",
    yo: "olupese.",
  },

  description: {
    en: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    fr: "Le Lorem Ipsum est simplement un texte factice utilisé dans l'imprimerie.",
    de: "Lorem Ipsum ist ein Platzhaltertext der Druck- und Satzindustrie.",
    es: "Lorem Ipsum es simplemente un texto ficticio de la industria de impresión.",
    ar: "لوريم إيبسوم هو نص شكلي يستخدم في صناعة الطباعة.",
    yo: "Lorem Ipsum jẹ́ ọrọ apẹẹrẹ tí a fi nṣe ìtẹ̀jáde.",
  },

  cta_text: {
    en: "Get a FREE quote",
    fr: "Obtenir un devis GRATUIT",
    de: "Erhalten Sie ein KOSTENLOSES Angebot",
    es: "Obtén una cotización GRATIS",
    ar: "احصل على عرض مجاني",
    yo: "Gba agbasọ Ọfẹ",
  },
};

// ==============================
// 🟦 HERO COMPONENT
// ==============================
const HeroImage: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language.split("-")[0] || "en";

  // helper: returns correct language from JSON
  const tHero = (obj: any) => obj[lang] || obj["en"];

  return (
    <section
      aria-label="Medical And Health - Hero"
      className="relative w-full pt-20 bg-sky-50 h-screen"
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Background image */}
        <img
          src={hero}
          alt={tHero(heroContentJson.top_label)}
          loading="eager"
          className="w-full h-full object-cover object-right-top"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />

        {/* Decorative blob */}
        <svg
          className="absolute left-0 top-0 w-72 h-72 -translate-x-14 -translate-y-14 opacity-25"
          viewBox="0 0 600 600"
          aria-hidden
        >
          <g transform="translate(300,300)">
            <path
              d="M120,-150C160,-120,190,-80,197,-35C205,10,191,60,158,96C125,131,73,153,24,152C-25,151,-50,128,-92,113C-134,98,-193,90,-217,60C-241,30,-230,-21,-207,-55C-183,-88,-147,-104,-109,-128C-71,-151,-35,-182,5,-192C45,-203,90,-193,120,-150Z"
              fill="#2563EB"
            />
          </g>
        </svg>
      </div>

      <Container className="relative z-10 h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 py-10 lg:py-16">
          
          {/* LEFT CONTENT */}
          <div>
            <p className="text-[#F6A800] text-sm lg:text-base font-semibold mb-4 tracking-wide">
              {tHero(heroContentJson.top_label)}
            </p>

            <h1 className="font-extrabold text-[clamp(2.2rem,4vw,3.5rem)] leading-tight text-gray-900">
              {tHero(heroContentJson.title_line1)} <br />
              {tHero(heroContentJson.title_line2)} <br />
              {tHero(heroContentJson.title_line3)}
            </h1>

            <p className="mt-6 text-gray-600 max-w-xl text-base lg:text-lg">
              {tHero(heroContentJson.description)}
            </p>

            <div className="mt-8 flex gap-4 flex-wrap">
              <a
                href="#quote"
                className="inline-flex items-center px-7 py-3 rounded-full bg-[#F6A800] text-black font-semibold text-sm lg:text-base shadow-md hover:brightness-95"
              >
                {tHero(heroContentJson.cta_text)}
                <svg
                  className="ml-3 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right side empty */}
          <div className="hidden md:block" />
        </div>
      </Container>
    </section>
  );
};

export default HeroImage;
