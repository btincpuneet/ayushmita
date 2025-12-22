import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, token } = useAuth();
  const [checking, setChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate token validation (you can add API call here if needed)
    const validateToken = async () => {
      if (!token) {
        setChecking(false);
        return;
      }
      setChecking(false);
    };
    validateToken();
  }, [token]);

  // Prevent UI flicker
  if (checking) return null;

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
