import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();
  
  const handleLogout = () => {
    // Limpiar tokens y datos de sesión
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    
    // Redirigir al inicio
    router.push("/");
  };
  
  return { handleLogout };
}
