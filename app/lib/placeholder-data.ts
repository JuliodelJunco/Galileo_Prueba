import {
  Company,
  User,
  Ticket,
  Message,
  TicketHistory,
} from "./definitions";

export const companies: Company[] = [
  {
    id: "comp-1",
    name: "Acme Industries",
  },
  {
    id: "comp-2",
    name: "Tech Solutions",
  },
];

export const users: User[] = [
  {
    id: "user-1",
    company_id: "comp-1",
    name: "Julio del Junco",
    email: "julio@acme.com",
    password: "123456",
    role: "admin",
  },
  {
    id: "user-2",
    company_id: "comp-1",
    name: "Ana López",
    email: "ana@acme.com",
    password: "123456",
    role: "user",
  },
  {
    id: "user-3",
    company_id: "comp-2",
    name: "Carlos García",
    email: "carlos@techsolutions.com",
    password: "123456",
    role: "admin",
  },
];

export const tickets: Ticket[] = [
  {
    id: "INC-001",
    company_id: "comp-1",
    title: "Error al exportar informes",
    description:
      "La exportación a Excel falla cuando supera las 500 filas.",
    type: "incident",
    priority: "high",
    status: "in_progress",
    created_at: "2026-09-08",
  },
  {
    id: "INC-002",
    company_id: "comp-1",
    title: "Nueva integración ERP",
    description:
      "Solicitud para integrar el portal con el ERP corporativo.",
    type: "request",
    priority: "medium",
    status: "open",
    created_at: "2026-09-07",
  },
  {
    id: "INC-003",
    company_id: "comp-1",
    title: "Consulta sobre facturación",
    description:
      "Dudas sobre el cálculo de costes mensuales.",
    type: "question",
    priority: "low",
    status: "open",
    created_at: "2026-09-06",
  },
];

export const messages: Message[] = [
  {
    id: "msg-1",
    ticket_id: "INC-001",
    user_id: "user-1",
    content:
      "La exportación falla cuando intentamos generar informes grandes.",
    created_at: "2026-09-08T09:15:00",
  },
  {
    id: "msg-2",
    ticket_id: "INC-001",
    user_id: "user-2",
    content:
      "Hemos identificado el problema y estamos trabajando en ello.",
    created_at: "2026-09-08T09:45:00",
  },
];

export const ticketHistory: TicketHistory[] = [
  {
    id: "hist-1",
    ticket_id: "INC-001",
    previous_status: "open",
    new_status: "in_progress",
    changed_by: "user-2",
    changed_at: "2026-09-08T09:40:00",
  },
  {
    id: "hist-2",
    ticket_id: "INC-002",
    previous_status: "open",
    new_status: "open",
    changed_by: "user-1",
    changed_at: "2026-09-07T11:00:00",
  },
];