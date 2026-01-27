import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";
import BreadCrumb from "../components/Treatment/BreadCrumb";
import useSeo from '../hooks/useSeo';

interface Treatment {
  id: number;
  name: string;
  slug: string;
}

interface Disease {
  id: number;
  name: string;
  slug: string;
  image: string;
  short_description: string;
  description_html: string;
  treatments: Treatment[];
}
interface GlobalSEO {
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
}

export default function TreatmentsLandingPage() {
  const navigate = useNavigate();
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Cancer");
  const [globalSEO, setGlobalSEO] = useState<GlobalSEO | null>(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/diseases`);
      if (res.data?.success) {
        setDiseases(res.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("API Error:", error);
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
    fetchData();
    fetchGlobalSEO();
  }, []);

  const handleNavigate = (slug: string) => {
    navigate(`/treatment-details/${slug}`);
  };

  const handleDiseaseNavigate = (slug: string) => {
    navigate(`/disease/${slug}`);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    const match = diseases.find(
      (d) => d.name.toLowerCase() === tab.toLowerCase()
    );
    if (match && sectionRefs.current[match.slug]) {
      sectionRefs.current[match.slug]?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const seoTitle =
    globalSEO?.seo_title || "Best Hospital";

  const seoDescription =
    globalSEO?.seo_description || "Best healthcare services";

  const seoKeywords =
    globalSEO?.seo_keywords || "hospital, healthcare";

  useSeo(seoTitle, seoDescription, seoKeywords);

  useEffect(() => {
    if (!diseases.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          const slug = visible.target.getAttribute("data-slug");
          const found = diseases.find((d) => d.slug === slug);
          if (found) setActiveTab(found.name);
        }
      },
      { threshold: 0.4 }
    );

    Object.values(sectionRefs.current).forEach((sec) => {
      if (sec) observer.observe(sec);
    });

    return () => observer.disconnect();
  }, [diseases]);

  return (
    <div>
      <Header />
      <TreatmentHeader title="Treatments In India at Low Cost" breadcrumbs={[
        { label: "Home", link: "/" },
        { label: "Treatments" },
      ]} />

      <BreadCrumb onTabClick={handleTabClick} activeTab={activeTab} />

      <div className="container-fluid">
        {loading ? (
          <p className="text-center text-lg font-semibold py-20">Loading...</p>
        ) : (
          diseases.map((disease, index) => (
            <section
              key={disease.id}
              ref={(el) => (sectionRefs.current[disease.slug] = el)}
              data-slug={disease.slug}
              className="w-full bg-white py-7 trreatment-page-listing sec"
            >
              <div
                className={`${disease.slug === "cardiology"
                  ? "w-full px-4 middel-sections-mains-universe"
                  : "max-w-7xl mx-auto middel-sections-mains"
                  }`}
              >
                <div
                  className={` w-7xl  py-10 m-auto flex gap-6 flex-col-reverse lg:flex-row items-start ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                    }`}
                >
                  <img
                    src={
                      disease.image
                        ? `${API_BASE}${disease.image}`
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s"
                    }
                    alt={disease.name ? `${disease.name} Treatment in India` : "Medical Treatment"}
                    title={disease.name ? `${disease.name} Treatment` : "Medical Treatment"}
                    className="rounded-xl object-cover treatment-list-image"
                    loading="lazy"
                  />

                  {/* Content */}
                  <div className="w-full">
                    <h2
                      className="heading-main cursor-pointer"
                      style={{
                        fontFamily: "Ubuntu",
                        fontWeight: 700,
                        fontSize: "32px",
                        lineHeight: "100%",
                      }}
                      onClick={() => handleDiseaseNavigate(disease.slug)}
                    >
                      {disease.name}
                    </h2>

                    <span
                      style={{
                        width: "32px",
                        height: "4px",
                        background: "linear-gradient(to right, #f1a339, #7ac142)",
                        borderRadius: "5px",
                        display: "inline-block",
                        margin: "12px 0",
                      }}
                    />

                    {/* Treatments */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6">
                      {disease.treatments.map((treat) => (
                        <p
                          key={treat.id}
                          onClick={() => handleNavigate(treat.slug)}
                          className="cursor-pointer hover:text-orange-500 text-gray-800 text-[14px]"
                          style={{
                            fontFamily: "Ubuntu",
                            lineHeight: "30px",
                          }}
                        >
                          <span className="text-[18px] mx-2">•</span>
                          {treat.name}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

          ))
        )}
      </div>


      <Footer />
    </div>
  );
}
