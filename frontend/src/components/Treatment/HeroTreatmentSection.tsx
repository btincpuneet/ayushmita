import React from "react";
import Container from "../Container";
import heroImg from "../../assets/heroImg.svg";
import { useNavigate } from "react-router-dom";

const HeroTreatmentSection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#FFF7E1] mt-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center text-center md:text-left gap-8 pt-10">

        
          <div className="flex flex-col items-center md:items-start justify-center">

            <p className="text-sm text-gray-500 mb-2">
              Home /
              <span
                className="text-[#F0A324] font-medium cursor-pointer hover:underline"
                onClick={() => navigate("/treatmentdetails")}
              >
                {" "}Treatment
              </span>
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Treatments
            </h1>
          </div>

          
          <div className="flex justify-center md:justify-center">
            <img
              src={heroImg}
              alt="Treatments Hero"
              className="w-[300px] md:w-[360px] lg:w-[380px] h-auto object-contain"
            />
          </div>

        </div>
      </Container>
    </section>
  );
};

export default HeroTreatmentSection;
