import { useEffect } from "react";

const useSeo = (
  title?: string,
  description?: string,
  keywords?: string
): void => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      let metaDescriptionTag = document.querySelector<HTMLMetaElement>(
        'meta[name="description"]'
      );

      if (!metaDescriptionTag) {
        metaDescriptionTag = document.createElement("meta");
        metaDescriptionTag.name = "description";
        document.head.appendChild(metaDescriptionTag);
      }

      metaDescriptionTag.content = description;
    }

    if (keywords) {
      let metaKeywordsTag = document.querySelector<HTMLMetaElement>(
        'meta[name="keywords"]'
      );

      if (!metaKeywordsTag) {
        metaKeywordsTag = document.createElement("meta");
        metaKeywordsTag.name = "keywords";
        document.head.appendChild(metaKeywordsTag);
      }

      metaKeywordsTag.content = keywords;
    }
  }, [title, description, keywords]);
};

export default useSeo;
