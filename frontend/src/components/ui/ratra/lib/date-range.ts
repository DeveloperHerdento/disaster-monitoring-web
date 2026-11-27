import type { Lang } from "./format";

export interface DateRange {
  start: string;
  end: string;
}

export type RangePreset = "last7" | "last30" | "thisMonth";

export const MONTHS: Record<Lang, readonly string[]> = {
  id: [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

export const WEEKDAYS: Record<Lang, readonly string[]> = {
  id: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};

const DAY_MS = 86_400_000;
const pad = (n: number) => String(n).padStart(2, "0");

export function isoDay(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function parseDay(day: string): Date {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(day: string, n: number): string {
  const d = parseDay(day);
  d.setDate(d.getDate() + n);
  return isoDay(d);
}

export function rangeLength({ start, end }: DateRange): number {
  return (
    Math.round((parseDay(end).getTime() - parseDay(start).getTime()) / DAY_MS) +
    1
  );
}

export function orderRange(a: string, b: string): DateRange {
  return a <= b ? { start: a, end: b } : { start: b, end: a };
}

export function monthCells(year: number, month: number): (string | null)[] {
  const lead = (new Date(year, month, 1).getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  return [
    ...Array<null>(lead).fill(null),
    ...Array.from({ length: days }, (_, i) =>
      isoDay(new Date(year, month, i + 1)),
    ),
  ];
}

function shortMonth(month: number, lang: Lang): string {
  return MONTHS[lang][month].slice(0, 3);
}

export function formatRange({ start, end }: DateRange, lang: Lang): string {
  const a = parseDay(start);
  const b = parseDay(end);
  const last = `${b.getDate()} ${shortMonth(b.getMonth(), lang)} ${b.getFullYear()}`;
  if (start === end) return last;
  const sameYear = a.getFullYear() === b.getFullYear();
  const sameMonth = sameYear && a.getMonth() === b.getMonth();
  const first =
    String(a.getDate()) +
    (sameMonth ? "" : ` ${shortMonth(a.getMonth(), lang)}`) +
    (sameYear ? "" : ` ${a.getFullYear()}`);
  return `${first} – ${last}`;
}

export function presetRange(preset: RangePreset, today: string): DateRange {
  if (preset === "last7") return { start: addDays(today, -6), end: today };
  if (preset === "last30") return { start: addDays(today, -29), end: today };
  return { start: `${today.slice(0, 8)}01`, end: today };
}
