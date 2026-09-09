"use client";

const messages = [
  {
    id: 1,
    sender: "cliente",
    text: "La exportación sigue fallando cuando intentamos generar informes grandes.",
    time: "09:15",
  },
  {
    id: 2,
    sender: "soporte",
    text: "Hemos localizado el problema y estamos trabajando en una corrección.",
    time: "09:42",
  },
  {
    id: 3,
    sender: "soporte",
    text: "¿Podéis indicarnos aproximadamente cuántas filas tenía el informe?",
    time: "09:43",
  },
  {
    id: 4,
    sender: "cliente",
    text: "Alrededor de 700 filas.",
    time: "09:50",
  },
];

export default function TicketChatPage() {
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

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-8">
        {/* Header */}
        <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-sm text-blue-400">INC-001</p>

          <h1 className="mt-2 text-3xl font-bold">
            Error al exportar informes
          </h1>

          <p className="mt-2 text-zinc-400">
            Estado actual: En progreso
          </p>
        </div>

        {/* Chat */}
        <div className="flex h-[65vh] flex-col rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "cliente"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-md rounded-2xl px-4 py-3 ${
                    message.sender === "cliente"
                      ? "bg-blue-600"
                      : "bg-white/10"
                  }`}
                >
                  <p>{message.text}</p>

                  <p className="mt-2 text-right text-xs opacity-70">
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-4">
            <form className="flex gap-3">
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-blue-500/50"
              />

              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-6 py-3 font-medium transition hover:bg-blue-500"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}