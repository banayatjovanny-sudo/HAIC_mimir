export function formatNumber(value) {
  if (value == null || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatPercent(value) {
  if (value == null) return "Unknown";
  return `${value}%`;
}

export function formatTimestamp(iso) {
  if (!iso) return "—";
  const date = new Date(iso);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Pacific/Honolulu",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}
