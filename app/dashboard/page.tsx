"use client";
const incidents = [
{
id: "INC-001",
title: "Error al exportar informes",
description:
"La exportación a Excel falla cuando el informe supera las 500 filas.",
priority: "Alta",
status: "En progreso",
},
{
id: "INC-002",
title: "Nueva integración con ERP",
description:
"Solicitud para conectar el sistema con el ERP corporativo.",
priority: "Media",
status: "Pendiente",
},
{
id: "INC-003",
title: "Acceso para nuevo usuario",
description:
"Alta de un nuevo miembro del equipo en la plataforma.",
priority: "Baja",
status: "Abierta",
},
];
export default function DashboardPage() {
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
      <p className="mb-2 text-sm text-blue-400">
        Portal de Clientes
      </p>

      <h1 className="bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-5xl font-bold text-transparent">
        Tus incidencias
      </h1>

      <p className="mt-4 text-zinc-400">
        Sigue el estado de todas tus solicitudes desde un único lugar.
      </p>
    </div>

    {/* Stats */}
    <div className="mb-10 grid gap-4 md:grid-cols-3">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="text-3xl font-bold">3</h3>
        <p className="text-zinc-400">Incidencias activas</p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="text-3xl font-bold">1</h3>
        <p className="text-zinc-400">Alta prioridad</p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="text-3xl font-bold">1</h3>
        <p className="text-zinc-400">En progreso</p>
      </div>
    </div>

    {/* Incidencias */}
    <div className="space-y-6">
      {incidents.map((incident) => (
        <div
          key={incident.id}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-blue-400">
                {incident.id}
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                {incident.title}
              </h2>
            </div>

            <span className="w-fit rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm text-blue-300">
              {incident.status}
            </span>
          </div>

          <p className="mb-4 text-zinc-400">
            {incident.description}
          </p>

          <div className="mb-6 flex gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-sm">
              Prioridad: {incident.priority}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl bg-white/10 px-5 py-3 font-medium transition hover:bg-white/20">
              Abrir chat
            </button>

            <button className="rounded-xl bg-green-600 px-5 py-3 font-medium transition hover:bg-green-500">
              Marcar como resuelta
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</main>
); 
}

