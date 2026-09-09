import { notFound } from 'next/navigation';

import { auth } from '@/auth';
import { fetchTicketChat } from '@/app/lib/data';
import BackButton from '@/app/ui/tickets/BackButton';
import ChatForm from '@/app/ui/tickets/ChatForm';

function formatMessageTime(date: string | Date) {
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export default async function TicketChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session?.user?.company_id || !session.user.id) {
    notFound();
  }

  const { id } = await params;
  const chat = await fetchTicketChat(id, session.user.company_id);

  if (!chat) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
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
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-8">
        <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <BackButton />
          </div>
          <h1 className="mt-2 text-3xl font-bold">{chat.ticket.title}</h1>
          <p className="mt-2 text-zinc-400">
            Estado actual: {chat.ticket.status === 'in_progress' ? 'En progreso' : chat.ticket.status}
          </p>
        </div>

        <div className="flex h-[65vh] flex-col rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {chat.messages.length === 0 ? (
              <p className="py-8 text-center text-zinc-500">Todavía no hay mensajes.</p>
            ) : (
              chat.messages.map((message) => {
                const isCurrentUser = message.user_id === session.user.id;

                return (
                  <div
                    key={message.id}
                    className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md rounded-2xl px-4 py-3 ${
                        isCurrentUser ? 'bg-blue-600' : 'bg-white/10'
                      }`}
                    >
                      <p className="mb-1 text-xs font-medium opacity-70">
                        {message.sender_name}
                      </p>
                      <p className="whitespace-pre-wrap break-words">{message.content}</p>
                      <p className="mt-2 text-right text-xs opacity-70">
                        {formatMessageTime(message.created_at)}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="border-t border-white/10 p-4">
            <ChatForm ticketId={id} />
          </div>
        </div>
      </div>
    </main>
  );
}
