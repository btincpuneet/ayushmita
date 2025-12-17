import React from "react";
import {
  MapPin,
  Calendar,
  Bed,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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


  function handleViewMore() {
    navigate('/hospitals');
  }
  return (
    <article className="bg-white rounded-xl border border-[#EFF3F6] hover:border-[#F0A324] transition duration-200 p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className=" flex-shrink-0">
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
          {/* Title */}
          <h3 className="mb-1"
            style={{
              fontFamily: "Ubuntu, sans-serif",
              fontWeight: 700,
              fontStyle: "normal",
              fontSize: "18px",
              lineHeight: "26px",
              letterSpacing: "0%",
            }}

          >
            {hospital.name}, {hospital.city}, {hospital.country}
          </h3>

          {/* Address */}
          <div className="flex space-y-1 items-start gap-2 text-gray-600 text-sm">
            <MapPin size={18} className="text-[#F0A324] mt-0.5" />
            <p>{hospital.address}</p>
          </div>


          <div className="space-y-1 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#F0A324]" />
              <span
                style={{
                  fontFamily: "Ubuntu, sans-serif",
                  fontWeight: 700,
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "26px",
                  letterSpacing: "0%",
                }}

              >
                <strong
                  style={{
                    fontFamily: "Ubuntu, sans-serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "26px",
                    letterSpacing: "0%",
                  }}

                >Founded in:</strong> {hospital.founded_year}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Bed size={18} className="text-[#F0A324]" />
              <span
                style={{
                  fontFamily: "Ubuntu, sans-serif",
                  fontWeight: 700,
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "26px",
                  letterSpacing: "0%",
                }}
              >
                <strong
                  style={{
                    fontFamily: "Ubuntu, sans-serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "14px",
                    lineHeight: "26px",
                    letterSpacing: "0%",
                  }}
                >Hospital Beds:</strong> {hospital.hospital_beds}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 mt-4 flex-wrap">
            <div className="flex items-center gap-3 mt-4 ">
              <button className="px-5 py-2 rounded-md bg-[#F0A324] hover:bg-yellow-600 transition"
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

              <button className="px-5 py-2 rounded-md bg-[#25CB68] text-white font-medium flex items-center gap-2 hover:bg-green-600 transition"
                 style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}>
                <MessageCircle size={16} />
                Chat Now
              </button>
            </div>
            <div className="flex items-center mt-4 ">
              <Link
                to={`/hospitals/${hospital.slug}`}
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

              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default HospitalCard;
