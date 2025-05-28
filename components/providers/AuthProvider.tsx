'use client';

import { AuthProvider as SupabaseAuthProvider } from '@/context/AuthContext';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SupabaseAuthProvider>{children}</SupabaseAuthProvider>;
}
