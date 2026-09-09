import postgres from "postgres";
import bcrypt from 'bcrypt';
import {
companies,
users,
tickets,
messages,
ticketHistory,
} from "../lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });



async function seedCompanies() {
    await sql `
        CREATE TABLE IF NOT EXISTS companies ( 
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );
    `;
    for (const company of companies) {
    await sql` 
        INSERT INTO companies (id, name)       
        VALUES (${company.id}, ${company.name})       
        ON CONFLICT (id) DO NOTHING;`
    ;}
}

async function seedUsers() {
    await sql`    
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            company_id UUID NOT NULL,
            name VARCHAR(255) NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role VARCHAR(50) NOT NULL
        );
    `;
    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await sql`
        INSERT INTO users(id, company_id, name, email, password, role)
        VALUES (         
            ${user.id},         
            ${user.company_id},         
            ${user.name},         
            ${user.email},         
            ${hashedPassword},         
            ${user.role})
        ON CONFLICT (id) DO NOTHING;
        `;
    }
}

async function seedTickets() {
    await sql`    
        CREATE TABLE IF NOT EXISTS tickets (
            id UUID PRIMARY KEY,
            company_id UUID NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            type TEXT NOT NULL,
            priority TEXT NOT NULL,
            status TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL,
            FOREIGN KEY (company_id) REFERENCES companies(id)
        );
    `;
    for (const ticket of tickets) {
        await sql`
            INSERT INTO tickets
            VALUES (
                ${ticket.id},
                ${ticket.company_id},
                ${ticket.title},
                ${ticket.description},
                ${ticket.type},
                ${ticket.priority},
                ${ticket.status},
                ${ticket.created_at}
            )
            ON CONFLICT (id) DO NOTHING;
        `;
    }
}

async function seedMessages() {
    await sql`
        CREATE TABLE IF NOT EXISTS messages (
            id UUID PRIMARY KEY,
            ticket_id UUID NOT NULL,
            user_id UUID NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL
        );
    `;
    for (const message of messages) {
        await sql`
            INSERT INTO messages
            VALUES (
                ${message.id},
                ${message.ticket_id},
                ${message.user_id},
                ${message.content},
                ${message.created_at}
            )
            ON CONFLICT (id) DO NOTHING;
         `;
    }
}

async function seedTicketHistory() {

  await sql`
    CREATE TABLE IF NOT EXISTS ticket_history (
      id UUID PRIMARY KEY,
      ticket_id UUID NOT NULL,
      previous_status TEXT NOT NULL,
      new_status TEXT NOT NULL,
      changed_by UUID NOT NULL,
      changed_at TIMESTAMP NOT NULL
    );
  `;

  for (const item of ticketHistory) {
    await sql`
      INSERT INTO ticket_history
      VALUES (
        ${item.id},
        ${item.ticket_id},
        ${item.previous_status},
        ${item.new_status},
        ${item.changed_by},
        ${item.changed_at}
      )
      ON CONFLICT (id) DO NOTHING;
    `;
  }
}

export async function GET() {
try {
    await sql`DROP TABLE IF EXISTS ticket_history CASCADE`;
    await sql`DROP TABLE IF EXISTS messages CASCADE`;
    await sql`DROP TABLE IF EXISTS tickets CASCADE`;
    await sql`DROP TABLE IF EXISTS users CASCADE`;
    await sql`DROP TABLE IF EXISTS companies CASCADE`;
    await seedCompanies();
    await seedUsers();
    await seedTickets();
    await seedMessages();
    await seedTicketHistory();
    return Response.json({
        message: "Database seeded successfully",
    });
} catch (error) {
    return Response.json(error);
}
}

