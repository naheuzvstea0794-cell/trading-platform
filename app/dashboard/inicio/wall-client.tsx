// app/dashboard/inicio/wall-client.tsx
"use client";

import { useMemo, useRef, useState } from "react";

type Comment = {
  id: string;
  postId: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
  content: string;
  createdAt: string;
};

type Post = {
  id: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
  content: string;
  imageUrl?: string;
  createdAt: string;
  likes: number;
  likedByMe: boolean;
  comments: Comment[];
};

type NotificationItem = {
  id: string;
  type: "like" | "comment";
  postId: string;
  message: string;
  createdAt: string;
  read: boolean;
};

function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

function nowIso() {
  return new Date().toISOString();
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  const time = d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  return `${date} · ${time}`;
}

function goldText() {
  return "text-[#d4af37]";
}

function goldBorder() {
  return "border border-[#2b240f] hover:border-[#3a2f12]";
}

export default function WallClient() {
  // ✅ “usuario” mock por ahora (en el siguiente bloque lo conectamos a Supabase Auth)
  const me = useMemo(
    () => ({
      name: "Trader",
      avatarUrl: "", // puedes poner una URL si quieres ver avatar
    }),
    []
  );

  const [posts, setPosts] = useState<Post[]>(() => [
    {
      id: uid("post"),
      author: { name: "AXIS", avatarUrl: "" },
      content:
        "Bienvenido a tu Inicio privado. Este es tu muro: aquí verás publicaciones, likes, comentarios y notificaciones.",
      createdAt: nowIso(),
      likes: 2,
      likedByMe: false,
      comments: [
        {
          id: uid("c"),
          postId: "seed",
          author: { name: "AXIS" },
          content: "En el siguiente bloque conectamos todo a Supabase sin romper Bitácora.",
          createdAt: nowIso(),
        },
      ],
    },
    {
      id: uid("post"),
      author: { name: me.name, avatarUrl: me.avatarUrl },
      content: "Tip: publica tus reglas del día, sesgo emocional, y post-mortem rápido de tu sesión.",
      createdAt: nowIso(),
      likes: 0,
      likedByMe: false,
      comments: [],
    },
  ]);

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => [
    {
      id: uid("n"),
      type: "comment",
      postId: posts?.[0]?.id ?? "unknown",
      message: "AXIS comentó en una publicación.",
      createdAt: nowIso(),
      read: false,
    },
  ]);

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  const [showNotifications, setShowNotifications] = useState(false);

  // Composer state
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  // Comment composer per post
  const [commentDraft, setCommentDraft] = useState<Record<string, string>>({});

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function addNotification(item: Omit<NotificationItem, "id" | "read">) {
    setNotifications((prev) => [
      {
        id: uid("n"),
        read: false,
        ...item,
      },
      ...prev,
    ]);
  }

  function onPickImage() {
    fileRef.current?.click();
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Solo preview local (sin subir)
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  }

  function clearImage() {
    setImagePreview("");
    if (fileRef.current) fileRef.current.value = "";
  }

  function createPost() {
    const trimmed = content.trim();
    if (!trimmed && !imagePreview) return;

    const newPost: Post = {
      id: uid("post"),
      author: { name: me.name, avatarUrl: me.avatarUrl },
      content: trimmed,
      imageUrl: imagePreview || undefined,
      createdAt: nowIso(),
      likes: 0,
      likedByMe: false,
      comments: [],
    };

    setPosts((prev) => [newPost, ...prev]);
    setContent("");
    clearImage();
  }

  function toggleLike(postId: string) {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;

        const nextLiked = !p.likedByMe;
        const nextLikes = Math.max(0, p.likes + (nextLiked ? 1 : -1));

        // Notificación (solo si alguien distinto a mí; por ahora simulamos que aplica)
        if (nextLiked && p.author.name !== me.name) {
          addNotification({
            type: "like",
            postId,
            message: `${me.name} dio like a una publicación de ${p.author.name}.`,
            createdAt: nowIso(),
          });
        }

        return { ...p, likedByMe: nextLiked, likes: nextLikes };
      })
    );
  }

  function addComment(postId: string) {
    const draft = (commentDraft[postId] ?? "").trim();
    if (!draft) return;

    const newComment: Comment = {
      id: uid("c"),
      postId,
      author: { name: me.name, avatarUrl: me.avatarUrl },
      content: draft,
      createdAt: nowIso(),
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;

        // Notificación al autor del post (si no soy yo)
        if (p.author.name !== me.name) {
          addNotification({
            type: "comment",
            postId,
            message: `${me.name} comentó en una publicación de ${p.author.name}.`,
            createdAt: nowIso(),
          });
        }

        return { ...p, comments: [...p.comments, newComment] };
      })
    );

    setCommentDraft((prev) => ({ ...prev, [postId]: "" }));
  }

  function deletePost(postId: string) {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Left: Perfil */}
      <aside className="lg:col-span-4">
        <div className={`rounded-2xl bg-[#0a0a0a] p-5 ${goldBorder()}`}>
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 overflow-hidden rounded-full bg-[#111] ring-1 ring-[#2b240f]">
              {me.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={me.avatarUrl} alt="avatar" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                  {me.name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className={`text-lg font-semibold ${goldText()}`}>{me.name}</div>
              <div className="text-xs text-gray-400">Inicio privado · AXIS WORKSPACE</div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <Stat label="Posts" value={posts.length} />
            <Stat label="Likes" value={posts.reduce((acc, p) => acc + p.likes, 0)} />
            <Stat label="Comentarios" value={posts.reduce((acc, p) => acc + p.comments.length, 0)} />
          </div>

          <div className="mt-5">
            <button
              onClick={() => setShowNotifications(true)}
              className="flex w-full items-center justify-between rounded-xl bg-black px-4 py-3 text-sm ring-1 ring-[#2b240f] hover:ring-[#3a2f12]"
            >
              <span className="text-gray-200">Notificaciones</span>
              <span className="flex items-center gap-2">
                {unreadCount > 0 ? (
                  <span className="rounded-full bg-[#d4af37] px-2 py-0.5 text-xs font-semibold text-black">
                    {unreadCount}
                  </span>
                ) : (
                  <span className="text-xs text-gray-500">0</span>
                )}
                <span className="text-gray-400">›</span>
              </span>
            </button>
          </div>
        </div>

        {/* Panel sugerencias/estado */}
        <div className={`mt-6 rounded-2xl bg-[#0a0a0a] p-5 ${goldBorder()}`}>
          <div className={`text-sm font-semibold ${goldText()}`}>Sugerencia del día</div>
          <p className="mt-2 text-sm leading-relaxed text-gray-300">
            Publica tu plan antes de operar: sesgo, niveles, invalidación y riesgo. Luego comenta el resultado sin juicio.
          </p>
          <div className="mt-4 rounded-xl bg-black p-3 text-xs text-gray-400 ring-1 ring-[#2b240f]">
            Próximo bloque: persistencia con Supabase (posts, likes, comments, notifs).
          </div>
        </div>
      </aside>

      {/* Center: Composer + Feed */}
      <main className="lg:col-span-8">
        {/* Composer */}
        <div className={`rounded-2xl bg-[#0a0a0a] p-5 ${goldBorder()}`}>
          <div className="flex items-center justify-between">
            <div className={`text-sm font-semibold ${goldText()}`}>Crear publicación</div>
            <div className="text-xs text-gray-500">Premium · minimal · financiero</div>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="¿Qué vas a publicar hoy? (plan, reflexión, resultado, aprendizaje...)"
            className="mt-4 w-full resize-none rounded-xl bg-black p-4 text-sm text-gray-200 outline-none ring-1 ring-[#2b240f] placeholder:text-gray-600 focus:ring-[#3a2f12]"
            rows={4}
          />

          {imagePreview ? (
            <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-[#2b240f]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview} alt="preview" className="max-h-[360px] w-full object-cover" />
              <div className="flex items-center justify-between bg-black px-3 py-2 text-xs text-gray-400">
                <span>Imagen en vista previa (aún no se sube)</span>
                <button onClick={clearImage} className="text-[#d4af37] hover:opacity-80">
                  Quitar
                </button>
              </div>
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} className="hidden" />
            <button
              onClick={onPickImage}
              className="rounded-xl bg-black px-4 py-2 text-sm text-gray-200 ring-1 ring-[#2b240f] hover:ring-[#3a2f12]"
            >
              + Imagen
            </button>

            <button
              onClick={createPost}
              className="rounded-xl bg-[#d4af37] px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
            >
              Publicar
            </button>

            <span className="text-xs text-gray-500">
              * En el siguiente bloque: subida real a Supabase Storage.
            </span>
          </div>
        </div>

        {/* Feed */}
        <div className="mt-6 space-y-5">
          {posts.map((post) => (
            <article key={post.id} className={`rounded-2xl bg-[#0a0a0a] p-5 ${goldBorder()}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-[#111] ring-1 ring-[#2b240f]">
                    {post.author.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.author.avatarUrl} alt="avatar" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                        {post.author.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className={`text-sm font-semibold ${goldText()}`}>{post.author.name}</div>
                    <div className="text-xs text-gray-500">{formatDate(post.createdAt)}</div>
                  </div>
                </div>

                {post.author.name === me.name ? (
                  <button
                    onClick={() => deletePost(post.id)}
                    className="rounded-lg bg-black px-3 py-1.5 text-xs text-gray-300 ring-1 ring-[#2b240f] hover:ring-[#3a2f12]"
                    title="Eliminar publicación"
                  >
                    Eliminar
                  </button>
                ) : null}
              </div>

              {post.content ? (
                <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-gray-200">{post.content}</p>
              ) : null}

              {post.imageUrl ? (
                <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-[#2b240f]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.imageUrl} alt="post" className="max-h-[520px] w-full object-cover" />
                </div>
              ) : null}

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`rounded-xl px-4 py-2 text-sm ring-1 ${
                    post.likedByMe
                      ? "bg-[#d4af37] text-black ring-[#d4af37]"
                      : "bg-black text-gray-200 ring-[#2b240f] hover:ring-[#3a2f12]"
                  }`}
                >
                  {post.likedByMe ? "Liked" : "Like"} · {post.likes}
                </button>

                <div className="text-sm text-gray-400">
                  Comentarios: <span className="text-gray-200">{post.comments.length}</span>
                </div>
              </div>

              {/* Comments */}
              <div className="mt-4 space-y-3">
                {post.comments.map((c) => (
                  <div key={c.id} className="rounded-xl bg-black p-3 ring-1 ring-[#2b240f]">
                    <div className="flex items-center justify-between">
                      <div className={`text-xs font-semibold ${goldText()}`}>{c.author.name}</div>
                      <div className="text-[11px] text-gray-500">{formatDate(c.createdAt)}</div>
                    </div>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-gray-200">{c.content}</p>
                  </div>
                ))}
              </div>

              {/* Comment composer */}
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  value={commentDraft[post.id] ?? ""}
                  onChange={(e) => setCommentDraft((prev) => ({ ...prev, [post.id]: e.target.value }))}
                  placeholder="Escribe un comentario…"
                  className="w-full rounded-xl bg-black px-4 py-2 text-sm text-gray-200 outline-none ring-1 ring-[#2b240f] placeholder:text-gray-600 focus:ring-[#3a2f12]"
                />
                <button
                  onClick={() => addComment(post.id)}
                  className="rounded-xl bg-[#d4af37] px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
                >
                  Comentar
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Notifications Drawer */}
      {showNotifications ? (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setShowNotifications(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] p-5 ring-1 ring-[#2b240f]">
            <div className="flex items-center justify-between">
              <div className={`text-sm font-semibold ${goldText()}`}>Notificaciones</div>
              <button
                onClick={() => setShowNotifications(false)}
                className="rounded-lg bg-black px-3 py-1.5 text-xs text-gray-300 ring-1 ring-[#2b240f] hover:ring-[#3a2f12]"
              >
                Cerrar
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="text-xs text-gray-400">
                No leídas: <span className="text-gray-200">{unreadCount}</span>
              </div>
              <button onClick={markAllRead} className="text-xs text-[#d4af37] hover:opacity-80">
                Marcar todo como leído
              </button>
            </div>

            <div className="mt-4 space-y-3 overflow-auto pb-6">
              {notifications.length === 0 ? (
                <div className="rounded-xl bg-black p-4 text-sm text-gray-400 ring-1 ring-[#2b240f]">
                  No hay notificaciones aún.
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`rounded-xl bg-black p-4 ring-1 ${
                      n.read ? "ring-[#2b240f]" : "ring-[#d4af37]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`text-xs font-semibold ${goldText()}`}>
                        {n.type === "like" ? "Like" : "Comentario"}
                      </div>
                      <div className="text-[11px] text-gray-500">{formatDate(n.createdAt)}</div>
                    </div>
                    <p className="mt-2 text-sm text-gray-200">{n.message}</p>
                    {!n.read ? (
                      <button
                        className="mt-3 text-xs text-[#d4af37] hover:opacity-80"
                        onClick={() =>
                          setNotifications((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)))
                        }
                      >
                        Marcar como leído
                      </button>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-black p-3 text-center ring-1 ring-[#2b240f]">
      <div className="text-lg font-semibold text-white">{value}</div>
      <div className="text-[11px] text-gray-500">{label}</div>
    </div>
  );
}
