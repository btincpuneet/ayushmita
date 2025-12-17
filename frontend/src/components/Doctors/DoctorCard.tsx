import React, { useState } from "react";
import { MapPin, Briefcase, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ModalAppointment from "../Treatment/ModalAppointment"
interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  city: string;
  country: string;
  image_url: string | null;
  slug: string;
}

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!doctor) return null;

  const image =
    doctor.image_url && doctor.image_url.length > 0
      ? `http://127.0.0.1:5001${doctor.image_url}`
      : "https://images.unsplash.com/photo-1606813909359-9c9d45d90c2e?auto=format&fit=crop&w=400&q=80";

  return (
    <>
      <article className="bg-white rounded-xl shadow-md p-5 flex gap-3 items-end hover:shadow-lg transition">
        <div className="w-[158px] h-[158px] flex-shrink-0">
          <img
            src={image}
            alt={doctor.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="flex-1">
          <h3 style={{
  fontFamily: "Ubuntu, sans-serif",
  fontWeight: 700,
  fontStyle: "normal",
  fontSize: "18px",
  lineHeight: "24px",
  letterSpacing: "0%",
}}
>
            {doctor.name}
          </h3>

          <p className="mb-2"
          style={{
  fontFamily: "Ubuntu, sans-serif",
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "14px",
  lineHeight: "24px",
  letterSpacing: "0%",
}}

          >
            {doctor.specialty}
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
            <Briefcase size={16} className="text-[#F0A324]" />
            <span style={{
  fontFamily: "Ubuntu, sans-serif",
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "14px",
  lineHeight: "26px",
  letterSpacing: "0%",
}}
>
              Experience:<b style={{
  fontFamily: "Ubuntu, sans-serif",
  fontWeight: 700,
  fontStyle: "normal",
  fontSize: "14px",
  lineHeight: "26px",
  letterSpacing: "0%",
}}
> {doctor.experience}+ years</b>
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin size={16} className="text-[#F0A324]" />
            <span style={{
  fontFamily: "Ubuntu, sans-serif",
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "14px",
  lineHeight: "26px",
  letterSpacing: "0%",
}}
>
              {doctor.city}, {doctor.country}
            </span>
          </div>

          <button onClick={() => setIsModalOpen(true)} className="mt-3 px-5 py-2 bg-[#F0A324]  rounded-md hover:bg-yellow-600 transition"
                  style={{
  fontFamily: "'Open Sans', sans-serif",
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "100%",
  letterSpacing: "0%",
}}

            >
            Book Appointment
          </button>
        </div>

        <button
          onClick={() => navigate(`/doctor/${doctor.slug}`)}
        className="px-4 py-2 border border-[#F0A324] text-[#F0A324] bg-[#FBF6DD] rounded-md font-medium flex items-center gap-2 hover:bg-orange-50 transition"
               style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
             >
                View more
                <svg width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.3615 6L12.9105 8.59L14.25 10L19 5L14.25 0L12.9105 1.41L15.3615 4H0V6H15.3615Z" fill="#F0A324"/>
</svg>

              
        </button>
      </article>
      <ModalAppointment
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default DoctorCard;
