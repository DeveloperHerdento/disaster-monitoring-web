export interface SpringState {
  x: number;
  v: number;
  target: number;
}

export const SHEET_SPRING = { response: 0.3, damping: 1 } as const;
export const FLICK_SPRING = { response: 0.3, damping: 0.8 } as const;
export const DECELERATION = 0.998;

export function springStep(
  s: SpringState,
  dt: number,
  response: number,
  damping: number,
): SpringState {
  const k = ((2 * Math.PI) / response) ** 2;
  const c = (4 * Math.PI * damping) / response;
  const a = -k * (s.x - s.target) - c * s.v;
  const v = s.v + a * dt;
  const x = s.x + v * dt;
  if (Math.abs(x - s.target) < 0.01 && Math.abs(v) < 0.01) {
    return { x: s.target, v: 0, target: s.target };
  }
  return { x, v, target: s.target };
}

export function rubberBand(overshoot: number, dimension: number): number {
  const c = 0.55;
  return (overshoot * dimension * c) / (dimension + c * Math.abs(overshoot));
}

export function projectedEnd(position: number, velocity: number): number {
  return position + ((velocity / 1000) * DECELERATION) / (1 - DECELERATION);
}

export function nearest(points: readonly number[], value: number): number {
  return points.reduce((best, p) =>
    Math.abs(p - value) < Math.abs(best - value) ? p : best,
  );
}
