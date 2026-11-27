import { cn } from "../../lib/cn";

export interface SpinnerProps {
  size?: 16 | 20 | 24;
  label?: string;
  className?: string;
}

export function Spinner({ size = 16, label, className }: SpinnerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("shrink-0 animate-spin", className)}
    >
      <circle cx="8" cy="8" r="6" opacity={0.3} />
      <path d="M8 2a6 6 0 0 1 6 6" />
    </svg>
  );
}
