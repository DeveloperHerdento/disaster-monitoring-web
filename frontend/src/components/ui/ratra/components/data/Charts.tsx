import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { niceTicks, spreadLabels } from "../../lib/chart";

const HIGHLIGHT = "var(--signal)";
const MUTED = "color-mix(in srgb, var(--label) 22%, transparent)";

export interface ChartCardProps {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function ChartCard({
  title,
  subtitle,
  children,
  footer,
  className,
}: ChartCardProps) {
  return (
    <figure
      className={cn(
        "m-0 flex flex-col gap-4 rounded-lg bg-surface p-7",
        className,
      )}
    >
      <figcaption className="flex flex-col gap-1">
        <span className="text-headline">{title}</span>
        {subtitle && (
          <span className="text-footnote text-label-secondary">{subtitle}</span>
        )}
      </figcaption>
      {children}
      {footer && <p className="text-footnote text-label-secondary">{footer}</p>}
    </figure>
  );
}

export interface LineSeries {
  label: string;
  values: readonly number[];
  color?: string;
  labelColor?: string;
}

export interface LineChartProps {
  series: readonly LineSeries[];
  xLabels: readonly string[];
  label: string;
  format?: (value: number) => string;
  className?: string;
}

const W = 560;
const H = 240;
const LEFT = 40;
const RIGHT = 480;
const TOP = 30;
const BOTTOM = 210;

export function LineChart({
  series,
  xLabels,
  label,
  format = String,
  className,
}: LineChartProps) {
  const all = series.flatMap((s) => s.values);
  const ticks = niceTicks(Math.min(...all), Math.max(...all));
  const lo = ticks[0];
  const hi = ticks[ticks.length - 1];
  const count = Math.max(...series.map((s) => s.values.length));
  const x = (i: number) =>
    LEFT + (count > 1 ? (i * (RIGHT - LEFT)) / (count - 1) : 0);
  const y = (v: number) =>
    hi === lo
      ? (TOP + BOTTOM) / 2
      : BOTTOM - ((v - lo) / (hi - lo)) * (BOTTOM - TOP);
  const ends = spreadLabels(
    series.map((s) => y(s.values[s.values.length - 1]) + 4),
    14,
  );
  const colorOf = (s: LineSeries, i: number) =>
    s.color ?? (i === 0 ? HIGHLIGHT : MUTED);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={label}
      className={cn("h-auto w-full font-sans", className)}
    >
      {ticks.map((t) => (
        <g key={t}>
          <line
            x1={LEFT}
            x2={RIGHT}
            y1={y(t)}
            y2={y(t)}
            className="stroke-separator"
          />
          <text
            x={LEFT - 10}
            y={y(t) + 4}
            textAnchor="end"
            fontSize="12"
            className="fill-label-tertiary"
          >
            {format(t)}
          </text>
        </g>
      ))}
      {series.map((s, i) => (
        <polyline
          key={s.label}
          points={s.values.map((v, j) => `${x(j)},${y(v)}`).join(" ")}
          fill="none"
          stroke={colorOf(s, i)}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {series.map((s, i) => (
        <text
          key={s.label}
          x={RIGHT + 8}
          y={ends[i]}
          fontSize="13"
          fontWeight="600"
          fill={
            s.labelColor ?? (i === 0 ? "var(--ink)" : "var(--label-secondary)")
          }
        >
          {s.label} · {format(s.values[s.values.length - 1])}
        </text>
      ))}
      {xLabels.map((l, i) => (
        <text
          key={`${l}-${i}`}
          x={x(i)}
          y={H - 8}
          textAnchor="middle"
          fontSize="12"
          className="fill-label-tertiary"
        >
          {l}
        </text>
      ))}
    </svg>
  );
}

export interface BarSeries {
  label: string;
  values: readonly number[];
  color?: string;
}

export interface BarChartProps {
  categories: readonly string[];
  series: readonly BarSeries[];
  label: string;
  height?: number;
  className?: string;
}

export function BarChart({
  categories,
  series,
  label,
  height = 180,
  className,
}: BarChartProps) {
  const max = Math.max(...series.flatMap((s) => s.values), 0) || 1;
  const colorOf = (s: BarSeries, i: number) =>
    s.color ?? (i === 0 ? HIGHLIGHT : MUTED);
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div role="img" aria-label={label} className="flex items-end gap-3.5">
        {categories.map((c, ci) => (
          <div key={ci} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="flex w-full items-end gap-[3px]" style={{ height }}>
              {series.map((s, si) => (
                <span
                  key={s.label}
                  className="flex-1 rounded-t-[6px] rounded-b-[2px]"
                  style={{
                    height: `${(s.values[ci] / max) * 100}%`,
                    background: colorOf(s, si),
                  }}
                />
              ))}
            </div>
            <span className="h-[18px] text-footnote text-label-secondary">
              {c}
            </span>
          </div>
        ))}
      </div>
      {series.length > 1 && (
        <div aria-hidden="true" className="flex flex-wrap gap-[18px]">
          {series.map((s, i) => (
            <span
              key={s.label}
              className="inline-flex items-center gap-1.5 text-footnote text-label-secondary"
            >
              <span
                className="size-2.5 rounded-[3px]"
                style={{ background: colorOf(s, i) }}
              />
              {s.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
