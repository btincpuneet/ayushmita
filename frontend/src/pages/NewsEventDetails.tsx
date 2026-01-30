import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingForm from "../components/BookingForm";

import { API_BASE } from "../config/api";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";

interface NewsEvent {
  title: string;
  image: string | null;
  editor_content: string;
}

const NewsEventDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<NewsEvent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (slug) fetchEvent();
  }, [slug]);

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/news-events/${slug}`);
      setEvent(res.data?.data);
    } catch (error) {
      console.error("Failed to fetch event details", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="py-24 text-center text-gray-500">
        News/Event not found
      </div>
    );
  }

  return (
    <>
      <Header />

      <TreatmentHeader
        title={event.title}
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "News & Events", link: "/news-events" },
          { label: event.title },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <BookingForm />
            </div>
          </div>

          <div className="lg:col-span-2">
            {event.image && (
              <img
                src={`${API_BASE}/${event.image}`}
                alt={event.title}
                className="w-full max-h-[420px] object-cover rounded-2xl mb-8"
              />
            )}

            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{
                __html: event.editor_content,
              }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default NewsEventDetails;
