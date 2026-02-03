import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";
import Footer from "../components/Footer";
import "../css/aboutUs.css";
import { API_BASE } from "../config/api";
import "../css/footer.css";
import { NotFound } from "./NotFound";


interface CmsPageData {
  id?: number;
  title: string;
  slug?: string;
  content_html: string;
  status?: string;
}

const CmsPage: React.FC = () => {
  const { slug } = useParams();
  const [page, setPage] = useState<CmsPageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchPage();
  }, [slug]);

  const fetchPage = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await axios.get<{ data: CmsPageData }>(
        `${API_BASE}/api/pages/${slug}`
      );
      setPage(res.data.data);
    } catch (error) {
      console.error(error);
      setError(true);
      setPage(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading page...
      </div>
    );
  }

  if (error || !page) {
    return <NotFound />;
  }

  return (
    <>
      <Header />

      <TreatmentHeader
        title={page.title}
        breadcrumbs={[
          { label: "Home" , link: "/"},
          { label: "About Us" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div
          className="cms-content prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content_html }}
        />
      </section>

      <Footer />
    </>
  );
};

export default CmsPage;
