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

interface Treatment {
  id: number;
  name: string;
  slug: string;
  image: string;
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
  image: string;
  short_description: string;
  description_html: string;
  treatments: Treatment[];
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
}

const DiseaseDetailsPage = () => {
  const { slug } = useParams();
  const [disease, setDisease] = useState<Disease | null>(null);
  const [loading, setLoading] = useState(true);
  const [globalSEO, setGlobalSEO] = useState<GlobalSEO | null>(null);

  const decodeHtml = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const fetchDisease = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/diseases/${slug}`);
      if (res.data?.success) {
        setDisease(res.data.disease);
      }
      setLoading(false);
    } catch (err) {
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

  UseSeo(seoTitle, seoDescription, seoKeywords);
  if (loading)
    return <p className="text-center py-20 text-lg font-semibold">Loading...</p>;

  if (!disease) return <p className="text-center py-20">Disease Not Found</p>;

  return (
    <>

      <div className="bg-[#f8f9fa]">
        <Header />
        <div className="w-full ">
          <TreatmentHeader
            title={disease?.name}
            breadcrumbs={[
              { label: "Home" , link: "/" },
              { label: disease?.name || "Treatment", link: "" },
            ]}
          />
        </div>

        <div className="container-fluid bg-white">
          <div className="max-w-7xl mx-auto px-4 mt-10 bg-white">
            <div className="flex flex-col-reverse lg:flex-row items-start ">
              <div className="w-full lg:w-1/2 flex justify-center">
                <img
                  src={
                    disease?.image
                      ? `${API_BASE}${disease.image}`
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s"
                  }
                  alt={`${disease.name} Disease`}
                  title={`${disease.name} Disease`}
                  className="rounded-xl w-full max-w-[370px] h-[294px] object-cover"
                />

              </div>

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
                <div className="w-full h-24 border overflow-hidden rounded-lg">
                  <img
                    src={
                      t.image
                        ? `${API_BASE}${t.image}`
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s"
                    }
                    alt={`${t.name} Treatment`}
                    title={`${t.name} Treatment`}
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
          className="cms-content prose max-w-none"
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
      </div>
    </>

  );
};

export default DiseaseDetailsPage;
