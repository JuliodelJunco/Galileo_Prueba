
import { LogoutButton } from "@/app/ui/logout-button";
import Tickets from "@/app/ui/dashboard/tickets";
import { Suspense } from "react";
import { fetchDashboardStats } from "@/app/lib/data";

export default async function DashboardPage() {
  const stats = await fetchDashboardStats();
return (
<main className="min-h-screen bg-zinc-950 text-white">
{/* Background */}
<div className="absolute inset-0 overflow-hidden">
  <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />
    <div className="absolute left-0 top-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

    <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[150px]" />

    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(to right, white 1px, transparent 1px),
          linear-gradient(to bottom, white 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }}
    />
</div>

  <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
    <div className="mb-10">

      <h1 className="bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-5xl font-bold text-transparent">
        Incidencias
      </h1>

      <p className="mt-4 text-zinc-400">
        Listado de incidencias por resolver.
      </p>
    </div>

    {/* Stats */}
    <div className="mb-10 grid gap-4 md:grid-cols-3">
  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
    <h3 className="text-3xl font-bold">
      {stats.activeTickets}
    </h3>

    <p className="text-zinc-400">
      Incidencias activas
    </p>
  </div>

  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
    <h3 className="text-3xl font-bold text-orange-300">
      {stats.highPriority}
    </h3>

    <p className="text-zinc-400">
      Alta prioridad
    </p>
  </div>

  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
    <h3 className="text-3xl font-bold text-blue-300">
      {stats.inProgress}
    </h3>

    <p className="text-zinc-400">
      En progreso
    </p>
  </div>
</div>

    {/* Incidencias */}
    <div className="space-y-6">
      <Suspense >
          <Tickets />
        </Suspense>
    </div>
    <div className="flex items-center gap-4 mt-10">
    <LogoutButton />
    </div>
  </div>
</main>
); 
}

