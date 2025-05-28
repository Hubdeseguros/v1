"use client"

import { useEffect } from "react";
import { useLogout } from "@/utils/navigation";

export default function LogoutPage() {
  const { handleLogout } = useLogout();
  
  useEffect(() => {
    handleLogout();
  }, []);

  return null;
}
