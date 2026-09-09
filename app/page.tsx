import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white sm:py-12">
      {/* Background */}
      <div className="absolute inset-0">

        {/* Glow superior */}
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />

        {/* Glow izquierda */}
        <div className="absolute left-0 top-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

        {/* Glow derecha */}
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[150px]" />

        {/* Grid sutil */}
        <div className="absolute inset-0 opacity-[0.03]"
        style={{
        backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),linear-gradient(to bottom, white 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        }}
      />

</div>
      
      <div className="max-w-2xl text-center ">

        <h1 className="mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
          Bienvenido al portal de clientes
        </h1>

        <p className="mb-10 text-lg text-zinc-400">
          Gestiona incidencias, solicitudes y consultas desde un único lugar.
          Mantén la visibilidad de cada petición y sigue su estado en tiempo
          real.
        </p>

        <Link
          href="/login"
className="inline-flex items-center rounded-xl bg-white/10 px-6 py-3 text-lg font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"        >
          Acceder
        </Link>
      </div>
    </main>
  );
}
        