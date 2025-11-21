// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    interpolation: { escapeValue: false },

    resources: {
      en: {
        translation: {
          header: {
            find_doctors: "Find Doctors",
            hospitals: "Hospitals",
            medicines: "Medicines",
            surgeries: "Surgeries",
            software: "Software for Provider",
            facilities: "Facilities",
            get_quote: "Get a FREE quote"
          }
        }
      },

      fr: {
        translation: {
          header: {
            find_doctors: "Trouvez un médecin",
            hospitals: "Hôpitaux",
            medicines: "Médicaments",
            surgeries: "Chirurgies",
            software: "Logiciel pour fournisseurs",
            facilities: "Installations",
            get_quote: "Obtenir un devis GRATUIT"
          }
        }
      },

      de: {
        translation: {
          header: {
            find_doctors: "Ärzte finden",
            hospitals: "Krankenhäuser",
            medicines: "Medikamente",
            surgeries: "Chirurgien",
            software: "Software für Anbieter",
            facilities: "Einrichtungen",
            get_quote: "Erhalten Sie ein KOSTENLOSES Angebot"
          }
        }
      },

      es: {
        translation: {
          header: {
            find_doctors: "Buscar médicos",
            hospitals: "Hospitales",
            medicines: "Medicamentos",
            surgeries: "Cirugías",
            software: "Software para proveedores",
            facilities: "Instalaciones",
            get_quote: "Obtén una cotización GRATIS"
          }
        }
      },

      ar: {
        translation: {
          header: {
            find_doctors: "ابحث عن أطباء",
            hospitals: "المستشفيات",
            medicines: "الأدوية",
            surgeries: "العمليات الجراحية",
            software: "برنامج لمقدمي الخدمة",
            facilities: "المرافق",
            get_quote: "احصل على عرض مجاني"
          }
        }
      },

      yo: {
        translation: {
          header: {
            find_doctors: "Wa awọn dokita",
            hospitals: "Ile-iwosan",
            medicines: "Oògùn",
            surgeries: "Ìṣẹ́ abẹ",
            software: "Sọfitiwia fun Olùpèsè",
            facilities: "Awọn ohun elo",
            get_quote: "Gba agbasọ Ọfẹ"
          }
        }
      }
    }
  });

export default i18n;
