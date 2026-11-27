/**
 * Formatting for data shown in RATRA UIs (spec §8: show data age on every number; timeline in WIB).
 * Aero (aviation) works in UTC; every other platform in WIB (Asia/Jakarta).
 */

export type Lang = "id" | "en";
export type TimeZone = "Asia/Jakarta" | "UTC";

const TZ_LABEL: Record<TimeZone, string> = {
  "Asia/Jakarta": "WIB",
  UTC: "UTC",
};
const LOCALE: Record<Lang, string> = { id: "id-ID", en: "en-GB" };

function toDate(value: Date | string | number): Date {
  return value instanceof Date ? value : new Date(value);
}

/** "14:05 WIB" / "07:05 UTC" */
export function formatTime(
  value: Date | string | number,
  timeZone: TimeZone = "Asia/Jakarta",
): string {
  const t = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  }).format(toDate(value));
  return `${t} ${TZ_LABEL[timeZone]}`;
}

/** "23 Nov 2026, 14:05 WIB" (id: "23 Nov 2026, 14.05 WIB" style is avoided on purpose: colon is unambiguous in data). */
export function formatDateTime(
  value: Date | string | number,
  {
    timeZone = "Asia/Jakarta",
    lang = "id",
  }: { timeZone?: TimeZone; lang?: Lang } = {},
): string {
  const d = toDate(value);
  const date = new Intl.DateTimeFormat(LOCALE[lang], {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone,
  }).format(d);
  return `${date}, ${formatTime(d, timeZone)}`;
}

const AGE: Record<Lang, { now: string; m: string; h: string; d: string }> = {
  id: { now: "baru saja", m: "menit lalu", h: "jam lalu", d: "hari lalu" },
  en: { now: "just now", m: "min ago", h: "hr ago", d: "days ago" },
};

/** Data age: "baru saja", "12 menit lalu", "2 jam lalu", "3 hari lalu". `now` is injectable for tests. */
export function formatAge(
  value: Date | string | number,
  lang: Lang = "id",
  now: number = Date.now(),
): string {
  const mins = Math.floor((now - toDate(value).getTime()) / 60_000);
  const w = AGE[lang];
  if (mins < 1) return w.now;
  if (mins < 60) return `${mins} ${w.m}`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} ${w.h}`;
  return `${Math.floor(hrs / 24)} ${w.d}`;
}

/** Numbers with locale grouping; data is shown in mono, so keep digits stable. */
export function formatNumber(
  value: number,
  { lang = "id", digits = 0 }: { lang?: Lang; digits?: number } = {},
): string {
  return new Intl.NumberFormat(LOCALE[lang], {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}
