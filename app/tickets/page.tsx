"use client";
import Link from "next/link";
import { useState } from "react";
import {
Plus,
MessageCircle,
AlertCircle,
Clock3,
} from "lucide-react";
const initialTickets = [
{
id: "INC-001",
title: "Error al sincronizar ERP",
priority: "Alta",
status: "En progreso",
},
{
id: "INC-002",
title: "Nuevo usuario para RRHH",
priority: "Media",
status: "Pendiente",
},
{
id: "INC-003",
title: "Consulta sobre facturación",
priority: "Baja",
status: "Abierta",
},
];
export default function CompanyTicketsPage() {
const [tickets, setTickets] = useState(initialTickets);
const createTicket = () => {
  const newTicket = {
    id: `INC-00${tickets.length + 1}`,
    title: "Nueva solicitud",
    priority: "Media",
    status: "Abierta",
  };
  setTickets([newTicket, ...tickets]);
};
return (
<main className="min-h-screen bg-zinc-950 text-white">
{/* Background */}
<div className="fixed inset-0 -z-10">
<div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
<div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[140px]" />
</div>
  <div className="mx-auto max-w-7xl px-6 py-10">
    {/* Header */}
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-4xl font-bold">
          Incidencias de la empresa
        </h1>

        <p className="mt-2 text-zinc-400">
          Consulta todas las solicitudes registradas por tu organización.
        </p>
      </div>

      <Link
        href="/tickets/new"
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-5 py-3 font-medium backdrop-blur-md transition hover:bg-white/20"
      >
        <Plus size={18} />
        Nueva incidencia
      </Link>
    </div>

    {/* Estadísticas */}
    <div className="mb-8 grid gap-4 md:grid-cols-3">
      <StatCard title="Abiertas" value="7" />
      <StatCard title="En progreso" value="4" />
      <StatCard title="Resueltas" value="18" />
    </div>

    {/* Tabla */}
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
      <table className="w-full">
        <thead className="border-b border-white/10">
          <tr className="text-left text-zinc-400">
            <th className="p-5">ID</th>
            <th className="p-5">Título</th>
            <th className="p-5">Prioridad</th>
            <th className="p-5">Estado</th>
            <th className="p-5">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className="border-b border-white/5 hover:bg-white/5"
            >
              <td className="p-5">{ticket.id}</td>

              <td className="p-5 font-medium">
                {ticket.title}
              </td>

              <td className="p-5">
                <PriorityBadge priority={ticket.priority} />
              </td>

              <td className="p-5">
                <StatusBadge status={ticket.status} />
              </td>

              <td className="p-5">
                <button className="flex items-center gap-2 rounded-lg bg-blue-500/10 px-3 py-2 text-blue-300 transition hover:bg-blue-500/20">
                  <MessageCircle size={16} />
                  Ver chat
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

</main>
);
}
function StatCard({
title,
value,
}: {
title: string;
value: string;
}) {
return (
<div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
<p className="text-sm text-zinc-400">{title}</p>
<h2 className="mt-2 text-3xl font-bold">{value}</h2>
</div>
);
}
function PriorityBadge({
priority,
}: {
priority: string;
}) {
const colors = {
Alta: "text-red-300 bg-red-500/10",
Media: "text-yellow-300 bg-yellow-500/10",
Baja: "text-green-300 bg-green-500/10",
};
return (
<span className={`rounded-full px-3 py-1 text-sm ${colors[priority as keyof typeof colors]}`}>
{priority}
</span>
);
}
function StatusBadge({
status,
}: {
status: string;
}) {
return (
<div className="flex items-center gap-2">
{status === "En progreso" ? (
<Clock3 size={16} className="text-blue-400" />
) : (
<AlertCircle size={16} className="text-yellow-400" />
)}
  <span className="text-sm">{status}</span>
</div>
);
}

