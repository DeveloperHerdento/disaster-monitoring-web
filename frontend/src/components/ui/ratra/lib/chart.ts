export interface Point {
  x: number;
  y: number;
}

export const SPARK_STROKE = 2.2;
export const SPARK_DOT = 3.5;

export function sparklinePoints(
  values: readonly number[],
  width: number,
  height: number,
): Point[] {
  if (values.length === 0) return [];
  const pad = SPARK_DOT + SPARK_STROKE / 2;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min;
  const stepX = values.length > 1 ? (width - pad * 2) / (values.length - 1) : 0;
  return values.map((v, i) => ({
    x: pad + i * stepX,
    y: span === 0 ? height / 2 : pad + ((max - v) / span) * (height - pad * 2),
  }));
}

export function niceTicks(min: number, max: number, count = 5): number[] {
  if (min === max) return [min];
  const rough = (max - min) / (count - 1);
  const power = 10 ** Math.floor(Math.log10(rough));
  const step =
    [1, 2, 2.5, 5, 10].map((m) => m * power).find((s) => s >= rough) ??
    10 * power;
  const start = Math.floor(min / step) * step;
  const end = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let t = start; t <= end + step / 2; t += step) {
    ticks.push(Number(t.toFixed(10)));
  }
  return ticks;
}

export function spreadLabels(ys: readonly number[], gap: number): number[] {
  const order = ys.map((y, i) => ({ y, i })).sort((a, b) => a.y - b.y);
  for (let k = 1; k < order.length; k++) {
    order[k].y = Math.max(order[k].y, order[k - 1].y + gap);
  }
  const out = new Array<number>(ys.length);
  for (const o of order) out[o.i] = o.y;
  return out;
}
