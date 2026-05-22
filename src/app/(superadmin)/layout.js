"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SuperAdminRootLayout({ children }) {
  const router = useRouter();
  const { role, token, loading } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (loading) return;

    // Not logged in
    if (!token) {
      router.replace("/login");
      return;
    }

    // Not super admin
    if (!role || role.toLowerCase() !== "admin") {
      router.replace("/login");
      return;
    }

    setChecking(false);
  }, [role, token, loading]);

  if (checking || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking SuperAdmin Access...
      </div>
    );
  }

  return <>{children}</>;
}