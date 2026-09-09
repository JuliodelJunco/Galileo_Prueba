import {
  Company,
  User,
  Ticket,
  Message,
  TicketHistory,
} from "./definitions";
export const companies: Company[] = [
{
id: "550e8400-e29b-41d4-a716-446655440001",
name: "Acme Industries",
},
{
id: "550e8400-e29b-41d4-a716-446655440002",
name: "Tech Solutions",
},
];
export const users: User[] = [
{
id: "550e8400-e29b-41d4-a716-446655440101",
company_id: "550e8400-e29b-41d4-a716-446655440001",
name: "Julio del Junco",
email: "julio@acme.com",
password: "123456",
role: "admin",
},
{
id: "550e8400-e29b-41d4-a716-446655440102",
company_id: "550e8400-e29b-41d4-a716-446655440001",
name: "Ana López",
email: "ana@acme.com",
password: "123456",
role: "user",
},
{
id: "550e8400-e29b-41d4-a716-446655440103",
company_id: "550e8400-e29b-41d4-a716-446655440002",
name: "Carlos García",
email: "carlos@techsolutions.com",
password: "123456",
role: "admin",
},
];
export const tickets: Ticket[] = [
{
id: "550e8400-e29b-41d4-a716-446655440201",
company_id: "550e8400-e29b-41d4-a716-446655440001",
title: "Error al exportar informes",
description:
"La exportación a Excel falla cuando supera las 500 filas.",
type: "incident",
priority: "high",
status: "in_progress",
created_at: "2026-09-08",
},
{
id: "550e8400-e29b-41d4-a716-446655440202",
company_id: "550e8400-e29b-41d4-a716-446655440001",
title: "Nueva integración ERP",
description:
"Solicitud para integrar el portal con el ERP corporativo.",
type: "request",
priority: "medium",
status: "open",
created_at: "2026-09-07",
},
{
id: "550e8400-e29b-41d4-a716-446655440203",
company_id: "550e8400-e29b-41d4-a716-446655440001",
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
id: "550e8400-e29b-41d4-a716-446655440301",
ticket_id: "550e8400-e29b-41d4-a716-446655440201",
user_id: "550e8400-e29b-41d4-a716-446655440101",
content:
"Hemos identificado el problema y estamos trabajando en ello.",
created_at: "2026-09-08T09:45:00",
},
{
id: "550e8400-e29b-41d4-a716-446655440302",
ticket_id: "550e8400-e29b-41d4-a716-446655440201",
user_id: "550e8400-e29b-41d4-a716-446655440102",
content:
"La exportación falla cuando intentamos generar informes grandes.",
created_at: "2026-09-08T09:15:00",
},
];
export const ticketHistory: TicketHistory[] = [
{
id: "550e8400-e29b-41d4-a716-446655440401",
ticket_id: "550e8400-e29b-41d4-a716-446655440201",
previous_status: "open",
new_status: "in_progress",
changed_by: "550e8400-e29b-41d4-a716-446655440102",
changed_at: "2026-09-08T09:40:00",
},
{
id: "550e8400-e29b-41d4-a716-446655440402",
ticket_id: "550e8400-e29b-41d4-a716-446655440202",
previous_status: "open",
new_status: "open",
changed_by: "550e8400-e29b-41d4-a716-446655440101",
changed_at: "2026-09-07T11:00:00",
},
];

