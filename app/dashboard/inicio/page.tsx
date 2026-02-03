"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Post = {
  id: string;
  createdAt: number;
  text: string;
  imageUrl?: string;
  likes: number;
};

const KEY = "axis_wall_posts_v1";

const ui = {
  bg: "#0B0F14",
  card: "rgba(17,24,39,0.55)",
  border: "#232A36",
  text: "#F5F7FA",
  muted: "#9CA3AF",
  gold: "#D4AF37",
  goldSoft: "rgba(212,175,55,0.25)",
};

export default function InicioPrivadoPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("Usuario AXIS");
  const [photo, setPhoto] = useState<string>("");
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.replace("/login");
        return;
      }
      setEmail(data.user.email ?? "");
      const metaName =
        (data.user.user_metadata?.full_name as string) ||
        (data.user.user_metadata?.name as string) ||
        "Usuario AXIS";
      const metaPhoto =
        (data.user.user_metadata?.avatar_url as string) ||
        (data.user.user_metadata?.picture as string) ||
        "";
      setName(metaName);
      setPhoto(metaPhoto);
    })();
  }, [router]);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Post[];
      if (Array.isArray(parsed)) setPosts(parsed);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(posts));
  }, [posts]);

  const sorted = useMemo(
    () => [...posts].sort((a, b) => b.createdAt - a.createdAt),
    [posts]
  );

  function addPost() {
    const clean = text.trim();
    if (!clean && !imageUrl.trim()) return;

    const p: Post = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      text: clean,
      imageUrl: imageUrl.trim() || undefined,
      likes: 0,
    };

    setPosts((prev) => [p, ...prev]);
    setText("");
    setImageUrl("");
  }

  function likePost(id: string) {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  }

  return (
    <main
      style={{
        minHeight: "calc(100vh - 86px)",
        padding: 24,
        background: `radial-gradient(1200px 600px at 20% 10%, rgba(212,175,55,0.12), transparent 55%),
                     radial-gradient(900px 500px at 85% 25%, rgba(212,175,55,0.08), transparent 55%),
                     ${ui.bg}`,
        color: ui.text,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <section
          style={{
            border: `1px solid ${ui.border}`,
            borderRadius: 16,
            background: ui.card,
            padding: 16,
            display: "flex",
            gap: 14,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              border: `1px solid rgba(212,175,55,0.35)`,
              background: "rgba(11,15,20,0.35)",
              overflow: "hidden",
              display: "grid",
              placeItems: "center",
              fontWeight: 900,
              color: ui.gold,
            }}
          >
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt="Foto"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              name.slice(0, 1).toUpperCase()
            )}
          </div>

          <div style={{ flex: 1, minWidth: 220 }}>
            <h1 style={{ margin: 0, letterSpacing: 0.4 }}>{name}</h1>
            <p style={{ margin: "6px 0 0", color: ui.muted }}>
              {email || "Sesión activa"}
            </p>
          </div>

          <div
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: `1px solid ${ui.border}`,
              background: "rgba(11,15,20,0.35)",
              color: ui.muted,
              fontSize: 12,
            }}
          >
            Muro privado (posts + likes)
          </div>
        </section>

        <section
          style={{
            marginTop: 16,
            border: `1px solid ${ui.border}`,
            borderRadius: 16,
            background: ui.card,
            padding: 16,
          }}
        >
          <h2 style={{ marginTop: 0 }}>Publicar</h2>

          <label style={label()}>Texto</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="¿Qué estás pensando hoy?"
            rows={3}
            style={textarea()}
          />

          <label style={{ ...label(), marginTop: 10 }}>URL de imagen (opcional)</label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            style={input()}
          />

          <button onClick={addPost} style={cta()}>
            Publicar
          </button>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2 style={{ marginBottom: 10 }}>Actividad</h2>

          {sorted.length === 0 ? (
            <p style={{ color: ui.muted }}>Aún no hay publicaciones.</p>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {sorted.map((p) => (
                <div
                  key={p.id}
                  style={{
                    border: `1px solid ${ui.border}`,
                    borderRadius: 16,
                    background: ui.card,
                    padding: 16,
                  }}
                >
                  <div style={{ color: ui.muted, fontSize: 12 }}>
                    {new Date(p.createdAt).toLocaleString()}
                  </div>

                  {p.text ? (
                    <p style={{ marginTop: 10, lineHeight: 1.6 }}>{p.text}</p>
                  ) : null}

                  {p.imageUrl ? (
                    <div style={{ marginTop: 10 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.imageUrl}
                        alt="Post"
                        style={{
                          width: "100%",
                          maxHeight: 420,
                          objectFit: "cover",
                          borderRadius: 14,
                          border: `1px solid ${ui.border}`,
                        }}
                      />
                    </div>
                  ) : null}

                  <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
                    <button onClick={() => likePost(p.id)} style={btn()}>
                      Me gusta ({p.likes})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function label() {
  return { fontSize: 12, color: ui.muted, display: "block", marginBottom: 6 } as const;
}
function input() {
  return {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 12,
    border: `1px solid ${ui.border}`,
    background: "rgba(11,15,20,0.35)",
    color: ui.text,
    outline: "none",
  } as const;
}
function textarea() {
  return {
    ...input(),
    resize: "vertical" as const,
  };
}
function cta() {
  return {
    marginTop: 12,
    color: "#0B0F14",
    background: ui.gold,
    padding: "10px 14px",
    borderRadius: 12,
    fontWeight: 900,
    border: `1px solid ${ui.gold}`,
    boxShadow: `0 0 22px ${ui.goldSoft}`,
    cursor: "pointer",
  } as const;
}
function btn() {
  return {
    padding: "10px 14px",
    borderRadius: 12,
    border: `1px solid ${ui.border}`,
    background: "rgba(11,15,20,0.35)",
    color: ui.text,
    fontWeight: 800,
    cursor: "pointer",
  } as const;
}
