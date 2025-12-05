import React from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Home from "./pages/Home";
// import TreatmentPage from "./pages/TreatmentPage";
import TreatmentsDetailsPage from "./pages/TreatmentsDetailsPage";
import BileDuctCancerTreatment from "./components/Treatment/TreatmentDeatilsAllPages/BileDuctCancerTreatment";
import AboutPage from "./pages/About";
import { Hospital } from "lucide-react";
import HospitalPage from "./pages/HospitalPage";

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/treatment" element={<TreatmentsDetailsPage />} />
        {/* <Route path="/treatment" element={<TreatmentPage />} /> */}
        <Route path="/bile-duct-cancer-treatment" element={<BileDuctCancerTreatment />} />
        {/* <Route path="/about-us" element={<AboutPage />} /> */}
        <Route path="/hospital" element={<HospitalPage />} />

      </Routes>
    </HelmetProvider>
  );
};

export default App;
