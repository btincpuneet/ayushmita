import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import BookingForm from "../components/Hospital/BookingForm";
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

function NextArrow({ onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
    >
      <ArrowRight size={18} className="text-orange-500" />
    </button>
  );
}

function PrevArrow({ onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
    >
      <ArrowLeft size={18} className="text-orange-500" />
    </button>
  );
}

function HospitalInfoCard({ hospital }: any) {
  return (
    <div className="bg-white">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <img
          src={`http://127.0.0.1:5001${hospital.image_url}`}
          alt={hospital.name}
          className="w-full lg:w-[320px] h-[220px] object-cover rounded-xl"
        />

        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">{hospital.name}</h1>

          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex gap-3">
              <MapPin size={18} className="text-orange-500 mt-0.5" />
              {hospital.address}
            </li>

            <li className="flex gap-3">
              <Calendar size={18} className="text-orange-500" />
              Experience:{" "}
              <b>{new Date().getFullYear() - hospital.founded_year}+ Years</b>
            </li>

            <li className="flex gap-3">
              <Bed size={18} className="text-orange-500" />
              Hospital Beds: <b>{hospital.hospital_beds}</b>
            </li>

            <li className="flex gap-3">
              <Building2 size={18} className="text-orange-500" />
              Specialty: <b>Multi Specialty</b>
            </li>

            <li className="flex gap-3">
              <Map size={18} className="text-orange-500" />
              City: <b>{hospital.city}</b>
            </li>

            <li className="flex gap-3">
              <Globe size={18} className="text-orange-500" />
              Country: <b>{hospital.country}</b>
            </li>
          </ul>

          <div className="flex gap-4 mt-6">
            <button className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold">
              Book Appointment
            </button>
            <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold">
              Chat Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentSection({ title, html }: any) {
  if (!html) return null;
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <div
        className="text-sm text-gray-600 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

function FacilitiesSection({ facilities }: any) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Facilities</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
        {Object.entries(facilities).map(([title, items]: any) => (
          <div key={title}>
            <h4 className="font-semibold text-orange-500 mb-3 uppercase">
              {title}
            </h4>
            <ul className="space-y-2">
              {items.map((item: string) => (
                <li key={item} className="flex gap-2">
                  <Check size={16} className="text-green-600 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
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
      <h2 className="text-xl font-bold mb-6">Similar Hospitals</h2>

      <Slider {...settings}>
        {hospitals.map((h: any) => (
          <div key={h.name} className="px-3">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <img
                src={h.image}
                alt={h.name}
                className="h-44 w-full object-cover"
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
      <h2 className="text-xl font-bold mb-6">Doctors</h2>

      <Slider {...settings}>
        {doctors.map((d: any) => (
          <div key={d.name} className="px-3">
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <img
                src={d.image}
                alt={d.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-3"
              />
              <h4 className="font-semibold text-sm">{d.name}</h4>
              <p className="text-xs text-orange-500">{d.dept}</p>
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

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5001/api/hospitals/${slug}`)
      .then((res) => setHospital(res.data.data));
  }, [slug]);

  if (!hospital) return null;

  const facilities = {
    "Comfort During Stay": ["Private Rooms", "Wi-Fi", "Laundry"],
    Food: ["Diet Meals", "International Cuisine"],
    Transportation: ["Airport Pickup", "Ambulance"],
  };

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
          { label: "Hospitals", link: "/hospitals" },
          { label: hospital.name },
        ]}
      />

      <Container className="py-10 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
          <div className="lg:col-span-2">
            <HospitalInfoCard hospital={hospital} />
          </div>
          <div className="lg:col-span-1 sticky top-24">
            <BookingForm />
          </div>
        </div>

        <div className="max-w-[860px] space-y-12">
          <ContentSection
            title="About Hospital"
            html={hospital.description_html}
          />
          <FacilitiesSection facilities={facilities} />
        </div>

        <SimilarHospitals hospitals={similarHospitals} />
        <DoctorsSection doctors={doctors} />
      </Container>

      <Footer />
    </>
  );
}
