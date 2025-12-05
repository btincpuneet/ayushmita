import React from "react";
import Container from "../components/Container";
import HeroTreatmentSection from "../components/Treatment/HeroTreatmentSection";
import TreatmentCategorySidebar from "../components/Treatment/TreatmentCategorySidebar";
import TreatmentDescription from "../components/Treatment/TreatmentDescription";
import MedicalTourism from "../components/MedicalTourism";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TreatmentPage = () => {
    return (
        <>
            <Header />

            <main>
                <section aria-label="Treatment Hero Section">
                    <HeroTreatmentSection />
                </section>

                <section className="py-12" aria-label="Treatment Categories">
                    <Container>
                        <TreatmentCategorySidebar />
                    </Container>
                </section>

                <section aria-label="Treatment Description">
                    <TreatmentDescription />
                </section>

                <section aria-label="Medical Tourism">
                    <MedicalTourism />
                </section>
            </main>

            <Footer />
        </>
    );
};

export default TreatmentPage;
