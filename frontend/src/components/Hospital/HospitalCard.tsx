import React, { useState } from "react";
import { MapPin, Calendar, Bed, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ModalAppointment from "../Treatment/ModalAppointment";

interface Hospital {
  id: number;
  name: string;
  country: string;
  city: string;
  image_url: string;
  address: string;
  founded_year: number;
  hospital_beds: number;
  slug: string;
}

interface HospitalCardProps {
  hospital: Hospital;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <article className="bg-white rounded-xl border border-[#EFF3F6] hover:border-[#F0A324] transition duration-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-shrink-0">
            <img
              src={hospital.image_url}
              alt={hospital.name}
              className="w-[158px] h-[158px] md:h-full object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop";
              }}
            />
          </div>

          <div className="flex-1">
            <h3
              className="mb-1"
              style={{
                fontFamily: "Ubuntu, sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                lineHeight: "26px",
              }}
            >
              {hospital.name}, {hospital.city}, {hospital.country}
            </h3>

            <div className="flex items-start gap-2 text-sm text-gray-600">
              <MapPin size={18} className="text-[#F0A324] mt-0.5" />
              <p>{hospital.address}</p>
            </div>

            <div className="space-y-1 text-sm text-gray-700 mt-2">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-[#F0A324]" />
                <span>
                  <strong>Founded in:</strong> {hospital.founded_year}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Bed size={18} className="text-[#F0A324]" />
                <span>
                  <strong>Hospital Beds:</strong> {hospital.hospital_beds}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
              <div className="flex gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-5 py-2 rounded-md bg-[#F0A324] hover:bg-yellow-600 transition text-sm"
                >
                  Book Appointment
                </button>

                <button className="px-5 py-2 rounded-md bg-[#25CB68] text-white flex items-center gap-2 hover:bg-green-600 transition text-sm">
                  <MessageCircle size={16} />
                  Chat Now
                </button>
              </div>

              <Link
                to={`/hospitals/${hospital.slug}`}
                className="px-4 py-2 border border-[#F0A324] text-[#F0A324] bg-[#FBF6DD] rounded-md text-sm hover:bg-orange-50 transition"
              >
                View more
              </Link>
            </div>
          </div>
        </div>
      </article>

      <ModalAppointment
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default HospitalCard;
