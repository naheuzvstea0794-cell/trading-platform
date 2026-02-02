"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Side = "Compra" | "Venta";
type Result = "Win" | "Loss" | "BE";

type Entry = {
  id: string;          // id local (por ahora)
  date: string;        // YYYY-MM-DD
  asset: string;       // XAUUSD, NASDAQ, BTC...
  side: Side;          // Compra/Venta
  result: Result;      // Win/Loss/BE
  pips: number;        // + / -
  usd: number;         // + / -
  notes: string;
};

export default function BitacoraPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  // Mes actual (YYYY-MM)
  const [month, setMonth] = useState(() => {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `${d.getFullYear()}-${mm}`;
  });

  // Fecha hoy (YYYY-MM-DD)
  const [date, setDate] = useState(() => {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `${d.getFullYear()}-${mm}-${dd}`;
  });

  const [asset, setAsset] = useState("XAUUSD");
  const [side, setSide] = useState<Side>("Compra");
  const [result, setResult] = useState<Result>("Win");
  const [pips, setPips] = useState<number>(0);
  const [usd, setUsd] = useState<number>(0);
  const [notes, setNotes] = useState("");

  // Entradas guardadas (por ahora en memoria; en el Bloque 3 las guardamos en Supabase DB)
  const [entries, setEntries] = useState<Entry[]>([]);

  // Auth guard
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

  // Filtrar por mes (YYYY-MM)
  const monthEntries = useMemo(() => {
    return entries.filter((e) => e.date.startsWith(month));
  }, [entries, month]);

  // Total mensual USD
  const totalUsdMonth = useMemo(() => {
    return monthEntries.reduce((acc, e) => acc + (Number.isFinite(e.usd) ? e.usd : 0), 0);
  }, [monthEntries]);

  // Total mensual Pips (opcional, pero útil)
  const totalPipsMonth = useMemo(() => {
    return monthEntries.reduce((acc, e) => acc + (Number.isFinite(e.pips) ? e.pips : 0), 0);
  }, [monthEntries]);

  function addEntry() {
    if (!asset.trim()) return;

    const newEntry: Entry = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      date,
      asset: asset.trim().toUpperCase(),
      side,
      result,
      pips: Number(pips) || 0,
      usd: Number(usd) || 0,
      notes: notes.trim(),
    };

    setEntries((prev) => [newEntry, ...prev]);

    // reset parcial
    setResult("Win");
    setPips(0);
    setUsd(0);
    setNotes("");
  }

  function deleteEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  // ======== UI ========
  const colors = {
    bg: "#0B0F14",
    card: "#111827",
    border: "#232A36",
    text: "#F5F7FA",
    muted: "#9CA3AF",
    gold: "#D4AF37",
    goldSoft: "rgba(212,175,55,0.25)",
    red: "#EF4444",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: colors.bg,
        color: colors.text,
        padding: 24,
      }}
    >
      {/* Top nav (la mantienes como la tienes en dashboard, aquí solo para esta página) */}
      <nav style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
        <a href="/dashboard" style={tabLink(colors)}>Análisis</a>
        <a href="/dashboard/bitacora" style={tabActive(colors)}>Bitácora</a>
        <a href="/dashboard/libro" style={tabLink(colors)}>Libro</a>
        <a href="/" style={tabLink(colors)}>Inicio</a>
      </nav>

      <div style={{ marginBottom: 14, color: colors.muted }}>
        Sesión activa: <strong style={{ color: colors.text }}>{email ?? "..."}</strong>
      </div>

      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          alignItems: "flex-end",
          marginBottom: 14,
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Bitácora</h1>
          <p style={{ marginTop: 6, color: colors.muted, lineHeight: 1.5 }}>
            Registra: <b>Activo</b>, <b>Compra/Venta</b>, <b>Resultado</b>, <b>Pips</b>, <b>USD</b> y una nota.
          </p>
        </div>

        <div style={{ display: "grid", gap: 8, minWidth: 260 }}>
          <label style={{ fontSize: 12, color: colors.muted }}>
            Mes
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              style={inputStyle(colors)}
            />
          </label>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
            }}
          >
            <div style={sumCard(colors)}>
              <div style={{ fontSize: 12, color: colors.muted }}>Total mes (USD)</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{totalUsdMonth.toFixed(2)}</div>
            </div>

            <div style={sumCard(colors)}>
              <div style={{ fontSize: 12, color: colors.muted }}>Total mes (Pips)</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{totalPipsMonth.toFixed(1)}</div>
            </div>
          </div>
        </div>
      </header>

      {/* FORM */}
      <section
        style={{
          border: `1px solid ${colors.border}`,
          borderRadius: 14,
          background: colors.card,
          padding: 16,
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label>
            Fecha
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={inputStyle(colors)}
            />
          </label>

          <label>
            Activo (ej: XAUUSD)
            <input
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              placeholder="XAUUSD"
              style={inputStyle(colors)}
            />
          </label>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 12 }}>
          <label>
            Tipo (Compra/Venta)
            <select value={side} onChange={(e) => setSide(e.target.value as Side)} style={inputStyle(colors)}>
              <option>Compra</option>
              <option>Venta</option>
            </select>
          </label>

          <label>
            Resultado
            <select value={result} onChange={(e) => setResult(e.target.value as Result)} style={inputStyle(colors)}>
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
              style={inputStyle(colors)}
            />
          </label>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12, marginTop: 12 }}>
          <label>
            USD (+/-)
            <input
              type="number"
              step="0.01"
              value={usd}
              onChange={(e) => setUsd(Number(e.target.value))}
              style={inputStyle(colors)}
            />
          </label>

          <label>
            Nota / Comentario
            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Entré en zona, SL respetado…"
              style={inputStyle(colors)}
            />
          </label>
        </div>

        <button onClick={addEntry} style={primaryBtn(colors)}>
          Agregar entrada
        </button>
      </section>

      {/* TABLE */}
      <section style={{ marginTop: 16 }}>
        <h2 style={{ margin: "12px 0" }}>Entradas del mes</h2>

        {monthEntries.length === 0 ? (
          <div style={{ color: colors.muted }}>Aún no hay entradas para este mes.</div>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {monthEntries.map((e) => (
              <div
                key={e.id}
                style={{
                  border: `1px solid ${colors.border}`,
                  borderRadius: 12,
                  padding: 12,
                  background: "rgba(0,0,0,0.25)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <strong>
                    {e.date} — {e.asset}
                  </strong>

                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                    <span style={pill(colors, e.side === "Compra" ? colors.gold : "#60A5FA")}>{e.side}</span>
                    <span style={pill(colors, e.result === "Win" ? "#22C55E" : e.result === "Loss" ? colors.red : "#A3A3A3")}>
                      {e.result}
                    </span>
                    <span style={{ color: colors.muted }}>
                      Pips: <b style={{ color: colors.text }}>{e.pips}</b>
                    </span>
                    <span style={{ color: colors.muted }}>
                      USD: <b style={{ color: colors.text }}>{e.usd}</b>
                    </span>
                    <button onClick={() => deleteEntry(e.id)} style={dangerBtn(colors)}>
                      Eliminar
                    </button>
                  </div>
                </div>

                {e.notes && <div style={{ marginTop: 8, color: colors.muted }}>{e.notes}</div>}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

/* ===== styles ===== */

function inputStyle(colors: any): React.CSSProperties {
  return {
    width: "100%",
    padding: "10px 10px",
    borderRadius: 10,
    border: `1px solid ${colors.border}`,
    background: colors.bg,
    color: colors.text,
    marginTop: 6,
    outline: "none",
  };
}

function sumCard(colors: any): React.CSSProperties {
  return {
    borderRadius: 12,
    border: `1px solid ${colors.border}`,
    background: colors.card,
    padding: 12,
    boxShadow: `0 0 22px ${colors.goldSoft}`,
  };
}

function tabLink(colors: any): React.CSSProperties {
  return {
    padding: "8px 14px",
    borderRadius: 10,
    border: `1px solid ${colors.gold}`,
    background: "transparent",
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
    color: colors.text,
  };
}

function tabActive(colors: any): React.CSSProperties {
  return {
    ...tabLink(colors),
    background: colors.gold,
    color: "#000",
  };
}

function primaryBtn(colors: any): React.CSSProperties {
  return {
    marginTop: 12,
    padding: "10px 14px",
    borderRadius: 10,
    border: `1px solid ${colors.gold}`,
    background: colors.gold,
    color: "#000",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: `0 0 22px ${colors.goldSoft}`,
  };
}

function dangerBtn(colors: any): React.CSSProperties {
  return {
    padding: "6px 10px",
    borderRadius: 10,
    border: `1px solid ${colors.red}`,
    background: "transparent",
    color: colors.red,
    fontWeight: 700,
    cursor: "pointer",
  };
}

function pill(colors: any, c: string): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    padding: "6px 10px",
    borderRadius: 999,
    border: `1px solid ${colors.border}`,
    background: "rgba(0,0,0,0.25)",
    color: c,
    fontWeight: 800,
    fontSize: 12,
  };
}
