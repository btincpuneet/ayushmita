import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingForm from "../components/BookingForm";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";

import useSeo from "../hooks/useSeo";
import { API_BASE } from "../config/api";
import { NotFound } from "./NotFound";

interface NewsEvent {
  title: string;
  image: string | null;
  editor_content: string;
  slug?: string;
}

const NewsEventDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<NewsEvent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (slug) fetchEvent();
  }, [slug]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/news-events/${slug}`);
      setEvent(res.data?.data);
    } catch (error) {
      console.error("Failed to fetch event details", error);
      setError(true);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  /* =====================
     ✅ DYNAMIC SEO
  ====================== */

  const seoTitle = event?.title
    ? `${event.title} | News & Events`
    : "News & Events";

  const seoDescription =
    event?.editor_content
      ?.replace(/<[^>]+>/g, "")
      ?.substring(0, 160) ||
    "Read the latest medical news, hospital events, and healthcare updates.";

  const seoKeywords = event?.title
    ? `${event.title}, medical news, hospital events`
    : "medical news, healthcare events";

  const canonicalUrl = event?.slug
    ? `${window.location.origin}/news-events/${event.slug}`
    : window.location.href;

  useSeo(seoTitle, seoDescription, seoKeywords, canonicalUrl);

  /* ===================== */

  if (loading) {
    return (
      <div className="py-24 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (error || !event) {
    return <NotFound />;
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
          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <BookingForm />
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-2">
            {event.image && (
              <img
                src={`${API_BASE}/${event.image}`}
                alt={event.title}
                className="w-full max-h-[420px] object-cover rounded-2xl mb-8"
              />
            )}

            <div
              className="cms-content prose prose-lg max-w-none"
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
