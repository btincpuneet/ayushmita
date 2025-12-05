import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminLayout } from "@/components/layout/AdminLayout";

import Login from "./pages/Login";
import ManageCategory from "./pages/admin/ManageCategory";
import NotFound from "./pages/NotFound";
import ManagePromoSlider from "./pages/admin/ManagePromoSlider";
import ManageHeroBanner from "./pages/admin/ManageHeroBanner";
import ManageDoctors from "./pages/admin/ManageDoctors";
import ManageTopPartnerHospitals from "./pages/admin/ManageTopPartnerHospitals";
import ManageTestimonials from "./pages/admin/ManageTestimonials";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<ManageCategory />} />
              <Route path="promo-slider" element={<ManagePromoSlider />} />
              <Route path="hero-banner" element={<ManageHeroBanner />} />
              <Route path="manage-doctor" element={<ManageDoctors />} />
              <Route path="topartnerDetails" element={<ManageTopPartnerHospitals />} />
              <Route path="testimonials" element={<ManageTestimonials />} />

            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
