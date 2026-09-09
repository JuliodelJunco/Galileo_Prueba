"use client";
import { useState } from "react";
import { Send } from "lucide-react";
export default function NewTicketForm() {
const [form, setForm] = useState({
title: "",
type: "incident",
priority: "medium",
description: "",
});
const handleSubmit = (e) => {
e.preventDefault();
console.log(form);

alert("Incidencia creada correctamente");
};
return (
<form
onSubmit={handleSubmit}
className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
>
<div className="mb-8">
<h2 className="text-2xl font-bold text-white">
Nueva incidencia
</h2>
    <p className="mt-2 text-zinc-400">
      Describe el problema o solicitud con el mayor detalle posible.
    </p>
  </div>

  <div className="space-y-6">
    {/* Título */}
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-300">
        Título
      </label>

      <input
        type="text"
        required
        placeholder="Ej: Error al sincronizar ERP"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
        className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
      />
    </div>

    {/* Tipo */}
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-300">
        Tipo
      </label>

      <select
        value={form.type}
        onChange={(e) =>
          setForm({ ...form, type: e.target.value })
        }
        className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-white outline-none focus:border-cyan-500"
      >
        <option value="incident">Incidencia</option>
        <option value="request">Solicitud</option>
        <option value="question">Consulta</option>
      </select>
    </div>

    {/* Prioridad */}
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-300">
        Prioridad
      </label>

      <select
        value={form.priority}
        onChange={(e) =>
          setForm({ ...form, priority: e.target.value })
        }
        className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-white outline-none focus:border-cyan-500"
      >
        <option value="low">Baja</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
        <option value="critical">Crítica</option>
      </select>
    </div>

    {/* Descripción */}
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-300">
        Descripción
      </label>

      <textarea
        rows={6}
        required
        placeholder="Describe el problema, cuándo ocurre y cualquier detalle relevante..."
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
        className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
      />
    </div>

    {/* Botón */}
    <button
      type="submit"
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-4 font-semibold text-black transition hover:bg-cyan-400"
    >
      <Send size={18} />
      Crear incidencia
    </button>
  </div>
</form>
);
}

