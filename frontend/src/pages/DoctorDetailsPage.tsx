import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { Briefcase, Stethoscope, MapPin, Building2, Globe, ChevronRight } from "lucide-react";
import ModalAppointment from "../components/Treatment/ModalAppointment"

import TreatmentHeader from "../components/Treatment/TreatmentHeader";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import BookingForm from "../components/BookingForm";

/* -------------------- TYPES -------------------- */
interface Doctor {
    id: number;
    name: string;
    slug: string;
    title: string;
    specialty: string;
    experience: number;
    country: string;
    city: string;
    description: string;
    description_html: string;
    image_url: string | null;
}

/* -------------------- SLIDER ARROWS -------------------- */
const NextArrow = ({ onClick }: any) => (
    <button
        onClick={onClick}
        className="absolute -right-5 top-1/2 -translate-y-1/2 z-10
               w-10 h-10 bg-white rounded-full shadow
               flex items-center justify-center"
    >
        <svg width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.3615 6L12.9105 8.59L14.25 10L19 5L14.25 0L12.9105 1.41L15.3615 4H0V6H15.3615Z" fill="#F0A324" />
        </svg>
    </button>
);

const PrevArrow = ({ onClick }: any) => (
   <span></span>
);

/* -------------------- PAGE -------------------- */
const DoctorDetailsPage: React.FC = () => {
    const { slug } = useParams();
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [similarDoctors, setSimilarDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const doctorRes = await axios.get(
                    `http://127.0.0.1:5001/api/doctors/${slug}`
                );

                const listRes = await axios.get(
                    `http://127.0.0.1:5001/api/doctors`
                );

                setDoctor(doctorRes.data.data);
                setSimilarDoctors(
                    listRes.data.data.filter((d: Doctor) => d.slug !== slug)
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [slug]);

    if (loading) {
        return (
            <>
                <Header />
                <main className="mt-[90px] py-20 text-center text-gray-500">
                    Loading doctor details...
                </main>
                <Footer />
            </>
        );
    }

    if (!doctor) {
        return (
            <>
                <Header />
                <main className="mt-[90px] py-20 text-center text-red-500">
                    Doctor not found
                </main>
                <Footer />
            </>
        );
    }

    const image = doctor.image_url
        ? `http://127.0.0.1:5001${doctor.image_url}`
        : "https://images.unsplash.com/photo-1606813909359-9c9d45d90c2e";

    /* -------------------- SLIDER SETTINGS -------------------- */
    const doctorSlider = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    const hospitalSlider = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <>
            <Header />
            <TreatmentHeader
                title={doctor.name}
                breadcrumbs={[
                    { label: "Home", link: "/" },
                    { label: "Hospitals", link: "/hospitals" },
                    { label: doctor.name },
                ]}
            />
            <main className=" bg-gray-50">
                <section className="py-10">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2  p-6 ">
                                <div className="flex flex-col md:flex-row gap-6 items-start">

                                    <div className="flex-shrink-0">
                                        <img
                                            src={image}
                                            alt={doctor.name}
                                            className="w-[370px] h-[276px] object-cover rounded-2xl"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1 text-sm">
                                            <Briefcase className="text-[#F0A324] w-5 h-5" />
                                            <span style={{
                                                fontFamily: "Ubuntu, sans-serif",
                                                fontWeight: 400,
                                                fontStyle: "normal",
                                                fontSize: "14px",
                                                lineHeight: "26px",
                                                letterSpacing: "0%",
                                            }}
                                            >
                                                Experience: <strong style={{
                                                    fontFamily: "Ubuntu, sans-serif",
                                                    fontWeight: 700,
                                                    fontStyle: "normal",
                                                    fontSize: "14px",
                                                    lineHeight: "26px",
                                                    letterSpacing: "0%",
                                                }}
                                                >{doctor.experience}+ years of experience</strong>
                                            </span>
                                        </div>


                                        <div className="flex items-center mb-2 gap-3 text-sm">
                                            <Stethoscope className="text-[#F0A324] w-5 h-5" />
                                            <span style={{
                                                fontFamily: "Ubuntu, sans-serif",
                                                fontWeight: 400,
                                                fontStyle: "normal",
                                                fontSize: "14px",
                                                lineHeight: "26px",
                                                letterSpacing: "0%",
                                            }}>
                                                Specialty: <strong style={{
                                                    fontFamily: "Ubuntu, sans-serif",
                                                    fontWeight: 700,
                                                    fontStyle: "normal",
                                                    fontSize: "14px",
                                                    lineHeight: "26px",
                                                    letterSpacing: "0%",
                                                }}>{doctor.specialty}</strong>
                                            </span>
                                        </div>

                                        <div className="flex items-center mb-2 gap-3 text-sm">
                                            <Building2 className="text-[#F0A324] w-5 h-5" />
                                            <span style={{
                                                fontFamily: "Ubuntu, sans-serif",
                                                fontWeight: 400,
                                                fontStyle: "normal",
                                                fontSize: "14px",
                                                lineHeight: "26px",
                                                letterSpacing: "0%",
                                            }}
                                            >
                                                Hospital: <strong style={{
                                                    fontFamily: "Ubuntu, sans-serif",
                                                    fontWeight: 700,
                                                    fontStyle: "normal",
                                                    fontSize: "14px",
                                                    lineHeight: "26px",
                                                    letterSpacing: "0%",
                                                }}
                                                >{doctor.hospital || "Medanta"}</strong>
                                            </span>
                                        </div>

                                        {/* CITY */}
                                        <div className="flex items-center mb-2 gap-3 text-sm">
                                            <MapPin className="text-[#F0A324] w-5 h-5" />
                                            <span style={{
                                                fontFamily: "Ubuntu, sans-serif",
                                                fontWeight: 400,
                                                fontStyle: "normal",
                                                fontSize: "14px",
                                                lineHeight: "26px",
                                                letterSpacing: "0%",
                                            }}
                                            >
                                                City: <strong style={{
                                                    fontFamily: "Ubuntu, sans-serif",
                                                    fontWeight: 700,
                                                    fontStyle: "normal",
                                                    fontSize: "14px",
                                                    lineHeight: "26px",
                                                    letterSpacing: "0%",
                                                }}
                                                >{doctor.city}</strong>
                                            </span>
                                        </div>

                                        {/* COUNTRY */}
                                        <div className="flex items-center mb-2 gap-3 text-sm">
                                            <Globe className="text-[#F0A324] w-5 h-5" />
                                            <span style={{
                                                fontFamily: "Ubuntu, sans-serif",
                                                fontWeight: 400,
                                                fontStyle: "normal",
                                                fontSize: "14px",
                                                lineHeight: "26px",
                                                letterSpacing: "0%",
                                            }}
                                            >
                                                Country: <strong style={{
                                                    fontFamily: "Ubuntu, sans-serif",
                                                    fontWeight: 700,
                                                    fontStyle: "normal",
                                                    fontSize: "14px",
                                                    lineHeight: "26px",
                                                    letterSpacing: "0%",
                                                }}
                                                >{doctor.country}</strong>
                                            </span>
                                        </div>

                                        {/* BUTTON */}
                                        <button className="mt-4 inline-block bg-yellow-500 hover:bg-yellow-600 transition text-white font-semibold px-6 py-3 rounded-lg">
                                            Book An Appointment
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-10 ">
                                    <div
                                        className="mt-10  space-y-8 prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: doctor.description_html }}
                                    />


                                </div>

                            </div>

                            <BookingForm />
                        </div>
                    </Container>
                </section>

                <section className="py-10">
                    <Container>
                        <h2 className="mb-6" style={{
  fontFamily: "Ubuntu, sans-serif",
  fontWeight: 700,
  fontStyle: "normal",
  fontSize: "28px",
  lineHeight: "100%",
  letterSpacing: "0%",
}}
>
                            Similar Doctors in {doctor.city}
                        </h2>

                        <div className="relative">
                            <Slider {...doctorSlider}>
                                {similarDoctors.map((d) => (
                                    <div key={d.id} className="px-3" >
                                        <div className="bg-white rounded-xl shadow text-center">
                                            <img
                                                src={
                                                    d.image_url
                                                        ? `http://127.0.0.1:5001${d.image_url}`
                                                        : image
                                                }
                                                className="h-[233px] w-full object-cover rounded-2xl"
                                            />
                                            <h3 style={{
                                                fontFamily: "Ubuntu, sans-serif",
                                                fontWeight: 700,
                                                fontSize: "20px",
                                                lineHeight: "55px",
                                                letterSpacing: "0px",
                                                textAlign: "center",
                                            }}
                                            >{d.name}</h3>
                                            <p style={{
                                                fontFamily: "Ubuntu, sans-serif",
                                                fontWeight: 700,
                                                fontSize: "15px",

                                                letterSpacing: "0px",
                                                textAlign: "center",
                                                color: "#F0A324",
                                            }}
                                            >{d.specialty}</p>

                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </Container>
                </section>

                <section className="py-10 bg-white">
                    <Container>
                        <h2 className="mb-6" style={{
  fontFamily: "Ubuntu, sans-serif",
  fontWeight: 700,
  fontStyle: "normal",
  fontSize: "28px",
  lineHeight: "100%",
  letterSpacing: "0%",
}}
>
                            Similar Hospitals in {doctor.city}
                        </h2>

                        <div className="relative">
                            <Slider {...hospitalSlider}>
                                {["LIV Hospital", "American Hospital", "American Hospital", "Emsey Hospital"].map(
                                    (name, i) => (
                                        <div key={i} className="px-3">
                                            <div className="rounded-xl overflow-hidden shadow">
                                                <img
                                                    src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
                                                    className="h-[280px] w-full object-cover rounded-2xl"
                                                />
                                                <div className="p-4">
                                                    <h3 style={{
                                                        fontFamily: "Ubuntu, sans-serif",
                                                        fontWeight: 700,
                                                        fontStyle: "normal",
                                                        fontSize: "20px",
                                                        lineHeight: "28px",
                                                        letterSpacing: "0%",
                                                    }}
                                                    >{name}</h3>
                                                    <p className="mt-3" style={{
                                                        fontFamily: "Ubuntu, sans-serif",
                                                        fontWeight: 400,
                                                        fontStyle: "normal",
                                                        fontSize: "14px",
                                                        lineHeight: "10px",
                                                        letterSpacing: "0%",
                                                    }}
                                                    >
                                                        {doctor.city}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </Slider>
                        </div>
                    </Container>
                </section>
            </main>

            <Footer />
            <ModalAppointment
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default DoctorDetailsPage;
