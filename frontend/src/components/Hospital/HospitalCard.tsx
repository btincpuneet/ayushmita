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
    <article className="bg-white rounded-xl shadow-md border border-transparent hover:border-blue-400 transition duration-200 p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-48 lg:w-52 flex-shrink-0">
          <img
            src={hospital.image_url}
            alt={hospital.name}
            className="w-full h-40 md:h-full object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop";
            }}
          />
        </div>

        <div className="flex-1">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {hospital.name}, {hospital.city}, {hospital.country}
          </h3>

          {/* Address */}
          <div className="flex items-start gap-2 text-gray-600 mb-3 text-sm">
            <MapPin size={18} className="text-gray-700 mt-0.5" />
            <p>{hospital.address}</p>
          </div>

         
          <div className="space-y-1 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-orange-500" />
              <span>
                <strong>Founded in:</strong> {hospital.founded_year}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Bed size={18} className="text-orange-500" />
              <span>
                <strong>Hospital Beds:</strong> {hospital.hospital_beds}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <button className="px-5 py-2 rounded-md bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition">
              Book Appointment
            </button>

            <button className="px-5 py-2 rounded-md bg-green-500 text-white font-medium flex items-center gap-2 hover:bg-green-600 transition">
              <MessageCircle size={16} />
              Chat Now
            </button>

           <Link
              to={`/hospitals/${hospital.slug}`}
              className="px-4 py-2 border border-orange-400 text-orange-500 rounded-md font-medium flex items-center gap-2 hover:bg-orange-50 transition"
            >
              View more
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default HospitalCard;
