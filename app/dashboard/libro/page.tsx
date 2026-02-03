"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LibroPage() {
  const router = useRouter();

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
      <h1>Libro</h1>
      <p style={{ color: "#9CA3AF" }}>
        Aquí irá el contenido del Libro (lo dejamos listo para construirlo).
      </p>
    </main>
  );
}
