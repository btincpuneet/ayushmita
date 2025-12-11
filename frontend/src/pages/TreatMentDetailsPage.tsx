import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Breadcrumb from "../components/Treatment/TreatmentHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ModalAppointment from "../components/Treatment/TreatmentDeatilsAllPages/ModalAppointment";
import BlogSection from "../components/BlogSection";
import TestimonialSlider from "../components/TestimonialSlider";
import ConsultationForm from "../components/ConsulatForm";
import OtherServices from "../components/OtherService";

export default function TreatmentDetailsPage() {
  const { slug } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [treatment, setTreatment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchTreatment = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:5001/api/treatments/single/${slug}`
      );
      if (res.data?.success) setTreatment(res.data.treatment);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreatment();
  }, [slug]);

  if (loading) return <p className="p-6 text-xl">Loading...</p>;
  if (!treatment) return <p className="p-6 text-xl">Treatment not found</p>;

  return (
    <div className="bg-white">
      <Header />
      <main className="bg-white">

        <header>
          <Header />
        </header>

        <nav className="w-full">
          <Breadcrumb title={treatment?.name} />
        </nav>

        <article className="max-w-6xl mx-auto px-4 py-12">

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-20">

            <figure>
              <img
                src={`http://127.0.0.1:5001${treatment.image}`}
                alt={treatment.name}
                className="rounded-xl shadow-lg w-full max-w-md"
              />
            </figure>

            <section>
              <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
              <hr className="w-12 h-1 bg-green-500 rounded mt-2 mb-6" />

              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Having cancer is one of the biggest fears for humans because most
                people lose their lives to cancer. In cancer disease...
              </p>

              <p className="text-gray-700 leading-relaxed text-lg">
                We know that receiving a cancer diagnosis can be enormous...
              </p>

              <aside className="flex gap-4 mt-8">
                <button
                  onClick={() => setOpenModal(true)}
                  className="bg-[#F0A324] hover:bg-orange-500 text-black font-semibold px-6 py-2 rounded-lg transition"
                >
                  Book An Appointment
                </button>

                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg transition">
                  Chat Now
                </button>
              </aside>
            </section>

          </section>

          <section className="text-gray-800 space-y-8">

            <section>
              <h2 className="text-2xl font-semibold mb-3">Types of Bile Duct Cancer</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Intrahepatic bile duct cancer</li>
                <li>Extrahepatic bile duct cancer</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Symptoms of Bile Duct Cancer</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Jaundice (yellowing of skin)</li>
                <li>Dark-colored urine</li>
                <li>Unexplained weight loss</li>
                <li>Abdominal pain</li>
                <li>Fever</li>
                <li>Nausea and vomiting</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Diagnosis</h2>
              <p className="leading-relaxed text-lg">
                Diagnosis may include imaging tests, blood tests, biopsies...
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Treatment Options</h2>
              <p className="leading-relaxed text-lg mb-3">
                The treatment plan depends on the type and stage of cancer...
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Surgery</li>
                <li>Radiation therapy</li>
                <li>Chemotherapy</li>
                <li>Targeted therapy</li>
                <li>Palliative care</li>
              </ul>
            </section>

          </section>

        </article>

        <aside>
          <OtherServices
            diseaseId={treatment.disease_id}
            currentSlug={treatment.slug}
          />
        </aside>

        <section>
          <ConsultationForm />
        </section>

        <section>
          <TestimonialSlider />
        </section>

        <section>
          <BlogSection />
        </section>

        <footer>
          <Footer />
        </footer>

        <ModalAppointment
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />

      </main>

     

      <ModalAppointment
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}
