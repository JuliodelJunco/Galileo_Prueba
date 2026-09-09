import NewTicketForm from "@/app/ui/tickets/NewTicketForm";
import { Suspense } from 'react';


export default function NewTicketPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[140px]" />
      </div>
      <div className="mx-auto max-w-3xl">
        <Suspense>
          <NewTicketForm />
        </Suspense>
      </div>
    </main>
  );
}