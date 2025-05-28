"use client"

export default function LogoutPage() {
  // Redirigir al inicio usando Next.js router
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, [router]);

  return null;
}
