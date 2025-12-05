import React, { useRef } from "react";
import Breadcrumb from "../components/Treatment/TreatmentHeader";
import TreatmentTabs from "../components/Treatment/BreadCrumb";

import CancerSection from "../components/Treatment/CancerSection";
import CardiologySection from "../components/Treatment/CardiologySection";
import CosmeticSurgerySection from "../components/Treatment/CosmeticSurgerySection";
import CosmetologySection from "../components/Treatment/CosmetologySection";
import DentalCareSection from "../components/Treatment/DentalCareSection";
import DermatologySection from "../components/Treatment/DermatologySection";
import EndocrinologySection from "../components/Treatment/EndocrinologySection";
// import CosmeticSection from "../components/Treatment/CosmeticSection";
// import CosmetologySection from "../components/Treatment/CosmetologySection";
// import DentalSection from "../components/Treatment/DentalSection";
// import DermatologySection from "../components/Treatment/DermatologySection";
// import EndocrinologySection from "../components/Treatment/EndocrinologySection";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TreatmentsPage2() {

  // Scroll Refs
  const cancerRef = useRef(null);
  const cardioRef = useRef(null);
  const cosmeticRef = useRef(null);
  const cosmetologyRef = useRef(null);
  const dentalRef = useRef(null);
  const dermRef = useRef(null);
  const endoRef = useRef(null);

  const handleTabClick = (tab) => {
    const sectionMap = {
      "Cancer": cancerRef,
      "Cardiology Treatment": cardioRef,
      "Cosmetic Surgery": cosmeticRef,
      "Cosmetology": cosmetologyRef,
      "Dental Care": dentalRef,
      "Dermatology": dermRef,
      "Endocrinology": endoRef,
    };

    const ref = sectionMap[tab];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div >
      <Header />
      {/* Breadcrumb */}
      <Breadcrumb title="Treatments In India at Low Coast" />

      {/* Tabs */}
      <TreatmentTabs onTabClick={handleTabClick} />

      <div ref={cancerRef}>
        <CancerSection />
      </div>

      <div ref={cardioRef}>
        <CardiologySection />
      </div>

      <div ref={cosmeticRef}>
        <CosmeticSurgerySection />
      </div>

      <div ref={cosmetologyRef}>
        <CosmetologySection />
      </div>

      <div ref={dentalRef}>
        <DentalCareSection />
      </div>

      <div ref={dermRef}>
        <DermatologySection />
      </div>

      <div ref={endoRef}>
        <EndocrinologySection />
      </div>
      <Footer />
    </div>
  );
}
