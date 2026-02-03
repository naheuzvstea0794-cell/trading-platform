"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthPanel from "@/components/AuthPanel";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) router.replace("/dashboard");
    })();
  }, [router]);

  const colors = {
    bg: "#0B0F14",
    card: "rgba(17,24,39,0.55)",
    border: "#232A36",
    text: "#F5F7FA",
    muted: "#9CA3AF",
    gold: "#D4AF37",
    goldSoft: "rgba(212,175,55,0.25)",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: `radial-gradient(1200px 600px at 20% 10%, rgba(212,175,55,0.12), transparent 55%),
                     radial-gradient(900px 500px at 85% 25%, rgba(212,175,55,0.08), transparent 55%),
                     ${colors.bg}`,
        color: colors.text,
        padding: 24,
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          width: "min(520px, 95vw)",
          border: `1px solid ${colors.border}`,
          borderRadius: 16,
          background: colors.card,
          backdropFilter: "blur(8px)",
          padding: 18,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: colors.gold,
              boxShadow: `0 0 18px ${colors.goldSoft}`,
            }}
          />
          <h1 style={{ margin: 0, letterSpacing: 0.5 }}>Ingresar</h1>
        </div>

        <p style={{ marginTop: 0, color: colors.muted, lineHeight: 1.6 }}>
          Inicia sesión para acceder al dashboard, bitácora y libro.
        </p>

        <AuthPanel />

        <p style={{ marginTop: 12, color: colors.muted, fontSize: 12 }}>
          Si ya estás logueado, te enviará directo al dashboard.
        </p>

        <a
          href="/"
          style={{
            display: "inline-block",
            marginTop: 10,
            color: colors.text,
            textDecoration: "none",
            border: `1px solid ${colors.border}`,
            padding: "8px 12px",
            borderRadius: 12,
            background: "rgba(11,15,20,0.35)",
            fontWeight: 700,
          }}
        >
          Volver al inicio
        </a>
      </div>
    </main>
  );
}
