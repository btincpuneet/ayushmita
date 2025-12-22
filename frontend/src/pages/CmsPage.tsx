import React from "react"; 
import{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://127.0.0.1:5001/api";

export default function CmsPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPage();
  }, [slug]);

  const fetchPage = async () => {
    try {
      const res = await axios.get(`${API_BASE}/pages/${slug}`);
      setPage(res.data.data);
    } catch (err) {
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

  if (!page) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500">
        Page not found
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#fdf8e6] py-10 text-center">
        <h1 className="text-3xl font-semibold">{page.title}</h1>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div
          className="cms-content prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: page.content_html,
          }}
        />
      </section>
    </>
  );
}
