export type Priority =
| "low"
| "medium"
| "high"
| "critical";

export type Status =
| "open"
| "in_progress"
| "resolved";

export type Company = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  company_id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
};

export type Ticket = {
  id: string;
  company_id: string;
  title: string;
  description: string;
  type: "incident" | "request" | "question";
  priority: "low" | "medium" | "high" | "critical";
  status: "open" | "in_progress" | "resolved";
  created_at: string;
};

export type Message = {
  id: string;
  ticket_id: string;
  user_id: string;
  content: string;
  created_at: string;
};

export type TicketHistory = {
  id: string;
  ticket_id: string;
  previous_status: string;
  new_status: string;
  changed_by: string;
  changed_at: string;
};