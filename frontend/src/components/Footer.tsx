import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:5001";
import "../css/footer.css";

const Footer: React.FC = () => {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    fetchFooter();
  }, []);

  const fetchFooter = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/api/footer/active/list`
      );

      setHtml(res.data?.data?.content_html || "");
    } catch (error) {
      console.error("Footer fetch error:", error);
    }
  };

  if (!html) return null;

  return (
    <footer
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Footer;
