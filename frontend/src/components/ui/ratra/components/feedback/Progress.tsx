import { cn } from "../../lib/cn";

const clamp = (v: number) => Math.min(100, Math.max(0, v));

export interface ProgressBarProps {
  value: number;
  label: string;
  className?: string;
}

export function ProgressBar({ value, label, className }: ProgressBarProps) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamp(value))}
      className={cn("h-1 overflow-hidden rounded-full bg-separator", className)}
    >
      <div
        className="h-full rounded-full bg-tint transition-[width] duration-300"
        style={{ width: `${clamp(value)}%` }}
      />
    </div>
  );
}

export interface ProgressRingProps {
  value: number;
  label: string;
  size?: number;
  className?: string;
}

const RADIUS = 18;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ProgressRing({
  value,
  label,
  size = 44,
  className,
}: ProgressRingProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamp(value))}
      className={cn("shrink-0 -rotate-90", className)}
    >
      <circle
        cx="22"
        cy="22"
        r={RADIUS}
        fill="none"
        strokeWidth="4"
        className="stroke-separator"
      />
      <circle
        cx="22"
        cy="22"
        r={RADIUS}
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${(clamp(value) / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
        className="stroke-tint transition-[stroke-dasharray] duration-300"
      />
    </svg>
  );
}

export interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("block h-3 animate-pulse rounded-xs bg-fill", className)}
    />
  );
}
