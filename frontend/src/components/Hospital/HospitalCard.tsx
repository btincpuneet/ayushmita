import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Bed,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
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

  function handleViewMore() {
    navigate('/hospitals');
  }
  return (
    <>
      <article className="bg-white rounded-xl border border-[#EFF3F6] hover:shadow-lg transition duration-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className=" flex-shrink-0">
            <img
              src={hospital.image_url}
              alt={hospital.name}
              className="md:h-full object-cover rounded-lg image-hospital-list"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop";
              }}
            />
          </div>

          <div className="flex-1">
            {/* Title */}
            <h3 className="mb-1 space-y-2"
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
            <div className="flex space-y-2 items-start gap-2 mb-1">
              <MapPin size={18} className="text-[#F0A324] mt-0.5" />
              <p style={{
  fontFamily: "Ubuntu, sans-serif",
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "14px",
  lineHeight: "26px",
  letterSpacing: "0%",
}}
>{hospital.address}</p>
            </div>


            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex space-y-2 items-center gap-2">
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

              <div className="flex space-y-2 items-center gap-2">
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

            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3 mt-4 list-page-button">
                <button onClick={() => setIsModalOpen(true)} className="px-5 py-3 rounded-md bg-[#F0A324] hover:bg-yellow-600 transition btn-sec-list"
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

                <button className="px-5 py-3 rounded-md bg-[#25CB68] text-white font-medium flex items-center gap-2 hover:bg-green-600 transition btn-sec-list"
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "12px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}>
                  <span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1231_2378)">
                      <path d="M7.00001 0C10.8661 0 14 3.1339 14 6.99999C14 10.8661 10.8661 14 7.00001 14C5.76293 14.0021 4.54761 13.6747 3.47901 13.0515L0.00281082 14L0.94921 10.5224C0.325481 9.45344 -0.00215714 8.23761 1.06881e-05 6.99999C1.06881e-05 3.1339 3.13391 0 7.00001 0ZM4.61441 3.71L4.47441 3.7156C4.38389 3.72183 4.29545 3.74561 4.21401 3.7856C4.13811 3.82865 4.0688 3.88241 4.00821 3.9452C3.92421 4.0243 3.87661 4.0929 3.82551 4.1594C3.56659 4.49603 3.42719 4.90932 3.42931 5.334C3.43071 5.677 3.52031 6.0109 3.66031 6.32309C3.94661 6.95449 4.41771 7.62299 5.03931 8.24249C5.18911 8.39159 5.33611 8.54139 5.49431 8.68069C6.26671 9.36067 7.1871 9.85107 8.1823 10.1129L8.5799 10.1738C8.7094 10.1808 8.8389 10.171 8.9691 10.1647C9.17293 10.1539 9.37195 10.0988 9.5522 10.003C9.6438 9.95563 9.73325 9.90425 9.8203 9.84899C9.8203 9.84899 9.84994 9.82893 9.9078 9.78599C10.0023 9.71599 10.0604 9.66629 10.1388 9.58439C10.1976 9.52373 10.2466 9.45326 10.2858 9.37299C10.3404 9.25889 10.395 9.04119 10.4174 8.85989C10.4342 8.72129 10.4293 8.64569 10.4272 8.59879C10.4244 8.52389 10.3621 8.44619 10.2942 8.41329L9.8868 8.23059C9.8868 8.23059 9.2778 7.96529 8.9054 7.79589C8.86642 7.77892 8.82467 7.7692 8.7822 7.76719C8.73431 7.76218 8.68589 7.76753 8.64024 7.78287C8.59458 7.7982 8.55276 7.82318 8.5176 7.85609C8.5141 7.85469 8.4672 7.89459 7.9611 8.50779C7.93206 8.54683 7.89204 8.57633 7.84617 8.59253C7.80029 8.60874 7.75063 8.61092 7.7035 8.59879C7.65788 8.58663 7.6132 8.57119 7.5698 8.55259C7.48301 8.51619 7.45291 8.50219 7.3934 8.47699C6.99152 8.30193 6.61951 8.06503 6.29091 7.77489C6.20271 7.69789 6.12081 7.61389 6.03681 7.53269C5.76143 7.26894 5.52143 6.97058 5.32281 6.64509L5.28151 6.57859C5.25229 6.53365 5.22833 6.4855 5.21011 6.43509C5.18351 6.33219 5.25281 6.2496 5.25281 6.2496C5.25281 6.2496 5.42291 6.0634 5.50201 5.96259C5.57901 5.86459 5.64411 5.7694 5.68611 5.7015C5.76871 5.5685 5.79461 5.432 5.75121 5.3263C5.55521 4.8475 5.35267 4.37126 5.14361 3.8976C5.10231 3.8038 4.97981 3.7366 4.86851 3.7233C4.83071 3.71863 4.79291 3.7149 4.75511 3.7121C4.66112 3.70671 4.56687 3.70764 4.47301 3.7149L4.61441 3.71Z" fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_1231_2378">
                        <rect width="14" height="14" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  </span>
                  Chat Now
                </button>
              </div>
              <div className="flex items-center mt-4 ">
                <Link
                  to={`/hospitals/${hospital.slug}`}
                  className="px-4 py-3 border border-[#F0A324] text-[#F0A324] bg-[#FBF6DD] rounded-md font-medium flex items-center gap-2 hover:bg-orange-50 transition "
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
                    <path d="M15.3615 6L12.9105 8.59L14.25 10L19 5L14.25 0L12.9105 1.41L15.3615 4H0V6H15.3615Z" fill="#F0A324" />
                  </svg>

                </Link>
              </div>
            </div>
          </div>
        </div>
        <ModalAppointment
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      </article>
    </>

  );
};

export default HospitalCard;
