import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../components/Treatment/TreatmentHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ConsultationForm from "../components/ConsulatForm";
import TestimonialSlider from "../components/TestimonialSlider";
import BlogSection from "../components/BlogSection";

interface Treatment {
  id: number;
  name: string;
  slug: string;
  image: string;
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

const DiseaseDetailsPage = () => {
  const { slug } = useParams();
  const [disease, setDisease] = useState<Disease | null>(null);
  const [loading, setLoading] = useState(true);

  const decodeHtml = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const fetchDisease = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:5001/api/diseases/${slug}`);
      if (res.data?.success) {
        setDisease(res.data.disease);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisease();
  }, [slug]);

  if (loading)
    return <p className="text-center py-20 text-lg font-semibold">Loading...</p>;

  if (!disease) return <p className="text-center py-20">Disease Not Found</p>;

  return (
    <div className="bg-[#f8f9fa] pb-20">
      <Header />

      <div className="w-full">
        <Breadcrumb title={disease?.name} />
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="flex flex-col-reverse lg:flex-row items-center ">
          <div class="w-full lg:w-1/2 flex justify-center">
            <img
              src={`http://127.0.0.1:5001${disease.image}`}
              alt={disease.name}
              className="rounded-xl w-full max-w-[370px] h-[294px] object-cover"
            />
          </div>

<<<<<<< HEAD
          <div>
            <h2 className="text-2xl font-semibold mb-3">Overview</h2>
            {/* <div dangerouslySetInnerHTML={{ __html: disease.description_html }} /> */}

            <p className="text-gray-700 leading-relaxed mb-4">
=======
          <div className="w-full lg:w-[100%]">
            <h2
              style={{
                fontFamily: "Ubuntu",
                fontWeight: 700,
                fontStyle: "bold",
                fontSize: "28px",
                lineHeight: "100%",
                letterSpacing: "0%"
              }}
            >
              Overview
            </h2>
            <span
              style={{
                width: "32px",
                height: "4px",
                background: "linear-gradient(to right, #f1a339, #7ac142)",
                borderRadius: "5px",
                display: "inline-block"
              }}
            ></span>

            <p
              className="mb-4"
              style={{
                fontFamily: "Ubuntu",
                fontWeight: 300,
                fontStyle: "normal",
                fontSize: "16px",
                lineHeight: "27px",
                letterSpacing: "0%",
              }}
            >
>>>>>>> 6bda36e (changes in design)
              Having cancer is one of the biggest fears for humans because most people lose their lives to cancer. In cancer disease, the body develops abnormal cells that spread to other parts of the body. When a patient suffers from cancer, the patient experiences various symptoms including unexplained weight loss, fatigue, severe pain, and many more. So, patients must seek cancer treatment.
              We know that receiving a cancer diagnosis can be enormous. So, if people face these diseases, they have to choose the best healthcare provider. At Aushmita, we have partnered with the best cancer treatment hospitals and oncologists around the world. Our medical network team provides cancer treatment options according to the patient’s needs.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {disease.treatments.map((t) => (
            <Link
              key={t.id}
              to={`/treatment-details/${t.slug}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-2 flex flex-col items-center text-center"
            >
              <div className="w-full h-24 overflow-hidden rounded-lg">
                <img
                  src={`http://127.0.0.1:5001${t.image}`}
                  alt={t.name}
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
      <div className="max-w-7xl mx-auto px-4 mt-16">
        <h2 className="text-[22px] font-semibold mb-3">Top Destination for Cancer Treatment Abroad</h2>
        <p className="text-gray-700 leading-7 mb-4">
          We work with top hospitals and cancer centers in the world. Here is the list of the best countries for cancer treatments:
        </p>

        <ul className="text-gray-700 leading-7 space-y-2">
          <li>• India: India is famous for advanced treatments at low rates, with high standards of medical equipment.</li>
          <li>• Thailand: Prominent hospitals providing excellent oncology services.</li>
          <li>• Turkey: Growing into a medical hub with modern equipment at competitive prices.</li>
          <li>• Germany: Leading in creative cancer therapies with cutting-edge treatment facilities.</li>
        </ul>

        <h2 className="text-[22px] font-semibold mt-10 mb-3">Cancer Treatment Cost Comparison Abroad</h2>
        <p className="text-gray-700 leading-7 mb-4">
          The price of the treatment varies according to location and hospital. Here are affordable cost estimates:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left">Country</th>
                <th className="py-3 px-4 text-left">Starting Cost (USD)</th>
                <th className="py-3 px-4 text-left">Common Treatments Available</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-3 px-4">India</td>
                <td className="py-3 px-4">$4,000</td>
                <td className="py-3 px-4">Chemotherapy, Surgery, Radiation</td>
              </tr>
              <tr className="border-t">
                <td className="py-3 px-4">Turkey</td>
                <td className="py-3 px-4">$6,500</td>
                <td className="py-3 px-4">Robotic Surgery, Immunotherapy</td>
              </tr>
              <tr className="border-t">
                <td className="py-3 px-4">Thailand</td>
                <td className="py-3 px-4">$9,000</td>
                <td className="py-3 px-4">Chemotherapy, Gamma Knife</td>
              </tr>
              <tr className="border-t">
                <td className="py-3 px-4">Germany</td>
                <td className="py-3 px-4">$12,000</td>
                <td className="py-3 px-4">Proton Therapy, Advanced Diagnostics</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-[22px] font-semibold mt-10 mb-3">How Ayushmita Helps You?</h2>

        <ul className="text-gray-700 leading-7 space-y-2">
          <li>• Trusted Network: Partnership with top cancer centers worldwide.</li>
          <li>• Medical Matching: Best hospitals and surgeons for your medical condition.</li>
          <li>• Post-Treatment Follow-up: Assistance in follow-up treatments with global doctors.</li>
          <li>• Quality & Safety: Only international hospitals with experienced oncologists.</li>
        </ul>
      </div>

      <div>
        <ConsultationForm />
      </div>

      <TestimonialSlider />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default DiseaseDetailsPage;
