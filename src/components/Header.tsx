// // import React, { useState } from "react";
// // import { Link } from "react-router-dom";
// // import Logo from "./Logo"; 

// // const Header = () => {
// //   const [isOpen, setIsOpen] = useState(false);

// //   const navItems = [
// //     { label: "Find Doctors", to: "/find-doctors" },
// //     { label: "Hospitals", to: "/hospitals" },
// //     { label: "Medicines", to: "/medicines" },
// //     { label: "Surgeries", to: "/surgeries" },
// //     { label: "Software for Provider", to: "/software" },
// //     { label: "Facilities", to: "/facilities" },
// //   ];

// //   return (
// //     <header className="fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-200">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
// //         <div className="h-20 flex items-center justify-between">

// //           <div className="flex items-center flex-none">
// //             <Link to="/" className="inline-flex items-center gap-3 flex-none">
// //               <Logo />
// //             </Link>
// //           </div>

// //           <nav className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 pointer-events-auto">
// //             <ul className="flex items-center gap-8">
// //               {navItems.map((item) => (
// //                 <li key={item.to}>
// //                   <Link
// //                     to={item.to}
// //                     className="text-sm font-medium text-gray-800 hover:text-primary transition-colors"
// //                   >
// //                     {item.label}
// //                   </Link>
// //                 </li>
// //               ))}
// //             </ul>
// //           </nav>

// //           <div className="hidden lg:flex items-center gap-4 flex-none">
// //             <Link
// //               to="/quote"
// //               className="inline-flex items-center px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold shadow-sm hover:opacity-95 transition"
// //               style={{ backgroundColor: "var(--tw-color-primary, #ff8a00)" }}
// //             >
// //               Get a FREE quote
// //             </Link>

// //             <button
// //               type="button"
// //               className="flex items-center gap-2 text-sm font-medium text-gray-800"
// //               aria-label="Select language"
// //             >
// //               <img
// //                 src="https://flagcdn.com/w40/us.png"
// //                 alt="English"
// //                 className="w-5 h-4 object-cover rounded-sm"
// //               />
// //               ENG
// //             </button>
// //           </div>

// //           <div className="lg:hidden flex items-center">
// //             <button
// //               onClick={() => setIsOpen((s) => !s)}
// //               aria-expanded={isOpen}
// //               aria-label={isOpen ? "Close menu" : "Open menu"}
// //               className="p-2 rounded-md inline-flex items-center justify-center text-gray-700 hover:bg-gray-100"
// //             >
// //               {isOpen ? (
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
// //                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
// //                 </svg>
// //               ) : (
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
// //                   <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
// //                 </svg>
// //               )}
// //             </button>
// //           </div>
// //         </div>

// //         {isOpen && (
// //           <div className="lg:hidden border-t border-gray-200">
// //             <nav className="px-4 py-4 space-y-1">
// //               {navItems.map((item) => (
// //                 <Link
// //                   key={item.to}
// //                   to={item.to}
// //                   onClick={() => setIsOpen(false)}
// //                   className="block px-3 py-2 rounded-md text-gray-800 hover:bg-gray-50 hover:text-primary transition-colors"
// //                 >
// //                   {item.label}
// //                 </Link>
// //               ))}

// //               <div className="pt-3">
// //                 <Link
// //                   to="/quote"
// //                   onClick={() => setIsOpen(false)}
// //                   className="block w-full text-center px-4 py-2 rounded-md bg-primary text-white font-semibold"
// //                   style={{ backgroundColor: "var(--tw-color-primary, #ff8a00)" }}
// //                 >
// //                   Get a FREE quote
// //                 </Link>
// //               </div>

// //               <div className="pt-3 flex items-center gap-3">
// //                 <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-6 h-5 object-cover rounded-sm" />
// //                 <span className="text-sm font-medium text-gray-800">ENG</span>
// //               </div>
// //             </nav>
// //           </div>
// //         )}
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;


import React from "react";
// import { Link } from "react-router-dom";
// import Logo from "./Logo";
// import LanguageSelector from "./LanguageSelector";
// import { useTranslation } from "react-i18next";
// import Container from "./Container";

// const Header: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { t } = useTranslation();

//   const navItems = [
//     { label: t("header.find_doctors"), to: "/find-doctors" },
//     { label: t("header.hospitals"), to: "/hospitals" },
//     { label: t("header.medicines"), to: "/medicines" },
//     { label: t("header.surgeries"), to: "/surgeries" },
//     { label: t("header.software"), to: "/software" },
//     { label: t("header.facilities"), to: "/facilities" },
//   ];


//   return (
//     <header className="fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-200">
//       <Container className="relative">
//         <div className="h-20 flex items-center justify-between">
//           <div className="flex items-center flex-none">
//             <Link to="/" className="inline-flex items-center gap-3 flex-none">
//               <Logo />
//             </Link>
//           </div>

//           <div className="hidden lg:flex items-center justify-center flex-1">
//             <nav>
//               <ul className="flex items-center gap-8">
//                 {navItems.map((item) => (
//                   <li key={item.to}>
//                     <Link
//                       to={item.to}
//                       className="text-sm font-medium text-gray-800 hover:text-primary transition-colors"
//                     >
//                       {item.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//           </div>


//           <div className="hidden lg:flex items-center gap-4 flex-none">
//             <Link
//               to="/quote"
//               className="inline-flex items-center px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold shadow-sm hover:opacity-95 transition"
//               style={{ backgroundColor: "var(--tw-color-primary, #ff8a00)" }}
//             >
//               Get a FREE quote
//             </Link>

//             {/* Replace static flag button with the LanguageSelector */}
//             <LanguageSelector />
//           </div>

//           <div className="lg:hidden flex items-center gap-2">
//             <LanguageSelector />
//             <button
//               onClick={() => setIsOpen((s) => !s)}
//               aria-expanded={isOpen}
//               aria-label={isOpen ? "Close menu" : "Open menu"}
//               className="p-2 rounded-md inline-flex items-center justify-center text-gray-700 hover:bg-gray-100"
//             >
//               {isOpen ? (
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>

//         {isOpen && (
//           <div className="lg:hidden border-t border-gray-200">
//             <nav className="px-4 py-4 space-y-1">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.to}
//                   to={item.to}
//                   onClick={() => setIsOpen(false)}
//                   className="block px-3 py-2 rounded-md text-gray-800 hover:bg-gray-50 hover:text-primary transition-colors"
//                 >
//                   {item.label}
//                 </Link>
//               ))}

//               <div className="pt-3">
//                 <Link
//                   to="/quote"
//                   onClick={() => setIsOpen(false)}
//                   className="block w-full text-center px-4 py-2 rounded-md bg-primary text-white font-semibold"
//                   style={{ backgroundColor: "var(--tw-color-primary, #ff8a00)" }}
//                 >
//                   Get a FREE quote
//                 </Link>
//               </div>

//               <div className="pt-3 flex items-center gap-3">
//                 {/* show compact language display in mobile menu */}
//                 <LanguageSelector />
//               </div>
//             </nav>
//           </div>
//         )}
//       </Container>

//     </header>
//   );
// };

// // export default Header;import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Logo from "./Logo";
// import LanguageSelector from "./LanguageSelector";
// import Container from "./Container";
// import { useEffect, useState } from "react";

// interface NavItem {
//   id: number;
//   name: string;
//   description: string;
//   status: string;
//   image: string;
//   url: string;
//   is_include_top_nav: boolean;
// }

// const Header: React.FC = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [navItems, setNavItems] = useState<NavItem[]>([]);

//   // -----------------------------
//   // JSON inside this file
//   // -----------------------------
//   const headerNavJson: NavItem[] = [
//     {
//       id: 1,
//       name: "Find Doctors",
//       description: "Find best doctors",
//       status: "active",
//       image: "",
//       url: "/find-doctors",
//       is_include_top_nav: true
//     },
//     {
//       id: 2,
//       name: "Hospitals",
//       description: "Find top hospitals",
//       status: "active",
//       image: "",
//       url: "/hospitals",
//       is_include_top_nav: true
//     },
//     {
//       id: 3,
//       name: "Medicines",
//       description: "Buy medicines",
//       status: "active",
//       image: "",
//       url: "/medicines",
//       is_include_top_nav: true
//     },
//     {
//       id: 4,
//       name: "Surgeries",
//       description: "View surgery details",
//       status: "active",
//       image: "",
//       url: "/surgeries",
//       is_include_top_nav: true
//     },
//      {
//       id: 6,
//       name: "Software for Provider",
//       description: "Software for Provider",
//       status: "active",
//       image: "",
//       url: "/test-category",
//       is_include_top_nav: true
//     },
//     {
//       id: 5,
//       name: "Facilities",
//       description: "",
//       status: "active",
//       image: "",
//       url: "/facilities",
//       is_include_top_nav: true
//     },
   
//   ];

//   // Load menu from JSON
//   useEffect(() => {
//     const filtered = headerNavJson.filter((item) => item.is_include_top_nav);
//     setNavItems(filtered);
//   }, []);

//   return (
//     <header className="fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-200">
//       <Container className="relative">
        
//         {/* Top Bar */}
//         <div className="h-20 flex items-center justify-between">

//           {/* Logo */}
//           <Link to="/" className="flex items-center flex-none">
//             <Logo />
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden lg:flex flex-1 justify-center">
//             <nav>
//               <ul className="flex gap-8 items-center">
//                 {navItems.map((item) => (
//                   <li key={item.id}>
//                     <Link
//                       to={item.url}
//                       className="text-sm font-medium text-gray-800 hover:text-[#ff8a00]"
//                     >
//                       {item.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//           </div>

//           {/* CTA + Language */}
//           <div className="hidden lg:flex items-center gap-4">
//             <Link
//               to="/quote"
//               className="px-5 py-2 rounded-lg bg-[#ff8a00] text-white text-sm font-semibold shadow-sm"
//             >
//               Get a FREE quote
//             </Link>
//             <LanguageSelector />
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="lg:hidden flex items-center gap-2">
//             <LanguageSelector />

//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
//             >
//               {isOpen ? (
//                 <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Drawer */}
//         {isOpen && (
//           <div className="lg:hidden border-t border-gray-200 pb-4">
//             <nav className="px-4 pt-4 space-y-2">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.id}
//                   to={item.url}
//                   onClick={() => setIsOpen(false)}
//                   className="block px-3 py-2 rounded-md hover:bg-gray-50 hover:text-[#ff8a00]"
//                 >
//                   {item.name}
//                 </Link>
//               ))}

//               <Link
//                 to="/quote"
//                 onClick={() => setIsOpen(false)}
//                 className="block w-full text-center mt-3 px-4 py-2 rounded-md bg-[#ff8a00] text-white"
//               >
//                 Get a FREE quote
//               </Link>
//             </nav>
//           </div>
//         )}

//       </Container>
//     </header>
//   );
// };

// export default Header;
// src/components/Header.tsx
import { Link } from "react-router-dom";
import Logo from "./Logo";
import LanguageSelector from "./LanguageSelector";
import Container from "./Container";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// ==============================
// 🟧 JSON WITH ALL LANGUAGES
// ==============================
const headerNavJson = [
  {
    id: 1,
    url: "/find-doctors",
    status: "active",
    image: "",
    is_include_top_nav: true,
    translations: {
      en: "Find Doctors",
      fr: "Trouvez un médecin",
      de: "Ärzte finden",
      es: "Buscar médicos",
      ar: "ابحث عن أطباء",
      yo: "Wa awọn dokita"
    }
  },
  {
    id: 2,
    url: "/hospitals",
    status: "active",
    image: "",
    is_include_top_nav: true,
    translations: {
      en: "Hospitals",
      fr: "Hôpitaux",
      de: "Krankenhäuser",
      es: "Hospitales",
      ar: "المستشفيات",
      yo: "Ile-iwosan"
    }
  },
  {
    id: 3,
    url: "/medicines",
    status: "active",
    image: "",
    is_include_top_nav: true,
    translations: {
      en: "Medicines",
      fr: "Médicaments",
      de: "Medikamente",
      es: "Medicamentos",
      ar: "الأدوية",
      yo: "Oògùn"
    }
  },
  {
    id: 4,
    url: "/surgeries",
    status: "active",
    image: "",
    is_include_top_nav: true,
    translations: {
      en: "Surgeries",
      fr: "Chirurgies",
      de: "Operationen",
      es: "Cirugías",
      ar: "العمليات الجراحية",
      yo: "Ìṣẹ́ abẹ"
    }
  },
  {
    id: 6,
    url: "/test-category",
    status: "active",
    image: "",
    is_include_top_nav: true,
    translations: {
      en: "Software for Provider",
      fr: "Logiciel pour fournisseurs",
      de: "Software für Anbieter",
      es: "Software para proveedores",
      ar: "برنامج لمقدمي الخدمة",
      yo: "Sọfitiwia fun Olùpèsè"
    }
  },
  {
    id: 5,
    url: "/facilities",
    status: "active",
    image: "",
    is_include_top_nav: true,
    translations: {
      en: "Facilities",
      fr: "Installations",
      de: "Einrichtungen",
      es: "Instalaciones",
      ar: "المرافق",
      yo: "Awọn ohun elo"
    }
  },

  // ==============================
  // 🔥 ADD QUOTE BUTTON TRANSLATIONS HERE
  // ==============================
  {
    id: 999,
    url: "/quote",
    status: "active",
    image: "",
    is_include_top_nav: false, // not part of navbar menu
    translations: {
      en: "Get a FREE quote",
      fr: "Obtenir un devis GRATUIT",
      de: "Erhalten Sie ein KOSTENLOSES Angebot",
      es: "Obtén una cotización GRATIS",
      ar: "احصل على عرض مجاني",
      yo: "Gba agbasọ Ọfẹ"
    }
  }
];

// ==============================
// 🟦 HEADER COMPONENT
// ==============================
const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navItems, setNavItems] = useState<any[]>([]);
  const { i18n } = useTranslation();

  // Pick correct language string
  const getLabel = (item: any) => {
    const lang = i18n.language.split("-")[0] || "en";
    return item.translations[lang] || item.translations["en"];
  };

  // Load nav from JSON
  useEffect(() => {
    const filtered = headerNavJson.filter(
      (item) => item.is_include_top_nav && item.status === "active"
    );
    setNavItems(filtered);
  }, []);

  // Find quote object in JSON
  const quoteItem = headerNavJson.find((x) => x.id === 999);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-200">
      <Container className="relative">
        {/* Top Bar */}
        <div className="h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex flex-1 justify-center">
            <ul className="flex gap-8 items-center">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.url}
                    className="text-sm font-medium text-gray-800 hover:text-[#ff8a00]"
                  >
                    {getLabel(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA + Language */}
          <div className="hidden lg:flex items-center gap-4">
            {/* 🔥 QUOTE BUTTON FROM JSON */}
            {quoteItem && (
              <Link
                to="/quote"
                className="px-5 py-2 rounded-lg bg-[#ff8a00] text-white text-sm font-semibold"
              >
                {getLabel(quoteItem)}
              </Link>
            )}

            <LanguageSelector />
          </div>

          {/* Mobile Button */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSelector />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200 pb-4">
            <nav className="px-4 pt-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.url}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md hover:bg-gray-50 hover:text-[#ff8a00]"
                >
                  {getLabel(item)}
                </Link>
              ))}

              {/* Mobile Quote Button */}
              {quoteItem && (
                <Link
                  to="/quote"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center mt-3 px-4 py-2 rounded-md bg-[#ff8a00] text-white"
                >
                  {getLabel(quoteItem)}
                </Link>
              )}
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
