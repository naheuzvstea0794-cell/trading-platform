"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import TradingViewWidget from "@/components/TradingViewWidget";
export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
        return;
      }
      setEmail(data.user.email ?? null);
    }
    load();
  }, [router]);

  function logout() {
  window.location.href = "/auth/logout";
}

    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
<TradingViewWidget />
    <main style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Sesión activa: {email ?? "..."}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </main>
  );
}
