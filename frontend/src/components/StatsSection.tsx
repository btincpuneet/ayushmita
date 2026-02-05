
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/aboutUs.css";
import "../css/footer.css";
import { API_BASE } from "../config/api";

interface CmsPageData {
  id?: number;
  title: string;
  slug?: string;
  content_html: string;
  status?: string;
}

const StatsSection: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();

  const [page, setPage] = useState<CmsPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);

        const endpoint = slug
          ? `${API_BASE}/api/pages/${slug}`
          : `${API_BASE}/api/pages/family-stats`;

        const res = await axios.get<{ data: CmsPageData }>(endpoint);

        setPage(res.data.data);
      } catch (error) {
        console.error("Failed to load CMS page:", error);
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading page...
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500">
        Page not found
      </div>
    );
  }

  return (
    <section>
      <div
        className="cms-content prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content_html }}
      />
    </section>
  );
};

export default StatsSection;