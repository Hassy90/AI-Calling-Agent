"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const EXPIRY_TIME = 24 * 60 * 60 * 1000;

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // LOGIN
  // =========================
  const login = (data) => {
    const now = Date.now();

    setToken(data.token);
    setRole(data.role);

    localStorage.setItem("token", data.token);
    if (data.role) localStorage.setItem("role", data.role);
    localStorage.setItem("login_time", now);
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    setToken(null);
    setRole(null);

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("login_time");
  };

  // =========================
  // FETCH ROLE FROM API
  // =========================
  const fetchRole = async (token) => {
    const res = await fetch(
      `${BASE_URL}/api/auth/role?token=${encodeURIComponent(token)}`
    );

    if (!res.ok) throw new Error("Role API failed");

    return await res.json();
  };

  // =========================
  // RESTORE SESSION
  // =========================
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const savedToken = localStorage.getItem("token");
        const loginTime = localStorage.getItem("login_time");

        const now = Date.now();

        if (!savedToken || !loginTime) {
          setLoading(false);
          return;
        }

        const isExpired = now - Number(loginTime) > EXPIRY_TIME;

        if (isExpired) {
          logout();
          setLoading(false);
          return;
        }

        setToken(savedToken);

        // 👉 ROLE always from API
        const data = await fetchRole(savedToken);
       

        setRole(data.role);
        if (data.role) {
          localStorage.setItem("role", data.role);
        }
      } catch (err) {
        console.error("AUTH RESTORE ERROR:", err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);