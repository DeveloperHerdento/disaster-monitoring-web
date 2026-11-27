import type { Lang } from "./format";

/**
 * National operational status (spec §4): always colour + icon + word.
 * The kit only renders a level. Mapping domain data → level lives in each app (src/lib/status.ts),
 * because thresholds are a domain decision.
 */
export const STATUS_LEVELS = [
  "normal",
  "waspada",
  "siaga",
  "awas",
  "info",
  "offline",
] as const;
export type StatusLevel = (typeof STATUS_LEVELS)[number];

export const STATUS_LABEL: Record<Lang, Record<StatusLevel, string>> = {
  id: {
    normal: "Normal",
    waspada: "Waspada",
    siaga: "Siaga",
    awas: "Awas",
    info: "Info",
    offline: "Offline",
  },
  en: {
    normal: "Normal",
    waspada: "Advisory",
    siaga: "Warning",
    awas: "Critical",
    info: "Info",
    offline: "Offline",
  },
};

/** Severity order for sorting alert lists (higher = more severe). */
export const STATUS_RANK: Record<StatusLevel, number> = {
  offline: -1,
  info: 0,
  normal: 1,
  waspada: 2,
  siaga: 3,
  awas: 4,
};

export function mostSevere(
  levels: readonly StatusLevel[],
): StatusLevel | undefined {
  return levels.reduce<StatusLevel | undefined>(
    (worst, l) =>
      worst === undefined || STATUS_RANK[l] > STATUS_RANK[worst] ? l : worst,
    undefined,
  );
}
