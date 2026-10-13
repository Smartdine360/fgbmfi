/** Joins class names, skipping falsy values. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Splits an ISO date (YYYY-MM-DD) without touching the runtime clock or timezone. */
export function dateParts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { day: String(d).padStart(2, "0"), month: MONTHS[m - 1], year: String(y) };
}

export function formatDate(iso: string) {
  const { day, month, year } = dateParts(iso);
  return `${Number(day)} ${month} ${year}`;
}
