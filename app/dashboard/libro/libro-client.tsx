"use client";

import { useMemo, useState } from "react";

export default function LibroClient() {
  const colors = useMemo(
    () => ({
      bg: "#0B0F14",
      card: "rgba(17,24,39,0.55)",
      border: "#232A36",
      text: "#F5F7FA",
      muted: "#9CA3AF",
      gold: "#D4AF37",
      goldSoft: "rgba(212,175,55,0.25)",
      darkGlass: "rgba(11,15,20,0.35)",
    }),
    []
  );

  const [toast, setToast] = useState<string | null>(null);

  function notify(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  }

  function openFreeBook() {
    notify("📘 Libro gratuito: se enviará a tu correo (demo).");
  }

  function openPremiumBook() {
    notify("🔒 Libro premium (pago): pronto. Te llegará al correo cuando esté activo (demo).");
  }

  const card: React.CSSProperties = {
    border: `1px solid ${colors.border}`,
    borderRadius: 20,
    background: colors.card,
    backdropFilter: "blur(10px)",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        color: colors.text,
        background: `radial-gradient(1200px 600px at 20% 10%, rgba(212,175,55,0.10), transparent 55%),
                     radial-gradient(900px 500px at 85% 25%, rgba(212,175,55,0.07), transparent 55%),
                     ${colors.bg}`,
        padding: 20,
      }}
    >
      <section style={{ ...card, padding: 18 }}>
        <h1 style={{ margin: 0, letterSpacing: 0.6 }}>📚 Biblioteca AXIS</h1>
        <p style={{ marginTop: 10, color: colors.muted, lineHeight: 1.6 }}>
          Dos versiones: una gratuita y una premium (pago). El pago aún no se gestiona,
          pero ya se ve en la UI.
        </p>
      </section>

      <section
        style={{
          marginTop: 18,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 18,
        }}
      >
        {/* FREE */}
        <div style={{ ...card, padding: 18 }}>
          <div
            style={{
              height: 170,
              borderRadius: 16,
              background: "linear-gradient(135deg, rgba(212,175,55,0.22), rgba(212,175,55,0.06))",
              display: "grid",
              placeItems: "center",
              fontSize: 46,
            }}
          >
            📘
          </div>

          <h2 style={{ marginTop: 14, marginBottom: 6 }}>Libro gratuito</h2>
          <div style={{ color: colors.muted, marginBottom: 10 }}>Fundamentos del Trading AXIS</div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            <Tag colors={colors}>Estructura</Tag>
            <Tag colors={colors}>Riesgo</Tag>
            <Tag colors={colors}>Disciplina</Tag>
          </div>

          <p style={{ color: colors.muted, lineHeight: 1.6, marginTop: 0 }}>
            Lectura introductoria para entender el sistema y cómo se ejecuta sin improvisación.
          </p>

          <button
            onClick={openFreeBook}
            style={{
              marginTop: 12,
              width: "100%",
              padding: "12px 14px",
              borderRadius: 14,
              border: `1px solid ${colors.gold}`,
              background: colors.gold,
              color: colors.bg,
              fontWeight: 900,
              cursor: "pointer",
              boxShadow: `0 0 24px ${colors.goldSoft}`,
            }}
          >
            Abrir / Enviar a mi correo
          </button>
        </div>

        {/* PREMIUM */}
        <div style={{ ...card, padding: 18, position: "relative" }}>
          <div
            style={{
              height: 170,
              borderRadius: 16,
              background: "linear-gradient(135deg, rgba(0,0,0,0.55), rgba(212,175,55,0.08))",
              display: "grid",
              placeItems: "center",
              fontSize: 46,
            }}
          >
            📕
          </div>

          <h2 style={{ marginTop: 14, marginBottom: 6 }}>Libro premium (pago)</h2>
          <div style={{ color: colors.muted, marginBottom: 10 }}>Sistema AXIS — Edición Completa</div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            <Tag colors={colors}>Reglas</Tag>
            <Tag colors={colors}>Casos reales</Tag>
            <Tag colors={colors}>Bitácora PRO</Tag>
            <Tag colors={colors}>Psicología</Tag>
          </div>

          <p style={{ color: colors.muted, lineHeight: 1.6, marginTop: 0 }}>
            Placeholder de pago. No cobramos aún, pero al dar clic se simula envío al correo.
          </p>

          <button
            onClick={openPremiumBook}
            style={{
              marginTop: 12,
              width: "100%",
              padding: "12px 14px",
              borderRadius: 14,
              border: `1px solid ${colors.border}`,
              background: "rgba(11,15,20,0.45)",
              color: colors.text,
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            🔒 Abrir (Pago — Próximamente)
          </button>

          <div
            style={{
              position: "absolute",
              top: 14,
              right: -28,
              transform: "rotate(45deg)",
              background: colors.gold,
              color: colors.bg,
              padding: "6px 38px",
              fontWeight: 900,
              fontSize: 12,
              boxShadow: `0 0 18px ${colors.goldSoft}`,
            }}
          >
            PREMIUM
          </div>
        </div>
      </section>

      {toast ? (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            borderRadius: 14,
            border: `1px solid ${colors.border}`,
            background: colors.card,
            padding: "12px 14px",
            color: colors.text,
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {toast}
        </div>
      ) : null}
    </main>
  );
}

function Tag({ children, colors }: { children: React.ReactNode; colors: any }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 999,
        padding: "7px 10px",
        border: `1px solid ${colors.border}`,
        background: "rgba(11,15,20,0.28)",
        color: colors.muted,
        fontSize: 12,
      }}
    >
      {children}
    </span>
  );
}
