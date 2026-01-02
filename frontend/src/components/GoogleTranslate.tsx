import React, { useEffect } from "react";

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    const containerId = "google_translate_element";

    function initWidget() {
      const container = document.getElementById(containerId);
      if (!container || container.childNodes.length > 0) return;

      try {
        // @ts-ignore
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "hi,en,fr,de,ar,zh,ja,ru,pt,es,yo",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          containerId
        );
      } catch (e) {
        console.warn("Google Translate init error", e);
      }
    }

    // Google callback
    // @ts-ignore
    window.googleTranslateElementInit = initWidget;

    // Load script once
    if (!document.querySelector('script[src*="translate_a/element.js"]')) {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      initWidget();
    }
  }, []); // ✅ ONLY ONCE

  return <div id="google_translate_element" />;
};

export default GoogleTranslate;
