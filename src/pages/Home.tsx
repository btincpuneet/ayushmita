import React from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Hero from '../components/HeroImage'
import Footer from '../components/Footer'
import MedicalTourism from '../components/MedicalTourism'
import FindBySpecialisation from '../components/FindBySpecialisation'
import TopPartnerHospitals from '../components/TopPartnerHospitals '
import OurFamilies from '../components/OurFamilies'
import FaqWithImage from '../components/FaqWithImage'
import DoctorCareSlider from '../components/DoctorCareSlider'
import PromoSlider from '../components/PromoSlider'
import TestimonialSlider from '../components/TestimonialSlider'

const Home: React.FC = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "MedicalBusiness",
        "name": "Ayushm",
        "description": "Professional and friendly care provider",
        "url": "https://example.com",
        "logo": "https://example.com/favicon.ico"
    }

    return (
        <>
            <Helmet>
                <html lang="en" />
                <meta name="theme-color" content="#ffffff" />
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            </Helmet>

            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                    <Hero />
                    <PromoSlider />
                    <MedicalTourism />
                    <FindBySpecialisation />
                    <TopPartnerHospitals />
                    <OurFamilies />
                    <FaqWithImage />
                    <DoctorCareSlider />
                    <TestimonialSlider />
                </main>
                <Footer />
            </div>


        </>
    )
}

export default Home
