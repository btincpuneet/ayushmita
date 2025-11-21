import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type LanguageOption = { language: string; code: string; flag: string };

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { language: "English", code: "en", flag: "https://flagcdn.com/w40/us.png" },
  { language: "French", code: "fr", flag: "https://flagcdn.com/w40/fr.png" },
  { language: "German", code: "de", flag: "https://flagcdn.com/w40/de.png" },
  { language: "Spanish", code: "es", flag: "https://flagcdn.com/w40/es.png" },
  // Arabic (use Saudi or Egypt flag as a generic arabic locale)
  { language: "Arabic", code: "ar", flag: "https://flagcdn.com/w40/sa.png" },
  // Yoruba — use Nigeria flag (most Yoruba speakers are in Nigeria)
  { language: "Yoruba", code: "yo", flag: "https://flagcdn.com/w40/ng.png" },
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(
    LANGUAGE_OPTIONS.find((l) => l.code === i18n.language) ?? LANGUAGE_OPTIONS[0]
  );
  const ref = useRef<HTMLDivElement | null>(null);

  // keep body dir updated (ltr / rtl)
  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n.language, i18n]);

  // keep selected in-sync if language changes elsewhere
  useEffect(() => {
    const opt = LANGUAGE_OPTIONS.find((l) => l.code === i18n.language);
    if (opt) setSelected(opt);
  }, [i18n.language]);

  // close on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const changeLanguage = (code: string) => {
    setOpen(false);
    i18n.changeLanguage(code);
    const opt = LANGUAGE_OPTIONS.find((l) => l.code === code);
    if (opt) setSelected(opt);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <img src={selected.flag} alt={selected.language} className="w-5 h-4 object-cover rounded-sm" />
        <span className="hidden sm:inline">{selected.language}</span>
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06-.02L10 10.67l3.71-3.48a.75.75 0 111.04 1.08l-4.25 4a.75.75 0 01-1.04 0l-4.25-4a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-activedescendant={selected.code}
          className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden"
        >
          {LANGUAGE_OPTIONS.map((opt) => (
            <li
              key={opt.code}
              id={opt.code}
              role="option"
              aria-selected={opt.code === selected.code}
              onClick={() => changeLanguage(opt.code)}
              className={`flex items-center gap-2 px-3 py-2 cursor-pointer text-sm hover:bg-gray-50 ${
                opt.code === selected.code ? "bg-gray-50 font-semibold" : ""
              }`}
            >
              <img src={opt.flag} alt={opt.language} className="w-5 h-4 object-cover rounded-sm" />
              <span>{opt.language}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
