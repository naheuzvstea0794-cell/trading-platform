"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

/* =======================
   Tipos
======================= */
type Entry = {
  id: string;
  date: string; // YYYY-MM-DD
  asset: string;
  side: "Compra" | "Venta";
  result: "Win" | "Loss" | "BE";
  pips: number;
  usd: number;
  note: string;
};

export default function BitacoraPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  /* ===== Estado ===== */
  const [entries, setEntries] = useState<Entry[]>([]);
  const [month, setMonth] = useState<string>(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    asset: "XAUUSD",
    side: "Compra" as "Compra" | "Venta",
    result: "Win" as "Win" | "Loss" | "BE",
    pips: 0,
    usd: 0,
    note: "",
  });

  /* ===== Auth ===== */
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.replace("/login");
        return;
      }
      setEmail(data.user.email ?? "");
    })();
  }, [router]);

  /* ===== Helpers ===== */
  const monthEntries = useMemo(
    () => entries.filter(e => e.date.startsWith(month)),
    [entries, month]
  );

  const totalUSD = useMemo(
    () => monthEntries.reduce((a, b) => a + b.usd, 0),
    [monthEntries]
  );

  const totalPips = useMemo(
    () => monthEntries.reduce((a, b) => a + b.pips, 0),
    [monthEntries]
  );

  const calendarDays = useMemo(() => {
    const [y, m] = month.split("-").map(Number);
    const first = new Date(y, m - 1, 1);
    const last = new Date(y, m, 0);
    const days: { date: string; usd: number; pips: number }[] = [];

    for (let d = 1; d <= last.getDate(); d++) {
      const date = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const dayEntries = entries.filter(e => e.date === date);
      days.push({
        date,
        usd: dayEntries.reduce((a, b) => a + b.usd, 0),
        pips: dayEntries.reduce((a, b) => a + b.pips, 0),
      });
    }
    return days;
  }, [entries, month]);

  /* ===== Actions ===== */
  function addEntry() {
    setEntries(prev => [
      ...prev,
      { id: crypto.randomUUID(), ...form },
    ]);
    setForm(f => ({ ...f, pips: 0, usd: 0, note: "" }));
  }

  function logout() {
    window.location.href = "/auth/logout";
  }

  /* =======================
     Render
======================= */
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
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ margin: 0, color: "#9CA3AF" }}>
            Sesión activa: <b style={{ color: "#F5F7FA" }}>{email}</b>
          </p>
          <h1 style={{ marginTop: 6 }}>Bitácora</h1>
          <p style={{ color: "#9CA3AF" }}>
            Registra: Activo, Compra/Venta, Resultado, Pips, USD y nota.
          </p>
        </div>

        <div>
          <label style={{ fontSize: 12, color: "#9CA3AF" }}>Mes</label>
          <input
            type="month"
            value={month}
            onChange={e => setMonth(e.target.value)}
            style={input}
          />
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <div style={statBox}>
              <div>Total mes (USD)</div>
              <b>{totalUSD.toFixed(2)}</b>
            </div>
            <div style={statBox}>
              <div>Total mes (Pips)</div>
              <b>{totalPips.toFixed(1)}</b>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <section style={card}>
        <div style={grid}>
          <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={input} />
          <input placeholder="Activo (ej: XAUUSD)" value={form.asset} onChange={e => setForm({ ...form, asset: e.target.value })} style={input} />
          <select value={form.side} onChange={e => setForm({ ...form, side: e.target.value as any })} style={input}>
            <option>Compra</option>
            <option>Venta</option>
          </select>
          <select value={form.result} onChange={e => setForm({ ...form, result: e.target.value as any })} style={input}>
            <option>Win</option>
            <option>Loss</option>
            <option>BE</option>
          </select>
          <input type="number" placeholder="Pips" value={form.pips} onChange={e => setForm({ ...form, pips: +e.target.value })} style={input} />
          <input type="number" placeholder="USD (+/-)" value={form.usd} onChange={e => setForm({ ...form, usd: +e.target.value })} style={input} />
          <input placeholder="Nota / Comentario" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} style={input} />
        </div>

        <button onClick={addEntry} style={btnPrimary}>Agregar entrada</button>
      </section>

      {/* Entradas */}
      <section style={{ marginTop: 18 }}>
        <h2>Entradas del mes</h2>
        {monthEntries.length === 0 && <p style={{ color: "#9CA3AF" }}>Aún no hay entradas.</p>}
        {monthEntries.map(e => (
          <div key={e.id} style={row}>
            <span>{e.date}</span>
            <span>{e.asset}</span>
            <span>{e.side}</span>
            <span>{e.result}</span>
            <span>{e.pips} pips</span>
            <span>{e.usd} USD</span>
            <span>{e.note}</span>
          </div>
        ))}
      </section>

      {/* Calendario */}
      <section style={{ marginTop: 32 }}>
        <h2>Calendario mensual</h2>
        <div style={calendar}>
          {calendarDays.map(d => (
            <div key={d.date} style={calendarDay}>
              <b>{d.date.split("-")[2]}</b>
              <div>{d.usd !== 0 && `${d.usd} USD`}</div>
              <div>{d.pips !== 0 && `${d.pips} pips`}</div>
            </div>
          ))}
        </div>
      </section>

      <button onClick={logout} style={{ ...btnDanger, marginTop: 40 }}>
        Salir
      </button>
    </main>
  );
}

/* =======================
   Styles
======================= */
const input: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 8,
  border: "1px solid #232A36",
  background: "#0B0F14",
  color: "#F5F7FA",
};

const btnPrimary: React.CSSProperties = {
  marginTop: 12,
  padding: "10px 14px",
  borderRadius: 10,
  background: "#D4AF37",
  color: "#111",
  fontWeight: 700,
};

const btnDanger: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  background: "#7F1D1D",
  color: "#fff",
};

const card: React.CSSProperties = {
  marginTop: 16,
  padding: 16,
  borderRadius: 14,
  border: "1px solid #232A36",
  background: "rgba(255,255,255,0.02)",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: 10,
};

const row: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 2fr",
  gap: 8,
  padding: 8,
  borderBottom: "1px solid #232A36",
};

const statBox: React.CSSProperties = {
  padding: 10,
  borderRadius: 10,
  border: "1px solid #232A36",
  background: "rgba(255,255,255,0.03)",
};

const calendar: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: 8,
};

const calendarDay: React.CSSProperties = {
  padding: 8,
  borderRadius: 10,
  border: "1px solid #232A36",
  minHeight: 70,
};

