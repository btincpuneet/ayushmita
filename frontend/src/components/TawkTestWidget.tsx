import { useEffect } from "react";

const TawkTestWidget: React.FC = () => {
  useEffect(() => {
    // Prevent loading the script multiple times
    if ((window as any).Tawk_API) return;

    (window as any).Tawk_API = {};
    (window as any).Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/6968bced0f26dd197d659462/1jf0i40ar";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);
  }, []);

  return null;
};

export default TawkTestWidget;
