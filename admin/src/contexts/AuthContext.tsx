// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { User, AuthState } from '@/types/content';

// interface AuthContextType extends AuthState {
//   login: (email: string, password: string) => Promise<boolean>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// const AUTH_STORAGE_KEY = 'admin_dashboard_auth';

// // Mock user for demo
// const MOCK_USER: User = {
//   id: '1',
//   email: 'admin@example.com',
//   name: 'Admin User',
//   role: 'admin',
// };

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [authState, setAuthState] = useState<AuthState>({
//     user: null,
//     isAuthenticated: false,
//   });

//   useEffect(() => {
//     const stored = localStorage.getItem(AUTH_STORAGE_KEY);
//     if (stored) {
//       try {
//         const parsed = JSON.parse(stored);
//         setAuthState(parsed);
//       } catch {
//         localStorage.removeItem(AUTH_STORAGE_KEY);
//       }
//     }
//   }, []);

//   const login = async (email: string, password: string): Promise<boolean> => {
//     // Mock authentication - in production, call your auth API
//     await new Promise(resolve => setTimeout(resolve, 500));

//     if (email === 'admin@example.com' && password === 'admin123') {
//       const newState: AuthState = {
//         user: MOCK_USER,
//         isAuthenticated: true,
//       };
//       setAuthState(newState);
//       localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newState));
//       return true;
//     }
//     return false;
//   };

//   const logout = () => {
//     setAuthState({ user: null, isAuthenticated: false });
//     localStorage.removeItem(AUTH_STORAGE_KEY);
//   };

//   return (
//     <AuthContext.Provider value={{ ...authState, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }import React, { createContext, useContext, useState, useEffect } from "react";import { api } from "@/services/api";
import { User, AuthState } from "@/types/content";
import axios from "axios";
import { API_BASE } from "../config/api";
import { useContext, useEffect, useState, createContext, useRef } from "react";
import { isTokenExpired, parseJwt } from "@/utils/jwt";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const AUTH_STORAGE_KEY = "admin_dashboard_auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    token: undefined,
  });
  const expiryTimeoutRef = useRef<number | null>(null);

  const clearExpiryTimeout = () => {
    if (expiryTimeoutRef.current) {
      window.clearTimeout(expiryTimeoutRef.current);
      expiryTimeoutRef.current = null;
    }
  };

  const logoutAndRedirect = () => {
    clearExpiryTimeout();
    setAuthState({ user: null, isAuthenticated: false, token: undefined });
    localStorage.removeItem(AUTH_STORAGE_KEY);
    window.location.href = "/adminui/login";
  };

  // Load from localStorage (auto-login)
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAuthState(parsed);

        if (parsed.token) {
          if (isTokenExpired(parsed.token)) {
            logoutAndRedirect();
            return;
          }

          const decoded = parseJwt(parsed.token);
          if (decoded && decoded.exp) {
            const msUntilExpiry = decoded.exp * 1000 - Date.now();
            expiryTimeoutRef.current = window.setTimeout(() => {
              logoutAndRedirect();
            }, msUntilExpiry + 1000);
          }
        }
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    return () => clearExpiryTimeout();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_BASE}/api/login`, { email, password });
      const data = response.data;

      if (!data.success) return false;

      const newState: AuthState = {
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.email.split("@")[0],
          role: data.user.role,
        },
        token: data.token,
        isAuthenticated: true,
      };

      setAuthState(newState);

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newState));

      // schedule auto-logout when token expires
      if (newState.token) {
        clearExpiryTimeout();
        if (isTokenExpired(newState.token)) {
          logoutAndRedirect();
        } else {
          const decoded = parseJwt(newState.token);
          if (decoded && decoded.exp) {
            const msUntilExpiry = decoded.exp * 1000 - Date.now();
            expiryTimeoutRef.current = window.setTimeout(() => {
              logoutAndRedirect();
            }, msUntilExpiry + 1000);
          }
        }
      }

      return true;
    } catch (error) {
      console.error("Login API Error:", error);
      return false;
    }
  };

  const logout = () => {
    // explicit logout should also redirect
    logoutAndRedirect();
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
