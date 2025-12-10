import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Treatment/TreatmentHeader";
import TreatmentTabs from "../components/Treatment/BreadCrumb";

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

export default function TreatmentsLandingPage() {
  const navigate = useNavigate();
  const cancerRef = useRef<HTMLDivElement | null>(null);

  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5001/api/diseases");
      if (res.data?.success) {
        setDiseases(res.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("API Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigate = (slug: string) => {
    navigate(`/treatment-details/${slug}`);
  };
  const handleDiseaseNavigate = (slug: string) => {
    navigate(`/disease/${slug}`);
  };


  const handleTabClick = (tab: string) => {
    if (tab.toLowerCase() === "cancer" && cancerRef.current) {
      cancerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Header />
      <Breadcrumb title="Treatments In India at Low Cost" />
      <TreatmentTabs onTabClick={handleTabClick} />

      <div className="w-full bg-white py-14">
        <div className="max-w-7xl mx-auto px-4">

          {loading ? (
            <p className="text-center text-lg font-semibold">Loading...</p>
          ) : (
            diseases.map((disease) => (
              <div
                key={disease.id}
                ref={disease.slug === "cancer" ? cancerRef : null}
                className="mb-20"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 items-start">

                  <div className="flex justify-center lg:justify-start">
                    <img
                      src={`http://127.0.0.1:5001${disease.image}`}
                      alt={disease.name}
                      className="rounded-xl w-full max-w-[420px] object-cover shadow-md"
                    />

                  </div>

                  <div>
                    <h2
                      className="text-3xl font-bold mb-3 cursor-pointer hover:text-orange-500"
                      onClick={() => handleDiseaseNavigate(disease.slug)}
                    >
                      {disease.name}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {disease.treatments.map((treat) => (
                        <p
                          key={treat.id}
                          onClick={() => handleNavigate(treat.slug)}
                          className="cursor-pointer hover:text-orange-500 text-gray-700"
                        >
                          {treat.name}
                        </p>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
