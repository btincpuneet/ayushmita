import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { Briefcase, Stethoscope, MapPin, Building2, Globe, ChevronRight } from "lucide-react";

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
        <ChevronRight className="text-orange-500" />
    </button>
);

const PrevArrow = ({ onClick }: any) => (
    <button
        onClick={onClick}
        className="absolute -left-5 top-1/2 -translate-y-1/2 z-10
               w-10 h-10 bg-white rounded-full shadow
               flex items-center justify-center"
    >
        <ChevronRight className="rotate-180 text-orange-500" />
    </button>
);

/* -------------------- PAGE -------------------- */
const DoctorDetailsPage: React.FC = () => {
    const { slug } = useParams();
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [similarDoctors, setSimilarDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

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
                                            className="w-[320px] h-[320px] object-cover rounded-2xl"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-3  text-sm">
                                            <Briefcase className="text-yellow-500 w-5 h-5" />
                                            <span className="font-medium">
                                                Experience: <strong>{doctor.experience}+ years of experience</strong>
                                            </span>
                                        </div>


                                        <div className="flex items-center gap-3 text-sm">
                                            <Stethoscope className="text-yellow-500 w-5 h-5" />
                                            <span>
                                                Specialty: <strong>{doctor.specialty}</strong>
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 text-sm">
                                            <Building2 className="text-yellow-500 w-5 h-5" />
                                            <span>
                                                Hospital: <strong>{doctor.hospital || "Medanta"}</strong>
                                            </span>
                                        </div>

                                        {/* CITY */}
                                        <div className="flex items-center gap-3 text-sm">
                                            <MapPin className="text-yellow-500 w-5 h-5" />
                                            <span>
                                                City: <strong>{doctor.city}</strong>
                                            </span>
                                        </div>

                                        {/* COUNTRY */}
                                        <div className="flex items-center gap-3 text-sm">
                                            <Globe className="text-yellow-500 w-5 h-5" />
                                            <span>
                                                Country: <strong>{doctor.country}</strong>
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
                        <h2 className="text-xl font-bold mb-6">
                            Similar Doctors in {doctor.city}
                        </h2>

                        <div className="relative">
                            <Slider {...doctorSlider}>
                                {similarDoctors.map((d) => (
                                    <div key={d.id} className="px-3">
                                        <div className="bg-white rounded-xl shadow text-center">
                                            <img
                                                src={
                                                    d.image_url
                                                        ? `http://127.0.0.1:5001${d.image_url}`
                                                        : image
                                                }
                                                className=""
                                            />
                                            <h3 className="font-semibold text-sm">{d.name}</h3>
                                            <p className="text-xs text-gray-500">{d.specialty}</p>

                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </Container>
                </section>

                <section className="py-10 bg-white">
                    <Container>
                        <h2 className="text-xl font-bold mb-6">
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
                                                    className="h-40 w-full object-cover"
                                                />
                                                <div className="p-4">
                                                    <h3 className="font-semibold">{name}</h3>
                                                    <p className="text-sm text-gray-500">
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
        </>
    );
};

export default DoctorDetailsPage;
