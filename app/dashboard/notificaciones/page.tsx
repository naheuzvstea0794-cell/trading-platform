"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function NotificacionesPage() {
  const router = useRouter();
  const [items, setItems] = useState<string[]>([
    "Aún no hay notificaciones. (Luego conectamos comentarios/likes reales)",
  ]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) router.replace("/login");
    })();
  }, [router]);

  return (
    <main
      style={{
        minHeight: "calc(100vh - 86px)",
        padding: 24,
        background:
          "radial-gradient(1200px 600px at 20% 10%, rgba(212,175,55,0.12), transparent 55%), #0B0F14",
        color: "#F5F7FA",
      }}
    >
      <h1>Notificaciones</h1>
      <ul style={{ marginTop: 12, color: "#9CA3AF" }}>
        {items.map((x, i) => (
          <li key={i} style={{ marginBottom: 8 }}>
            {x}
          </li>
        ))}
      </ul>
    </main>
  );
}
