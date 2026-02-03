import AxisCoin from "@/components/AxisCoin";
import AuthPanel from "@/components/AuthPanel";

export default function Home() {
  const colors = {
    bg: "#0B0F14",
    card: "#111827",
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
      }}
    >
      {/* HEADER */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          padding: "14px 16px",
          border: `1px solid ${colors.border}`,
          borderRadius: 14,
          background: "rgba(17,24,39,0.55)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: colors.gold,
              boxShadow: `0 0 18px ${colors.goldSoft}`,
            }}
          />
          <h1 style={{ margin: 0, letterSpacing: 0.5 }}>AXIS WORKSPACE</h1>
        </div>

        <nav style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a style={linkStyle(colors)} href="/analisis">
            Análisis
          </a>
          <a style={linkStyle(colors)} href="/metodologia">
            Metodología
          </a>
          <a style={linkStyle(colors)} href="/libro">
            Libro
          </a>
          <a style={ctaStyle(colors)} href="/dashboard">
            Ingresar
          </a>
        </nav>
      </header>

      {/* BODY */}
      <div
        style={{
          marginTop: 22,
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 22,
          alignItems: "start",
        }}
      >
        {/* LEFT: PUBLIC */}
        <section
          style={{
            border: `1px solid ${colors.border}`,
            borderRadius: 16,
            background: "rgba(17,24,39,0.55)",
            backdropFilter: "blur(8px)",
            padding: 18,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: 16,
              alignItems: "center",
            }}
          >
            <div>
              <h2 style={{ marginTop: 0, marginBottom: 8 }}>
                Análisis de Trading con precisión y bitácora real.
              </h2>
              <p style={{ marginTop: 0, color: colors.muted, lineHeight: 1.6 }}>
                AXIS WORKSPACE es mi espacio para publicar análisis públicos y,
                en el área privada, mantener mi bitácora diaria, contenido
                extendido, recursos y mi libro.
              </p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
                <a style={ctaStyle(colors)} href="/analisis">
                  Ver análisis
                </a>
                <a style={ghostStyle(colors)} href="/dashboard">
                  Entrar al workspace
                </a>
              </div>

              <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <span style={pillStyle(colors)}>XAUUSD</span>
                <span style={pillStyle(colors)}>NASDAQ</span>
                <span style={pillStyle(colors)}>BTC</span>
                <span style={pillStyle(colors)}>Gestión de riesgo</span>
              </div>
            </div>

            {/* COIN ANIMATION */}
            <div style={{ display: "grid", justifyItems: "center" }}>
              <AxisCoin />
              <p style={{ margin: "10px 0 0", fontSize: 12, color: colors.muted }}>
                Logo 360° (frente / reverso)
              </p>
            </div>
          </div>

          <hr style={{ margin: "18px 0", borderColor: colors.border }} />

          <h3 style={{ marginTop: 0 }}>Últimos análisis (demo)</h3>
          <p style={{ marginTop: 6, color: colors.muted }}>
            En el siguiente paso conectamos esta sección para que publiques aquí
            tus análisis reales.
          </p>

          <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
            {[
              { title: "XAUUSD — Niveles clave y escenarios", tag: "Oro" },
              { title: "NASDAQ — Tendencia y zonas de decisión", tag: "Índices" },
              { title: "BTC — Volatilidad y estructura", tag: "Crypto" },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  border: `1px solid ${colors.border}`,
                  borderRadius: 12,
                  padding: 12,
                  background: "rgba(11,15,20,0.35)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <strong>{item.title}</strong>
                  <span style={{ color: colors.gold, fontSize: 12 }}>{item.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT: AUTH PANEL */}
        <aside
          style={{
            border: `1px solid ${colors.border}`,
            borderRadius: 16,
            background: "rgba(17,24,39,0.55)",
            backdropFilter: "blur(8px)",
            padding: 16,
            position: "sticky",
            top: 18,
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: 10 }}>
            Acceso al área privada
          </h3>
          <p style={{ marginTop: 0, color: colors.muted, fontSize: 13, lineHeight: 1.5 }}>
            Regístrate o inicia sesión para ver el dashboard, TradingView,
            bitácora diaria y contenido extendido.
          </p>
          <AuthPanel />
          <p style={{ marginTop: 12, color: colors.muted, fontSize: 12 }}>
            Tip: Si ya estás logueado, te enviará directo al dashboard.
          </p>
        </aside>
      </div>

      {/* FOOTER */}
      <footer style={{ marginTop: 22, color: colors.muted, fontSize: 12 }}>
        © {new Date().getFullYear()} AXIS WORKSPACE — Financial Precision
      </footer>
    </main>
  );
}

function linkStyle(colors: any) {
  return {
    color: colors.text,
    textDecoration: "none",
    padding: "8px 10px",
    borderRadius: 10,
    border: `1px solid transparent`,
    opacity: 0.9,
  } as const;
}

function ctaStyle(colors: any) {
  return {
    color: "#0B0F14",
    background: colors.gold,
    textDecoration: "none",
    padding: "8px 12px",
    borderRadius: 10,
    fontWeight: 700,
    border: `1px solid ${colors.gold}`,
    boxShadow: `0 0 22px ${colors.goldSoft}`,
  } as const;
}

function ghostStyle(colors: any) {
  return {
    color: colors.text,
    background: "transparent",
    textDecoration: "none",
    padding: "8px 12px",
    borderRadius: 10,
    fontWeight: 600,
    border: `1px solid ${colors.border}`,
  } as const;
}

function pillStyle(colors: any) {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    padding: "6px 10px",
    border: `1px solid ${colors.border}`,
    background: "rgba(11,15,20,0.35)",
    color: colors.muted,
    fontSize: 12,
  } as const;
}
