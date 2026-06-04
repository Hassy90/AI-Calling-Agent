"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { role, token, loading } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (loading) return;

    // ❌ Not logged in
    if (!token) {
      router.replace("/");
      return;
    }

    // ❌ Role missing or invalid
    const r = (role || "").toLowerCase();

    if ( r !=="admin" && r !== "user") {
      router.replace("/HomePage");
      return;
    }

    setChecking(false);
  }, [role, token, loading]);

  if (checking || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking access...
      </div>
    );
  }

  return <>{children}</>;
}