import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import HeroImage from "../components/HeroImage";
import Footer from "../components/Footer";
import PromoSlider from "../components/PromoSlider";
import MedicalTourism from "../components/MedicalTourism";
import FindBySpecialisation from "../components/FindBySpecialisation";
import TopPartnerHospitals from "../components/TopPartnerHospitals";
import { StatsSection } from "../components/StatsSection";
import DoctorCareSlider from "../components/DoctorCareSlider";
import TestimonialSlider from "../components/TestimonialSlider";
import FaqWithImage from "../components/FaqWithImage";

const Home: React.FC = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Ayushm",
    description: "Professional and friendly care provider",
    url: "https://example.com",
    logo: "https://example.com/favicon.ico",
  };

  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta name="theme-color" content="#ffffff" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen flex-col flex bg-white">
        <Header />
        <main className="flex-1">
          <HeroImage />
          <PromoSlider />
          <MedicalTourism />
          <FindBySpecialisation />
          <TopPartnerHospitals />
          <StatsSection />
          <DoctorCareSlider />
          <TestimonialSlider />
          <FaqWithImage />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
