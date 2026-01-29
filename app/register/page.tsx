"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const { error } = await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (error) {
      setMsg(error.message);
      return;
    }

    setMsg("Cuenta creada. Si activaste confirmación por email, revisa tu correo.");
    router.push("/login");
  }

  return (
    <main style={{ padding: 24, maxWidth: 420 }}>
      <h1>Crear cuenta</h1>

      <form onSubmit={onRegister} style={{ display: "grid", gap: 12 }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <input
          placeholder="Contraseña (mínimo 6)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          minLength={6}
          required
        />

        <button disabled={loading} type="submit">
          {loading ? "Creando..." : "Registrarme"}
        </button>

        <p style={{ margin: 0 }}>
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>

        {msg && <p>{msg}</p>}
      </form>
    </main>
  );
}
