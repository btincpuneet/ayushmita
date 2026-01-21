import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config/api";
import Slider from "react-slick";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import BookingForm from "../components/BookingForm";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";

import {
  MapPin,
  Calendar,
  Bed,
  Building2,
  Map,
  Globe,
  Check,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import ModalAppointment from "../components/Treatment/ModalAppointment";

function NextArrow({ onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
    >
      <ArrowRight size={20} className="text-[#F0A324]" />
    </button>
  );
}

function PrevArrow({ onClick }: any) {
  return (
    <span></span>
  );
}

function HospitalInfoCard({ hospital, onBookAppointment, }: any) {
  const [whatsAppNumber, setWhatsAppNumber] = useState<string>("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/global-settings`);
        if (res.data?.success) {
          setWhatsAppNumber(res.data.data.whatsapp_number);
        }
      } catch (error) {
        console.error("Failed to fetch WhatsApp number", error);
      }
    };

    fetchSettings();
  }, []);

  if (!whatsAppNumber) return null;
  return (
    <div className="bg-white">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <img
          src={
            hospital.image_url
              ? `${API_BASE}${hospital.image_url}`
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s"
          }
          alt={
            hospital.image_alt ||
            `${hospital.name} Hospital`
          }
          title={
            hospital.image_title ||
            hospital.name
          }
          className="w-full lg:w-[370px] h-[276px] object-cover rounded-xl"
        />


        <div className="flex-1 details-page-section-description">
          {/* <h1 className="text-2xl font-bold mb-4">{hospital.name}</h1> */}

          <ul className="space-y-3">
            <li className="flex gap-3"
              style={{
                fontFamily: "Ubuntu, sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "22px",
                letterSpacing: "0%",
              }}
            >
              <MapPin size={18} className="text-[#F0A324] mt-0.5" />
              {hospital.address}
            </li>

            <li className="flex gap-3"
              style={{
                fontFamily: "Ubuntu, sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "26px",
                letterSpacing: "0%",
              }}
            >
              <Calendar size={18} className="text-[#F0A324]" />
              Experience:{" "}
              <b
                style={{
                  fontFamily: "Ubuntu, sans-serif",
                  fontWeight: 700,
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "26px",
                  letterSpacing: "0%",
                }}

              >{new Date().getFullYear() - hospital.founded_year}+ Years</b>
            </li>

            <li className="flex gap-3"
              style={{
                fontFamily: "Ubuntu, sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "26px",
                letterSpacing: "0%",
              }}

            >
              <Bed size={18} className="text-[#F0A324]" />
              Hospital Beds: <b
                style={{
                  fontFamily: "Ubuntu, sans-serif",
                  fontWeight: 700,
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "26px",
                  letterSpacing: "0%",
                }}

              >{hospital.hospital_beds}</b>
            </li>

            <li className="flex gap-3"
              style={{
                fontFamily: "Ubuntu, sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "26px",
                letterSpacing: "0%",
              }}

            >
              <Building2 size={18} className="text-[#F0A324]" />
              Specialty: <b
                style={{
                  fontFamily: "Ubuntu, sans-serif",
                  fontWeight: 700,
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "26px",
                  letterSpacing: "0%",
                }}

              >Multi Specialty</b>
            </li>

            <li className="flex gap-3"
              style={{
                fontFamily: "Ubuntu, sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "26px",
                letterSpacing: "0%",
              }}
            >

              <Map size={18} className="text-[#F0A324]" />
              City: <b
                style={{
                  fontFamily: "Ubuntu, sans-serif",
                  fontWeight: 700,
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "26px",
                  letterSpacing: "0%",
                }}

              >{hospital.city}</b>
            </li>

            <li className="flex gap-3"
              style={{
                fontFamily: "Ubuntu, sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "26px",
                letterSpacing: "0%",
              }}

            >
              <Globe size={18} className="text-[#F0A324]" />
              Country: <b
                style={{
                  fontFamily: "Ubuntu, sans-serif",
                  fontWeight: 700,
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "26px",
                  letterSpacing: "0%",
                }}

              >{hospital.country}</b>
            </li>
          </ul>

          <div className="flex gap-4 mt-6 details-pgs-btn-1">
            <button onClick={onBookAppointment} className="px-6 py-3 bg-[#F0A324] rounded-lg "
              style={{
                fontFamily: "Ubuntu, sans-serif",
                fontWeight: 500,
                fontStyle: "normal",
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "2%",
              }}

            >
              Book Appointment
            </button>
            <a
              href={`https://wa.me/91${whatsAppNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="px-6 py-3 bg-green-500 flex gap-3 text-white rounded-lg"
                style={{
                  fontFamily: "Ubuntu, sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "2%",
                }}
              >
                <span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 0C10.866 0 14 3.134 14 7c0 3.866-3.134 7-7 7a6.96 6.96 0 0 1-3.52-.95L0 14l.95-3.52A6.96 6.96 0 0 1 0 7C0 3.134 3.134 0 7 0Z"
                      fill="white"
                    />
                  </svg>
                </span>
                Chat Now
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentSection({ html }: { html: string }) {
  if (!html) return null;

  return (
    <div
      className="cms-content leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
    />

  );
}



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
      <h2 className="mb-6"
        style={{
          fontFamily: "Ubuntu, sans-serif",
          fontWeight: 700,
          fontStyle: "normal",
          fontSize: "28px",
          lineHeight: "100%",
          letterSpacing: "0%",
        }}

      >Similar Hospitals</h2>

      <Slider {...settings}>
        {hospitals.map((h: any) => (
          <div key={h.name} className="pr-6 similar-hospital">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <img
                src={
                  h.image
                    ? h.image
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s"
                }
                alt={h.name ? `${h.name} Hospital` : "Hospital Image"}
                title={h.name ? h.name : "Hospital"}
                className="h-[280px] w-full object-cover rounded-2xl"
                loading="lazy"
              />

              <div className="p-4">
                <h4 style={{
                  fontFamily: "Ubuntu, sans-serif",
                  fontWeight: 700,
                  fontStyle: "normal",
                  fontSize: "20px",
                  lineHeight: "28px",
                  letterSpacing: "0%",
                }}
                >{h.name}</h4>
                <p className="mt-3" style={{
                  fontFamily: "Ubuntu, sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "10px",
                  letterSpacing: "0%",
                }}
                >
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

function DoctorsSection({ doctors }: any) {
  console.log("doctors", doctors);

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
      <h2 className="related-items-more mb-6">Doctors</h2>

      <Slider {...settings}>
        {doctors.map((d: any) => (
          <div key={d.name} className="pr-6 mb-20 similar-hospital">
            <div className="bg-white shadow rounded-lg text-center">
              <img
                src={
                  d.image
                    ? d.image.startsWith("http")
                      ? d.image
                      : `${API_BASE}${d.image}`
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s"
                }
                alt={d.name ? `${d.name} Treatment` : "Medical Treatment"}
                title={d.name ? d.name : "Medical Treatment"}
                className="w-full h-[233px] object-cover mb-3 rounded-2xl"
                loading="lazy"
                onError={(e) => {y
                  e.currentTarget.src =
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s";
                }}
              />

              <div >
                <h4 style={{
                  fontFamily: "Ubuntu, sans-serif",
                  fontWeight: 700,
                  fontSize: "20px",
                  lineHeight: "55px",
                  letterSpacing: "0px",
                  textAlign: "center",
                }}
                >{d.name}</h4>
                <p style={{
                  fontFamily: "Ubuntu, sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  lineHeight: "55px",
                  letterSpacing: "0px",
                  textAlign: "center",
                  color: "#F0A324",
                }}
                >{d.dept}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default function HospitalDetailsPage() {
  const { slug } = useParams();
  const [hospital, setHospital] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/hospitals/${slug}`)
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
    {
      name: "Acibadem International Hospital",
      city: "Istanbul",
      country: "Turkey",
      image:
        "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc",
    },
    {
      name: "Medical Park Hospital",
      city: "Istanbul",
      country: "Turkey",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
    },
    {
      name: "Florence Nightingale Hospital",
      city: "Istanbul",
      country: "Turkey",
      image:
        "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957",
    },
    {
      name: "Memorial Sisli Hospital",
      city: "Istanbul",
      country: "Turkey",
      image:
        "https://images.unsplash.com/photo-1580281658351-fd6c7f59a83f",
    },
    {
      name: "Medicana International",
      city: "Istanbul",
      country: "Turkey",
      image:
        "https://images.unsplash.com/photo-1551601651-2a8555f1a136",
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
    {
      name: "Dr. Ahmed Khan",
      dept: "Oncology",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d",
    },
    {
      name: "Dr. Emily Watson",
      dept: "Gynecology",
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309",
    },
    {
      name: "Dr. Michael Chen",
      dept: "Gastroenterology",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
    },
    {
      name: "Dr. Rajesh Verma",
      dept: "Urology",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
    },
  ];


  return (
    <>
      <Header />
      <TreatmentHeader
        title={hospital.name}
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Hospitals", link: "/hospital" },
          { label: hospital.name, link: "" },
        ]}
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 hospital-slider">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12 mb-12">
          <div className="lg:col-span-2">
            <HospitalInfoCard
              hospital={hospital}
              onBookAppointment={() => setIsModalOpen(true)}
            />
            <div className="space-y-12">
              <ContentSection
                html={hospital.description_html}
              />

            </div>
          </div>
          <div className="lg:col-span-1 sticky top-24">
            <BookingForm />
          </div>
        </div>

        <SimilarHospitals hospitals={similarHospitals} />
        <DoctorsSection doctors={doctors} />
      </div>
      <ModalAppointment
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Footer />
    </>
  );
}
