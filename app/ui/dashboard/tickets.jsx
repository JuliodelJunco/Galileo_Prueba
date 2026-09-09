import { fetchTickets } from "@/app/lib/data";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import {
  priorityMap,
  statusMap,
} from "@/app/lib/ticket-metadata";

export default async function Tickets() {
  const tickets = await fetchTickets();

  return (
    <div className="flex flex-col gap-4" >
    {tickets.map((ticket) => (
    <div
      key={ticket.id}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
    >
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>

          <h2 className="mt-1 text-xl font-semibold">
            {ticket.title}
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Empresa: {ticket.company_name}
          </p>

          <p className="text-sm text-zinc-400"> 
            Estado: {statusMap[ticket.status] ?? ticket.status}
          </p>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-sm ${
            priorityMap[ticket.priority]?.className
          }`}
        >
          {priorityMap[ticket.priority]?.label ?? ticket.priority}
        </span>
      </div>

      <p className="mb-6 text-zinc-400">
        {ticket.description}
      </p>

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/tickets/${ticket.id}/chat`}
          className="flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-5 py-3 text-blue-300 transition hover:bg-blue-500/20"
        >
          <MessageCircle size={18} />
          Abrir chat
        </Link>

        <button
          className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-3 text-emerald-300 transition hover:bg-emerald-500/20"
        >
          <CheckCircle2 size={18} />
          Marcar resuelta
        </button>
      </div>
    </div>
  ))}
  </div>
  );
}