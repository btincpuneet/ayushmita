import React from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Home from "./pages/Home";
import HospitalPage from "./pages/HospitalPage";
import TreatmentsLandlingPage from "./pages/TreatmentsLandlingPage";
import TreatMentDetailsPage from "./pages/TreatMentDetailsPage";
import DiseaseDetailsPage from "./pages/DiseaseDetailsPage";
import HospitalDetailsPage from "./pages/HospitalDetailsPage";
import DoctorsPage from "./pages/DoctorPage";
import DoctorDetailsPage from "./pages/DoctorDetailsPage";
import ScrollToTop from "./components/ScrollToTop";
import GoogleTranslate from "./components/GoogleTranslate";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import ContactUs from "./pages/ContactUs";
import CmsPage from "./pages/CmsPage";
import TawkTestWidget from "./components/TawkTestWidget";


import { useSyncRTLWithGoogleTranslate } from "./hooks/useSyncRTLWithGoogleTranslate";
import TestimonialPage from "./pages/TestimonialPage";

const App: React.FC = () => {
  useSyncRTLWithGoogleTranslate();

  return (
    <HelmetProvider>
      <ScrollToTop />
      <GoogleTranslate />
      <TawkTestWidget />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/treatment" element={<TreatmentsLandlingPage />} />
        <Route path="/treatment-details/:slug" element={<TreatMentDetailsPage />} />
        <Route path="/disease/:slug" element={<DiseaseDetailsPage />} />
        <Route path="/doctor/:slug" element={<DoctorDetailsPage />} />
        <Route path="/hospitals/:slug" element={<HospitalDetailsPage />} />
        <Route path="/hospital" element={<HospitalPage />} />
        <Route path="/hospitals" element={<HospitalDetailsPage />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blogs/:slug" element={<BlogDetails />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/:slug" element={<CmsPage />} />
        <Route path="/testimonail" element={<TestimonialPage />} />
      </Routes>
    </HelmetProvider>
  );
};

export default App;
