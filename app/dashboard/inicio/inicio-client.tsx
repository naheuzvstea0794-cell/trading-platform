"use client";

import { useMemo, useState } from "react";

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
  comments: { id: string; author: string; text: string; createdAt: string }[];
};

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function InicioClient() {
  const colors = useMemo(
    () => ({
      bg: "#0B0F14",
      card: "rgba(17,24,39,0.55)",
      border: "#232A36",
      text: "#F5F7FA",
      muted: "#9CA3AF",
      gold: "#D4AF37",
      goldSoft: "rgba(212,175,55,0.25)",
    }),
    []
  );

  const [me] = useState({
    name: "Trader AXIS",
    handle: "@axis",
    avatarUrl: "/assets/axis-front.jpeg", // placeholder (puedes cambiar luego)
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
        "Bienvenido al Inicio privado. Aquí quedarán tus publicaciones, ideas, recap de sesiones y capturas de análisis.",
      imageUrl: "",
      likes: 2,
      likedByMe: false,
      comments: [
        {
          id: uid(),
          author: "AXIS",
          text: "Este muro será persistente en Supabase en el siguiente bloque.",
          createdAt: new Date().toISOString(),
        },
      ],
    },
  ]);

  const [commentDraft, setCommentDraft] = useState<Record<string, string>>({});

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
        return {
          ...p,
          likedByMe: nextLiked,
          likes: Math.max(0, p.likes + (nextLiked ? 1 : -1)),
        };
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
          comments: [
            ...p.comments,
            { id: uid(), author: me.handle, text, createdAt: new Date().toISOString() },
          ],
        };
      })
    );

    setCommentDraft((d) => ({ ...d, [postId]: "" }));
  }

  const cardStyle: React.CSSProperties = {
    border: `1px solid ${colors.border}`,
    borderRadius: 16,
    background: colors.card,
    backdropFilter: "blur(8px)",
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
      {/* TOP */}
      <section style={{ ...cardStyle, padding: 16 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <img
            src={me.avatarUrl}
            alt="avatar"
            style={{
              width: 54,
              height: 54,
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
            <div style={{ marginTop: 6, color: colors.muted, fontSize: 13, lineHeight: 1.4 }}>
              Inicio privado — tu muro tipo “trader social”: publicaciones, likes, comentarios y (luego)
              notificaciones.
            </div>
          </div>

          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: colors.gold,
              boxShadow: `0 0 18px ${colors.goldSoft}`,
            }}
            aria-hidden="true"
          />
        </div>

        {/* Composer */}
        <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
          <textarea
            value={composer.content}
            onChange={(e) => setComposer((c) => ({ ...c, content: e.target.value }))}
            placeholder="Escribe una publicación… (ej: plan, recap, idea, trade log resumido)"
            rows={3}
            style={{
              width: "100%",
              resize: "vertical",
              borderRadius: 14,
              border: `1px solid ${colors.border}`,
              background: "rgba(11,15,20,0.35)",
              color: colors.text,
              padding: 12,
              outline: "none",
            }}
          />

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              value={composer.imageUrl}
              onChange={(e) => setComposer((c) => ({ ...c, imageUrl: e.target.value }))}
              placeholder="URL de imagen (opcional)"
              style={{
                flex: 1,
                minWidth: 220,
                borderRadius: 12,
                border: `1px solid ${colors.border}`,
                background: "rgba(11,15,20,0.35)",
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
                fontWeight: 800,
                boxShadow: `0 0 22px ${colors.goldSoft}`,
                cursor: "pointer",
              }}
            >
              Publicar
            </button>
          </div>
        </div>
      </section>

      {/* Feed */}
      <section style={{ marginTop: 16, display: "grid", gap: 14 }}>
        {posts.map((p) => (
          <article key={p.id} style={{ ...cardStyle, padding: 14 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <img
                src={p.authorAvatarUrl || me.avatarUrl}
                alt="avatar"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 999,
                  border: `1px solid ${colors.border}`,
                  objectFit: "cover",
                }}
              />

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <div>
                    <strong>{p.authorName}</strong>{" "}
                    <span style={{ color: colors.muted }}>{p.authorHandle}</span>
                    <div style={{ color: colors.muted, fontSize: 12, marginTop: 2 }}>
                      {new Date(p.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                {p.content ? (
                  <p style={{ marginTop: 10, marginBottom: 10, lineHeight: 1.6 }}>{p.content}</p>
                ) : null}

                {p.imageUrl ? (
                  <div
                    style={{
                      borderRadius: 14,
                      overflow: "hidden",
                      border: `1px solid ${colors.border}`,
                      background: "rgba(11,15,20,0.35)",
                      marginBottom: 10,
                    }}
                  >
                    <img
                      src={p.imageUrl}
                      alt="post"
                      style={{ width: "100%", display: "block", objectFit: "cover" }}
                    />
                  </div>
                ) : null}

                <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  <button
                    onClick={() => toggleLike(p.id)}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 12,
                      border: `1px solid ${colors.border}`,
                      background: "rgba(11,15,20,0.35)",
                      color: p.likedByMe ? colors.gold : colors.text,
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    {p.likedByMe ? "♥" : "♡"} Like · {p.likes}
                  </button>

                  <span style={{ color: colors.muted, fontSize: 13 }}>
                    Comentarios: {p.comments.length}
                  </span>
                </div>

                {/* Comments */}
                <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                  {p.comments.length ? (
                    <div style={{ display: "grid", gap: 8 }}>
                      {p.comments.map((c) => (
                        <div
                          key={c.id}
                          style={{
                            borderRadius: 12,
                            border: `1px solid ${colors.border}`,
                            background: "rgba(11,15,20,0.28)",
                            padding: 10,
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                            <strong style={{ fontSize: 13 }}>{c.author}</strong>
                            <span style={{ color: colors.muted, fontSize: 12 }}>
                              {new Date(c.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <div style={{ marginTop: 6, color: colors.text, lineHeight: 1.5 }}>
                            {c.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <input
                      value={commentDraft[p.id] || ""}
                      onChange={(e) =>
                        setCommentDraft((d) => ({ ...d, [p.id]: e.target.value }))
                      }
                      placeholder="Escribe un comentario…"
                      style={{
                        flex: 1,
                        minWidth: 220,
                        borderRadius: 12,
                        border: `1px solid ${colors.border}`,
                        background: "rgba(11,15,20,0.35)",
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
                        fontWeight: 800,
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

      <footer style={{ marginTop: 16, color: colors.muted, fontSize: 12 }}>
        Próximo bloque: persistencia Supabase (posts/likes/comments) + notificaciones.
      </footer>
    </main>
  );
}
