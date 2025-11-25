// import { Link } from "react-router-dom";
// import Logo from "./Logo";
// import LanguageSelector from "./LanguageSelector";
// import Container from "./Container";
// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";

// // ==============================
// // 🟧 JSON WITH ALL LANGUAGES
// // ==============================
// const headerNavJson = [
//   {
//     id: 1,
//     url: "/find-doctors",
//     status: "active",
//     image: "",
//     is_include_top_nav: true,
//     translations: {
//       en: "Find Doctors",
//       fr: "Trouvez un médecin",
//       de: "Ärzte finden",
//       es: "Buscar médicos",
//       ar: "ابحث عن أطباء",
//       yo: "Wa awọn dokita"
//     }
//   },
//   {
//     id: 2,
//     url: "/hospitals",
//     status: "active",
//     image: "",
//     is_include_top_nav: true,
//     translations: {
//       en: "Hospitals",
//       fr: "Hôpitaux",
//       de: "Krankenhäuser",
//       es: "Hospitales",
//       ar: "المستشفيات",
//       yo: "Ile-iwosan"
//     }
//   },
//   {
//     id: 3,
//     url: "/medicines",
//     status: "active",
//     image: "",
//     is_include_top_nav: true,
//     translations: {
//       en: "Medicines",
//       fr: "Médicaments",
//       de: "Medikamente",
//       es: "Medicamentos",
//       ar: "الأدوية",
//       yo: "Oògùn"
//     }
//   },
//   {
//     id: 4,
//     url: "/surgeries",
//     status: "active",
//     image: "",
//     is_include_top_nav: true,
//     translations: {
//       en: "Surgeries",
//       fr: "Chirurgies",
//       de: "Operationen",
//       es: "Cirugías",
//       ar: "العمليات الجراحية",
//       yo: "Ìṣẹ́ abẹ"
//     }
//   },
//   {
//     id: 6,
//     url: "/test-category",
//     status: "active",
//     image: "",
//     is_include_top_nav: true,
//     translations: {
//       en: "Software for Provider",
//       fr: "Logiciel pour fournisseurs",
//       de: "Software für Anbieter",
//       es: "Software para proveedores",
//       ar: "برنامج لمقدمي الخدمة",
//       yo: "Sọfitiwia fun Olùpèsè"
//     }
//   },
//   {
//     id: 5,
//     url: "/facilities",
//     status: "active",
//     image: "",
//     is_include_top_nav: true,
//     translations: {
//       en: "Facilities",
//       fr: "Installations",
//       de: "Einrichtungen",
//       es: "Instalaciones",
//       ar: "المرافق",
//       yo: "Awọn ohun elo"
//     }
//   },

//   // ==============================
//   // 🔥 ADD QUOTE BUTTON TRANSLATIONS HERE
//   // ==============================
//   {
//     id: 999,
//     url: "/quote",
//     status: "active",
//     image: "",
//     is_include_top_nav: false, // not part of navbar menu
//     translations: {
//       en: "Get a FREE quote",
//       fr: "Obtenir un devis GRATUIT",
//       de: "Erhalten Sie ein KOSTENLOSES Angebot",
//       es: "Obtén una cotización GRATIS",
//       ar: "احصل على عرض مجاني",
//       yo: "Gba agbasọ Ọfẹ"
//     }
//   }
// ];

// // ==============================
// // 🟦 HEADER COMPONENT
// // ==============================
// const Header: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [navItems, setNavItems] = useState<any[]>([]);
//   const { i18n } = useTranslation();

//   // Pick correct language string
//   const getLabel = (item: any) => {
//     const lang = i18n.language.split("-")[0] || "en";
//     return item.translations[lang] || item.translations["en"];
//   };

//   // Load nav from JSON
//   useEffect(() => {
//     const filtered = headerNavJson.filter(
//       (item) => item.is_include_top_nav && item.status === "active"
//     );
//     setNavItems(filtered);
//   }, []);

//   // Find quote object in JSON
//   const quoteItem = headerNavJson.find((x) => x.id === 999);

//   return (
//     <header className="fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-200">
//       <Container className="relative">
//         {/* Top Bar */}
//         <div className="h-20 flex items-center justify-between">
//           <Link to="/" className="flex items-center">
//             <Logo />
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden lg:flex flex-1 justify-center">
//             <ul className="flex gap-8 items-center">
//               {navItems.map((item) => (
//                 <li key={item.id}>
//                   <Link
//                     to={item.url}
//                     className="text-sm font-medium text-gray-800 hover:text-[#ff8a00]"
//                   >
//                     {getLabel(item)}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* CTA + Language */}
//           <div className="hidden lg:flex items-center gap-4">
//             {/* 🔥 QUOTE BUTTON FROM JSON */}
//             {quoteItem && (
//               <Link
//                 to="/quote"
//                 className="px-5 py-2 rounded-lg bg-[#ff8a00] text-white text-sm font-semibold"
//               >
//                 {getLabel(quoteItem)}
//               </Link>
//             )}

//             <LanguageSelector />
//           </div>

//           {/* Mobile Button */}
//           <div className="lg:hidden flex items-center gap-2">
//             <LanguageSelector />
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
//             >
//               {isOpen ? "✖" : "☰"}
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
//                   {getLabel(item)}
//                 </Link>
//               ))}

//               {/* Mobile Quote Button */}
//               {quoteItem && (
//                 <Link
//                   to="/quote"
//                   onClick={() => setIsOpen(false)}
//                   className="block w-full text-center mt-3 px-4 py-2 rounded-md bg-[#ff8a00] text-white"
//                 >
//                   {getLabel(quoteItem)}
//                 </Link>
//               )}
//             </nav>
//           </div>
//         )}
//       </Container>
//     </header>
//   );
// };

// export default Header;

import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import LanguageSelector from "./LanguageSelector";
import Container from "./Container";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

// 🔹 API URL
const NAV_API_URL = "http://127.0.0.1:5001/api/categories";

// 🧩 Type for nav items coming from API
type NavItem = {
  id: number;
  name: string;
  description: string;
  status: string;
  image: string;
  url: string;
  is_include_top_nav: boolean;
};

// 🔸 Only quote button stays local (with translations)
const quoteItemJson = {
  id: 999,
  url: "/quote",
  status: "active",
  image: "",
  is_include_top_nav: false,
  translations: {
    en: "Get a FREE quote",
    fr: "Obtenir un devis GRATUIT",
    de: "Erhalten Sie ein KOSTENLOSES Angebot",
    es: "Obtén una cotización GRATIS",
    ar: "احصل على عرض مجاني",
    yo: "Gba agbasọ Ọfẹ",
  },
};

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const { i18n } = useTranslation();

  // 🌍 Quote button label using translations
  const getQuoteLabel = (item: typeof quoteItemJson) => {
    const lang = i18n.language.split("-")[0] || "en";
    return item.translations[lang] || item.translations["en"];
  };

  // 🟢 Load nav from API using axios
  useEffect(() => {
    let isMounted = true;

    const fetchNavItems = async () => {
      try {
        const response = await axios.get<NavItem[]>(NAV_API_URL);
        const data = response.data;

        const filtered = data.filter(
          (item) => item.is_include_top_nav && item.status === "active"
        );

        if (isMounted) {
          setNavItems(filtered);
        }
      } catch (error) {
        console.error("Error fetching nav items:", error);
      }
    };

    fetchNavItems();

    // cleanup to avoid state updates on unmounted component (React 18/19 strict mode friendly)
    return () => {
      isMounted = false;
    };
  }, []);

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
                    {/* Label from API */}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA + Language */}
          <div className="hidden lg:flex items-center gap-4">
            {/* 🔥 QUOTE BUTTON WITH TRANSLATIONS */}
            <Link
              to={quoteItemJson.url}
              className="px-5 py-2 rounded-lg bg-[#ff8a00] text-white text-sm font-semibold"
            >
              {getQuoteLabel(quoteItemJson)}
            </Link>

            <LanguageSelector />
          </div>

          {/* Mobile Button */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSelector />
            <button
              onClick={() => setIsOpen((prev) => !prev)}
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
                  {item.name}
                </Link>
              ))}

              {/* Mobile Quote Button */}
              <Link
                to={quoteItemJson.url}
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-3 px-4 py-2 rounded-md bg-[#ff8a00] text-white"
              >
                {getQuoteLabel(quoteItemJson)}
              </Link>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
