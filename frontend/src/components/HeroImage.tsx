// import React from "react";
// import hero from "../assets/hero-medical.jpg";
// import Container from "./Container";
// import { useTranslation } from "react-i18next";

// const heroContentJson = {
//   top_label: {
//     en: "Medical And Health",
//     fr: "Médical et Santé",
//     de: "Medizin und Gesundheit",
//     es: "Médico y Salud",
//     ar: "الطب والصحة",
//     yo: "Ilera ati Iṣoogun",
//   },

//   title_line1: {
//     en: "A professional",
//     fr: "Un service professionnel",
//     de: "Ein professioneller",
//     es: "Un proveedor profesional",
//     ar: "رعاية مهنية",
//     yo: "Oníṣẹ́ amọ̀ja",
//   },

//   title_line2: {
//     en: "and friendly care",
//     fr: "et un service amical",
//     de: "und freundlicher Service",
//     es: "y atención amigable",
//     ar: "ورعاية ودودة",
//     yo: "ati itọju ore",
//   },

//   title_line3: {
//     en: "provider.",
//     fr: "prestataire.",
//     de: "Dienstleister.",
//     es: "proveedor.",
//     ar: "المُقدّم.",
//     yo: "olupese.",
//   },

//   description: {
//     en: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//     fr: "Le Lorem Ipsum est simplement un texte factice utilisé dans l'imprimerie.",
//     de: "Lorem Ipsum ist ein Platzhaltertext der Druck- und Satzindustrie.",
//     es: "Lorem Ipsum es simplemente un texto ficticio de la industria de impresión.",
//     ar: "لوريم إيبسوم هو نص شكلي يستخدم في صناعة الطباعة.",
//     yo: "Lorem Ipsum jẹ́ ọrọ apẹẹrẹ tí a fi nṣe ìtẹ̀jáde.",
//   },

//   cta_text: {
//     en: "Get a FREE quote",
//     fr: "Obtenir un devis GRATUIT",
//     de: "Erhalten Sie ein KOSTENLOSES Angebot",
//     es: "Obtén una cotización GRATIS",
//     ar: "احصل على عرض مجاني",
//     yo: "Gba agbasọ Ọfẹ",
//   },
// };

// const HeroImage: React.FC = () => {
//   const { i18n } = useTranslation();
//   const lang = i18n.language.split("-")[0] || "en";

//   const tHero = (obj: any) => obj[lang] || obj["en"];

//   return (
//     <section
//       aria-label="Medical And Health - Hero"
//       className="relative w-full pt-20 bg-sky-50 h-screen"
//     >
//       <div className="absolute inset-0 overflow-hidden">
//         <img
//           src={hero}
//           alt={tHero(heroContentJson.top_label)}
//           loading="eager"
//           className="w-full h-full object-cover object-right-top"
//         />

//         {/* Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />

//         {/* Decorative blob */}
//         <svg
//           className="absolute left-0 top-0 w-72 h-72 -translate-x-14 -translate-y-14 opacity-25"
//           viewBox="0 0 600 600"
//           aria-hidden
//         >
//           <g transform="translate(300,300)">
//             <path
//               d="M120,-150C160,-120,190,-80,197,-35C205,10,191,60,158,96C125,131,73,153,24,152C-25,151,-50,128,-92,113C-134,98,-193,90,-217,60C-241,30,-230,-21,-207,-55C-183,-88,-147,-104,-109,-128C-71,-151,-35,-182,5,-192C45,-203,90,-193,120,-150Z"
//               fill="#2563EB"
//             />
//           </g>
//         </svg>
//       </div>

//       <div className="relative w-full max-w-7xl mx-auto px-4 z-10 h-full flex items-center">
//         <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 py-10 lg:py-16">

//           {/* LEFT CONTENT */}
//           <div>
//             <p
//               className="text-[#F0A324] mb-4 tracking-wide"
//               style={{
//                 fontFamily: 'Roboto',
//                 fontWeight: 700,
//                 fontSize: '22px',
//                 lineHeight: '28px',
//                 letterSpacing: '0px',
//                 // leading-trim is not supported in standard CSS yet; you can ignore it for now
//               }}
//             >
//               {tHero(heroContentJson.top_label)}
//             </p>

// <h1
//   className="leading-[1] text-[35px] md:text-[70px]"
//   style={{
//     fontFamily: 'Ubuntu',
//     fontWeight: 700,
//     letterSpacing: '0px',
//   }}
// >
//               {tHero(heroContentJson.title_line1)} <br />
//               {tHero(heroContentJson.title_line2)} <br />
//               {tHero(heroContentJson.title_line3)}
//             </h1>

//             <p
//               className="mt-6 max-w-xl sm:text-[18px]"
//               style={{
//                 fontFamily: 'Ubuntu',
//                 fontWeight: 400,        // Regular weight
//                 fontStyle: 'normal',    // 'Regular' in CSS is 'normal'
//                 fontSize: '20px',
//                 lineHeight: '28px',
//                 letterSpacing: '0px',
//                 // leading-trim: NONE is not standard CSS yet
//               }}
//             >
//               {tHero(heroContentJson.description)}
//             </p>

//             <div className="mt-8 flex gap-4 flex-wrap">
//               <a
//                 href="#quote"
//                 className="inline-flex items-center px-7 py-3 rounded-full bg-[#F6A800] shadow-md hover:brightness-95"
//                 style={{
//                   fontFamily: 'Ubuntu',
//                   fontWeight: 500,
//                   fontSize: '16px',
//                   lineHeight: '100%',      // relative line-height
//                   letterSpacing: '0px',
//                   textAlign: 'center',
//                   // leading-trim: NONE is not standard CSS yet
//                 }}
//               >
//                 {tHero(heroContentJson.cta_text)}
//                 <svg
//                   className="ml-3 w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
//                 </svg>
//               </a>
//             </div>
//           </div>

//           {/* Right side empty */}
//           <div className="hidden md:block" />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroImage;


import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const HeroImage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language.split("-")[0] || "en";

  const [banner, setBanner] = useState(null);
  const API = "http://127.0.0.1:5001/api/hero-banners";

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          setBanner(data.data[0]); // get first hero banner
        }
      })
      .catch((err) => console.log("Hero fetch error:", err));
  }, []);

  if (!banner) return null;

  const {
    title,
    subtitle,
    description,
    image,
    button_text,
    button_url,
  } = banner;

  return (
    <section
      className="relative w-full pt-20 bg-sky-50 h-screen"
      aria-label={title}
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={`http://127.0.0.1:5001${image}`}
          alt={title}
          className="w-full h-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* TEXT SECTION */}
          <div>
            <p className="text-[#F0A324] mb-4 text-xl font-bold">
              {subtitle}
            </p>

            <h1 className="text-[35px] md:text-[70px] font-bold leading-tight">
              {title}
            </h1>

            <p className="mt-5 text-[18px] max-w-xl leading-[28px]">
              {description}
            </p>

            {button_text && (
              <div className="mt-8">
                <a
                  href={button_url || "#"}
                  className="inline-flex items-center px-7 py-3 rounded-full bg-[#F6A800] shadow-md hover:brightness-95"
                >
                  {button_text}
                  <svg
                    className="ml-3 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14M13 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>

          <div />
        </div>
      </div>
    </section>
  );
};

export default HeroImage;
