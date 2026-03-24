/**
 * Returns true if the given ISO timestamp is within maxAgeMinutes from now.
 * Returns false (stale) if the timestamp is missing or too old.
 */
export function isDataFresh(created_at: string | null | undefined, maxAgeMinutes: number): boolean {
  if (!created_at) return false;

  const createdAt = new Date(created_at).getTime();
  if (isNaN(createdAt)) return false;

  const ageMs = Date.now() - createdAt;
  const maxAgeMs = maxAgeMinutes * 60 * 1000;

  return ageMs < maxAgeMs;
}
