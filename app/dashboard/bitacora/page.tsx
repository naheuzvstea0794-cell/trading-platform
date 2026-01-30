"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function BitacoraPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

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
    <main style={{ padding: 24, maxWidth: 900 }}>
      <nav style={navStyle}>
        <a href="/dashboard" style={tabLink}>Análisis</a>
        <a href="/dashboard/bitacora" style={tabActive}>Bitácora</a>
        <a href="/dashboard/libro" style={tabLink}>Libro</a>
        <button onClick={logout} style={logoutBtn}>Cerrar sesión</button>
      </nav>

      <p style={{ marginBottom: 16 }}>
        Sesión activa: <strong>{email ?? "..."}</strong>
      </p>

      <h1 style={{ marginBottom: 8 }}>Bitácora de Trading</h1>
      <p style={{ marginTop: 0, opacity: 0.85 }}>
        Aquí registrarás diariamente: Operación (Compra/Venta), Resultado (Win/Loss/BE) y una imagen.
      </p>

      <form style={formCard}>
        <label>
          Activo
          <input type="text" placeholder="Ej: XAUUSD" style={inputStyle} />
        </label>

        <label>
          Tipo de operación
          <select style={inputStyle}>
            <option value="">Selecciona</option>
            <option>Compra</option>
            <option>Venta</option>
          </select>
        </label>

        <label>
          Resultado
          <select style={inputStyle}>
            <option value="">Selecciona</option>
            <option>Win</option>
            <option>Loss</option>
            <option>BE</option>
          </select>
        </label>

        <label>
          Imagen (más adelante)
          <input type="file" style={inputStyle} />
        </label>

        <label>
          Comentarios
          <textarea rows={4} placeholder="Notas..." style={inputStyle} />
        </label>

        <button type="button" style={saveBtn}>
          Guardar (próximo paso)
        </button>
      </form>
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

const logoutBtn: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: 10,
  border: "1px solid #a00",
  background: "#fff",
  color: "#a00",
  fontWeight: 600,
  cursor: "pointer",
};

const formCard: React.CSSProperties = {
  marginTop: 18,
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
};
