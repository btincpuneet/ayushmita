import { useEffect } from "react";
import i18n from "i18next";

const RTL_LANGS = ["ar", "ur", "fa", "he"];

export const useSyncRTLWithGoogleTranslate = () => {
  useEffect(() => {
    const syncDir = () => {
      const match = document.cookie.match(/googtrans=\/\w+\/(\w+)/);
      const googleLang = match ? match[1] : null;

      const lang = googleLang || i18n.language || "en";
      const isRTL = RTL_LANGS.includes(lang);

      document.documentElement.dir = isRTL ? "rtl" : "ltr";
      document.body.dir = isRTL ? "rtl" : "ltr";
      document.body.classList.toggle("rtl", isRTL);
    };

    syncDir();
    const interval = setInterval(syncDir, 700);
    return () => clearInterval(interval);
  }, []);
};
