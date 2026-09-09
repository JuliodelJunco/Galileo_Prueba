'use client';

import { useFormStatus } from 'react-dom';
import { Send } from 'lucide-react';

import { sendMessage } from '@/app/lib/actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Send size={17} />
      {pending ? 'Enviando...' : 'Enviar'}
    </button>
  );
}

export default function ChatForm({ ticketId }: { ticketId: string }) {
  const action = sendMessage.bind(null, ticketId);

  return (
    <form action={action} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        name="content"
        required
        maxLength={2000}
        placeholder="Escribe un mensaje..."
        aria-label="Mensaje"
        className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition placeholder:text-zinc-500 focus:border-blue-500/50"
      />
      <SubmitButton />
    </form>
  );
}
