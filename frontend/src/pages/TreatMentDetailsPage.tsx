import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config/api";
import UseSeo from "../hooks/useSeo";

import "../css/common.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ModalAppointment from "../components/Treatment/ModalAppointment";
import BlogSection from "../components/BlogSection";
import TestimonialSlider from "../components/TestimonialSlider";
import ConsultationForm from "../components/ConsulatForm";
import OtherServices from "../components/OtherService";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";

export default function TreatmentDetailsPage() {
  const { slug } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [treatment, setTreatment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [whatsAppNumber, setWhatsAppNumber] = useState<string>("");
  const fetchGlobalSettings = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/global-settings`);
      if (res.data?.success) {
        setWhatsAppNumber(res.data.data.whatsapp_number);
      }
    } catch (error) {
      console.error("Failed to fetch WhatsApp number", error);
    }
  };


  const fetchTreatment = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/api/treatments/single/${slug}`
      );
      console.log("resss", res.data.treatment?.disease.name)
      if (res.data?.success) setTreatment(res.data.treatment);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreatment();
    fetchGlobalSettings();

  }, [slug]);

  const seoTitle =
    treatment?.seo_title ||
    `${treatment?.name || "Treatment"} Treatment | Best Hospital`;

  const seoDescription =
    treatment?.seo_description ||
    treatment?.short_description?.replace(/<[^>]+>/g, "") ||
    "Advanced medical treatment with experienced specialists.";

  const seoKeywords =
    treatment?.seo_keywords ||
    `${treatment?.name || "treatment"}, healthcare, hospital`;

  UseSeo(seoTitle, seoDescription, seoKeywords);

  if (loading) return <p className="p-6 text-xl">Loading...</p>;
  if (!treatment) return <p className="p-6 text-xl">Treatment not found</p>;

  return (
    <div className="bg-white">
      <Header />

      <div className="w-full">
        <TreatmentHeader
          title={treatment?.name || "Treatment"}
          breadcrumbs={[
            {
              label: "Home",
              link: "/",
            },
            {
              label: treatment?.disease?.name || "Treatments",
              link: treatment?.disease
                ? `/disease/${treatment.disease.slug}`
                : "/treatments",
            },
            {
              label: treatment?.name || "Treatment",
              link: "",
            },
          ]}
        />
      </div>


      <div className="max-w-7xl mx-auto px-4 py-12">

        <div className="flex flex-col-reverse lg:flex-row items-center items-start mb-20">
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={`${API_BASE}${treatment.image}`}
              alt={treatment.name}
              title={treatment.name}

              className="rounded-xl w-full max-w-[370px] h-[294px] object-cover"
            />
          </div>

          <div className="w-full lg:w-[100%]">
            <div
              className="cms-content prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: treatment?.short_description || "",
              }}
            />

            <div className="flex gap-4 mt-8 treat-ment-details-btns">
              <button
                onClick={() => setOpenModal(true)}
                className="bg-[#F0A324] hover:bg-orange-500 py-[12px] px-[24px] rounded-lg transition"
                style={{
                  fontFamily: "Ubuntu",
                  fontWeight: 500,
                  fontStyle: "normal",
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "2%",
                }}
              >
                Book An Appointment
              </button>


              {whatsAppNumber && (
                <a
                  href={`https://wa.me/91${whatsAppNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    className="bg-[#25CB68] hover:bg-green-600 text-white px-[24px] py-[12px] rounded-lg transition"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontFamily: "Ubuntu",
                      fontWeight: 500,
                      fontSize: "16px",
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
        <div
          className="cms-content prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: treatment?.description_html || "",
          }}
        />

      </div>

      <OtherServices diseaseId={treatment.disease_id} currentSlug={treatment.slug} />
      <ConsultationForm />
      <TestimonialSlider />
      <BlogSection
        diseaseId={treatment.disease_id}
        treatmentId={treatment?.id || 0}
      />
      <Footer />

      <ModalAppointment
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}
