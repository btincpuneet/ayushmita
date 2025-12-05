// src/pages/AboutPage.tsx
import React from "react";

// Components (you will add these next)
import Navbar from "../components/Header";
import Breadcrumb from "../components/Treatment/BreadCrumb";
import AboutSection from "../components/About Us/AboutSection";
import MissionVision from "../components/About Us/MissionVision";
import GlobalStatsMap from "../components/About Us/GlobalStatsMap";
import ObjectiveSection from "../components/About Us/MissionVision";
import WhyChooseUs from "../components/About Us/WhyChooseUs";
import Footer from "../components/Footer";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <Breadcrumb title="About Us" />

      <main>
        <AboutSection />
        <MissionVision />
        <GlobalStatsMap />
        <ObjectiveSection />
        <WhyChooseUs />
      </main>

     
      <Footer />
    </div>
  );
};

export default AboutPage;
