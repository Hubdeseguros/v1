"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Obtener el rol actual antes de limpiar la sesión
    const role = localStorage.getItem("role");
    
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
