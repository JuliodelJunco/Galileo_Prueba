'use server';

import { signOut } from "@/auth";

export async function LogoutButton() {
  return (
    <form action={async () => {
        "use server";
        await signOut({
          redirectTo: "/login",
        });
      }}
    >
      <button
        className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
      >
        Cerrar sesión
      </button>
    </form>
  );
}