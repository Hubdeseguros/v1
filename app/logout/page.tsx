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
    
    // Redirigir según el rol previo
    const role = localStorage.getItem("role");
    let redirectPath = "/";
    
    if (role === "ADMIN") {
      redirectPath = "/dashboard";
    } else if (role === "AGENCIA") {
      redirectPath = "/dashboard";
    } else if (role === "PROMOTOR") {
      redirectPath = "/promotor";
    } else if (role === "CLIENTE") {
      redirectPath = "/cliente";
    }
    
    // Limpiar el rol después de determinar la ruta
    if (typeof window !== "undefined") {
      localStorage.removeItem("role");
    }
    
    router.push(redirectPath);
  }, [router]);

  return null;
}
