import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config/api";
import Slider from "react-slick";
import { Briefcase, Stethoscope, MapPin, Building2, Globe, ChevronRight } from "lucide-react";
import ModalAppointment from "../components/Treatment/ModalAppointment"
import TreatmentHeader from "../components/Treatment/TreatmentHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import BookingForm from "../components/BookingForm";
import useSeo from "../hooks/useSeo";
interface Speciality {
    name: string;
}

interface Doctor {
    id: number;
    name: string;
    slug: string;
    experience: number;
    country: string;
    city: string;
    description_html: string;
    faq_html?: string;
    image_url: string | null;
    image_alt?: string | null;
    image_title?: string | null;
    seo_title?: string;
    seo_description?: string;
    seo_keywords?: string;
    canonical_url?: string;
    hospitals?: any[];
    speciality?: Speciality;
}


interface Hospital {
    id: number;
    name: string;
    slug: string;
    city: string;
    country: string;
    image_url?: string | null;
}


interface ArrowProps {
    onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute -right-5 top-1/2 -translate-y-1/2 z-10
      w-10 h-10 bg-white rounded-full shadow
      flex items-center justify-center"
    >
        <svg width="19" height="10" viewBox="0 0 19 10" fill="none">
            <path
                d="M15.3615 6L12.9105 8.59L14.25 10L19 5L14.25 0L12.9105 1.41L15.3615 4H0V6H15.3615Z"
                fill="#F0A324"
            />
        </svg>
    </button>
);

const PrevArrow: React.FC = () => <span />;


const DoctorDetailsPage: React.FC = () => {

   const rankSimilarDoctors = (baseDoctor: Doctor, doctors: Doctor[]) => {

  // ✅ CASE 1: Base doctor has NO
  //  speciality
  if (!baseDoctor.speciality?.name) {
    return doctors;
  }

  const ranked = doctors.map((d) => {
    let score = 0;

    if (d.speciality?.name === baseDoctor.speciality?.name) {
      score += 3;
    }

    if (d.country === baseDoctor.country) score += 2;
    if (d.city === baseDoctor.city) score += 1;

    return { ...d, score };
  });

  // ✅ CASE 2: No similar doctors found → show all
  const hasSimilar = ranked.some(d => d.score > 0);

  if (!hasSimilar) {
    return doctors;
  }

  // ✅ CASE 3: Show only ranked doctors
  return ranked
    .filter(d => d.score > 0)
    .sort((a, b) => b.score - a.score);
};




    const { slug } = useParams();

    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [similarDoctors, setSimilarDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [similarHospitals, setSimilarHospitals] = useState<Hospital[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const [globalSEO, setGlobalSEO] = useState<{
        seo_title?: string;
        seo_description?: string;
        seo_keywords?: string;
    } | null>(null);
    const fetchGlobalSEO = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/global-settings`);
            if (res.data?.success && res.data.data) {
                setGlobalSEO({
                    seo_title: res.data.data.seo_title,
                    seo_description: res.data.data.seo_description,
                    seo_keywords: res.data.data.seo_keywords,
                });
            }
        } catch (error) {
            console.error("Failed to fetch global SEO", error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const doctorRes = await axios.get(
                    `${API_BASE}/api/doctors/${slug}`
                );

                const baseDoctor = doctorRes.data.data;
                setDoctor(baseDoctor);

                const similarDoctorRes = await axios.get(
                    `${API_BASE}/api/doctors/similar/${slug}`
                );

                const rankedDoctors = rankSimilarDoctors(
                    baseDoctor,
                    similarDoctorRes.data.data.doctors || []
                );

                setSimilarDoctors(rankedDoctors);

                if (baseDoctor.city) {


                    const hospitalRes = await axios.get(
                        `${API_BASE}/api/hospitals/by-city/${baseDoctor.city}`,
                        {
                            params: {
                                country: baseDoctor.country,
                            },
                        }
                    );
                    setSimilarHospitals(hospitalRes.data.data || []);

                }

            } catch (error) {
                console.error("Doctor details error:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
        fetchGlobalSEO();
    }, [slug]);
    const seoTitle =
        doctor?.seo_title ||
        globalSEO?.seo_title ||
        doctor?.name ||
        "Best Doctor";

    const seoDescription =
        doctor?.seo_description ||
        globalSEO?.seo_description ||
        `Consult ${doctor?.name || "our expert doctor"} for treatment`;

    const seoKeywords =
        doctor?.seo_keywords ||
        globalSEO?.seo_keywords ||
        "doctor, hospital, treatment";
    const canonicalUrl =
        doctor?.canonical_url ||
        `${window.location.origin}/doctors/${doctor?.slug}`;

    useSeo(seoTitle, seoDescription, seoKeywords, canonicalUrl);

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
        ? `${API_BASE}${doctor.image_url}`
        : "https://images.unsplash.com/photo-1606813909359-9c9d45d90c2e";

    const doctorSlider = {
        dots: false,
        infinite: similarDoctors.length > 4,
        speed: 500,
        slidesToScroll: 1,
        arrows: !isMobile,

        slidesToShow: isMobile ? 1 : 4,

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
        infinite: similarHospitals.length > 3,
        speed: 500,
        slidesToScroll: 1,
        arrows: !isMobile,

        slidesToShow: isMobile ? 1 : 3,

        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,

        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };

    const imageAlt =
        doctor.image_alt ||
        `${doctor.name} - ${doctor.speciality || "Doctor"} in ${doctor.city}`;

    const imageTitle =
        doctor.image_title ||
        `${doctor.name} - ${doctor.speciality || "Doctor"}`;

    return (
        <>
            <Header />
            <TreatmentHeader
                title={doctor.name}
                breadcrumbs={[
                    { label: "Home", link: "/" },
                    { label: "Doctor", link: "/doctors" },
                    { label: doctor.name },
                ]}
            />

            <main className="main-sec-det-pg">
                <section className="py-10 doctor-details-page-list-items-sec">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2  p-6 ">
                                <div className="flex flex-col md:flex-row gap-6 items-start">

                                    <div className="flex-shrink-0 ">
                                        <img
                                            src={
                                                doctor?.image_url
                                                    ? `${API_BASE}${doctor.image_url}`
                                                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s"
                                            }
                                            alt={imageAlt}
                                            title={imageTitle}
                                            className="object-cover rounded-2xl doctor-detail-page-image-1"
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
                                                }}>{doctor.speciality?.name || "Not Mention"}
                                                </strong>
                                            </span>
                                        </div>

                                        <div className="flex items-start mb-2 gap-3 text-sm">
                                            <Building2 className="text-[#F0A324] w-5 h-5 mt-1" />
                                            <span
                                                style={{
                                                    fontFamily: "Ubuntu, sans-serif",
                                                    fontWeight: 400,
                                                    fontSize: "14px",
                                                    lineHeight: "26px",
                                                }}
                                            >
                                                Hospital:&nbsp;
                                                <strong
                                                    style={{
                                                        fontFamily: "Ubuntu, sans-serif",
                                                        fontWeight: 700,
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    {doctor.hospitals && doctor.hospitals.length > 0
                                                        ? doctor.hospitals.map((h) => h.name).join("")
                                                        : "N/A"}
                                                </strong>
                                            </span>
                                        </div>


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

                                        <button onClick={() => setIsModalOpen(true)} className="mt-4 inline-block bg-[#F0A324] hover:bg-yellow-600 transition px-4 py-3 rounded-lg" style={{
                                            fontFamily: '"Open Sans", sans-serif',
                                            fontWeight: 600,
                                            fontStyle: "normal",
                                            fontSize: "12px",
                                            lineHeight: "100%",
                                            letterSpacing: "0%",
                                        }}>
                                            Book An Appointment
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <div
                                        className="cms-content "
                                        dangerouslySetInnerHTML={{ __html: doctor.description_html }}
                                    />
                                </div>

                                {doctor.faq_html && (
                                    <div className="mt-2">
                                        <div
                                            className="conatiner cms-content "
                                            dangerouslySetInnerHTML={{ __html: doctor.faq_html }}
                                        />
                                    </div>
                                )}


                            </div>

                            <BookingForm />
                        </div>
                    </Container>
                </section>

                <section className="py-6 similar-doctor-section-docdetails-page">
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
                            <Slider {...doctorSlider} key={`${similarDoctors.length}-${isMobile}`}>
                                {similarDoctors.map((d) => (
                                    <div key={d.id} className="px-3">
                                        <Link to={`/doctor/${d.slug}`}>
                                            <div className="bg-white rounded-xl shadow text-center">
                                                <img
                                                    src={d.image_url ? `${API_BASE}${d.image_url}` : image}
                                                    alt={d.image_alt || d.name}
                                                    title={d.image_title || d.name}
                                                    className="h-[233px] w-full object-cover rounded-2xl"
                                                />
                                                <h3 className="text-[20px] font-bold">{d.name}</h3>
                                                <p className="text-[#F0A324] font-bold pb-3">
                                                    {d.speciality?.name || "Specialist"}
                                                </p>

                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </Slider>

                        </div>
                    </Container>
                </section>

                {similarHospitals.length > 0 && (
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

                                {similarHospitals.length > 0 && (
                                    <Slider
                                        {...hospitalSlider}
                                        key={`${similarHospitals.length}-${isMobile}`}
                                    >
                                        {similarHospitals.map((h) => (
                                            <div key={h.id} className="px-3 related-cards-1">
                                                <Link to={`/hospitals/${h.slug}`}>
                                                    <div className="rounded-xl overflow-hidden shadow">
                                                        <img
                                                            src={
                                                                h.image_url
                                                                    ? `${API_BASE}${h.image_url}`
                                                                    : "https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
                                                            }
                                                            alt={h.name}
                                                            className="h-[280px] w-full object-cover rounded-2xl"
                                                        />
                                                        <div className="p-4">
                                                            <h3 className="text-[20px] font-bold">{h.name}</h3>
                                                            <p className="mt-2 text-sm">
                                                                {h.city}, {h.country}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </Slider>
                                )}

                            </div>
                        </Container>
                    </section>
                )}

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
