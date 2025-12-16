import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import HospitalPageHeader from "../components/Hospital/HospitalPageHeader";
import HospitalCard from "../components/Hospital/HospitalCard";
import BookingForm from "../components/BookingForm";

const countries = ["Turkey", "India", "UAE"];

const citiesByCountry: Record<string, string[]> = {
  Turkey: ["Istanbul", "Ankara", "Izmir"],
  India: ["Delhi", "Mumbai", "Bangalore"],
  UAE: ["Dubai", "Abu Dhabi", "Sharjah"],
};

export default function Index() {
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const cities = selectedCountry ? citiesByCountry[selectedCountry] || [] : [];

  // Fetch hospitals from API
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5001/api/hospitals");

        setHospitals(
          res.data.data.map((h: any) => ({
            id: h.id,
            name: h.name?.trim(),
            country: h.country?.replace(",", "").trim(),
            city: h.city?.replace(",", "").trim(),
            address: h.address?.replace(",", "").trim(),
            image_url: h.image_url,
            founded_year: h.founded_year,
            hospital_beds: h.hospital_beds,
            slug: h.slug,
          }))
        );

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load hospitals");
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter hospitals by country + city
  const filteredHospitals = hospitals.filter((h) => {
    return (
      (!selectedCountry || h.country === selectedCountry) &&
      (!selectedCity || h.city === selectedCity)
    );
  });

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
                  <p className="text-center text-gray-600">Loading hospitals...</p>
                ) : error ? (
                  <p className="text-center text-red-500">{error}</p>
                ) : (
                  <>
                    <h2 className="text-md text-foreground mb-4">
                      Listing {filteredHospitals.length} Hospitals
                      {selectedCountry ? ` in ${selectedCountry}` : ""}
                    </h2>

                    {filteredHospitals.length === 0 ? (
                      <div className="bg-card rounded-lg p-8 text-center card-shadow">
                        <p className="text-muted-foreground">
                          No hospitals found matching your criteria.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {filteredHospitals.map((hospital, index) => (
                          <div
                            key={hospital.id}
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <HospitalCard hospital={hospital} />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* RIGHT SIDE FORM */}
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
