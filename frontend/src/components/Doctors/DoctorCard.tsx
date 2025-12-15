import React from "react";
import { MapPin, Briefcase, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

  if (!doctor) return null;

  const image =
    doctor.image_url && doctor.image_url.length > 0
      ? `http://127.0.0.1:5001${doctor.image_url}`
      : "https://images.unsplash.com/photo-1606813909359-9c9d45d90c2e?auto=format&fit=crop&w=400&q=80";

  return (
    <article className="bg-white rounded-xl shadow-md p-5 flex gap-6 items-center hover:shadow-lg transition">
      <div className="w-28 h-28 flex-shrink-0">
        <img
          src={image}
          alt={doctor.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900">
          {doctor.name}
        </h3>

        <p className="text-sm text-gray-700 mb-2">
          {doctor.specialty}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
          <Briefcase size={16} className="text-orange-500" />
          <span>
            Experience: {doctor.experience}+ years
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <MapPin size={16} className="text-orange-500" />
          <span>
            {doctor.city}, {doctor.country}
          </span>
        </div>

        <button className="mt-3 px-5 py-2 bg-yellow-500 text-white text-sm font-medium rounded-md hover:bg-yellow-600 transition">
          Book Appointment
        </button>
      </div>

      <button
        onClick={() => navigate(`/doctor/${doctor.slug}`)}
        className="ml-auto px-4 py-2 border border-yellow-500 text-yellow-600 text-sm font-medium rounded-md flex items-center gap-2 hover:bg-yellow-50 transition"
      >
        View more
        <ChevronRight size={16} />
      </button>
    </article>
  );
};

export default DoctorCard;
