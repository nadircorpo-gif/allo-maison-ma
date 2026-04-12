import type { NormalizedPro } from "./types";

export function normalizeName(name: string | null | undefined): string {
  if (!name) return "";
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }

  return dp[m][n];
}

const MAX_DISTANCE = 2;

export function findMatch(
  firstName: string,
  lastName: string,
  city: string,
  existing: NormalizedPro[]
): NormalizedPro | null {
  const normFirst = normalizeName(firstName);
  const normLast = normalizeName(lastName);
  const normFull = `${normFirst} ${normLast}`;

  for (const pro of existing) {
    if (pro.city !== city) continue;

    const existingFull = `${normalizeName(pro.firstName)} ${normalizeName(pro.lastName)}`;
    const dist = levenshtein(normFull, existingFull);

    if (dist <= MAX_DISTANCE) {
      return pro;
    }
  }

  return null;
}
