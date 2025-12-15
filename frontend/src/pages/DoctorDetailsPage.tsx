import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import {
    MapPin,
    Briefcase,
    Stethoscope,
    ChevronRight,
} from "lucide-react";
import TreatmentHeader from "../components/Treatment/TreatmentHeader";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import ConsultationForm from "../components/Hospital/ConsultationForm";
import BookingForm from "../components/Hospital/BookingForm";

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
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
                            <div className="lg:col-span-2  p-6 ">
                                <div className="flex gap-6">
                                    <img
                                        src={image}
                                        className="w-40 h-40 object-cover rounded-xl"
                                    />

                                    <div>
                                        <h1 className="text-2xl font-bold">{doctor.name}</h1>
                                        <p className="text-gray-600 mb-3">{doctor.specialty}</p>

                                        <div className="flex items-center gap-2 text-sm">
                                            <Briefcase size={16} className="text-orange-500" />
                                            {doctor.experience}+ years experience
                                        </div>

                                        <div className="flex items-center gap-2 text-sm">
                                            <Stethoscope size={16} className="text-orange-500" />
                                            {doctor.specialty}
                                        </div>

                                        <div className="flex items-center gap-2 text-sm">
                                            <MapPin size={16} className="text-orange-500" />
                                            {doctor.city}, {doctor.country}
                                        </div>

                                        <button className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-md">
                                            Book Appointment
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-10 space-y-8">

                                    <section>
                                        <h3 className="text-lg font-semibold mb-2 border-b pb-2">
                                            About Dr. Bhavin Dharani
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed text-sm">
                                            Dr. Bhavin Dharani, an Ophthalmology expert with 9 years of experience,
                                            is presently practicing at Insure Eye Institute in Ahmedabad. With a
                                            deep understanding of the medical field, he has successfully managed
                                            various intricate cases, providing precise diagnoses and compassionate
                                            care to his patients. Schedule your appointment with Dr. Bhavin Dharani
                                            through Medsurge India for a seamless and prioritized experience.
                                        </p>
                                    </section>

                                    <section>
                                        <h3 className="text-lg font-semibold mb-2 border-b pb-2">
                                            Education
                                        </h3>
                                        <p className="text-gray-700 text-sm">
                                            MBBS (K.G Medical College, Lucknow, U.P, India, 1968) <br />
                                            Diplomate (American Board of Surgery, U.S.A, 1977) <br />
                                            Diplomate (American Board of Cardiothoracic Surgery, 1979)
                                        </p>
                                    </section>

                                    <section>
                                        <h3 className="text-lg font-semibold mb-2 border-b pb-2">
                                            Special Interest
                                        </h3>
                                        <p className="text-gray-700 text-sm">
                                            Cardiomyoplasty, myocardial total arterial revascularization,
                                            transmyocardial laser revascularization
                                        </p>
                                    </section>

                                    <section>
                                        <h3 className="text-lg font-semibold mb-2  pb-2">
                                            Registrations
                                        </h3>
                                        <p className="text-gray-700 text-sm">
                                            7603 Delhi Medical Council, 2000
                                        </p>
                                    </section>

                                    <section>
                                        <h3 className="text-lg font-semibold mb-4  pb-2">
                                            List of Treatments
                                        </h3>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 text-sm text-gray-700">
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Squint Surgery</li>
                                                <li>Cornea Transplant</li>
                                                <li>Lasik</li>
                                                <li>Ptosis Correction</li>
                                                <li>Pterygium Excision</li>
                                                <li>Trabeculoplasty</li>
                                            </ul>

                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Keratoplasty</li>
                                                <li>Vitrectomy</li>
                                                <li>Orbital Decompression Surgery</li>
                                                <li>Cataract Surgery</li>
                                                <li>Amblyopia Surgery</li>
                                                <li>Iridotomy</li>
                                            </ul>
                                        </div>
                                    </section>

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
                                        <div className="bg-white rounded-xl shadow p-4 text-center">
                                            <img
                                                src={
                                                    d.image_url
                                                        ? `http://127.0.0.1:5001${d.image_url}`
                                                        : image
                                                }
                                                className="w-24 h-24 mx-auto rounded-full object-cover mb-3"
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
