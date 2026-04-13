export function formatPhone(raw: string): string | null {
  if (!raw) return null;
  const cleaned = raw.replace(/[\s.\-+]/g, "");
  if (cleaned.startsWith("212") && cleaned.length === 12) return cleaned;
  if (cleaned.startsWith("0") && cleaned.length === 10) return "212" + cleaned.slice(1);
  return null;
}

export function isMobile(phone: string): boolean {
  const cleaned = phone.replace(/[\s.\-+]/g, "");
  const local = cleaned.startsWith("212") ? "0" + cleaned.slice(3) : cleaned;
  return /^0[67]\d{8}$/.test(local);
}

export function isValidMoroccanPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s.\-+]/g, "");
  const local = cleaned.startsWith("212") ? "0" + cleaned.slice(3) : cleaned;
  return /^0[5-7]\d{8}$/.test(local);
}

export function detectDuplicatePhones(phones: string[]): string[] {
  const counts = new Map<string, number>();
  for (const p of phones) {
    const formatted = formatPhone(p);
    if (formatted) counts.set(formatted, (counts.get(formatted) || 0) + 1);
  }
  return [...counts.entries()].filter(([, c]) => c > 1).map(([p]) => p);
}
