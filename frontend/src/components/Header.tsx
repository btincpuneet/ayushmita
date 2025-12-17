// import { Link } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import Logo from "../assets/logo.png";
// import LanguageSelector from "./LanguageSelector";
// import Container from "./Container";   // ✅ ADDED
// import { useTranslation } from "react-i18next";

// // ==============================
// // 🟧 JSON WITH ALL LANGUAGES
// // ==============================
// const headerNavJson = [
//   {
//     id: 1,
//     url: "/",
//     status: "active",
//     image: "",
//     is_include_top_nav: true,
//     translations: {
//       en: "Find Doctors",
//       fr: "Trouvez un médecin",
//       de: "Ärzte finden",
//       es: "Buscar médicos",
//       ar: "ابحث عن أطباء",
//       yo: "Wa awọn dokita",
//     },
//   },
//   {
//     id: 2,
//     url: "/hospital",
//     status: "active",
//     image: "",
//     is_include_top_nav: true,
//     translations: {
//       en: "Hospitals",
//       fr: "Hôpitaux",
//       de: "Krankenhäuser",
//       es: "Hospitales",
//       ar: "المستشفيات",
//       yo: "Ile-iwosan",
//     },
//   },
//   {
//     id: 3,
//     url: "/treatment",
//     status: "active",
//     image: "",
//     is_include_top_nav: true,
//     translations: {
//       en: "Treatment",
//       fr: "Médicaments",
//       de: "Medikamente",
//       es: "Medicamentos",
//       ar: "الأدوية",
//       yo: "Oògùn",
//     },
//   },
//   {
//     id: 4,
//     url: "/",
//     status: "active",
//     image: "",
//     is_include_top_nav: true,
//     translations: {
//       en: "Surgeries",
//       fr: "Chirurgies",
//       de: "Operationen",
//       es: "Cirugías",
//       ar: "العمليات الجراحية",
//       yo: "Ìṣẹ́ abẹ",
//     },
//   },
//   {
//     id: 6,
//     url: "/",
//     status: "active",
//     image: "",
//     is_include_top_nav: true,
//     translations: {
//       en: "Software for Provider",
//       fr: "Logiciel pour fournisseurs",
//       de: "Software für Anbieter",
//       es: "Software para proveedores",
//       ar: "برنامج لمقدمي الخدمة",
//       yo: "Sọfitiwia fun Olùpèsè",
//     },
//   },
//   {
//     id: 5,
//     url: "/",
//     status: "active",
//     image: "",
//     is_include_top_nav: true,
//     translations: {
//       en: "Facilities",
//       fr: "Installations",
//       de: "Einrichtungen",
//       es: "Instalaciones",
//       ar: "المرافق",
//       yo: "Awọn ohun elo",
//     },
//   },

//   // QUOTE BUTTON
//   {
//     id: 999,
//     url: "/quote",
//     status: "active",
//     image: "",
//     is_include_top_nav: false,
//     translations: {
//       en: "Get a FREE quote",
//       fr: "Obtenir un devis GRATUIT",
//       de: "Erhalten Sie ein KOSTENLOSES Angebot",
//       es: "Obtén una cotización GRATIS",
//       ar: "احصل على عرض مجاني",
//       yo: "Gba agbasọ Ọfẹ",
//     },
//   },
// ];

// const Header: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [navItems, setNavItems] = useState<any[]>([]);
//   const { i18n } = useTranslation();

//   const getLabel = (item: any) => {
//     const lang = i18n.language.split("-")[0] || "en";
//     return item.translations[lang] || item.translations["en"];
//   };

//   useEffect(() => {
//     const filtered = headerNavJson.filter(
//       (item) => item.is_include_top_nav && item.status === "active"
//     );
//     setNavItems(filtered);
//   }, []);

//   const quoteItem = headerNavJson.find((x) => x.id === 999);

//   return (
//     <header className="fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-200">
//       {/* ✅ WRAPPED INSIDE CONTAINER */}
//       <Container>
//         <div className="relative w-full">
//           {/* Top Bar */}
//           <div className="h-20 flex items-center justify-between">
//             <Link to="/" className="flex items-center">
//               <img src={Logo} alt="Company Logo" className="w-25" />
//             </Link>

//             {/* Desktop Nav */}
//             <div className="hidden lg:flex flex-1 justify-end">
//               <ul className="flex gap-[40px] items-center">
//                 {navItems.map((item) => (
//                   <li key={item.id}>
//                     <Link
//                       to={item.url}
//                       className="text-sm font-medium text-gray-800 hover:text-[#ff8a00]"
//                     >
//                       {getLabel(item)}
//                     </Link>
//                   </li>
//                 ))}

//                 {quoteItem && (
//                   <Link
//                     to="/quote"
//                     className="px-5 py-2 rounded-lg bg-[#ff8a00] text-white text-sm font-semibold"
//                   >
//                     {getLabel(quoteItem)}
//                   </Link>
//                 )}

//                 <LanguageSelector />
//               </ul>
//             </div>

//             {/* Mobile */}
//             <div className="lg:hidden flex items-center gap-2">
//               <LanguageSelector />

//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
//               >
//                 {isOpen ? "✖" : "☰"}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Drawer */}
//           {isOpen && (
//             <div className="lg:hidden border-t border-gray-200 pb-4">
//               <nav className="px-4 pt-4 space-y-2">
//                 {navItems.map((item) => (
//                   <Link
//                     key={item.id}
//                     to={item.url}
//                     onClick={() => setIsOpen(false)}
//                     className="block px-3 py-2 rounded-md hover:bg-gray-50 hover:text-[#ff8a00]"
//                   >
//                     {getLabel(item)}
//                   </Link>
//                 ))}

//                 {quoteItem && (
//                   <Link
//                     to="/quote"
//                     onClick={() => setIsOpen(false)}
//                     className="block w-full text-center mt-3 px-4 py-2 rounded-md bg-[#ff8a00] text-white"
//                   >
//                     {getLabel(quoteItem)}
//                   </Link>
//                 )}
//               </nav>
//             </div>
//           )}
//         </div>
//       </Container>
//     </header>
//   );
// };

// export default Header;



 import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

const fallbackTranslations = (name: string) => ({
  en: name,
  fr: name,
  de: name,
  es: name,
  ar: name,
  yo: name,
});

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navItems, setNavItems] = useState<any[]>([]);
  const { i18n } = useTranslation();

  // Pick correct language
  const getLabel = (item: any) => {
    const lang = i18n.language.split("-")[0] || "en";

    // If translations exist from API, use them
    if (item.translations && item.translations[lang]) {
      return item.translations[lang];
    }

    // Fallback: use category name
    return item.name;
  };

  // Fetch categories from API
  const loadCategories = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5001/api/categories");
      const data = await res.json();

      const filtered = data.filter(
        (item: any) => item.is_include_top_nav && item.status === "active"
      );

      // Attach fallback translations so component works
      const enriched = filtered.map((item: any) => ({
        ...item,
        translations: fallbackTranslations(item.name),
      }));

      setNavItems(enriched);
    } catch (error) {
      console.error("Failed to load categories", error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Quote button (static but translated)
  const quoteItem = {
    url: "/quote",
    translations: {
      en: "Get a FREE quote",
      fr: "Obtenir un devis GRATUIT",
      de: "Erhalten Sie ein KOSTENLOSES Angebot",
      es: "Obtén una cotización GRATIS",
      ar: "احصل على عرض مجاني",
      yo: "Gba agbasọ Ọfẹ",
    },
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-200">
      <div className="relative w-full max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Company Logo" className="w-25 " />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex flex-1 justify-end">
            <ul className="flex gap-[40px] items-center">
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

              {/* Quote Button */}
              <Link
                to={quoteItem.url}
                className="px-5 py-2 rounded-lg bg-[#ff8a00] text-sm font-semibold"
              >
                {getLabel(quoteItem)}
              </Link>

              {/* Lang Selector */}
              <LanguageSelector />
            </ul>
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
              <Link
                to="/quote"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-3 px-4 py-2 rounded-md bg-[#ff8a00] text-white"
              >
                {getLabel(quoteItem)}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
