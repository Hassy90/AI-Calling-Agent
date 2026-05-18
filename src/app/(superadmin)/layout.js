"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SuperAdminRootLayout({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");

    // If no token -> go login
    if (!token) {
      router.replace("/login");
      return;
    }

    // Only admin can access superadmin pages
    if (role !== "admin") {
      router.replace("/login");
      return;
    }

    setChecking(false);
  }, [router]);

  // Loading screen while checking auth
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Checking SuperAdmin Access...</div>
      </div>
    );
  }

  return <>{children}</>;
}