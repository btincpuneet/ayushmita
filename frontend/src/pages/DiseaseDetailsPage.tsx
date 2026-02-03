import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ConsultationForm from "../components/ConsulatForm";
import TestimonialSlider from "../components/TestimonialSlider";
import BlogSection from "../components/BlogSection";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";
import "../css/common.css";
import "../css/doctor.css";
import UseSeo from "../hooks/useSeo";
import ModalAppointment from "../components/Treatment/ModalAppointment";
import { NotFound } from "./NotFound";

interface Treatment {
  id: number;
  name: string;
  slug: string;
  image?: string | null;
  image_alt?: string | null;
  image_title?: string | null;
}

interface GlobalSEO {
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
}

interface Disease {
  id: number;
  name: string;
  slug: string;
  image?: string | null;
  image_alt?: string | null;
  image_title?: string | null;
  short_description: string;
  description_html: string;
  treatments: Treatment[];
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  canonical_url?: string
}

const DiseaseDetailsPage = () => {
  const { slug } = useParams();
  const [disease, setDisease] = useState<Disease | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [globalSEO, setGlobalSEO] = useState<GlobalSEO | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [whatsAppNumber, setWhatsAppNumber] = useState<string>("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/global-settings`);
        if (res.data?.success) {
          setWhatsAppNumber(res.data.data.whatsapp_number);
        }
      } catch (err) {
        console.error("WhatsApp fetch failed", err);
      }
    };

    fetchSettings();
  }, []);


  const fetchDisease = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/diseases/${slug}`);
      if (res.data?.success) {
        setDisease(res.data.disease);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(true);
      setLoading(false);
    }
  };
  const fetchGlobalSEO = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/global-settings`);

      if (res.data?.success && res.data.data) {
        setGlobalSEO({
          seo_title: res.data.data.seo_title,
          seo_description: res.data.data.seo_description,
          seo_keywords: res.data.data.seo_keywords,
        });
      }
    } catch (error) {
      console.error("Failed to fetch global SEO", error);
    }
  };

  useEffect(() => {
    fetchDisease();
    fetchGlobalSEO();

  }, [slug]);


  const seoTitle =
    disease?.seo_title ||
    globalSEO?.seo_title ||
    "Best Hospital";

  const seoDescription =
    disease?.seo_description ||
    globalSEO?.seo_description ||
    "Best healthcare services";

  const seoKeywords =
    disease?.seo_keywords ||
    globalSEO?.seo_keywords ||
    "hospital, healthcare";
  const canonicalUrl =
    disease?.canonical_url ||
    `${window.location.origin}/diseases/${disease?.slug}`;

  UseSeo(seoTitle, seoDescription, seoKeywords, canonicalUrl);

  if (loading)
    return <p className="text-center py-20 text-lg font-semibold">Loading...</p>;

  if (error || !disease) return <NotFound />;
  const diseaseImageAlt =
    disease.image_alt ||
    `${disease.name} Disease`;

  const diseaseImageTitle =
    disease.image_title ||
    `${disease.name} Disease`;

  return (
    <>

      <div className="bg-[#f8f9fa]">
        <Header />
        <div className="w-full ">
          <TreatmentHeader
            title={disease?.name}
            breadcrumbs={[
              { label: "Home", link: "/" },
              { label: disease?.name || "Treatment", link: "" },
            ]}
          />
        </div>

        <div className="container-fluid bg-white">
          <div className="max-w-7xl mx-auto px-4 mt-10 bg-white">
            <div className="flex gap-10 flex-col-reverse lg:flex-row items-start ">
              <div >
                <img
                  src={
                    disease?.image
                      ? `${API_BASE}${disease.image}`
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s"
                  }
                  alt={diseaseImageAlt}
                  title={diseaseImageTitle}
                  className="rounded-xl w-full max-w-[370px] h-[294px] object-cover"
                />


              </div>
              <div className="btn-sec-details-pge">
                <div className="w-full lg:w-[100%] ">
                  <p
                    style={{
                      fontFamily: "Ubuntu",
                      fontWeight: 300,
                      fontStyle: "normal",
                      fontSize: "16px",
                      lineHeight: "27px",
                      letterSpacing: "0%",
                    }}
                  >
                    {disease?.short_description}
                  </p>
                </div>
                <div className="flex gap-4 mt-6 details-pgs-btn-2">
                  <button
                    onClick={() => setIsModalOpen(true)}
                   className="px-6 py-3 bg-[#F0A324] rounded-lg "
                    style={{
                      fontFamily: "Ubuntu, sans-serif",
                      fontWeight: 500,
                      fontStyle: "normal",
                      fontSize: "16px",
                      lineHeight: "100%",
                      letterSpacing: "2%",
                    }}

                  >
                    Book Appointment
                  </button>

                  {whatsAppNumber && (
                    <a
                      href={`https://wa.me/91${whatsAppNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button
                className="px-6 py-3 bg-green-500 flex gap-3 text-white rounded-lg"
                style={{
                  fontFamily: "Ubuntu, sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "2%",
                  width:"100%",
                }}
              >
                <span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 0C10.866 0 14 3.134 14 7c0 3.866-3.134 7-7 7a6.96 6.96 0 0 1-3.52-.95L0 14l.95-3.52A6.96 6.96 0 0 1 0 7C0 3.134 3.134 0 7 0Z"
                      fill="white"
                    />
                  </svg>
                </span>
                Chat Now
              </button>
                    </a>
                  )}
                </div>
              </div>


            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-16 mb-16 desese-overview-sec">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {disease.treatments.map((t) => (
              <Link
                key={t.id}
                to={`/treatment-details/${t.slug}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-2 flex flex-col items-center text-center"
              >
                <div className="w-full h-24  overflow-hidden rounded-lg">
                  <img
                    src={
                      t.image
                        ? `${API_BASE}${t.image}`
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s"
                    }
                    alt={
                      t.image_alt ||
                      `${t.name} Treatment`
                    }
                    title={
                      t.image_title ||
                      `${t.name} Treatment`
                    }
                    className="w-full h-full object-cover rounded-lg"
                  />


                </div>

                <p
                  className="mt-3"
                  style={{
                    fontFamily: "Ubuntu",
                    fontWeight: 500,
                    fontStyle: "normal",
                    fontSize: "16px",
                    lineHeight: "27px",
                    letterSpacing: "0%",
                    textAlign: "center",
                  }}
                >
                  {t.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div
          className="cms-content container prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: disease?.description_html || "",
          }}
        />

        <div>
          <ConsultationForm />
        </div>

        <TestimonialSlider />
        <BlogSection diseaseId={disease.id} />

        <Footer />
        <ModalAppointment
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

      </div>
    </>

  );
};

export default DiseaseDetailsPage;
