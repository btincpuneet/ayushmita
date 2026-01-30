import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import { API_BASE } from "../config/api";
import "../css/footer.css";

interface Testimonial {
  id: number;
  name: string;
  message: string;
  rating: number;
  image_url?: string;
  status: string;
  createdAt: string;
}

const ITEMS_PER_PAGE = 12;

const TestimonialPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/testimonials`);
      setTestimonials(res.data.data || []);
    } catch (error) {
      console.error("Failed to load testimonials", error);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);

  const paginatedTestimonials = testimonials.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className={index < rating ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    ));

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading testimonials...
      </div>
    );
  }

  return (
    <>
      <Header />

      <TreatmentHeader
        title="Testimonials"
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Testimonials" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 py-12">
        {testimonials.length === 0 ? (
          <div className="text-center text-gray-500">
            No testimonials available
          </div>
        ) : (
          <>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedTestimonials.map((item) => (
                <div
                  key={item.id}
                  className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="absolute -top-5 -left-5 w-12 h-12 bg-[#d98f1f] text-white flex items-center justify-center rounded-full text-2xl shadow-lg">
                    ❝
                  </div>

                  <div className="flex justify-center mb-4">
                    {item.image_url ? (
                      <img
                        src={`${API_BASE}${item?.image_url}`}
                        alt={item?.name}
                        title={item?.name}
                        className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-100"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                        {item.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center mb-4 text-xl">
                    {renderStars(item.rating)}
                  </div>

                  <p className="text-gray-600 text-center italic leading-relaxed mb-6">
                    “{item.message}”
                  </p>

                  <div className="border-t pt-4 text-center">
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {item.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            {testimonials.length > ITEMS_PER_PAGE && (
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

export default TestimonialPage;
