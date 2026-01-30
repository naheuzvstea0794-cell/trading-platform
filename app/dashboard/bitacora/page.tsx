"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Entry = {
  date: string;        // YYYY-MM-DD
  asset: string;
  side: "Compra" | "Venta";
  result: "Win" | "Loss" | "BE";
  pips: number;
  usd: number;
  notes: string;
};

export default function BitacoraPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  // Mes seleccionado (por defecto: mes actual)
  const [month, setMonth] = useState(() => {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `${d.getFullYear()}-${mm}`; // YYYY-MM
  });

  // Entradas (por ahora en memoria; en el siguiente paso las guardamos en Supabase)
  const [entries, setEntries] = useState<Entry[]>([]);

  // Form fields
  const [date, setDate] = useState(() => {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `${d.getFullYear()}-${mm}-${dd}`;
  });
  const [asset, setAsset] = useState("XAUUSD");
  const [side, setSide] = useState<"Compra" | "Venta">("Compra");
  const [result, setResult] = useState<"Win" | "Loss" | "BE">("Win");
  const [pips, setPips] = useState<number>(0);
  const [usd, setUsd] = useState<number>(0);
  const [notes, setNotes] = useState("");

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

  const monthEntries = useMemo(() => {
    return entries.filter((e) => e.date.startsWith(month)); // match YYYY-MM
  }, [entries, month]);

  const totalUsdMonth = useMemo(() => {
    // suma por mes (USD)
    // BE puede ser 0, wins positivos, loss negativos (tú lo defines al ingresar)
    return monthEntries.reduce((acc, e) => acc + (Number.isFinite(e.usd) ? e.usd : 0), 0);
  }, [monthEntries]);

  function addEntry() {
    // validación mínima
    if (!asset.trim()) return;

    const newEntry: Entry = {
      date,
      asset: asset.trim(),
      side,
      result,
      pips: Number(pips) || 0,
      usd: Number(usd) || 0,
      notes: notes.trim(),
    };

    setEntries((prev) => [newEntry, ...prev]);

    // reset suave
    setNotes("");
    setPips(0);
    setUsd(0);
  }

  return (
    <main style={{ padding: 24, maxWidth: 950 }}>
      <nav style={navStyle}>
        <a href="/dashboard" style={tabLink}>Análisis</a>
        <a href="/dashboard/bitacora" style={tabActive}>Bitácora</a>
        <a href="/dashboard/libro" style={tabLink}>Libro</a>
        <a href="/" style={tabLink}>Inicio</a>
      </nav>

      <p style={{ marginBottom: 12 }}>
        Sesión activa: <strong>{email ?? "..."}</strong>
      </p>

      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0 }}>Bitácora de Trading</h1>
          <p style={{ marginTop: 6, opacity: 0.85 }}>
            Registra: Activo, Compra/Venta, Resultado, Pips, USD y notas.
          </p>
        </div>

        {/* Selector de mes + total mensual */}
        <div style={{ display: "grid", gap: 8, minWidth: 240 }}>
          <label style={{ fontSize: 12, opacity: 0.85 }}>
            Mes
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              style={inputStyle}
            />
          </label>

          <div style={sumCard}>
            <div style={{ fontSize: 12, opacity: 0.85 }}>Total del mes (USD)</div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>
              {totalUsdMonth.toFixed(2)}
            </div>
          </div>
        </div>
      </header>

      {/* Formulario */}
      <form style={formCard} onSubmit={(e) => e.preventDefault()}>
        <div style={grid2}>
          <label>
            Fecha
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
          </label>

          <label>
            Activo
            <input
              type="text"
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              placeholder="Ej: XAUUSD, NASDAQ, BTC"
              style={inputStyle}
            />
          </label>
        </div>

        <div style={grid3}>
          <label>
            Tipo de operación
            <select value={side} onChange={(e) => setSide(e.target.value as any)} style={inputStyle}>
              <option>Compra</option>
              <option>Venta</option>
            </select>
          </label>

          <label>
            Resultado
            <select value={result} onChange={(e) => setResult(e.target.value as any)} style={inputStyle}>
              <option>Win</option>
              <option>Loss</option>
              <option>BE</option>
            </select>
          </label>

          <label>
            Pips
            <input
              type="number"
              step="0.1"
              value={pips}
              onChange={(e) => setPips(Number(e.target.value))}
              style={inputStyle}
            />
          </label>
        </div>

        <div style={grid2}>
          <label>
            USD (ganancia/pérdida)
            <input
              type="number"
              step="0.01"
              value={usd}
              onChange={(e) => setUsd(Number(e.target.value))}
              style={inputStyle}
            />
          </label>

          <label>
            Notas
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Seguí plan, entrada limpia, SL respetado…"
              style={inputStyle}
            />
          </label>
        </div>

        <button type="button" style={saveBtn} onClick={addEntry}>
          Agregar al mes
        </button>
      </form>

      {/* Lista del mes (visual) */}
      <section style={{ marginTop: 18 }}>
        <h2 style={{ marginBottom: 10 }}>Entradas del mes</h2>

        {monthEntries.length === 0 ? (
          <p style={{ opacity: 0.8 }}>Aún no hay entradas para este mes.</p>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {monthEntries.map((e, idx) => (
              <div key={`${e.date}-${idx}`} style={rowCard}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <strong>{e.date} — {e.asset}</strong>
                  <span style={{ opacity: 0.85 }}>
                    {e.side} • {e.result}
                  </span>
                </div>

                <div style={{ marginTop: 6, display: "flex", gap: 14, flexWrap: "wrap", opacity: 0.9 }}>
                  <span>Pips: <strong>{e.pips}</strong></span>
                  <span>USD: <strong>{e.usd}</strong></span>
                </div>

                {e.notes && <div style={{ marginTop: 6, opacity: 0.85 }}>{e.notes}</div>}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

/* ===== ESTILOS ===== */

const navStyle: React.CSSProperties = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  alignItems: "center",
  marginBottom: 16,
};

const tabLink: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: 10,
  border: "1px solid #d4af37",
  background: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  textDecoration: "none",
  color: "#111",
};

const tabActive: React.CSSProperties = {
  ...tabLink,
  background: "#d4af37",
  color: "#000",
};

const formCard: React.CSSProperties = {
  marginTop: 14,
  padding: 18,
  borderRadius: 12,
  border: "1px solid #232A36",
  background: "#111827",
  color: "#F5F7FA",
  display: "grid",
  gap: 14,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 8,
  border: "1px solid #232A36",
  marginTop: 6,
  background: "#0B0F14",
  color: "#F5F7FA",
};

const saveBtn: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #d4af37",
  background: "#d4af37",
  color: "#000",
  fontWeight: 700,
  cursor: "pointer",
  justifySelf: "start",
};

const sumCard: React.CSSProperties = {
  borderRadius: 12,
  border: "1px solid #232A36",
  background: "#111827",
  color: "#F5F7FA",
  padding: 12,
};

const grid2: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 14,
};

const grid3: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: 14,
};

const rowCard: React.CSSProperties = {
  borderRadius: 12,
  border: "1px solid #232A36",
  background: "#0B0F14",
  color: "#F5F7FA",
  padding: 12,
};

