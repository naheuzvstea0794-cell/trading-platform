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
    notify("📘 El libro gratuito se enviará a tu correo.");
  }

  function openPremiumBook() {
    notify(
      "🔒 Libro premium. Próximamente disponible.\nTe avisaremos por correo cuando esté habilitado."
    );
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
      {/* HEADER */}
      <section style={{ ...card, padding: 18 }}>
        <h1 style={{ margin: 0, letterSpacing: 0.6 }}>📚 El Libro de AXIS</h1>
        <p style={{ marginTop: 10, color: colors.muted, lineHeight: 1.6 }}>
          Aquí comparto el contenido que sustenta mi forma de analizar el mercado:
          estructura, ejecución, riesgo y mentalidad.
        </p>
      </section>

      {/* GRID DE LIBROS */}
      <section
        style={{
          marginTop: 18,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 18,
        }}
      >
        {/* LIBRO GRATIS */}
        <div style={{ ...card, padding: 18 }}>
          <div
            style={{
              height: 160,
              borderRadius: 14,
              background:
                "linear-gradient(135deg, rgba(212,175,55,0.25), rgba(212,175,55,0.05))",
              display: "grid",
              placeItems: "center",
              fontSize: 42,
            }}
          >
            📘
          </div>

          <h2 style={{ marginTop: 14 }}>Fundamentos del Trading AXIS</h2>
          <p style={{ color: colors.muted, lineHeight: 1.6 }}>
            Una introducción clara y directa a mi enfoque: estructura de mercado,
            gestión del riesgo y disciplina operativa.
          </p>

          <ul style={{ color: colors.muted, paddingLeft: 18 }}>
            <li>Estructura de mercado</li>
            <li>Errores comunes</li>
            <li>Marco mental</li>
          </ul>

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
            Leer / Enviar a mi correo
          </button>
        </div>

        {/* LIBRO PREMIUM */}
        <div style={{ ...card, padding: 18, position: "relative" }}>
          <div
            style={{
              height: 160,
              borderRadius: 14,
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.55), rgba(212,175,55,0.08))",
              display: "grid",
              placeItems: "center",
              fontSize: 42,
            }}
          >
            📕
          </div>

          <h2 style={{ marginTop: 14 }}>Sistema AXIS – Edición Completa</h2>
          <p style={{ color: colors.muted, lineHeight: 1.6 }}>
            El desarrollo completo del sistema: reglas, ejemplos reales,
            bitácora avanzada y gestión emocional.
          </p>

          <ul style={{ color: colors.muted, paddingLeft: 18 }}>
            <li>Modelo completo de ejecución</li>
            <li>Casos reales</li>
            <li>Bitácora profesional</li>
            <li>Psicología aplicada</li>
          </ul>

          <button
            onClick={openPremiumBook}
            style={{
              marginTop: 12,
              width: "100%",
              padding: "12px 14px",
              borderRadius: 14,
              border: `1px solid ${colors.border}`,
              background: "rgba(11,15,20,0.45)",
              color: colors.muted,
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            🔒 Próximamente (Libro Pago)
          </button>

          {/* CINTA PREMIUM */}
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

      {/* TOAST */}
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
            whiteSpace: "pre-line",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {toast}
        </div>
      ) : null}
    </main>
  );
}
