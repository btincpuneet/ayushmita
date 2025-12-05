import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import HospitalPageHeader from "../components/Hospital/HospitalPageHeader";
import HospitalCard from "../components/Hospital/HospitalCard";
import ConsultationForm from "../components/Hospital/ConsultationForm";

const hospitals = [
  {
    id: 1,
    name: "Acibadem Hospitals Group, Istanbul, Turkey",
    country: "Turkey",
    city: "Istanbul",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop",
    address: "Altunizade Mah. Yurtcan Sok. No:1 Üsküdar Istanbul Istanbul 34662 Turkey",
    founded: 1991,
    beds: 610,
  },
  {
    id: 2,
    name: "Derindere Hospital, Istanbul",
    country: "Turkey",
    city: "Istanbul",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
    address: "Altunizade Mah. Yurtcan Sok. No:1 Üsküdar Istanbul Istanbul 34662 Turkey",
    founded: 1991,
    beds: 610,
  },
  {
    id: 3,
    name: "Estpoint Aesthetic & Hair Center, Kadikoy, Istanbul",
    country: "Turkey",
    city: "Istanbul",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop",
    address: "Altunizade Mah. Yurtcan Sok. No:1 Üsküdar Istanbul Istanbul 34662 Turkey",
    founded: 1991,
    beds: 610,
  },
  {
    id: 4,
    name: "Florence Nightingale Hospital",
    country: "Turkey",
    city: "Ankara",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400&h=300&fit=crop",
    address: "Cankaya District, Ankara, Turkey",
    founded: 1989,
    beds: 450,
  },
  {
    id: 5,
    name: "Yeni Yuzyil University Gaziosmanpasa Hospital, Istanbul",
    country: "Turkey",
    city: "Istanbul",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=300&fit=crop",
    address: "Altunizade Mah. Yurtcan Sok. No:1 Üsküdar Istanbul Istanbul 34662 Turkey",
    founded: 1991,
    beds: 610,
  },
  {
    id: 6,
    name: "EyeSTAR LASIK Institute, Istanbul",
    country: "Turkey",
    city: "Istanbul",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=300&fit=crop",
    address: "Altunizade Mah. Yurtcan Sok. No:1 Üsküdar Istanbul Istanbul 34662 Turkey",
    founded: 1991,
    beds: 610,
  },
  {
    id: 7,
    name: "Apollo Hospital",
    country: "India",
    city: "Delhi",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    address: "Sarita Vihar, Delhi Mathura Road, New Delhi, India",
    founded: 1983,
    beds: 700,
  },
  {
    id: 8,
    name: "Burjeel Hospital",
    country: "UAE",
    city: "Dubai",
    image: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?w=400&h=300&fit=crop",
    address: "Al Najda Street, Abu Dhabi, UAE",
    founded: 2012,
    beds: 300,
  },
];

const countries = ["Turkey", "India", "UAE"];

const citiesByCountry: Record<string, string[]> = {
  Turkey: ["Istanbul", "Ankara", "Izmir"],
  India: ["Delhi", "Mumbai", "Bangalore"],
  UAE: ["Dubai", "Abu Dhabi", "Sharjah"],
};

export default function Index() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const cities = selectedCountry ? citiesByCountry[selectedCountry] || [] : [];

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
          title="Best Hospitals in Turkey"
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
              {/* LEFT: Hospital Listing */}
              <div className="lg:col-span-2">
                <h2 className="text-md text-foreground">
                  Listing {filteredHospitals.length} Hospitals in{" "}
                  {selectedCountry || "All Countries"}
                </h2>

                {filteredHospitals.length === 0 ? (
                  <div className="bg-card rounded-lg p-8 text-center card-shadow">
                    <p className="text-muted-foreground">No hospitals found matching your criteria.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredHospitals.map((hospital, index) => (
                      <div key={hospital.id} style={{ animationDelay: `${index * 0.1}s` }}>
                        <HospitalCard hospital={hospital} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT: Consultation Form */}
              <div className="lg:col-span-1">
                <ConsultationForm />
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
