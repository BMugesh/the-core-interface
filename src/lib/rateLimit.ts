interface RateEntry {
  timestamps: number[];
}

const buckets = new Map<string, RateEntry>();

const WINDOW_MS = 60_000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 15;

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const entry = buckets.get(ip) ?? { timestamps: [] };

  // Evict timestamps outside the sliding window
  entry.timestamps = entry.timestamps.filter((t) => now - t < WINDOW_MS);

  if (entry.timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldest = entry.timestamps[0];
    const retryAfterSec = Math.max(1, Math.ceil((WINDOW_MS - (now - oldest)) / 1000));
    buckets.set(ip, entry);
    return { allowed: false, retryAfterSec };
  }

  entry.timestamps.push(now);
  buckets.set(ip, entry);

  // Prevent unbounded memory growth across long-running instances
  if (buckets.size > 1000) {
    for (const [key, val] of buckets.entries()) {
      if (val.timestamps.every((t) => now - t >= WINDOW_MS)) {
        buckets.delete(key);
      }
    }
  }

  return { allowed: true, retryAfterSec: 0 };
}
