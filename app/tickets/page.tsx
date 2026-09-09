import Link from "next/link";
import {
Plus,
MessageCircle,
AlertCircle,
Clock3,
} from "lucide-react";

import {
  priorityMap,
  statusMap,
} from "@/app/lib/ticket-metadata";

import {
fetchCompanyTickets,
} from "@/app/lib/data";
import { LogoutButton } from "../ui/logout-button";


export default async function CompanyTicketsPage({
  searchParams,
}: {
  searchParams?: Promise<{ success?: string }> | { success?: string };
}) {
const resolvedSearchParams = await Promise.resolve(searchParams ?? {});
const tickets = await fetchCompanyTickets();
const ticketCreated = resolvedSearchParams.success === "true";

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
  <div className="relative z-10 mx-auto max-w-7xl px-6 py-10">
    {/* Header */}
    {ticketCreated && (
      <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
        Incidencia creada correctamente.
      </div>
    )}

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
        href="/tickets/create"
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-5 py-3 font-medium backdrop-blur-md transition hover:bg-white/20"
      >
        <Plus size={18} />
        Nueva incidencia
      </Link>
    </div>

    {/* Tabla */}
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
      <table className="w-full">
        <thead className="border-b border-white/10">
          <tr className="text-left text-zinc-400">
            <th className="p-4">Título</th>
            <th className="p-4">Prioridad</th>
            <th className="p-4">Estado</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className="border-b border-white/5 hover:bg-white/5"
            >
              <td className="p-4 font-medium">
                {ticket.title}
              </td>

              <td className="p-4">
                <span
                  className={`rounded-full border px-3 py-1 text-sm ${
                    priorityMap[ticket.priority as keyof typeof priorityMap]?.className
                  }`}
                >
                  {priorityMap[ticket.priority as keyof typeof priorityMap]?.label ?? ticket.priority}
                </span>
                </td>

              <td className="p-4">
                <StatusBadge status={statusMap[ticket.status as keyof typeof statusMap] ?? ticket.status} />
              </td>

              <td className="p-4">
                <Link
                  href={`/tickets/${ticket.id}/chat`}
                  className="inline-flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-5 py-3 text-blue-300 transition hover:bg-blue-500/20"
                >
                  <MessageCircle size={18} />
                  Abrir chat
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="flex items-center gap-4 mt-10">
      <LogoutButton />
    </div>
  </div>

</main>
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

