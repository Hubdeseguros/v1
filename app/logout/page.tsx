"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  // Redirigir al inicio usando Next.js router
  const router = useRouter();
  
  // Limpiar tokens y datos de sesión
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  
  useEffect(() => {
    router.push("/");
  }, [router]);

  return null;
}
