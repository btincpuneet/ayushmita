import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import { API_BASE } from "../config/api";
import HospitalPageHeader from "../components/Hospital/HospitalPageHeader";
import HospitalCard from "../components/Hospital/HospitalCard";
import BookingForm from "../components/BookingForm";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 5;

export default function Index() {
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/hospitals`);

        const formatted = res.data.data.map((h: any) => ({
          id: h.id,
          name: h.name?.trim(),
          country: h.country?.replace(",", "").trim(),
          city: h.city?.replace(",", "").trim(),
          address: h.address?.replace(",", "").trim(),
          image_url: h.image_url,
          founded_year: h.founded_year,
          hospital_beds: h.hospital_beds,
          slug: h.slug,
        }));

        setHospitals(formatted);

        const uniqueCountries = [
          ...new Set(formatted.map((h: any) => h.country).filter(Boolean)),
        ];
        setCountries(uniqueCountries);
      } catch {
        setError("Failed to load hospitals");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!selectedCountry) {
      setCities([]);
      return;
    }

    const filteredCities = hospitals
      .filter((h) => h.country === selectedCountry)
      .map((h) => h.city)
      .filter(Boolean);

    const uniqueCities = [...new Set(filteredCities)];
    setCities(uniqueCities);
  }, [selectedCountry, hospitals]);

 


  const filteredHospitals = hospitals.filter((h) => {
    return (
      (!selectedCountry || h.country === selectedCountry) &&
      (!selectedCity || h.city === selectedCity)
    );
  });


  const totalPages = Math.ceil(filteredHospitals.length / ITEMS_PER_PAGE);

  const paginatedHospitals = filteredHospitals.slice(
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
        <HospitalPageHeader
          title="Best Hospitals"
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
                  <p className="text-center text-gray-600">
                    Loading hospitals...
                  </p>
                ) : error ? (
                  <p className="text-center text-red-500">{error}</p>
                ) : (
                  <>
                    <h2 className="text-sm text-[#454D5D] mb-4">
                      Listing {filteredHospitals.length} Hospitals
                      {selectedCountry && ` in ${selectedCountry}`}
                    </h2>

                    <div className="space-y-6">
                      {paginatedHospitals.map((hospital) => (
                        <HospitalCard
                          key={hospital.id}
                          hospital={hospital}
                        />
                      ))}
                    </div>

                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
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
}
