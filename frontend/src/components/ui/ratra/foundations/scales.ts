/**
 * Scientific colour scales (spec §4 rule: brand colours never replace them; identical in light and dark).
 *
 * Rule: a scale lives in the APP until a second app needs it — then it moves here.
 * Scales that stay in their app today: dBZ/dBV (weather-radar-web lib/dbzColor.ts, synced with the backend),
 * HATPI/turbulence classes (turbulence-web map/symbology.ts), NDVI and analysis classes (agri config/), slope zones (resident lib/zones.ts).
 */

/** Stepped scale: values >= stops[i] get colors[i]; values below stops[0] are not drawn (null). */
export interface StepScale {
  /** Unit shown in the legend, e.g. "mm/h", "dBZ". */
  unit: string;
  /** Ascending thresholds, same length as colors. */
  stops: readonly number[];
  colors: readonly string[];
}

/** Categorical scale: one colour + label per class key. */
export type ClassScale<K extends string | number> = Readonly<
  Record<K, { color: string; label: string }>
>;

export function stepColor(
  scale: StepScale,
  value: number | null | undefined,
): string | null {
  if (value == null || Number.isNaN(value) || value < scale.stops[0])
    return null;
  let i = 0;
  while (i < scale.stops.length - 1 && value >= scale.stops[i + 1]) i++;
  return scale.colors[i];
}

/** Legend rows for a step scale: "≥ 5", "≥ 10", … */
export function stepLegend(
  scale: StepScale,
): { color: string; label: string }[] {
  return scale.stops.map((s, i) => ({
    color: scale.colors[i],
    label: `≥ ${s} ${scale.unit}`.trim(),
  }));
}

/**
 * Hotspot confidence (NASA FIRMS high / nominal / low). Used by RATRA Disaster (karhutla) and RATRA Aero.
 * PROPOSAL: unifies disaster-web lib/format.ts tierColor (#ae1800/#ec3013/#ffc4b8) and
 * turbulence-web symbology DATA.fire (#F2B600). Confirm with both owners before adopting.
 * Labels are Bahasa Indonesia defaults; apps pass their own i18n labels when needed.
 */
export type HotspotConfidence = "high" | "nominal" | "low";
export const HOTSPOT_CONFIDENCE: ClassScale<HotspotConfidence> = {
  high: { color: "#ae1800", label: "Tinggi" },
  nominal: { color: "#ec3013", label: "Sedang" },
  low: { color: "#ffc4b8", label: "Rendah" },
};
