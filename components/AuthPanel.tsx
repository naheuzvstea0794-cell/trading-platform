"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AuthPanel() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const res =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (res.error) {
      setMsg(res.error.message);
      return;
    }

    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <section style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button
          onClick={() => setMode("login")}
          style={{ fontWeight: mode === "login" ? 700 : 400 }}
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => setMode("register")}
          style={{ fontWeight: mode === "register" ? 700 : 400 }}
        >
          Registrarse
        </button>
      </div>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña (mín. 6)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Procesando..." : mode === "login" ? "Ingresar" : "Crear cuenta"}
        </button>
        {msg && <p style={{ color: "crimson", margin: 0 }}>{msg}</p>}
      </form>

      <p style={{ marginTop: 12, fontSize: 12, opacity: 0.8 }}>
        Al ingresar tendrás acceso al área privada con análisis extendidos, bitácora y recursos.
      </p>
    </section>
  );
}
