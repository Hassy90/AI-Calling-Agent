"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// 24 hours expiry
const EXPIRY_TIME = 24 * 60 * 60 * 1000;

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // LOGIN FUNCTION
  // =========================
  const login = (data) => {

    // console.log("AUTH CONTEXT LOGIN DATA:", data);

    const now = Date.now();

    setToken(data.token);
    setRole(data.role);

    // save to localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
  

    // expiry time store
    localStorage.setItem("login_time", now);
  };

  // =========================
  // LOGOUT FUNCTION
  // =========================
  const logout = () => {
    setToken(null);
    setRole(null);
    

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("login_time");
  };

  // =========================
  // AUTO RESTORE + EXPIRY CHECK
  // =========================
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    const loginTime = localStorage.getItem("login_time");

    const now = Date.now();

    if (savedToken && loginTime) {
      const isExpired = now - Number(loginTime) > EXPIRY_TIME;

     if (isExpired) {
     localStorage.removeItem("token");
     localStorage.removeItem("role");
     localStorage.removeItem("login_time");

  setToken(null);
  setRole(null);

      } else {
        // restore session
        setToken(savedToken);
        setRole(savedRole);
      }
    }

    setLoading(false);
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

// custom hook
export const useAuth = () => useContext(AuthContext);