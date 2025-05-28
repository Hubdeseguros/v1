"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  // Redirigir al inicio usando Next.js router
  const router = useRouter();
  
  useEffect(() => {
    router.push("/");
  }, [router]);

  return null;
}
