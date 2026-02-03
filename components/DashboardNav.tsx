"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navLink = (href: string, active: boolean) => ({
    padding: "10px 14px",
    borderRadius: 12,
    border: `1px solid ${active ? "rgba(212,175,55,0.55)" : "#232A36"}`,
    textDecoration: "none",
    color: "#F5F7FA",
    background: active ? "rgba(212,175,55,0.18)" : "rgba(11,15,20,0.35)",
    fontWeight: 700 as const,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  });

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/");      // ✅ vuelve al inicio bonito
    router.refresh();
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        padding: 18,
        background:
          "radial-gradient(1200px 600px at 20% 10%, rgba(212,175,55,0.10), transparent 55%), #0B0F14",
        borderBottom: "1px solid #232A36",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#D4AF37",
              boxShadow: "0 0 18px rgba(212,175,55,0.25)",
            }}
          />
          <strong style={{ letterSpacing: 0.6 }}>AXIS WORKSPACE</strong>
        </div>

        <nav style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/dashboard" style={navLink("/dashboard", pathname === "/dashboard")}>
            Análisis
          </Link>

          <Link
            href="/dashboard/bitacora"
            style={navLink("/dashboard/bitacora", pathname?.startsWith("/dashboard/bitacora"))}
          >
            Bitácora
          </Link>

          <Link
            href="/dashboard/libro"
            style={navLink("/dashboard/libro", pathname?.startsWith("/dashboard/libro"))}
          >
            Libro
          </Link>

          <Link href="/" style={navLink("/", false)}>
            Inicio
          </Link>

          <button
            onClick={logout}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid rgba(255,80,80,0.55)",
              background: "rgba(255,80,80,0.10)",
              color: "#fff",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Salir
          </button>
        </nav>
      </div>
    </header>
  );
}
