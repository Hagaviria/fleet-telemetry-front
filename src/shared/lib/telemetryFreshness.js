export const TELEMETRY_STALE_AFTER_MS = 90_000;

export function telemetryAgeMs(lastSeenIso) {
  if (!lastSeenIso) return Number.POSITIVE_INFINITY;
  const t = new Date(lastSeenIso).getTime();
  if (Number.isNaN(t)) return Number.POSITIVE_INFINITY;
  return Date.now() - t;
}

export function isTelemetryStale(lastSeenIso) {
  return telemetryAgeMs(lastSeenIso) > TELEMETRY_STALE_AFTER_MS;
}

export function formatRelativeAge(lastSeenIso) {
  const ms = telemetryAgeMs(lastSeenIso);
  if (!Number.isFinite(ms) || ms < 0) return null;
  const sec = Math.floor(ms / 1000);
  if (sec < 10) return "ahora";
  if (sec < 60) return `hace ${sec}s`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `hace ${min} min`;
  const h = Math.floor(min / 60);
  return `hace ${h} h`;
}
