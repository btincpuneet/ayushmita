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
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import ContactUs from "./pages/ContactUs";
import CmsPage from "./pages/CmsPage";
const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ScrollToTop />
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
        <Route path="/about-us" element={<CmsPage />} />
      </Routes>
    </HelmetProvider>
  );
};

export default App;
