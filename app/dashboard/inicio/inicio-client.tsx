"use client";

import { useMemo, useState } from "react";

type Comment = { id: string; author: string; text: string; createdAt: string };
type Post = {
  id: string;
  createdAt: string;
  authorName: string;
  authorHandle: string;
  authorAvatarUrl?: string;
  content: string;
  imageUrl?: string;
  likes: number;
  likedByMe: boolean;
  comments: Comment[];
};

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function InicioClient() {
  const colors = useMemo(
    () => ({
      bg: "#0B0F14",
      card: "rgba(17,24,39,0.55)",
      cardSolid: "rgba(17,24,39,0.78)",
      border: "#232A36",
      text: "#F5F7FA",
      muted: "#9CA3AF",
      gold: "#D4AF37",
      goldSoft: "rgba(212,175,55,0.25)",
      darkGlass: "rgba(11,15,20,0.35)",
    }),
    []
  );

  const [me] = useState({
    name: "Trader AXIS",
    handle: "@axis",
    avatarUrl: "/assets/axis-front.jpeg",
    bio: "Plan. Ejecución. Bitácora. Consistencia.",
  });

  const [composer, setComposer] = useState<{ content: string; imageUrl: string }>({
    content: "",
    imageUrl: "",
  });

  const [posts, setPosts] = useState<Post[]>(() => [
    {
      id: uid(),
      createdAt: new Date().toISOString(),
      authorName: me.name,
      authorHandle: me.handle,
      authorAvatarUrl: me.avatarUrl,
      content:
        "Bienvenido al Inicio privado. Aquí quedan tus ideas, recaps de sesión, capturas y notas rápidas (tipo feed).",
      imageUrl: "",
      likes: 12,
      likedByMe: false,
      comments: [
        {
          id: uid(),
          author: "@axis",
          text: "Siguiente bloque: persistencia en Supabase (posts/likes/comments) + notificaciones.",
          createdAt: new Date().toISOString(),
        },
      ],
    },
  ]);

  const [commentDraft, setCommentDraft] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<"all" | "media" | "wins">("all");

  function publish() {
    const text = composer.content.trim();
    const img = composer.imageUrl.trim();
    if (!text && !img) return;

    const newPost: Post = {
      id: uid(),
      createdAt: new Date().toISOString(),
      authorName: me.name,
      authorHandle: me.handle,
      authorAvatarUrl: me.avatarUrl,
      content: text,
      imageUrl: img,
      likes: 0,
      likedByMe: false,
      comments: [],
    };

    setPosts((p) => [newPost, ...p]);
    setComposer({ content: "", imageUrl: "" });
  }

  function toggleLike(postId: string) {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const nextLiked = !p.likedByMe;
        return { ...p, likedByMe: nextLiked, likes: Math.max(0, p.likes + (nextLiked ? 1 : -1)) };
      })
    );
  }

  function addComment(postId: string) {
    const text = (commentDraft[postId] || "").trim();
    if (!text) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          comments: [...p.comments, { id: uid(), author: me.handle, text, createdAt: new Date().toISOString() }],
        };
      })
    );

    setCommentDraft((d) => ({ ...d, [postId]: "" }));
  }

  const stats = useMemo(() => {
    const totalPosts = posts.length;
    const totalLikes = posts.reduce((a, p) => a + p.likes, 0);
    const totalComments = posts.reduce((a, p) => a + p.comments.length, 0);
    const mediaCount = posts.filter((p) => !!p.imageUrl).length;
    return { totalPosts, totalLikes, totalComments, mediaCount };
  }, [posts]);

  const visiblePosts = useMemo(() => {
    if (filter === "media") return posts.filter((p) => !!p.imageUrl);
    if (filter === "wins")
      return posts.filter((p) => (p.content || "").toLowerCase().includes("win") || (p.content || "").toLowerCase().includes("tp"));
    return posts;
  }, [posts, filter]);

  const card: React.CSSProperties = {
    border: `1px solid ${colors.border}`,
    borderRadius: 18,
    background: colors.card,
    backdropFilter: "blur(10px)",
  };

  const goldDot: React.CSSProperties = {
    width: 10,
    height: 10,
    borderRadius: 999,
    background: colors.gold,
    boxShadow: `0 0 18px ${colors.goldSoft}`,
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        color: colors.text,
        background: `radial-gradient(1200px 600px at 20% 10%, rgba(212,175,55,0.10), transparent 55%),
                     radial-gradient(900px 500px at 85% 25%, rgba(212,175,55,0.07), transparent 55%),
                     ${colors.bg}`,
        padding: 18,
      }}
    >
      {/* HEADER */}
      <section style={{ ...card, padding: 16 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <img
            src={me.avatarUrl}
            alt="avatar"
            style={{
              width: 58,
              height: 58,
              borderRadius: 999,
              border: `1px solid ${colors.border}`,
              objectFit: "cover",
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
              <h2 style={{ margin: 0, letterSpacing: 0.4 }}>{me.name}</h2>
              <span style={{ color: colors.muted }}>{me.handle}</span>
            </div>
            <div style={{ marginTop: 6, color: colors.muted, fontSize: 13, lineHeight: 1.4 }}>{me.bio}</div>

            <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <StatPill label="Posts" value={stats.totalPosts} colors={colors} />
              <StatPill label="Likes" value={stats.totalLikes} colors={colors} />
              <StatPill label="Comentarios" value={stats.totalComments} colors={colors} />
              <StatPill label="Media" value={stats.mediaCount} colors={colors} />
            </div>
          </div>

          <div style={{ display: "grid", justifyItems: "end", gap: 10 }}>
            <div style={goldDot} aria-hidden="true" />
            <FilterBar filter={filter} setFilter={setFilter} colors={colors} />
          </div>
        </div>
      </section>

      {/* GRID */}
      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1.6fr 0.9fr", gap: 16, alignItems: "start" }}>
        {/* FEED */}
        <section style={{ display: "grid", gap: 14 }}>
          {/* Composer */}
          <div style={{ ...card, padding: 14 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <img
                src={me.avatarUrl}
                alt="avatar"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 999,
                  border: `1px solid ${colors.border}`,
                  objectFit: "cover",
                }}
              />
              <div style={{ flex: 1, color: colors.muted, fontSize: 13 }}>
                Publica un recap, idea, plan de sesión o captura…
              </div>
            </div>

            <textarea
              value={composer.content}
              onChange={(e) => setComposer((c) => ({ ...c, content: e.target.value }))}
              placeholder="¿Qué estás pensando para tu próxima sesión?"
              rows={3}
              style={{
                width: "100%",
                resize: "vertical",
                borderRadius: 14,
                border: `1px solid ${colors.border}`,
                background: colors.darkGlass,
                color: colors.text,
                padding: 12,
                outline: "none",
                marginTop: 12,
              }}
            />

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
              <input
                value={composer.imageUrl}
                onChange={(e) => setComposer((c) => ({ ...c, imageUrl: e.target.value }))}
                placeholder="URL de imagen (opcional)"
                style={{
                  flex: 1,
                  minWidth: 220,
                  borderRadius: 12,
                  border: `1px solid ${colors.border}`,
                  background: colors.darkGlass,
                  color: colors.text,
                  padding: "10px 12px",
                  outline: "none",
                }}
              />

              <button
                onClick={publish}
                style={{
                  padding: "10px 14px",
                  borderRadius: 12,
                  border: `1px solid ${colors.gold}`,
                  background: colors.gold,
                  color: colors.bg,
                  fontWeight: 900,
                  boxShadow: `0 0 22px ${colors.goldSoft}`,
                  cursor: "pointer",
                }}
              >
                Publicar
              </button>
            </div>
          </div>

          {/* Posts */}
          {visiblePosts.map((p) => (
            <article key={p.id} style={{ ...card, padding: 14 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <img
                  src={p.authorAvatarUrl || me.avatarUrl}
                  alt="avatar"
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 999,
                    border: `1px solid ${colors.border}`,
                    objectFit: "cover",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start" }}>
                    <div>
                      <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
                        <strong>{p.authorName}</strong>
                        <span style={{ color: colors.muted }}>{p.authorHandle}</span>
                      </div>
                      <div style={{ color: colors.muted, fontSize: 12, marginTop: 2 }}>{fmtDate(p.createdAt)}</div>
                    </div>

                    <span
                      style={{
                        padding: "6px 10px",
                        borderRadius: 999,
                        border: `1px solid ${colors.border}`,
                        color: colors.muted,
                        fontSize: 12,
                        background: "rgba(11,15,20,0.28)",
                      }}
                    >
                      Post
                    </span>
                  </div>

                  {p.content ? (
                    <p style={{ marginTop: 10, marginBottom: 10, lineHeight: 1.7, fontSize: 14 }}>{p.content}</p>
                  ) : null}

                  {p.imageUrl ? (
                    <div
                      style={{
                        borderRadius: 16,
                        overflow: "hidden",
                        border: `1px solid ${colors.border}`,
                        background: "rgba(11,15,20,0.35)",
                        marginBottom: 10,
                      }}
                    >
                      <img src={p.imageUrl} alt="post" style={{ width: "100%", display: "block", objectFit: "cover" }} />
                    </div>
                  ) : null}

                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginTop: 6 }}>
                    <button
                      onClick={() => toggleLike(p.id)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 14,
                        border: `1px solid ${colors.border}`,
                        background: colors.darkGlass,
                        color: p.likedByMe ? colors.gold : colors.text,
                        cursor: "pointer",
                        fontWeight: 800,
                        display: "inline-flex",
                        gap: 8,
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: 16 }}>{p.likedByMe ? "♥" : "♡"}</span>
                      <span>Like</span>
                      <span style={{ color: colors.muted, fontWeight: 900 }}>·</span>
                      <span>{p.likes}</span>
                    </button>

                    <span style={{ color: colors.muted, fontSize: 13 }}>Comentarios: {p.comments.length}</span>
                  </div>

                  {/* Comments */}
                  <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                    {p.comments.length ? (
                      <div style={{ display: "grid", gap: 8 }}>
                        {p.comments.map((c) => (
                          <div
                            key={c.id}
                            style={{
                              borderRadius: 14,
                              border: `1px solid ${colors.border}`,
                              background: "rgba(11,15,20,0.28)",
                              padding: 10,
                            }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                              <strong style={{ fontSize: 13 }}>{c.author}</strong>
                              <span style={{ color: colors.muted, fontSize: 12 }}>{fmtDate(c.createdAt)}</span>
                            </div>
                            <div style={{ marginTop: 6, color: colors.text, lineHeight: 1.55, fontSize: 13 }}>{c.text}</div>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <input
                        value={commentDraft[p.id] || ""}
                        onChange={(e) => setCommentDraft((d) => ({ ...d, [p.id]: e.target.value }))}
                        placeholder="Escribe un comentario…"
                        style={{
                          flex: 1,
                          minWidth: 220,
                          borderRadius: 12,
                          border: `1px solid ${colors.border}`,
                          background: colors.darkGlass,
                          color: colors.text,
                          padding: "10px 12px",
                          outline: "none",
                        }}
                      />
                      <button
                        onClick={() => addComment(p.id)}
                        style={{
                          padding: "10px 12px",
                          borderRadius: 12,
                          border: `1px solid ${colors.gold}`,
                          background: "transparent",
                          color: colors.gold,
                          cursor: "pointer",
                          fontWeight: 900,
                        }}
                      >
                        Comentar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* RIGHT SIDEBAR */}
        <aside style={{ display: "grid", gap: 14, position: "sticky", top: 16 }}>
          <div style={{ ...card, padding: 14 }}>
            <h3 style={{ margin: 0, letterSpacing: 0.3 }}>Atajos</h3>
            <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
              <QuickLink href="/dashboard" label="Análisis (Dashboard)" colors={colors} />
              <QuickLink href="/dashboard/bitacora" label="Bitácora" colors={colors} />
              <QuickLink href="/dashboard/libro" label="Libro" colors={colors} />
            </div>
          </div>

          <div style={{ ...card, padding: 14 }}>
            <h3 style={{ margin: 0, letterSpacing: 0.3 }}>Tendencia (demo)</h3>
            <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
              <TrendRow title="XAUUSD" sub="Zona clave / reacción" colors={colors} />
              <TrendRow title="NASDAQ" sub="Estructura / pullback" colors={colors} />
              <TrendRow title="BTC" sub="Volatilidad / rango" colors={colors} />
            </div>
          </div>

          <div style={{ ...card, padding: 14 }}>
            <h3 style={{ margin: 0, letterSpacing: 0.3 }}>Próximo bloque</h3>
            <p style={{ marginTop: 10, color: colors.muted, lineHeight: 1.6, fontSize: 13 }}>
              Persistencia en Supabase:
              <br />• Posts
              <br />• Likes
              <br />• Comentarios
              <br />• Notificaciones
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

function StatPill({ label, value, colors }: { label: string; value: number; colors: any }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        borderRadius: 999,
        padding: "7px 10px",
        border: `1px solid ${colors.border}`,
        background: "rgba(11,15,20,0.28)",
        color: colors.muted,
        fontSize: 12,
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: 999, background: colors.gold, boxShadow: `0 0 12px ${colors.goldSoft}` }} />
      <span>{label}</span>
      <strong style={{ color: colors.text }}>{value}</strong>
    </span>
  );
}

function FilterBar({
  filter,
  setFilter,
  colors,
}: {
  filter: "all" | "media" | "wins";
  setFilter: (v: "all" | "media" | "wins") => void;
  colors: any;
}) {
  const btn = (active: boolean): React.CSSProperties => ({
    padding: "8px 10px",
    borderRadius: 12,
    border: `1px solid ${active ? colors.gold : colors.border}`,
    background: active ? "rgba(212,175,55,0.12)" : "rgba(11,15,20,0.28)",
    color: active ? colors.gold : colors.muted,
    cursor: "pointer",
    fontWeight: 900,
    fontSize: 12,
  });

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
      <button onClick={() => setFilter("all")} style={btn(filter === "all")}>
        Todo
      </button>
      <button onClick={() => setFilter("media")} style={btn(filter === "media")}>
        Media
      </button>
      <button onClick={() => setFilter("wins")} style={btn(filter === "wins")}>
        Wins
      </button>
    </div>
  );
}

function QuickLink({ href, label, colors }: { href: string; label: string; colors: any }) {
  return (
    <a
      href={href}
      style={{
        textDecoration: "none",
        borderRadius: 14,
        border: `1px solid ${colors.border}`,
        background: "rgba(11,15,20,0.28)",
        padding: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        color: colors.text,
      }}
    >
      <span style={{ fontWeight: 800 }}>{label}</span>
      <span style={{ color: colors.gold, fontWeight: 900 }}>→</span>
    </a>
  );
}

function TrendRow({ title, sub, colors }: { title: string; sub: string; colors: any }) {
  return (
    <div
      style={{
        borderRadius: 14,
        border: `1px solid ${colors.border}`,
        background: "rgba(11,15,20,0.28)",
        padding: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div>
        <strong style={{ letterSpacing: 0.3 }}>{title}</strong>
        <div style={{ marginTop: 4, color: colors.muted, fontSize: 12 }}>{sub}</div>
      </div>
      <span style={{ color: colors.gold, fontWeight: 900 }}>•</span>
    </div>
  );
}
