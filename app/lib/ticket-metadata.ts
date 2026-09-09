export const priorityMap = {
  low: {
    label: "Baja",
    className:
      "border-green-500/20 bg-green-500/10 text-green-300",
  },
  medium: {
    label: "Media",
    className:
      "border-yellow-500/20 bg-yellow-500/10 text-yellow-300",
  },
  high: {
    label: "Alta",
    className:
      "border-orange-500/20 bg-orange-500/10 text-orange-300",
  },
  critical: {
    label: "Crítica",
    className:
      "border-red-500/20 bg-red-500/10 text-red-300",
  },
} as const;

export const statusMap = {
  open: "Abierta",
  in_progress: "En progreso",
  resolved: "Resuelta",
} as const;