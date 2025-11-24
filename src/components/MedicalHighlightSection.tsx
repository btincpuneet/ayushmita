import React from "react";
import Container from "./Container";
import PromoSlider from "./PromoSlider";
import MedicalTourism from "./MedicalTourism";
import FindBySpecialisation from "./FindBySpecialisation";

const MedicalHighlightSection: React.FC = () => {
  return (
    <section className="bg-slate-50 py-14 md:py-20">
      <Container>
        <div className=" px-4 sm:px-6 md:px-10 lg:px-14 py-10 md:py-12 lg:py-14">
          <PromoSlider />
          <div className="mt-10 md:mt-12">
            <MedicalTourism />
          </div>
          <div className="mt-10 md:mt-12">
            <FindBySpecialisation />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MedicalHighlightSection;
