'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';


const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

export type State = {
  errors?: {
    title?: string[];
    type?: string[];
    priority?: string[];
    description?: string[];
  };
  message?: string | null;
};

const MessageSchema = z.object({
  content: z.string().trim().min(1, 'El mensaje no puede estar vacío.').max(2000),
});


const TicketSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio.'),
  description: z.string().min(1, 'La descripción es obligatoria.'),
  priority: z.string().min(1, 'La prioridad es obligatoria.'),
  type: z.string().min(1, 'El tipo es obligatorio.'),
});

export async function createTicket(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = TicketSchema.safeParse({
  title: formData.get("title"),
  description: formData.get("description"),
  priority: formData.get("priority"),
  type: formData.get("type"),
  });
  
  if (!validatedFields.success) {
  return {
  errors: validatedFields.error.flatten().fieldErrors,
  message: "Faltan campos obligatorios.",
  };
  }

  const session = await auth();

  if (!session?.user?.company_id) {
    throw new Error("Usuario sin empresa asociada");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const priority = formData.get("priority") as string;
  const type = formData.get("type") as string;

  await sql`
    INSERT INTO tickets (
      id,
      company_id,
      title,
      description,
      type,
      priority,
      status,
      created_at
    )
    VALUES (
      gen_random_uuid(),
      ${session.user.company_id},
      ${title},
      ${description},
      ${type},
      ${priority},
      'open',
      NOW()
    )
  `;

  revalidatePath("/tickets");
  redirect("/tickets?success=true");
}

export async function sendMessage(ticketId: string, formData: FormData) {
  const validatedFields = MessageSchema.safeParse({
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    throw new Error('El mensaje no es válido.');
  }

  const session = await auth();

  if (!session?.user?.id || !session.user.company_id) {
    throw new Error('Usuario no autenticado.');
  }

  const ticket = await sql`
    SELECT id
    FROM tickets
    WHERE id = ${ticketId}
      AND company_id = ${session.user.company_id}
  `;

  if (ticket.length === 0) {
    throw new Error('Incidencia no encontrada.');
  }

  await sql`
    INSERT INTO messages (id, ticket_id, user_id, content, created_at)
    VALUES (gen_random_uuid(), ${ticketId}, ${session.user.id}, ${validatedFields.data.content}, NOW())
  `;

  revalidatePath(`/tickets/${ticketId}/chat`);
}

export async function authenticate(prevState: string | undefined,formData: FormData ) {
    try{
        await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        const session = await auth();

        if (session?.user.role === "admin") {
            redirect("/dashboard");
        }else{
            redirect("/tickets");
        }
    } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}