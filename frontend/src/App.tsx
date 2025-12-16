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

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/treatment" element={<TreatmentsLandlingPage />} />
        <Route path="/treatment-details/:slug" element={<TreatMentDetailsPage />} />
        <Route path="/disease/:slug" element={<DiseaseDetailsPage />} />
        <Route path="/doctor/:slug" element={<DoctorDetailsPage />} />
        <Route path="/hospitals/:slug" element={<HospitalDetailsPage />} />
        <Route path="/hospital" element={<HospitalPage />} />
        <Route path="/hospitals" element={<HospitalDetailsPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />

      </Routes>
    </HelmetProvider>
  );
};

export default App;
