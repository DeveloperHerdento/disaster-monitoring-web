import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { sparklinePoints, SPARK_DOT, SPARK_STROKE } from "../../lib/chart";
import type { StatusLevel } from "../../lib/status";
import { StatusPill } from "../status/StatusPill";

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("rounded-lg bg-surface p-6", className)}>{children}</div>
  );
}

const SPARK_TONE: Record<"signal" | StatusLevel, string> = {
  signal: "text-signal",
  normal: "text-status-normal",
  waspada: "text-status-waspada",
  siaga: "text-status-siaga",
  awas: "text-status-awas",
  info: "text-status-info",
  offline: "text-status-offline",
};

export interface SparklineProps {
  values: readonly number[];
  width?: number;
  height?: number;
  tone?: "signal" | StatusLevel;
  fluid?: boolean;
  className?: string;
}

export function Sparkline({
  values,
  width = 136,
  height = 40,
  tone = "signal",
  fluid = false,
  className,
}: SparklineProps) {
  const pts = sparklinePoints(values, width, height);
  if (pts.length === 0) return null;
  const end = pts[pts.length - 1];
  return (
    <svg
      width={fluid ? undefined : width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio={fluid ? "none" : undefined}
      aria-hidden="true"
      className={cn("shrink-0 overflow-visible", SPARK_TONE[tone], className)}
    >
      <polyline
        points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth={SPARK_STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <polyline
        points={`${end.x},${end.y} ${end.x},${end.y}`}
        stroke="currentColor"
        strokeWidth={SPARK_DOT * 2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export interface StatCardProps {
  label: string;
  value: ReactNode;
  status?: StatusLevel;
  trend?: readonly number[];
  change?: ReactNode;
  source?: ReactNode;
  className?: string;
}

export function StatCard({
  label,
  value,
  status,
  trend,
  change,
  source,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-lg bg-surface p-[22px]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-subhead text-label-secondary">{label}</p>
        {status && <StatusPill level={status} />}
      </div>
      <div className="flex items-end justify-between gap-3">
        <p className="shrink-0 font-display text-[40px] leading-[1.08] font-bold tracking-[-0.024em] whitespace-nowrap tabular-nums">
          {value}
        </p>
        {trend && (
          <Sparkline
            values={trend}
            tone={status ?? "signal"}
            fluid
            className="h-10 max-w-[136px] min-w-16 flex-1 shrink"
          />
        )}
      </div>
      {change && <p className="text-subhead">{change}</p>}
      {source && <p className="text-footnote text-label-tertiary">{source}</p>}
    </div>
  );
}
