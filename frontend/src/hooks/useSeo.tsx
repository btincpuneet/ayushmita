import { useEffect } from "react";

const useSeo = (
  title?: string,
  description?: string,
  keywords?: string,
  canonicalUrl?: string
): void => {
  useEffect(() => {
    // Title
    if (title) {
      document.title = title;
    }

    // Meta Description
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

    // Meta Keywords
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

    // Canonical URL
    if (canonicalUrl) {
      let canonicalLink = document.querySelector<HTMLLinkElement>(
        'link[rel="canonical"]'
      );

      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.rel = "canonical";
        document.head.appendChild(canonicalLink);
      }

      canonicalLink.href = canonicalUrl;
    }
  }, [title, description, keywords, canonicalUrl]);
};

export default useSeo;
