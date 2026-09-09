'use client';
import { useActionState } from 'react';
import { createTicket, State } from '@/app/lib/actions';
import { Ticket } from '@/app/lib/definitions';
import Link from 'next/link';

export default function NewTicketForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createTicket, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="space-y-5">
          <div>
            <label htmlFor="title" className="mb-2 block text-sm text-zinc-300">
              Título
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Describe brevemente el problema"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500/50 focus:bg-white/10"
              aria-describedby="title-error"
            />

            <div id="title-error" aria-live="polite" aria-atomic="true">
              {state.errors?.title?.map((error: string) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="type" className="mb-2 block text-sm text-zinc-300">
              Tipo
            </label>

            <select
              id="type"
              name="type"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-blue-500/50 focus:bg-white/10"
              defaultValue="incident"
            >
              <option value="incident" className="bg-zinc-900 text-white">
                Incidencia
              </option>
              <option value="request" className="bg-zinc-900 text-white">
                Solicitud
              </option>
              <option value="question" className="bg-zinc-900 text-white">
                Consulta
              </option>
            </select>

            <div id="type-error" aria-live="polite" aria-atomic="true">
              {state.errors?.type?.map((error: string) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="priority" className="mb-2 block text-sm text-zinc-300">
              Prioridad
            </label>

            <select
              id="priority"
              name="priority"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-blue-500/50 focus:bg-white/10"
              defaultValue="medium"
            >
              <option value="low" className="bg-zinc-900 text-white">
                Baja
              </option>
              <option value="medium" className="bg-zinc-900 text-white">
                Media
              </option>
              <option value="high" className="bg-zinc-900 text-white">
                Alta
              </option>
              <option value="critical" className="bg-zinc-900 text-white">
                Crítica
              </option>
            </select>

            <div id="priority-error" aria-live="polite" aria-atomic="true">
              {state.errors?.priority?.map((error: string) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="description" className="mb-2 block text-sm text-zinc-300">
              Descripción
            </label>

            <textarea
              id="description"
              name="description"
              rows={6}
              placeholder="Describe el problema con el mayor detalle posible"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500/50 focus:bg-white/10"
              aria-describedby="description-error"
            />

            <div id="description-error" aria-live="polite" aria-atomic="true">
              {state.errors?.description?.map((error: string) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
            </div>
          </div>

          <input type="hidden" name="status" value="open" />

          <div aria-live="polite" aria-atomic="true">
            {state.message ? <p className="text-sm text-red-500">{state.message}</p> : null}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Link
          href="/tickets"
          className="flex h-11 items-center rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/10"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          className="flex h-11 items-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Crear incidencia
        </button>
      </div>
    </form>
  );
}

