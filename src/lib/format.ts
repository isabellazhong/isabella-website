/** "2026-08-14" -> "August 14, 2026" */
export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
