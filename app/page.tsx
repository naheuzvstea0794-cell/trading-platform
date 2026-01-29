import AuthPanel from "@/components/AuthPanel";

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>Tu Marca de Trading</h1>

        <nav style={{ display: "flex", gap: 12 }}>
          <a href="/analisis">Análisis</a>
          <a href="/metodologia">Metodología</a>
          <a href="/libro">Libro</a>
          <a href="/dashboard">Área privada</a>
        </nav>
      </header>

      <div
        style={{
          marginTop: 24,
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* COLUMNA PÚBLICA */}
        <section
          style={{
            border: "1px solid #eee",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <h2>Bienvenido</h2>
          <p>
            Esta es mi plataforma de análisis de trading. Aquí comparto ideas,
            contexto de mercado y mi metodología. Parte del contenido es público
            y el material completo está disponible dentro del área privada.
          </p>

          <h3>Qué encontrarás</h3>
          <ul>
            <li>Análisis públicos con visión de mercado</li>
            <li>Área privada con dashboard y TradingView</li>
            <li>Bitácora de trading y seguimiento</li>
            <li>Mi libro y recursos exclusivos</li>
          </ul>

          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <a href="/analisis">Ver análisis</a>
            <a href="/dashboard">Ir al área privada</a>
          </div>

          <hr style={{ margin: "24px 0" }} />

          <h3>Últimos análisis</h3>
          <ul>
            <li>XAUUSD – estructura y niveles clave</li>
            <li>NASDAQ – escenarios probables</li>
            <li>BTC – zonas de decisión</li>
          </ul>
        </section>

        {/* LOGIN / REGISTRO */}
        <aside>
          <AuthPanel />
        </aside>
      </div>
    </main>
  );
}
