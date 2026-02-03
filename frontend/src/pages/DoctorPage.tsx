
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_BASE } from "../config/api";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import DoctorPageHeader from "../components/Doctors/DoctorPageHeader";
import DoctorCard from "../components/Doctors/DoctorCard";
import BookingForm from "../components/BookingForm";
import Pagination from "../components/Pagination";
import { NotFound } from "./NotFound";

const ITEMS_PER_PAGE = 4;

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  city: string;
  country: string;
  image_url: string | null;
  slug: string;
}

const DoctorsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/doctors/active`);

        const list: Doctor[] = res.data?.data ?? [];
        setDoctors(list);
      } catch {
        setError("Failed to load doctors");
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  const countries = useMemo(() => {
    return Array.from(
      new Set(doctors.map(d => d.country).filter(Boolean))
    );
  }, [doctors]);

  const cities = useMemo(() => {
    if (!selectedCountry) return [];

    return Array.from(
      new Set(
        doctors
          .filter(d => d.country === selectedCountry)
          .map(d => d.city)
          .filter(Boolean)
      )
    );
  }, [doctors, selectedCountry]);

  const filteredDoctors = doctors.filter(d =>
    (!selectedCountry || d.country === selectedCountry) &&
    (!selectedCity || d.city === selectedCity)
  );

  const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE);

  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCountry, selectedCity]);

  return (
    <>
      <Header />

      <main className="min-h-screen">
        <DoctorPageHeader
          title="Best Doctors"
          breadcrumbs={[
            { label: "Home", link: "/" },
            { label: "Doctors" },
          ]}
          countries={countries}
          cities={cities}
          selectedCountry={selectedCountry}
          selectedCity={selectedCity}
          onCountryChange={(e) => {
            setSelectedCountry(e.target.value);
            setSelectedCity("");
          }}
          onCityChange={(e) => setSelectedCity(e.target.value)}
        />


        <section className="py-12">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {loading ? (
                  <p className="text-center text-gray-500">Loading doctors...</p>
                ) : error ? (
                  <p className="text-center text-red-500">{error}</p>
                ) : (
                  <>
                    <h2 className="text-sm text-[#454D5D] mb-4">
                      Listing {filteredDoctors.length} Doctors
                      {selectedCity && ` in ${selectedCity}`}
                    </h2>

                    {filteredDoctors.length === 0 ? (
                      <div className="bg-white rounded-lg p-8 text-center shadow">
                        No doctors found.
                      </div>
                    ) : (
                      <>
                        <div className="space-y-6">
                          {paginatedDoctors.map((doctor) => (
                            <DoctorCard key={doctor.id} doctor={doctor} />
                          ))}
                        </div>

                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={setCurrentPage}
                        />
                      </>
                    )}
                  </>
                )}
              </div>

              <div className="lg:col-span-1">
                <BookingForm />
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default DoctorsPage;
