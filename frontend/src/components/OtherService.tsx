import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Type for each treatment
interface Treatment {
  id: number;
  name: string;
  slug: string;
  image?: string;
  short_description?: string;
}

// Props for the component
interface OtherServicesProps {
  diseaseId: number;
  currentSlug: string;
}

const OtherServices: React.FC<OtherServicesProps> = ({ diseaseId, currentSlug }) => {
  const [services, setServices] = useState<Treatment[]>([]);

  const fetchServices = async () => {
    try {
      const res = await axios.get<{ treatments: Treatment[] }>(
        `http://127.0.0.1:5001/api/treatments/disease/${diseaseId}`
      );
      console.log("res", res.data.treatments)
      const filtered = res.data.treatments.filter(
        (t) => t.slug !== currentSlug
      );

      setServices(filtered);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  useEffect(() => {
    if (diseaseId) fetchServices();
  }, [diseaseId]);

  if (!services.length) return null;

  return (
    <section className="bg-white py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-semibold text-left text-[#1a1a1a] mb-10 font-poppins">
          Other Related Treatments
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/treatment/${service.slug}`}
              className="
                flex items-center gap-3 p-4 
                bg-white border border-gray-200 rounded-lg 
                hover:shadow-md hover:border-gray-300 
                transition-all duration-200
              "
            >
              <div
                className="
    w-10 h-10 flex items-center justify-center 
    bg-[#f5f9f7] rounded-lg overflow-hidden
  "
              >
                <img
                  src={`http://127.0.0.1:5001${service.image}`}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <span
                className="
                  text-gray-700 text-sm font-medium 
                  font-poppins leading-tight
                "
              >
                {service.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherServices;
