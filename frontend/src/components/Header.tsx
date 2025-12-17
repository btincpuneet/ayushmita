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

  const getLabel = (item: any) => {
    const lang = i18n.language.split("-")[0] || "en";

    if (item.translations && item.translations[lang]) {
      return item.translations[lang];
    }

    return item.name;
  };

  const loadCategories = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5001/api/categories");
      const data = await res.json();

      const filtered = data.filter(
        (item: any) => item.is_include_top_nav && item.status === "active"
      );

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

  const quoteItem = {
    url: "/",
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
        <div className="h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Company Logo" className="w-25 " />
          </Link>

          <div className="hidden lg:flex flex-1 justify-end">
            <ul className="flex gap-[40px] items-center">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.url}
                    style={{
  fontFamily: "Ubuntu, sans-serif",
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "14px",
  lineHeight: "100%",
  letterSpacing: "0%",
}}

                  >
                    {getLabel(item)}
                  </Link>
                </li>
              ))}

              <Link
                to={quoteItem.url}
                className="px-5 py-3 rounded-lg bg-[#F0A324]"
                style={{
  fontFamily: "Poppins, sans-serif",
  fontWeight: 500,
  fontStyle: "normal",
  fontSize: "14px",
  lineHeight: "100%",
  letterSpacing: "2%",
}}

              >
                {getLabel(quoteItem)}
              </Link>

              <LanguageSelector />
            </ul>
          </div>

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
