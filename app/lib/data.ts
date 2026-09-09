'use server';

import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

export async function fetchCompanyTickets() {
  return await sql`
    SELECT
    id,
    title,
    priority,
    status
    FROM tickets
    ORDER BY created_at DESC
    `;
}

export async function fetchCompanyStats() {
const [open, progress, resolved] = await Promise.all([
  sql`
  SELECT COUNT(*) as count
  FROM tickets
  WHERE status = 'open'
  `,
  sql`
  SELECT COUNT(*) as count
  FROM tickets
  WHERE status = 'in_progress'
  `,
  sql`
  SELECT COUNT(*) as count
  FROM tickets
  WHERE status = 'resolved'
  `,
]);

return {
open: Number(open[0].count),
progress: Number(progress[0].count),
resolved: Number(resolved[0].count),
};
}

export async function fetchDashboardStats() {
  const [activeTickets, highPriority, inProgress] =
    await Promise.all([
      sql`
        SELECT COUNT(*) as count
        FROM tickets
        WHERE status != 'resolved'
      `,
      sql`
        SELECT COUNT(*) as count
        FROM tickets
        WHERE priority IN ('high', 'critical')
        AND status != 'resolved'
      `,
      sql`
        SELECT COUNT(*) as count
        FROM tickets
        WHERE status = 'in_progress'
      `,
    ]);

  return {
    activeTickets: Number(activeTickets[0].count),
    highPriority: Number(highPriority[0].count),
    inProgress: Number(inProgress[0].count),
  };
}

export async function fetchTickets() {
  return await sql`
    SELECT
      tickets.id,
      tickets.title,
      tickets.description,
      tickets.priority,
      tickets.status,
      companies.name AS company_name
    FROM tickets
    INNER JOIN companies
      ON tickets.company_id = companies.id
    ORDER BY tickets.created_at DESC
    `;
}

export async function fetchTicketChat(ticketId: string, companyId: string) {
  const [ticket] = await sql`
    SELECT id, title, description, status
    FROM tickets
    WHERE id = ${ticketId}
      AND company_id = ${companyId}
  `;

  if (!ticket) {
    return null;
  }

  const messages = await sql`
    SELECT
      messages.id,
      messages.user_id,
      messages.content,
      messages.created_at,
      users.name AS sender_name
    FROM messages
    INNER JOIN users ON messages.user_id::text = users.id
    WHERE messages.ticket_id = ${ticketId}
    ORDER BY messages.created_at ASC
  `;

  return { ticket, messages };
}