import React from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Home from "./pages/Home";
import AboutPage from "./pages/About";
import { Hospital } from "lucide-react";
import HospitalPage from "./pages/HospitalPage";
import TreatmentsLandlingPage from "./pages/TreatmentsLandlingPage";
import TreatMentDetailsPage from "./pages/TreatMentDetailsPage";

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/treatment" element={<TreatmentsLandlingPage />} />
        <Route path="/treatment-details/:slug" element={<TreatMentDetailsPage />} />
        {/* <Route path="/about-us" element={<AboutPage />} /> */}
        <Route path="/hospital" element={<HospitalPage />} />

      </Routes>
    </HelmetProvider>
  );
};

export default App;
