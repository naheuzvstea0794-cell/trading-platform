"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import TradingViewWidget from "@/components/TradingViewWidget";

type Tab = "analisis" | "bitacora" | "libro";

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("analisis");

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.replace("/login");
        return;
      }
      setEmail(data.user.email ?? null);
    }
    load();
  }, [router]);

  function logout() {
    window.location.href = "/auth/logout";
  }

  return (
    <main style={{ padding: 24 }}>
      {/* NAV SUPERIOR */}
      <nav style={navStyle}>
        <button
          style={activeTab === "analisis" ? tabActive : tab}
          onClick={() => setActiveTab("analisis")}
        >
          Análisis
        </button>

        <button
          style={activeTab === "bitacora" ? tabActive : tab}
          onClick={() => setActiveTab("bitacora")}
        >
          Bitácora
        </button>

        <button
          style={activeTab === "libro" ? tabActive : tab}
          onClick={() => setActiveTab("libro")}
        >
          Libro
        </button>

        <button onClick={logout} style={logoutBtn}>
          Cerrar sesión
        </button>
      </nav>

      <p style={{ marginBottom: 16 }}>
        Sesión activa: <strong>{email ?? "..."}</strong>
      </p>

      {/* CONTENIDO */}
      {activeTab === "analisis" && (
        <section>
          <h2>Análisis de mercado</h2>
          <TradingViewWidget />
        </section>
      )}

      {activeTab === "bitacora" && (
        <section>
          <h2>Bitácora</h2>
          <p>Aquí irá tu bitácora diaria de trading.</p>
        </section>
      )}

      {activeTab === "libro" && (
        <section>
          <h2>Libro</h2>
          <p>Aquí irá el contenido de tu libro.</p>
        </section>
      )}
    </main>
  );
}

/* ===== ESTILOS ===== */

const navStyle: React.CSSProperties = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  alignItems: "center",
  marginBottom: 20,
};

const tab: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: 10,
  border: "1px solid #d4af37",
  background: "#fff",
  fontWeight: 600,
  cursor: "pointer",
};

const tabActive: React.CSSProperties = {
  ...tab,
  background: "#d4af37",
  color: "#000",
};

const logoutBtn: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: 10,
  border: "1px solid #a00",
  background: "#fff",
  color: "#a00",
  fontWeight: 600,
  cursor: "pointer",
};
