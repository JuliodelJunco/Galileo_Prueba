'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-5">
        <div>
            <label
            htmlFor="email"
            className="mb-2 block text-sm text-zinc-300"
            >
            Correo electrónico
            </label>

            <input
            id="email"
            type="email"
            name="email"
            placeholder="usuario@empresa.com"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500/50 focus:bg-white/10"
            required
            />
        </div>

        <div>
            <label
            htmlFor="password"
            className="mb-2 block text-sm text-zinc-300"
            >
            Contraseña
            </label>

            <input
            id="password"
            type="password"
            name="password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500/50 focus:bg-white/10"
            />
        </div>

        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transitions hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-disabled={isPending}
        >
            Iniciar sesión
        </button>

        {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
    </form>
  );
}
