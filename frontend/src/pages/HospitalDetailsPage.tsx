import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import {
  MapPin,
  Calendar,
  Bed,
  Building2,
  Map,
  Globe,
  Check,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import BookingForm from "../components/BookingForm";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";
import ModalAppointment from "../components/Treatment/ModalAppointment";

/* -------------------- Slider Arrows -------------------- */
function NextArrow({ onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
    >
      <ArrowRight size={18} className="text-[#F0A324]" />
    </button>
  );
}

function PrevArrow() {
  return <span />;
}

/* -------------------- Hospital Info Card -------------------- */
function HospitalInfoCard({
  hospital,
  onBook,
}: {
  hospital: any;
  onBook: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#EFF3F6] p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <img
          src={`http://127.0.0.1:5001${hospital.image_url}`}
          alt={hospital.name}
          className="w-full lg:w-[370px] h-[276px] object-cover rounded-xl"
        />

        <div className="flex-1">
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin size={18} className="text-[#F0A324]" />
              {hospital.address}
            </li>

            <li className="flex gap-3">
              <Calendar size={18} className="text-[#F0A324]" />
              Experience:
              <b className="ml-1">
                {new Date().getFullYear() - hospital.founded_year}+ Years
              </b>
            </li>

            <li className="flex gap-3">
              <Bed size={18} className="text-[#F0A324]" />
              Hospital Beds: <b className="ml-1">{hospital.hospital_beds}</b>
            </li>

            <li className="flex gap-3">
              <Building2 size={18} className="text-[#F0A324]" />
              Specialty: <b className="ml-1">Multi Specialty</b>
            </li>

            <li className="flex gap-3">
              <Map size={18} className="text-[#F0A324]" />
              City: <b className="ml-1">{hospital.city}</b>
            </li>

            <li className="flex gap-3">
              <Globe size={18} className="text-[#F0A324]" />
              Country: <b className="ml-1">{hospital.country}</b>
            </li>
          </ul>

          <div className="flex gap-4 mt-6 flex-wrap">
            <button
              onClick={onBook}
              className="px-6 py-3 bg-[#F0A324] text-white rounded-lg font-medium"
            >
              Book Appointment
            </button>

            <button className="px-6 py-3 bg-green-500 text-white rounded-lg flex items-center gap-2 font-medium">
              <MessageCircle size={16} />
              Chat Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Content Section -------------------- */
function ContentSection({ html }: any) {
  if (!html) return null;
  return (
    <div
      className="text-sm leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/* -------------------- Similar Hospitals -------------------- */
function SimilarHospitals({ hospitals }: any) {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Similar Hospitals</h2>

      <Slider {...settings}>
        {hospitals.map((h: any) => (
          <div key={h.name} className="px-3">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <img
                src={h.image}
                alt={h.name}
                className="h-[280px] w-full object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold">{h.name}</h4>
                <p className="text-sm text-gray-500">
                  {h.city}, {h.country}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

/* -------------------- Doctors Section -------------------- */
function DoctorsSection({ doctors }: any) {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Doctors</h2>

      <Slider {...settings}>
        {doctors.map((d: any) => (
          <div key={d.name} className="px-3">
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <img
                src={d.image}
                alt={d.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-3"
              />
              <h4 className="font-semibold">{d.name}</h4>
              <p className="text-xs text-orange-500">{d.dept}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

/* -------------------- MAIN PAGE -------------------- */
export default function HospitalDetailsPage() {
  const { slug } = useParams();
  const [hospital, setHospital] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5001/api/hospitals/${slug}`)
      .then((res) => setHospital(res.data.data));
  }, [slug]);

  if (!hospital) return null;

  const similarHospitals = [
    {
      name: "LIV Hospital",
      city: "Istanbul",
      country: "Turkey",
      image:
        "https://images.unsplash.com/photo-1576765607924-3f7b8410a787",
    },
    {
      name: "American Hospital",
      city: "Istanbul",
      country: "Turkey",
      image:
        "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc",
    },
  ];

  const doctors = [
    {
      name: "Dr. Jonathan Alves",
      dept: "Cardiology",
      image:
        "https://images.unsplash.com/photo-1550831107-1553da8c8464",
    },
    {
      name: "Dr. Sophia Martinez",
      dept: "Orthopedics",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    },
  ];

  return (
    <>
      <Header />

      <TreatmentHeader
        title={hospital.name}
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Hospitals", link: "/hospitals" },
          { label: hospital.name },
        ]}
      />

      <Container className="py-10 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2">
            <HospitalInfoCard
              hospital={hospital}
              onBook={() => setIsModalOpen(true)}
            />
          </div>

          <div className="lg:col-span-1 sticky top-24">
            <BookingForm />
          </div>
        </div>

        <div className="max-w-[860px] space-y-12">
          <ContentSection html={hospital.description_html} />
        </div>

        <SimilarHospitals hospitals={similarHospitals} />
        <DoctorsSection doctors={doctors} />
      </Container>

      <Footer />

      <ModalAppointment
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
