import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";
import Footer from "../components/Footer";
import { API_BASE } from "../config/api";
import BookingForm from "../components/BookingForm";

interface VideoTestimonial {
  id: number;
  name: string;
  slug: string;
  editor_content: string;
}

const VideoTestimonialDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [item, setItem] = useState<VideoTestimonial | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItem();
  }, [slug]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/video-testimonials/${slug}`);
      setItem(res.data?.data);
    } catch (error) {
      console.error("Failed to load video testimonial", error);
      setItem(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading testimonial...
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Testimonial not found
      </div>
    );
  }

  return (
    <>
      <Header />

      <TreatmentHeader
        title={item.name}
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Video Testimonials", link: "/video-testimonials" },
          { label: item.name },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow-xl rounded-2xl p-8">
              <h1 className="text-2xl font-bold mb-6">{item.name}</h1>

              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: item.editor_content,
                }}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default VideoTestimonialDetailsPage;
