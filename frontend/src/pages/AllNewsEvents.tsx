import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import BookingForm from "../components/BookingForm";

import { API_BASE } from "../config/api";

interface NewsEvent {
  id: number;
  title: string;
  slug: string;
  image?: string | null;
}

const ITEMS_PER_PAGE = 6;

const AllNewsEvents: React.FC = () => {
  const [items, setItems] = useState<NewsEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/news-events/active`);
      setItems(res.data?.data || []);
    } catch (error) {
      console.error("Failed to load news & events", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const paginatedItems = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <>
      <Header />

      <TreatmentHeader
        title="News & Events"
        breadcrumbs={[{ label: "Home", link: "/" }, { label: "News & Events" }]}
      />

      <section className="max-w-7xl mx-auto px-4 py-14">
        {loading ? (
          <div className="text-center py-24 text-gray-500">
            Loading news & events...
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-24 text-gray-500">
            No news or events available
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              {paginatedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-4"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    {/* LEFT IMAGE */}
                    {item.image && (
                      <img
                        src={`${API_BASE}/${item.image}`}
                        alt={item.title}
                        className="w-full md:w-56 h-40 object-cover rounded-xl"
                      />
                    )}

                    {/* RIGHT CONTENT */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {item.title}
                      </h3>

                      <p className="text-gray-600 line-clamp-3 mb-5">
                        Hair transplantation in Turkey has become a top choice
                        for people who want effective, affordable, and reliable
                        hair restoration...
                      </p>

                      <Link
                        to={`/news-events/${item.slug}`}
                        className="text-orange-500 font-medium underline-offset-4 hover:underline hover:text-orange-600"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {items.length > ITEMS_PER_PAGE && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  maxVisiblePages={5}
                />
              )}
            </div>

            {/* RIGHT: BOOKING FORM */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <BookingForm />
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default AllNewsEvents;
