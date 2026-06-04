"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function UserAccessGate({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [checking, setChecking] = useState(true);

  const { role, loading } = useAuth();

 useEffect(() => {
  let mounted = true;

  if (loading) return;

  // Allow direct call -> conversation navigation without auth blocking
  const isConversation = pathname?.toLowerCase().includes("/conversation");
  const hasCallId = !!searchParams?.get("call_id");

  if (isConversation && hasCallId) {
    if (mounted) setChecking(false);
    return () => {
      mounted = false;
    };
  }

  if (role && role.toLowerCase() === "admin") {
    router.replace("/dashboard");
    return () => {
      mounted = false;
    };
  }

  if (mounted) setChecking(false);

  return () => {
    mounted = false;
  };
}, [role, loading, router, pathname, searchParams]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Checking user access…</div>
      </div>
    );
  }

  return <>{children}</>;
}
