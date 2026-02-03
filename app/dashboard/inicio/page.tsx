// app/dashboard/inicio/page.tsx
import WallClient from "./wall-client";

export const dynamic = "force-dynamic";

export default async function InicioPage() {
  /**
   * Esta primera versión NO depende de Supabase para renderizar.
   * Solo construye el muro social en frontend para no romper nada.
   *
   * En el siguiente bloque conectamos user real + posts + likes + comments a Supabase.
   */
  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <WallClient />
      </div>
    </div>
  );
}
