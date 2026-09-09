import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';



export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Glow superior */}
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />

        {/* Glow izquierda */}
        <div className="absolute left-0 top-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

        {/* Glow derecha */}
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[150px]" />

        {/* Grid */}
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

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="mb-8 text-center">
            <h1 className="mb-3 bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-4xl font-bold text-transparent">
              Iniciar sesión
            </h1>

            <p className="text-zinc-400">
              Accede al portal para gestionar solicitudes e incidencias.
            </p>
          </div>

          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}