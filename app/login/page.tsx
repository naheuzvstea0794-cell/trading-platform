"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setMsg(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main style={{ padding: 24, maxWidth: 420 }}>
      <h1>Iniciar sesión</h1>

      <form onSubmit={onLogin} style={{ display: "grid", gap: 12 }}>
        <input
          placeholder="Ema
cat > app/login/page.tsx << 'EOF'
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setMsg(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main style={{ padding: 24, maxWidth: 420 }}>
      <h1>Iniciar sesión</h1>

      <form onSubmit={onLogin} style={{ display: "grid", gap: 12 }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <input
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />

        <button disabled={loading} type="submit">
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        <p style={{ margin: 0 }}>
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </p>
        {msg && <p style={{ color: "crimson" }}>{msg}</p>}
      </form>
    </main>
  );
}
