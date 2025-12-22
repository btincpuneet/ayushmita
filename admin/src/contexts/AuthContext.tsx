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
import { useContext, useEffect, useState, createContext } from "react";

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

  // Load from localStorage (auto-login)
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAuthState(parsed);
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  }, []);

  // Login function using REAL API
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post("http://127.0.0.1:5001/api/login", { email, password });
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

      return true;
    } catch (error) {
      console.error("Login API Error:", error);
      return false;
    }
  };

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false, token: undefined });
    localStorage.removeItem(AUTH_STORAGE_KEY);
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
