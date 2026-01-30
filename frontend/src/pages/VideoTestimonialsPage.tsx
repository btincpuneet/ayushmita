import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import { API_BASE } from "../config/api";

interface VideoTestimonial {
  id: number;
  name: string;
  slug: string;
  editor_content: string;
  status: string;
}

const ITEMS_PER_PAGE = 9;

const VideoTestimonialsPage: React.FC = () => {
  const [items, setItems] = useState<VideoTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_BASE}/api/video-testimonials/active`
      );
      setItems(res.data?.data || []);
    } catch (error) {
      console.error("Failed to load video testimonials", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const paginatedItems = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading video testimonials...
      </div>
    );
  }

  return (
    <>
      <Header />

      <TreatmentHeader
        title="Video Testimonials"
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Video Testimonials" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 py-12">
        {items.length === 0 ? (
          <div className="text-center text-gray-500">
            No video testimonials available
          </div>
        ) : (
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedItems.map((item) => (
                <a
                  key={item.id}
                  href={`/video-testimonials/${item.slug}`}
                  className="group bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 hover:shadow-2xl transition-all"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-[#d98f1f]">
                    {item.name}
                  </h3>

                  <div
                    className="text-sm text-gray-600 line-clamp-4"
                    dangerouslySetInnerHTML={{
                      __html: item.editor_content,
                    }}
                  />

                  <div className="mt-4 text-sm font-semibold text-[#d98f1f]">
                    View Details →
                  </div>
                </a>
              ))}
            </div>

            {items.length > ITEMS_PER_PAGE && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                maxVisiblePages={5}
              />
            )}
          </>
        )}
      </section>

      <Footer />
    </>
  );
};

export default VideoTestimonialsPage;
    