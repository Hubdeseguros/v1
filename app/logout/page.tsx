"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Limpiar tokens y datos de sesión
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("permissions");
    }
    
    // Redirigir al inicio
    router.push("/");
  }, [router]);

  return null;
}
