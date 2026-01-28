import React, { useEffect, useState } from "react";
import { useParams, Link, Links } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config/api";
import Slider from "react-slick";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingForm from "../components/BookingForm";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";

import {
  MapPin,
  Calendar,
  Bed,
  Building2,
  
  Globe,
  Check,
  ArrowRight,
  ArrowLeft,
  Hospital,
} from "lucide-react";
import { Map as MapIcon } from "lucide-react";

import ModalAppointment from "../components/Treatment/ModalAppointment";

interface ArrowProps {
  onClick?: () => void;
}

interface ArrowProps {
  onClick?: () => void;
}

function NextArrow({ onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 
      w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
    >
      <ArrowRight size={20} className="text-[#F0A324]" />
    </button>
  );
}

function PrevArrow() {
  return <span />;
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

            {/* <li className="flex gap-3"
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
            </li> */}
            <li className="flex gap-3" style={{
              fontFamily: "Ubuntu, sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "14px",
              lineHeight: "26px",
              letterSpacing: "0%",
            }}>
              <Building2 size={18} className="text-[#F0A324]" />
              Specialty:
              <b className="ml-1">
                {hospital.specialities && hospital.specialities.length > 0
                  ? hospital.specialities.map((s: any) => s.name).join(", ")
                  : "N/A"}
              </b>
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

              <MapIcon size={18} className="text-[#F0A324]" />
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

function SimilarHospitals({
  hospitals,
  isMobile,
  city
}: {
  hospitals: any[];
  isMobile: boolean;
}) {
  if (!hospitals.length) return null;

  const settings = {
    dots: false,
    arrows: !isMobile,
    infinite: hospitals.length > 3,
    speed: 500,
    slidesToScroll: 1,

    slidesToShow: isMobile ? 1 : 3,

    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="mt-16">
      <h2 className="mb-6 text-[28px] font-bold"> Similar Hospitals in {city}
      </h2>

      <Slider
        {...settings}
        key={`${hospitals.length}-${isMobile}`}
      >
        {hospitals.map((h) => (
          <div key={h.id} className="pr-6">
            <Link to={`/hospitals/${h.slug}`}>
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <img
                  src={
                    h.image_url
                      ? `${API_BASE}${h.image_url}`
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s"
                  }
                  alt={h.name}
                  className="h-[280px] w-full object-cover rounded-2xl"
                />
                <div className="p-4">
                  <h4 className="text-[20px] font-bold">{h.name}</h4>
                  <p className="mt-2 text-sm">
                    {h.city}, {h.country}
                  </p>
                </div>
              </div>
            </Link>

          </div>
        ))}
      </Slider>
    </div>
  );
}


function DoctorsSection({
  doctors,
  isMobile,
  city,
}: {
  doctors: any[];
  isMobile: boolean;
  city: string;
}) {

  if (!doctors.length) return null;
  const settings = {
    dots: false,
    arrows: !isMobile,
    infinite: doctors.length > 4,
    speed: 500,
    slidesToScroll: 1,

    slidesToShow: isMobile ? 1 : 4,

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
      <h2 className="mb-6 text-[28px] font-bold">
        Similar Doctors in {city}
      </h2>

      <Slider
        {...settings}
        key={`${doctors.length}-${isMobile}`}
      >
        {doctors.map((d) => (
          <div key={d.id} className="pr-6 mb-20">
            <Link to={`/doctor/${d.slug}`}>
              <div className="bg-white shadow rounded-lg text-center">
                <img
                  src={
                    d.image_url
                      ? `${API_BASE}${d.image_url}`
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s"
                  }
                  alt={d.name}
                  className="w-full h-[233px] object-cover mb-3 rounded-2xl"
                />
                <h4 className="text-[20px] font-bold">{d.name}</h4>
                <p className="text-[#F0A324] font-bold pb-3">
                  {d.speciality?.name || "Specialist"}
                </p>

              </div>
            </Link>
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
  const [similarHospitals, setSimilarHospitals] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/hospitals/${slug}`)
      .then((res) => setHospital(res.data.data))
      .catch(console.error);
  }, [slug]);

  useEffect(() => {
    if (!hospital?.id || !hospital?.city || !hospital?.country) return;

    const citySlug = hospital.city
      .replace(/%20/g, "")   
      .replace(/\s+/g, ""); 

    axios
      .get(
        `${API_BASE}/api/hospitals/by-city/${citySlug}?country=${encodeURIComponent(hospital.country)}`
      )
      .then((res) => {
        if (res.data?.success && Array.isArray(res.data.data)) {
          const filtered = res.data.data.filter(
            (h: any) => h.id !== hospital.id
          );
          setSimilarHospitals(filtered);
        }
      })
      .catch((err) => {
        console.error("Similar hospitals fetch error:", err);
      });
  }, [hospital]);


  // useEffect(() => {
  //   if (!hospital) return;

  //   if (!hospital.specialities || hospital.specialities.length === 0) {
  //     axios
  //       .get(`${API_BASE}/api/doctors`)
  //       .then((res) => {
  //         if (res.data?.success) {
  //           setDoctors(res.data.data || []);
  //         }
  //       })
  //       .catch((err) => {
  //         console.error("All doctors fetch error:", err);
  //       });

  //     return;
  //   }

  //   const specialityId = hospital.specialities[0]?.id;

  //   if (!specialityId) return;

  //   axios
  //     .get(`${API_BASE}/api/doctors/by-speciality/${specialityId}`)
  //     .then((res) => {
  //       if (res.data?.success) {
  //         setDoctors(res.data.data || []);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("Doctors fetch error:", err);
  //     });

  // }, [hospital]);

useEffect(() => {
  if (!hospital) return;

  // ❗ Agar speciality hi nahi hai → sab doctors
  if (!hospital.specialities || hospital.specialities.length === 0) {
    axios
      .get(`${API_BASE}/api/doctors`)
      .then((res) => {
        if (res.data?.success) {
          setDoctors(res.data.data || []);
        }
      })
      .catch(console.error);
    return;
  }

  const specialityIds = hospital.specialities.map((s: any) => s.id);

  Promise.all(
    specialityIds.map((id: number) =>
      axios.get(`${API_BASE}/api/doctors/by-speciality/${id}`)
    )
  )
    .then((responses) => {
      // 🔹 saare doctors ko ek array me merge karo
      const allDoctors = responses.flatMap(
        (res) => res.data?.data || []
      );

      // 🔹 duplicate doctors hatao (agar same doctor multiple speciality me ho)
      const uniqueDoctors = Array.from(
        new Map(allDoctors.map((d: any) => [d.id, d])).values()
      );

      setDoctors(uniqueDoctors);
    })
    .catch((err) => {
      console.error("Doctors fetch error:", err);
    });

}, [hospital]);

  if (!hospital) return null;


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

        {similarHospitals.length > 0 && (
          <SimilarHospitals hospitals={similarHospitals} isMobile={isMobile} city={hospital.city}
          />
        )}

        <DoctorsSection doctors={doctors} isMobile={isMobile} city={hospital.city} />

      </div>
      <ModalAppointment
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Footer />
    </>
  );
}
