import { cn } from "../../lib/cn";

export interface CountBadgeProps {
  count: number;
  label: string;
  max?: number;
  className?: string;
}

export function CountBadge({
  count,
  label,
  max = 99,
  className,
}: CountBadgeProps) {
  if (count <= 0) return null;
  return (
    <span
      aria-label={label}
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-status-awas px-1.5 text-caption font-semibold text-white tabular-nums ring-2 ring-surface",
        className,
      )}
    >
      {count > max ? `${max}+` : count}
    </span>
  );
}
